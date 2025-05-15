import { test } from "@fenge/dev-utils";
import { noTripleSlashDirective } from "./no-triple-slash-directive.ts";

const valid = [
  "// Normal single-line comment",
  "/* Normal multi-line comment */",
  "/// Normal comment starting with ///",
  "/* <reference path='...' /> */",
];

const invalid = [
  "/// <reference path='...' />",
  "///  <reference path='...' />",
  "///<reference path='...' />",

  "/// <reference types='...' />",
  "/// <amd-dependency />",
  "/// <amd-module />",
  "/// <reference no-default-lib='true'/>",

  `function example() {
  /// <reference path='...' />
}`,
  `class Example {
  constructor() {
    /// <reference path='...' />
  }
}`,
  `const obj = {
  key: "value",
  /// <reference path='...' />
};`,
  `for (let i = 0; i < 10; i++) {
  /// <reference path='...' />
}`,
];

test({ valid, invalid, ...noTripleSlashDirective });
