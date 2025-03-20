import assert from "node:assert";
import childProcess from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, "..", "src", "fixtures");

const testData = new Map<string, { code: string; rule: string }>([
  [
    path.join(fixturesDir, "react/jsx-filename-extension/foo1.js"),
    {
      code: "export function Foo1() { return <div>Foo1</div>; }",
      rule: "react/jsx-filename-extension",
    },
  ],
  [
    path.join(fixturesDir, "react/jsx-filename-extension/foo1.mjs"),
    {
      code: "export function Foo1() { return <div>Foo1</div>; }",
      rule: "react/jsx-filename-extension",
    },
  ],
  [
    path.join(fixturesDir, "react/jsx-filename-extension/foo2.jsx"),
    {
      code: 'export const foo2 = "foo2";',
      rule: "react/jsx-filename-extension",
    },
  ],
  [
    path.join(fixturesDir, "react/jsx-filename-extension/foo2.tsx"),
    {
      code: 'export const foo2 = "foo2";',
      rule: "react/jsx-filename-extension",
    },
  ],
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
      Array.from(testData.entries()).map(([filePath, { code }]) =>
        fs.writeFile(filePath, code),
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
        ...testData.keys(),
      ],
      { encoding: "utf8" },
    );

    assert.strictEqual(res.status, 1);
    for (const file of testData.keys()) {
      assert.strictEqual(
        res.stdout.includes(file),
        true,
        `Failed on file ${file}.`,
      );
    }

    const ruleCountMap = new Map<string, number>();
    for (const [, { rule }] of testData) {
      ruleCountMap.set(rule, (ruleCountMap.get(rule) ?? 0) + 1);
    }
    for (const [rule, count] of ruleCountMap) {
      assert.strictEqual(
        res.stdout.includes(rule),
        true,
        `Failed on rule ${rule}.`,
      );
      assert.strictEqual(
        res.stdout.match(new RegExp(`[^/]${rule}[^/]`, "g"))?.length,
        count,
        `Failed on rule ${rule}.`,
      );
    }
  });
});
