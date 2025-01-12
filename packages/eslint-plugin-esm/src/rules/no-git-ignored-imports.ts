import childProcess from "node:child_process";
import path from "node:path";
import process from "node:process";
import { isNativeError } from "node:util/types";
import { create, createRule, getRuleName, getSourceType } from "../common.ts";
import { memoize } from "../utils.ts";

export const noGitIgnoredImports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow to import module from a git-ignored path.",
  create: (context) => create(context, checkIgnored),
});

function checkIgnored(filename: string, source: string) {
  // from node_modules
  if (getSourceType(source) !== "local") {
    return false;
  }
  // out side of project root
  if (source.startsWith("/") && !source.startsWith(process.cwd())) {
    return true;
  }
  // This file of absolutePath may be a symbolic link
  const absolutePath = path.resolve(path.dirname(filename), source);
  if (!absolutePath.startsWith("/")) {
    throw new Error(
      `ESLint plugin internal error. Absolute path incorrect: ${absolutePath}.`,
    );
  }
  return isIgnored(absolutePath);
}

const isIgnored = memoize((filePath: string) => {
  try {
    return (
      childProcess
        .execSync(`git check-ignore ${filePath}`, { encoding: "utf8" })
        .trim() === filePath
    );
  } catch (e) {
    if (
      isNativeError(e) &&
      "stdout" in e &&
      e.stdout === "" &&
      "stderr" in e &&
      e.stderr === ""
    ) {
      return false;
    }
    // We cannot throw an error here. So we have to return true to report the filePath is bad.
    return true;
  }
});
