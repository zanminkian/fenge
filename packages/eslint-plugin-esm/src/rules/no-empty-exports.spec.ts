import { test } from "../test.spec.js";
import { noEmptyExports } from "./no-empty-exports.js";

const valid = [
  "var name = 123; export {name as age};",
  "const name = {}; export {name};",
  "export const name = {};",
  "export default {};",
  "var foo = 213; export {foo as default};",
  "export {default} from 'foo';",
  "export * as foo from 'foo';",
];

const invalid = [
  "export {};",
  "console.log(123); export {};",
  "export default {}; export {};",
  "export {} from 'foo';",
  "export {} from './foo';",
];

test({ valid, invalid, ...noEmptyExports });
