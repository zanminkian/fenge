import type { Rule } from "eslint";
import { getDocUrl, getRuleName } from "../utils.ts";

const name = getRuleName(import.meta.url);
/**
 * Only allow `while` and `for-of` loops. `for`, `for-in`, `do-while` and `for-await-of` loops are disallowed.
 * Visit https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2453 for more details.
 */
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: getDocUrl(name),
      description:
        "Only allow `while`, `for` and `for-of` loops. `for-in`, `do-while` and `for-await-of` loops are disallowed.",
    },
    messages: {
      [`${name}/error`]:
        "Only allow `while`, `for` and `for-of` loops. `for-in`, `do-while` and `for-await-of` loops are disallowed.",
    },
  },
  create: (context) => ({
    ":matches(ForInStatement, DoWhileStatement, ForOfStatement[await=true])": (
      node: Rule.Node,
    ) => {
      context.report({ node, messageId: `${name}/error` });
    },
  }),
};

export const noRestrictedLoops = { name, rule };
