import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { describe } from "node:test";

const expected = `interface MapConstructor {
  new <K = unknown, V = unknown>(): Map<K, V>;
}
`;

await describe("map-constructor", async () => {
  const actual = await fs.readFile(
    path.resolve(
      process.cwd(),
      "node_modules",
      "@total-typescript",
      "ts-reset",
      "dist",
      "map-constructor.d.ts",
    ),
    "utf8",
  );
  assert.strictEqual(actual, expected);
});
