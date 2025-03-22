// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import packageJson from "../../package.json" with { type: "json" };
import { dir, exists, getBinPath } from "../utils.js";

/**
 * @param {string} file
 * @param {string} content
 */
async function writeGitHook(file, content) {
  const gitPath = path.resolve(process.cwd(), ".git");
  if (!(await exists(gitPath))) {
    throw new Error(
      "Directory `.git` is not existing. Please run `git init` first.",
    );
  }

  const hooksPath = path.resolve(gitPath, "hooks");
  await fs.mkdir(hooksPath, { recursive: true });

  const hookFilePath = path.resolve(hooksPath, file);
  if (await exists(hookFilePath)) {
    const pkgJsonName = packageJson.name; // fenge
    if (!(await fs.readFile(hookFilePath, "utf8")).includes(pkgJsonName)) {
      throw new Error(
        `Cannot install git hook file since ${hookFilePath} is already existing. Please remove it first.`,
      );
    }
  }
  await fs.writeFile(hookFilePath, content);
  await fs.chmod(hookFilePath, "777");
}

/**
 * @param {{noEslint: boolean, noPrettier: boolean}} options
 */
async function writePreCommit({ noEslint, noPrettier }) {
  let config = "lint-staged.config.js";
  if (noEslint && !noPrettier) {
    config = "lint-staged-without-eslint.config.js";
  } else if (!noEslint && noPrettier) {
    config = "lint-staged-without-prettier.config.js";
  } else if (noEslint && noPrettier) {
    return;
  }
  const content = [
    "#!/bin/sh",
    `${await getBinPath("lint-staged")} --config ${path.join(dir(import.meta.url), "..", "config", config)}`,
  ].join("\n");

  await writeGitHook("pre-commit", content);
}

/**
 * @param {{lint: boolean, format: boolean}} options
 */
export async function install({ lint, format }) {
  if (!lint && !format) {
    throw new Error(
      "'--no-lint' and '--no-format' should not be used at the same time",
    );
  }
  await writePreCommit({ noEslint: !lint, noPrettier: !format });
}
