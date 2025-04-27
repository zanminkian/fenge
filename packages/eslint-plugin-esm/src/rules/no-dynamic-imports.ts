import type { Rule } from "eslint";
import { createRule, DEFAULT_MESSAGE_ID, getRuleName } from "../common.ts";

export const noDynamicImports = createRule({
  name: getRuleName(import.meta.url),
  message: "`import()` should be called with string literal.",
  create: (context) => ({
    "ImportExpression > :not(Literal)": (node: Rule.Node) => {
      context.report({ node, messageId: DEFAULT_MESSAGE_ID });
    },
    "ImportExpression > Literal[raw=/^[^'\"].*[^'\"]$/]": (node: Rule.Node) => {
      context.report({ node, messageId: DEFAULT_MESSAGE_ID });
    },
  }),
});
