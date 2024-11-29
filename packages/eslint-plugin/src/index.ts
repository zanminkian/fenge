import { callArgumentsLength } from "./rules/call-arguments-length.js";
import { noInstanceofBuiltin } from "./rules/no-instanceof-builtin.js";
import { noJsxInNonJsxFile } from "./rules/no-jsx-in-non-jsx-file.js";
import { noRestrictedLoops } from "./rules/no-restricted-loops.js";
import { noUnnecessaryTemplateString } from "./rules/no-unnecessary-template-string.js";

export const rules = {
  [callArgumentsLength.name]: callArgumentsLength.rule,
  [noInstanceofBuiltin.name]: noInstanceofBuiltin.rule,
  [noJsxInNonJsxFile.name]: noJsxInNonJsxFile.rule,
  [noRestrictedLoops.name]: noRestrictedLoops.rule,
  [noUnnecessaryTemplateString.name]: noUnnecessaryTemplateString.rule,
};
