import { test } from "../test.spec.js";
import { noNestedFunction } from "./no-nested-function.js";

const valid = [
  // normal
  "function foo(){}",
  "const foo = () => {}",

  // export
  "export function foo() {}",
  "export default function foo() {}",
  "export default function() {}",

  // class
  "class Foo{bar(){}}",
];

const invalid = [
  // normal
  "const foo = function(){}",
  "const foo = function foo(){}",
  "let foo; foo = function(){}",
  "let foo; foo = function foo(){}",
  "(function(){})",

  // nested
  "const foo = () => {function bar(){}}",
  "function foo() {function bar(){}}",
  "function foo() {let bar = function(){}}",
  "function foo() {let bar = function bar(){}}",
  "if(true) function foo(){}",

  // class
  "class Foo{bar = function(){}}",
  "class Foo{bar = function bar(){}}",

  // object
  "const foo = {bar: function() {}}",
  "const foo = {bar: function bar() {}}",
  "const foo = {bar() {}}", // disallow this case

  // callback
  "setTimeout(function(){},100)",
  "setTimeout(function callback(){},100)",
];

test({ valid, invalid, ...noNestedFunction });
