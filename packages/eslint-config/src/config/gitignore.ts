import childProcess from "node:child_process";

export function gitignore() {
  let stdout = "";
  try {
    stdout = childProcess.execSync(
      "git ls-files --others --ignored --exclude-standard --directory",
      { encoding: "utf8" },
    );
  } catch (e) {
    console.warn(
      "Warn: Running `git ls-files` fail. We recommend to run `git init` to setup the project first.",
      e,
    );
  }
  // https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores
  return [
    {
      name: "fenge/gitignore",
      ignores: stdout.split("\n").filter(Boolean),
    },
  ] as const;
}
