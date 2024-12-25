import path from "node:path";
import { create, createRule, getRuleName, getSourceType } from "../common.js";

export const nearestRelativePath = createRule({
  name: getRuleName(import.meta.url),
  message: "The relative source path should be a nearest relative path.",
  create: (context) => create(context, check),
});

function check(filename: string, source: string) {
  if (
    getSourceType(source) !== "local" ||
    source.startsWith("/") ||
    source === "."
  ) {
    return false;
  }
  if (source.endsWith("/")) {
    return true;
  }
  const currentPath = path.dirname(filename);
  const absoluteSource = path.resolve(currentPath, source);
  // compatible with windows
  let resultPath = path
    .relative(currentPath, absoluteSource)
    .replaceAll("\\", "/");
  if (!resultPath.startsWith("./") && !resultPath.startsWith("..")) {
    resultPath = `./${resultPath}`;
  }
  return resultPath !== source;
}
