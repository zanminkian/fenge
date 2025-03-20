import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { describe } from "node:test";

const expected = `interface JSON {
  /**
   * Converts a JavaScript Object Notation (JSON) string into an object.
   * @param text A valid JSON string.
   * @param reviver A function that transforms the results. This function is called for each member of the object.
   * If a member contains nested objects, the nested objects are transformed before the parent object is.
   */
  parse(
    text: string,
    reviver?: (this: any, key: string, value: any) => any,
  ): unknown;
}
`;

await describe("json-parse", async () => {
  const actual = await fs.readFile(
    path.resolve(
      process.cwd(),
      "node_modules",
      "@total-typescript",
      "ts-reset",
      "dist",
      "json-parse.d.ts",
    ),
    "utf8",
  );
  assert.strictEqual(actual, expected);
});
