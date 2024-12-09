import { exactMapSetType } from "./rules/exact-map-set-type.js";
import { noConstEnum } from "./rules/no-const-enum.js";
import { noDeclares } from "./rules/no-declares.js";
import { noExportAssignment } from "./rules/no-export-assignment.js";
import { noPropertyDecorator } from "./rules/no-property-decorator.js";
import { noUntypedEmptyArray } from "./rules/no-untyped-empty-array.js";

export const rules = {
  [exactMapSetType.name]: exactMapSetType.rule,
  [noConstEnum.name]: noConstEnum.rule,
  [noDeclares.name]: noDeclares.rule,
  [noExportAssignment.name]: noExportAssignment.rule,
  [noPropertyDecorator.name]: noPropertyDecorator.rule,
  [noUntypedEmptyArray.name]: noUntypedEmptyArray.rule,
};
