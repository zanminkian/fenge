import { test } from "@fenge/dev-utils";
import { noRenameExports } from "./no-rename-exports.ts";

const valid = [
  "let foo=1; export {foo}",
  "export let foo",
  "export const foo = bar",
  "export default foo",
  "export default {}",
  "export {}",
];
const invalid = [
  "let foo=1; export {foo as bar}",
  "let foo=1; export {foo as default}",
  "export {foo as bar} from './foo'",
  "export {default as foo} from './foo'",
  // ts
  "export {type Foo as Bar}",
  "export type {Foo as Bar}",
];

test({ valid, invalid, ...noRenameExports });
