import fs from "node:fs";
import path from "node:path";
import { create, createRule, getRuleName, getSourceType } from "../common.ts";
import { memoize } from "../utils.ts";

export const noDirectoryImports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow importing from a directory.",
  create: (context) => create(context, check),
});

function check(filename: string, source: string) {
  if (getSourceType(source) !== "local") {
    return false;
  }
  if (source.endsWith(".") || source.endsWith("./")) {
    return true;
  }
  const absolutePath = path.resolve(path.dirname(filename), source);
  if (!absolutePath.startsWith("/")) {
    throw new Error(
      `ESLint plugin internal error. Absolute path incorrect: ${absolutePath}.`,
    );
  }
  return isDir(absolutePath);
}

const isDir = memoize((filePath: string) => {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch {
    return false;
  }
});
