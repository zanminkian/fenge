import path from "node:path";
import { create, createRule, getRuleName, getSourceType } from "../common.ts";

export const noExternalSrcImports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow importing from outside the src directory.",
  create: (context) => create(context, check),
});

function check(filename: string, source: string) {
  if (getSourceType(source) !== "local") {
    return false;
  }
  const srcPath = /^.*?\/src\//.exec(filename)?.[0];
  if (srcPath) {
    const sourcePath = path.resolve(path.dirname(filename), source);
    // TODO: Disallow importing the nearest package.json when [module.findPackageJSON](https://nodejs.org/api/module.html#modulefindpackagejsonspecifier-base) is stable and we drop Node.js <= 20.
    if (sourcePath === path.join(path.dirname(srcPath), "package.json")) {
      // Allow importing the nearest package.json
      return false;
    }
    if (!sourcePath.startsWith(srcPath)) {
      return true;
    }
  }
  return false;
}
