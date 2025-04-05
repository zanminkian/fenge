import { test } from "./test.ts";

test("reflect", [
  {
    code: "function foo(_name: string, _age: number) {}; Reflect.apply(foo, null, [1, '2']);",
    expectedMsg:
      "test/reflect-invalid/foo0.ts(2,73): error TS2322: Type 'number' is not assignable to type 'string'",
  },
  {
    code: "function foo(_name: string, _age: number) {}; Reflect.apply(foo, null, [2, '3']);",
    expectedMsg:
      "test/reflect-invalid/foo1.ts(2,76): error TS2322: Type 'string' is not assignable to type 'number'",
  },
  {
    code: "Reflect.deleteProperty({foo: 'string'}, 'bar');",
    expectedMsg:
      "test/reflect-invalid/foo2.ts(2,41): error TS2345: Argument of type '\"bar\"' is not assignable to parameter of type '\"foo\"'",
  },
  {
    code: "const x = Reflect.get({foo: 'string'}, 'bar'); x.toString();",
    expectedMsg:
      "test/reflect-invalid/foo3.ts(2,48): error TS18046: 'x' is of type 'unknown'",
  },
  {
    code: "Reflect.set({foo: 'string'}, 'foo', 1);",
    expectedMsg:
      "test/reflect-invalid/foo4.ts(2,37): error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'",
  },
]);
