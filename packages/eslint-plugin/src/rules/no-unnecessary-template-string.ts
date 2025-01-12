import type { Rule } from "eslint";
import { getRuleName } from "../utils.ts";

// TODO deprecate this rule if https://github.com/sindresorhus/eslint-plugin-unicorn/issues/71 is implemented.
const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "Disallow using template string when it's unnecessary. Use normal literal string expression instead.",
    },
    messages: {
      [`${name}/error`]:
        "Disallow using template string when it's unnecessary. Use normal literal string expression instead.",
    },
  },
  create: (context) => ({
    TemplateLiteral: (node) => {
      if (
        node.quasis.length === 1 &&
        node.expressions.length === 0 &&
        node.loc?.start.line === node.loc?.end.line
      ) {
        context.report({ node, messageId: `${name}/error` });
      }
    },
  }),
};
export const noUnnecessaryTemplateString = { name, rule };
