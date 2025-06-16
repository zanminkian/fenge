import { test } from "./test.ts";

test("object", [
  {
    code: "Object.assign({},{},{},{},{},{},{},{}).foo",
    expectedMsg:
      "test/object-invalid/foo0.ts(2,1): error TS2571: Object is of type 'unknown'.",
  },
]);
