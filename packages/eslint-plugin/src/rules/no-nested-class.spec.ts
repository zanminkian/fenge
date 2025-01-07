import { test } from "@fenge/dev-utils";
import { noNestedClass } from "./no-nested-class.js";

const valid = [
  "class Foo{}",
  "export class Foo{}",
  "export default class Foo{}",
  "export default class {}",
];

const invalid = [
  // nested
  "if(true) class Foo{}",
  "if(true) const foo = class {}",
  "function foo(){class Foo{}}",
  "function foo(){const foo = class {}}",
  "function foo(){return class Foo{}}",
  "function foo(){return class{}}",

  // normal
  "const Foo = class{}",
  "let Foo = class Bar{}",
  "let Foo; Foo = class{}",
];

test({ valid, invalid, ...noNestedClass });
