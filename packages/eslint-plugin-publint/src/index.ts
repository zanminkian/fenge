import { createRule } from "./create-rule.ts";
import { processor } from "./processor.ts";

export const rules = {
  suggestion: createRule("suggestion"),
  warning: createRule("warning"),
  error: createRule("error"),
};

export const processors = { processor };
