import fs from "node:fs";
import path from "node:path";
import { create, createRule, getRuleName, getSourceType } from "../common.ts";
import { memoize } from "../utils.ts";

const CLI_PATTERN = /\.cli\.[cm]?[jt]s$/;

const isCliFile = memoize((filePath: string) => {
  if (CLI_PATTERN.test(filePath)) return true;
  try {
    return fs.readFileSync(filePath, "utf8").startsWith("#!");
  } catch {
    return false;
  }
});

export const noCliImports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow importing from a CLI file.",
  create: (context) =>
    create(context, (filename, source) => {
      if (getSourceType(source) !== "local") return false;
      return isCliFile(path.resolve(path.dirname(filename), source));
    }),
});
