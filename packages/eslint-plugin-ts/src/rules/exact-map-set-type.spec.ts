import { test } from "@fenge/dev-utils";
import { exactMapSetType } from "./exact-map-set-type.ts";

const valid = [
  "const m = new Map([['a','b']])",
  "const m = new Map<string, string>();",

  "class A {name: Map<string, string>}",
  "class A {name = new Map<string, string>}",

  "function a(s: Set<number>): Map<string, string> {}",
  "const a = (s: Set<number>): Map<string,string> => {}",

  "interface A {m: Map<string, string>}",
  "type A = {m: Map<string, string>}",
  "type A = Map<string, string>",
  "type A<T, U> = Map<T, U>",
];

const invalid = [
  "const m = new Map();",
  "const m: Map = new Map<string, string>()",

  "class A {name: Map}",
  "class A {name = new Map()}",
  "class A {name: Map = new Map<string, string>()}",

  "function a(s: Set<number>): Map {}",
  "const a = (s: Set<number>): Map => {}",
  "function a(s: Set): Map<string, number> {}",
  "const a = (s: Set): Map<string, number> => {}",

  "interface A {m: Map}",
  "type A = {m: Map}",
  "type A = Map",
];

test({ valid, invalid, ...exactMapSetType });
