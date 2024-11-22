import { test } from "../test.spec.js";
import { noDeclaresInTsFile } from "./no-declares-in-ts-file.js";

const codes = [
  "declare class A {}",

  "declare var A: number",
  "declare let A: number",
  "declare const A: number",
  "declare function A(a: string): number",
  "declare enum A{A1,A2}",
  "declare namespace A{}",
  "declare type A = {}",
  "declare interface A{}",
  "declare global { var a: string }",
  "declare module 'moment' { export function foo(): string }",
];

const propertyCodes = [
  "class A { declare name: string }",
  "class A { declare getName: () => string }",
  "class A { private declare name: string }",
  "class A { declare private name: string }",
];

const invalid = [...codes, ...propertyCodes].map((code) => ({
  code,
  filename: "foo.ts",
}));
const valid = [...codes, ...propertyCodes]
  .map((code) => ({ code, filename: "foo.d.ts" }))
  .concat(
    propertyCodes.map((code) => ({
      code,
      filename: "foo.ts",
      options: [{ ignorePropertyDefinition: true }],
    })),
  );

test({ valid, invalid, ...noDeclaresInTsFile });
