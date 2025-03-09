import assert from "node:assert";
import childProcess from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, "fixtures");

const testData = new Map<string, string>([
  [
    path.join(fixturesDir, "react/foo1.js"),
    "export function Foo1() { return <div>Foo1</div>; }",
  ],
  [
    path.join(fixturesDir, "react/foo1.mjs"),
    "export function Foo1() { return <div>Foo1</div>; }",
  ],
  [path.join(fixturesDir, "react/foo2.jsx"), 'export const foo2 = "foo2";'],
  [path.join(fixturesDir, "react/foo2.tsx"), 'export const foo2 = "foo2";'],
]);

await describe("fixtures", async () => {
  before(async () => {
    // create folders
    await Promise.all(
      Array.from(testData.keys())
        .map((filePath) => path.dirname(filePath))
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((dir) => fs.mkdir(dir, { recursive: true })),
    );

    // write files
    await Promise.all(
      Array.from(testData.entries()).map(([filePath, content]) =>
        fs.writeFile(filePath, content),
      ),
    );
  });

  after(async () => {
    await fs.rmdir(fixturesDir, { recursive: true });
  });

  await it("should have error", () => {
    const res = childProcess.spawnSync(
      path.join(__dirname, "../node_modules/.bin/eslint"),
      [
        "--config",
        path.join(__dirname, "../dist/eslint.config.js"),
        ...Array.from(testData.keys()),
      ],
      { encoding: "utf8" },
    );
    assert.strictEqual(res.status, 1);
    for (const file of testData.keys()) {
      assert.strictEqual(res.stdout.includes(file), true, `Failed on ${file}`);
    }
  });
});
