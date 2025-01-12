import type { Node } from "estree";
import { createRule, DEFAULT_MESSAGE_ID, getRuleName } from "../common.ts";

export const noDynamicImports = createRule({
  name: getRuleName(import.meta.url),
  message: "`import()` should be called with string literal.",
  create: (context) => ({
    "ImportExpression > :not(Literal)": (node: Node) => {
      context.report({ node, messageId: DEFAULT_MESSAGE_ID });
    },
    "ImportExpression > Literal[raw=/^[^'\"].*[^'\"]$/]": (node: Node) => {
      context.report({ node, messageId: DEFAULT_MESSAGE_ID });
    },
  }),
});
