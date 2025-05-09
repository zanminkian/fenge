import type { Rule } from "eslint";
import { createRule, DEFAULT_MESSAGE_ID, getRuleName } from "../common.ts";

export const noEmptyExports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow `export {}`.",
  create: (context) => ({
    "ExportNamedDeclaration[specifiers.length=0][declaration=null]": (
      node: Rule.Node,
    ) => {
      context.report({ node, messageId: DEFAULT_MESSAGE_ID });
    },
  }),
});
