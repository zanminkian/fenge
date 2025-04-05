import { test } from "./test.ts";

test("json", [
  {
    code: "JSON.parse('{}')?.name",
    expectedMsg:
      "test/json-invalid/foo0.ts(2,19): error TS2339: Property 'name' does not exist on type '{}'.",
  },
]);
