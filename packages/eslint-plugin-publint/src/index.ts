import type { Rule } from "eslint";
import { createRule } from "./create-rule.ts";

function getMeta({
  recommended = true,
}: { recommended?: boolean } = {}): NonNullable<Rule.RuleModule["meta"]> {
  return {
    docs: {
      url: "https://www.npmjs.com/package/eslint-plugin-publint",
      recommended,
    },
  };
}

export const rules = {
  suggestion: createRule("suggestion", getMeta({ recommended: false })),
  warning: createRule("warning", getMeta()),
  error: createRule("error", getMeta()),
};
