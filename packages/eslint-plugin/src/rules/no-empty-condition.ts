import type { Rule } from "eslint";
import { getDocUrl, getRuleName } from "../utils.ts";

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: getDocUrl(name),
      description: "Disallow empty or falsy condition expression in for loops.",
    },
    messages: {
      [`${name}/error`]:
        "The condition (second part) of the for loop should not be empty or falsy.",
    },
  },
  create: (context) => ({
    ForStatement: (node) => {
      const { test } = node;

      if (!test) {
        context.report({ node, messageId: `${name}/error` });
        return;
      }

      const isFalsyLiteral =
        test.type === "Literal" &&
        (test.value === "" ||
          test.value === 0 ||
          test.value === false ||
          test.value === null ||
          test.value === undefined);

      const isUndefinedIdentifier =
        test.type === "Identifier" && test.name === "undefined";

      if (isFalsyLiteral || isUndefinedIdentifier) {
        context.report({ node, messageId: `${name}/error` });
      }
    },
  }),
};

export const noEmptyCondition = { name, rule };
