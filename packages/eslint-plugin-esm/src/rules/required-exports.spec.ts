import { test } from "@fenge/dev-utils";
import { requiredExports } from "./required-exports.ts";

const valid = [
  "export {}",
  "const foo = 'foo'; export {foo}",
  "export const foo = {}",
  "export default {}",
  "export {foo} from 'foo'",
  "export {} from 'foo'",
  "export * as foo from 'foo'",
  "export {}; let foo = ''",
];

const invalid = [
  "// This rule will also report on empty files",
  "",
  "console.log()",
  "import foo from 'foo'",
  "exports.foo = {}",
  "module.exports = {}",
];

test({ valid, invalid, ...requiredExports });
