import childProcess from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
