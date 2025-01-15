import fs from "node:fs";
import path from "node:path";
import { create, createRule, getRuleName, getSourceType } from "../common.ts";
import { memoize } from "../utils.ts";

export const noInexistentRelativeImports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow importing from a relative file which is inexistent.",
  create: (context) => create(context, check),
});

function check(filename: string, source: string) {
  if (getSourceType(source) !== "local") {
    return false;
  }
  return !isExisting(path.resolve(path.dirname(filename), source));
}

// TODO: Directory should be reported. Remove `|| stat.isDirectory()` later.
const isExisting = memoize((filepath: string): boolean => {
  try {
    const stat = fs.statSync(filepath);
    return stat.isFile() || stat.isDirectory();
  } catch {
    return false;
  }
});
