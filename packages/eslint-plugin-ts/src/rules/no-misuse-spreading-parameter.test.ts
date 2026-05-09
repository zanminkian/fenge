import process from "node:process";
import { test } from "@fenge/dev-utils";
import { noMisuseSpreadingParameter } from "./no-misuse-spreading-parameter.ts";

const valid = [
  // spread matches rest parameter
  'function f(...args: string[]): void {}; f(...["a", "b"])',
  // no spread argument at all
  'function f(x: string): void {}; f("a")',
  // spread matches rest parameter, with non-spread args before
  'function f(x: string, ...rest: string[]): void {}; f("a", ...["b", "c"])',
  // constructor with rest parameter
  'class A { constructor(...args: string[]) {} }; new A(...["a", "b"])',
  // arrow function with rest parameter
  'const f = (...args: string[]): void => {}; f(...["a"])',
];

const invalid = [
  // spread on regular parameter
  'function f(x: string): void {}; f(...["a"])',
  // constructor with non-rest parameter
  'class A { constructor(x: string) {} }; new A(...["a"])',
  // arrow function with non-rest parameter
  'const f = (x: string): void => {}; f(...["a"])',
  // Set constructor takes an optional parameter, not a rest parameter
  "const x = ['ab','cd'];const set = new Set(...x);",
  // spread on regular (non-rest) parameter
  "function foo(args: string[]) {};const x = ['ab','cd'];foo(...x);",
  // spread on optional parameter (optional is not rest)
  "declare function optional(a?: number): void;const nums = [1, 2, 3];optional(...nums);",
  // any-typed function call: getDeclaration may return undefined (TypeScript bug)
  "const foo: any = (...e: any[]) => e; foo(...[1, 2, 3]);",
  "const foo: any = (...e: any[]) => e; foo(...Object.values({}));",
];

test({
  valid,
  invalid,
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts"],
      },
      tsconfigRootDir: process.cwd(),
    },
  },
  ...noMisuseSpreadingParameter,
});
