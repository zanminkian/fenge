import { callArgumentsLength } from "./rules/call-arguments-length.ts";
import { noInstanceofBuiltin } from "./rules/no-instanceof-builtin.ts";
import { noJsxInNonJsxFile } from "./rules/no-jsx-in-non-jsx-file.ts";
import { noNestedClass } from "./rules/no-nested-class.ts";
import { noNestedFunction } from "./rules/no-nested-function.ts";
import { noRestrictedLoops } from "./rules/no-restricted-loops.ts";
import { noTopLevelArrowFunction } from "./rules/no-top-level-arrow-function.ts";
import { noUnnecessaryTemplateString } from "./rules/no-unnecessary-template-string.ts";

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
