// @ts-check
import childProcess from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { getPackages } from "@monorepo-utils/package-utils";
import { getBinPath } from "../utils.js";

/**
 * @param {string} info
 */
function print(info) {
  // eslint-disable-next-line no-console -- cli
  console.log(info);
}

/**
 * @param {string} msg
 */
async function parseCommit(msg) {
  const COMMIT_RE =
    /^(?<type>\w+)(?:\((?<scopes>[^)]+)\))?(?<isBreaking>!)?:\s(?<content>.+)/s;
  const match = COMMIT_RE.exec(msg);
  if (!match || !match.groups) return null;

  const packages = getPackages(process.cwd());
  const { type, scopes, isBreaking, content } = match.groups;
  /** @type {{name: string, version?: string}[] | null} */
  let pkgJsonOfScopes;
  // If there are packages, current directory is a monorepo.
  if (packages.length > 0) {
    pkgJsonOfScopes = scopes
      ? scopes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((scope) => {
            const pkgJson = packages.find(
              ({ packageJSON }) => packageJSON.name === scope,
            )?.packageJSON;
            if (pkgJson) return pkgJson;

            const pkgs = packages.filter(({ packageJSON }) =>
              packageJSON.name.endsWith(`/${scope}`),
            );
            if (pkgs.length === 1) return pkgs?.[0]?.packageJSON;

            print(`⚠️ No package found for scope ${scope}`);
            return undefined;
          })
          .filter(Boolean)
      : null;
  }
  // If there are no packages, current directory is a single-package repo.
  else {
    const pkgJson = JSON.parse(
      await fs.readFile(path.join(process.cwd(), "package.json"), "utf8"),
    );
    pkgJsonOfScopes = [pkgJson];
  }

  return {
    type,
    /** @type {{name: string, version?: string}[] | null} */
    pkgJsonOfScopes,
    isBreaking: isBreaking === "!",
    content: content?.trim(),
  };
}

/**
 * @param {string} commitMsgPath
 */
export async function postCommit(commitMsgPath) {
  // 1. skip if changeset dir not exists
  const changesetDir = path.join(process.cwd(), ".changeset");
  if (
    !(await fs
      .stat(changesetDir)
      .then((s) => s.isDirectory())
      .catch(() => false))
  ) {
    print("Skipping changeset creation: `.changeset` directory does not exist");
    return;
  }

  // 2. skip if it's an amend commit
  const isAmendCommit = childProcess
    .execSync("git reflog -1 --format=%gs HEAD", {
      encoding: "utf8",
    })
    .trim()
    .includes("(amend)");
  if (isAmendCommit) {
    print("Skipping changeset creation: this is an amend commit");
    return;
  }

  // 3. skip if there is a changeset file added
  const isChangesetFileAdded = childProcess
    .execSync(
      "git diff-tree --no-commit-id -r --diff-filter=A --name-only HEAD -- .changeset/",
      { encoding: "utf8" },
    )
    .trim()
    .split("\n")
    .some((f) => f.endsWith(".md"));
  if (isChangesetFileAdded) {
    print("Skipping changeset creation: a changeset file was already added");
    return;
  }

  const commitMsg = await fs.readFile(commitMsgPath, "utf8").catch(() => "");
  const commit = await parseCommit(commitMsg);
  // 4. skip if the commit message is not a valid conventional commit message
  if (!commit) {
    print("Skipping changeset creation: invalid conventional commit message");
    return;
  }
  // 5. skip if the commit scope is not specified
  if (!commit.pkgJsonOfScopes?.length) {
    print("Skipping changeset creation: no scope specified or no scope found");
    return;
  }
  // 6. skip if the commit type is not feat, fix or breaking change
  if (!commit.isBreaking && commit.type !== "feat" && commit.type !== "fix") {
    print(
      "Skipping changeset creation: commit type is not feat, fix, or a breaking change",
    );
    return;
  }

  const filename = `${Math.random().toString(36).slice(2)}.md`;
  const changesetPath = path.join(changesetDir, filename);
  const frontmatter = commit.pkgJsonOfScopes
    .map(({ name, version }) => {
      if (!name || !version) return undefined;
      const [major = 0, minor = 0] = version.split(".").map(Number);
      /** @type { "major" | "minor" | "patch"} */
      let bump;
      if (major > 0) {
        // 1.x.x
        bump = commit.isBreaking
          ? "major"
          : commit.type === "feat"
            ? "minor"
            : "patch";
      } else if (minor > 0) {
        // 0.x.x
        bump = commit.isBreaking ? "minor" : "patch";
      } else {
        // 0.0.x
        bump = "patch";
      }
      return `"${name}": ${bump}`;
    })
    .filter((s) => s !== undefined);
  // 7. skip if the frontmatter is empty
  if (frontmatter.length <= 0) {
    print("Skipping changeset creation: frontmatter is empty");
    return;
  }

  // 8. create changeset file
  await fs.writeFile(
    changesetPath,
    `---
${frontmatter.join("\n")}
---

${commitMsg}
`,
  );
  childProcess.execSync(
    `${await getBinPath("fenge")} format -u ${JSON.stringify(changesetPath)}`,
    { stdio: "inherit" },
  );
  childProcess.execSync(`git add ${JSON.stringify(changesetPath)}`, {
    stdio: "inherit",
  });
  childProcess.execSync("git commit --amend --no-edit --no-verify", {
    stdio: "inherit",
  });
  print(`Changeset file ${changesetPath} created`);
}
