import { test } from "@fenge/dev-utils";
import { noExportAssignment } from "./no-export-assignment.ts";

const valid = ["export default {}", "exports = {}", "module.exports = {}"];

const invalid = ["export = {}"];

test({ valid, invalid, ...noExportAssignment });
