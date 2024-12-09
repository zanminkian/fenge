import { test } from "../test.spec.js";
import { noDeclares } from "./no-declares.js";

const invalidCodes = [
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

const invalid = [
  ...invalidCodes.map(
    (code) =>
      ({
        code,
        options: [
          {
            allowClassProperty: true,
          },
        ],
      }) as const,
  ),
  ...propertyCodes.map(
    (code) =>
      ({
        code,
        options: [
          {
            allowClassProperty: false,
          },
        ],
      }) as const,
  ),
];

const valid = propertyCodes.map(
  (code) =>
    ({
      code,
      options: [
        {
          allowClassProperty: true,
        },
      ],
    }) as const,
);
test({ valid, invalid, ...noDeclares });
