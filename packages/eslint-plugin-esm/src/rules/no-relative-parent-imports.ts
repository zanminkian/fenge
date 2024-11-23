import { create, createRule, getRuleName } from "../common.js";

const depth = 3;

export const noRelativeParentImports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow importing module from a relative parent path too deeply.",
  create: (context) => create(context, checkDepth),
});

function checkDepth(_filename: string, source: string) {
  return new RegExp(`^(\\.\\./){${depth.toString()},}`).test(source);
}
