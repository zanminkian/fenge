import fs from "node:fs";
import path from "node:path";
import { create, createRule, getRuleName, getSourceType } from "../common.ts";
import { memoize } from "../utils.ts";

export const existingFileImports = createRule({
  name: getRuleName(import.meta.url),
  message: "Only allow importing from an existing local file.",
  create: (context) => create(context, check),
});

function check(filename: string, source: string) {
  return getSourceType(source) === "local"
    ? !isExisting(path.resolve(path.dirname(filename), source))
    : false;
}

const isExisting = memoize((filepath: string): boolean => {
  try {
    const stat = fs.statSync(filepath);
    return stat.isFile();
  } catch {
    return false;
  }
});
