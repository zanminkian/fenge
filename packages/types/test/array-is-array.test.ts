import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { describe } from "node:test";

const expected = `interface ArrayConstructor {
  isArray(arg: any): arg is unknown[];
}
`;

await describe("array-is-array", async () => {
  const actual = await fs.readFile(
    path.resolve(
      process.cwd(),
      "node_modules",
      "@total-typescript",
      "ts-reset",
      "dist",
      "is-array.d.ts",
    ),
    "utf8",
  );
  assert.strictEqual(actual, expected);
});
