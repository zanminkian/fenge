import { createRule, DEFAULT_MESSAGE_ID, getRuleName } from "../common.ts";
import type { GetNode } from "../utils.ts";

type ImportDeclaration = GetNode<"ImportDeclaration">;

export const topSideEffectImports = createRule({
  name: getRuleName(import.meta.url),
  message: "Side effect imports must be placed before other import statements.",
  create: (context) => {
    let hasNonSideEffectImport = false;

    return {
      ImportDeclaration: (node: ImportDeclaration) => {
        if (node.specifiers.length > 0) {
          hasNonSideEffectImport = true;
          return;
        }
        if (hasNonSideEffectImport) {
          context.report({ node, messageId: DEFAULT_MESSAGE_ID });
        }
      },
    };
  },
});
