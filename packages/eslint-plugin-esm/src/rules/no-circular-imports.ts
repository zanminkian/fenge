import path from "node:path";
import process from "node:process";
import { createRule, getRuleName, getSourceType } from "../common.ts";

/**
 * Key is the source file, value is its imports.
 */
const store = new Map<string, string[]>();

function isCircular(
  currentFile: string,
  visited = new Set<string>(),
): [boolean, string[]] {
  if (visited.has(currentFile)) {
    return [true, [...visited]];
  }
  visited.add(currentFile);

  const dependencies = store.get(currentFile) ?? [];
  for (const dependency of dependencies) {
    const [isCircularResult, circularPaths] = isCircular(
      path.resolve(path.dirname(currentFile), dependency),
      new Set(visited),
    );
    if (isCircularResult) {
      return [isCircularResult, circularPaths];
    }
  }
  return [false, []];
}

/**
 * Note: This rule do not support importing files without extensions and directory imports.
 */
export const noCircularImports = createRule({
  name: getRuleName(import.meta.url),
  message: "Circular imports are not allowed.",
  create: (context) => {
    const filePath = context.filename;
    const imports = store.get(filePath) ?? [];
    store.set(filePath, imports);

    return {
      ImportDeclaration: (node) => {
        if (
          typeof node.source.value !== "string" ||
          getSourceType(node.source.value) !== "local"
        )
          return;
        imports.push(node.source.value);
      },

      "ImportDeclaration:exit": (node) => {
        if (
          typeof node.source.value !== "string" ||
          getSourceType(node.source.value) !== "local"
        )
          return;

        const [isCircularResult, circularPaths] = isCircular(
          path.resolve(path.dirname(filePath), node.source.value),
          new Set([filePath]),
        );
        if (isCircularResult) {
          context.report({
            node,
            message: `Circular import detected: ${circularPaths
              .map((p) => path.relative(process.cwd(), p))
              .join(" -> ")}`,
          });
        }
      },
    };
  },
});
