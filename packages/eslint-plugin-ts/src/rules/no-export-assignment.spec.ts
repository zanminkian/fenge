import { test } from "../test.spec.js";
import { noExportAssignment } from "./no-export-assignment.js";

const valid = [
  { code: "export default {}", filename: "test.ts" },
  { code: "export = {}", filename: "test.js" },
];

const invalid = [{ code: "export = {}", filename: "test.ts" }];

test({ valid, invalid, ...noExportAssignment });
