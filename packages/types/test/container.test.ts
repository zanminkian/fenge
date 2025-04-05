import { test } from "./test.ts";

test("container", [
  {
    code: "const x: unknown = []; if(Array.isArray(x)) console.log(x[0]?.foo)",
    expectedMsg:
      "test/container-invalid/foo0.ts(2,63): error TS2339: Property 'foo' does not exist on type '{}'.",
  },
  {
    code: "const map = new Map(); map.get('foo')?.bar;",
    expectedMsg:
      "test/container-invalid/foo1.ts(2,40): error TS2339: Property 'bar' does not exist on type '{}'.",
  },
]);
