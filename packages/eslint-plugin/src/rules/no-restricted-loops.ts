import type { Rule } from "eslint";
import type { Node } from "estree";
import { getRuleName } from "../utils.ts";

// TODO: If https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2453 is accepted, migrate this rule to `eslint-plugin-unicorn`
const name = getRuleName(import.meta.url);
/**
 * Only allow `while` and `for-of` loops. `for`, `for-in`, `do-while` and `for-await-of` loops are disallowed.
 * Visit https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2453 for more details.
 */
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "Only allow `while` and `for-of` loops. `for`, `for-in`, `do-while` and `for-await-of` loops are disallowed.",
    },
    messages: {
      [`${name}/error`]:
        "Only allow `while` and `for-of` loops. `for`, `for-in`, `do-while` and `for-await-of` loops are disallowed.",
    },
  },
  create: (context) => ({
    ":matches(ForStatement, ForInStatement, DoWhileStatement, ForOfStatement[await=true])":
      (node: Node) => {
        context.report({ node, messageId: `${name}/error` });
      },
  }),
};

export const noRestrictedLoops = { name, rule };
