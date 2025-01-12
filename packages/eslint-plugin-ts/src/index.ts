import { exactMapSetType } from "./rules/exact-map-set-type.ts";
import { noConstEnum } from "./rules/no-const-enum.ts";
import { noDeclares } from "./rules/no-declares.ts";
import { noExportAssignment } from "./rules/no-export-assignment.ts";
import { noPropertyDecorator } from "./rules/no-property-decorator.ts";
import { noUntypedEmptyArray } from "./rules/no-untyped-empty-array.ts";

export const rules = {
  [exactMapSetType.name]: exactMapSetType.rule,
  [noConstEnum.name]: noConstEnum.rule,
  [noDeclares.name]: noDeclares.rule,
  [noExportAssignment.name]: noExportAssignment.rule,
  [noPropertyDecorator.name]: noPropertyDecorator.rule,
  [noUntypedEmptyArray.name]: noUntypedEmptyArray.rule,
};
