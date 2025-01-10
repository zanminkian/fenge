import { test } from "@fenge/dev-utils";
import { noExportAssignment } from "./no-export-assignment.js";

const valid = ["export default {}", "exports = {}", "module.exports = {}"];

const invalid = ["export = {}"];

test({ valid, invalid, ...noExportAssignment });
