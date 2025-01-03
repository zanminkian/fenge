import { callArgumentsLength } from "./rules/call-arguments-length.js";
import { noInstanceofBuiltin } from "./rules/no-instanceof-builtin.js";
import { noJsxInNonJsxFile } from "./rules/no-jsx-in-non-jsx-file.js";
import { noNestedClass } from "./rules/no-nested-class.js";
import { noNestedFunction } from "./rules/no-nested-function.js";
import { noRestrictedLoops } from "./rules/no-restricted-loops.js";
import { noTopLevelArrowFunction } from "./rules/no-top-level-arrow-function.js";
import { noUnnecessaryTemplateString } from "./rules/no-unnecessary-template-string.js";

export const rules = {
  [callArgumentsLength.name]: callArgumentsLength.rule,
  [noInstanceofBuiltin.name]: noInstanceofBuiltin.rule,
  [noJsxInNonJsxFile.name]: noJsxInNonJsxFile.rule,
  [noNestedClass.name]: noNestedClass.rule,
  [noNestedFunction.name]: noNestedFunction.rule,
  [noRestrictedLoops.name]: noRestrictedLoops.rule,
  [noTopLevelArrowFunction.name]: noTopLevelArrowFunction.rule,
  [noUnnecessaryTemplateString.name]: noUnnecessaryTemplateString.rule,
};
