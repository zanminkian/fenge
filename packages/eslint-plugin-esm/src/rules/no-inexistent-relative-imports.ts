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

const isExisting = memoize((filepath: string): boolean =>
  endsWithExtension(filepath)
    ? isFile(filepath)
    : isDirectory(filepath) ||
      isFile(`${filepath}.js`) ||
      isFile(`${filepath}.cjs`) ||
      isFile(`${filepath}.mjs`) ||
      isFile(`${filepath}.jsx`) ||
      isFile(`${filepath}.ts`) ||
      isFile(`${filepath}.cts`) ||
      isFile(`${filepath}.mts`) ||
      isFile(`${filepath}.tsx`) ||
      isFile(`${filepath}.json`) ||
      isFile(`${filepath}.node`),
);

function isFile(filepath: string) {
  try {
    return fs.statSync(filepath).isFile();
  } catch {
    return false;
  }
}

function isDirectory(filepath: string) {
  try {
    return fs.statSync(filepath).isDirectory();
  } catch {
    return false;
  }
}

function endsWithExtension(filepath: string) {
  const extensions = [
    "js",
    "cjs",
    "mjs",
    "jsx",

    "ts",
    "cts",
    "mts",
    "tsx",

    "json",
    "node",

    "css",
    "scss",
    "sass",
    "less",
  ];
  return extensions.some((ext) => filepath.endsWith(`.${ext}`));
}
