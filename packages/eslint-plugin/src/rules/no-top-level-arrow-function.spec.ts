import { test } from "@fenge/dev-utils";
import { noTopLevelArrowFunction } from "./no-top-level-arrow-function.js";

const valid = [
  "function foo(){}",
  "const foo = function(){}",
  "const foo = function foo(){}",
  "if(true) const foo = () => {\n}",

  // allow one-line function
  "let foo = () => ''",
  "let foo = () => {}",
  "const foo = () => {}",
  "let foo; foo = () => {}",
  "export const foo = () => {}",
  "export let foo = () => {}",
  "export default () => {}",
];

const invalid = [
  "let foo = () => {\n}",
  "const foo = () => {\n}",
  "let foo; foo = () => {\n}",
  "export const foo = () => {\n}",
  "export let foo = () => {\n}",
  "export default () => {\n}",
];

test({ valid, invalid, ...noTopLevelArrowFunction });
