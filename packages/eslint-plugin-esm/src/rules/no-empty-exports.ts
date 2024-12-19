import type { Node } from "estree";
import { createRule, DEFAULT_MESSAGE_ID, getRuleName } from "../common.js";

export const noEmptyExports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow `export {}`.",
  create: (context) => ({
    "ExportNamedDeclaration[specifiers.length=0][declaration=null]": (
      node: Node,
    ) => {
      context.report({ node, messageId: DEFAULT_MESSAGE_ID });
    },
  }),
});
