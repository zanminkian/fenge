import { test } from "./test.ts";

test("promise", [
  {
    code: "new Promise((_resolve,reject) => reject('foo'));",
    expectedMsg:
      "test/promise-invalid/foo0.ts(2,41): error TS2345: Argument of type 'string' is not assignable to parameter of type 'Error'.",
  },
  {
    code: "Promise.reject('foo');",
    expectedMsg:
      "test/promise-invalid/foo1.ts(2,16): error TS2345: Argument of type 'string' is not assignable to parameter of type 'Error'.",
  },
  {
    code: "Promise.resolve().then(() => 'foo', (e) => e.message);",
    expectedMsg:
      "test/promise-invalid/foo2.ts(2,44): error TS18046: 'e' is of type 'unknown'.",
  },
  {
    code: "Promise.resolve().catch((e) => e.message);",
    expectedMsg:
      "test/promise-invalid/foo3.ts(2,32): error TS18046: 'e' is of type 'unknown'.",
  },
]);
