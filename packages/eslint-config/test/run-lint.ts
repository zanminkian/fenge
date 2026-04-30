import childProcess from "node:child_process";
import path from "node:path";

const __dirname = import.meta.dirname;

export function runLint(filePaths: string[]) {
  return childProcess.spawnSync(
    path.join(__dirname, "../node_modules/.bin/eslint"),
    [
      "--config",
      path.join(__dirname, "../dist/eslint.config.js"),
      ...filePaths,
    ],
    { encoding: "utf8" },
  );
}
