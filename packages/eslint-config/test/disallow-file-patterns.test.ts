import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { runLint } from "./run-lint.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(
  __dirname,
  "..",
  "src",
  "disallow-file-patterns-fixtures",
);

describe("disallow-file-patterns", () => {
  before(async () => {
    await fs.mkdir(fixturesDir, { recursive: true });
  });
  after(async () => {
    await fs.rm(fixturesDir, { recursive: true });
  });

  it("disallow files", async () => {
    const promises = Object.entries({
      // 1.
      "foo.mjs": "",
      "foo.cjs": "",
      "foo.mts": "",
      "foo.cts": "",

      ".foo.mjs": "",
      ".foo.cjs": "",
      // ".foo.mts": "", // TODO: Should be disallowed, but commented out because of typescript-eslint bug. Once fixed, uncomment.
      // ".foo.cts": "",

      ".env.mjs": "",
      ".env.cjs": "",
      // ".env.mts": "",
      // ".env.cts": "",

      "foo.spec.js": "",
      "foo.spec.mjs": "",
      "foo.spec.cjs": "",
      "foo.spec.jsx": "",
      "foo.spec.ts": "",
      "foo.spec.mts": "",
      "foo.spec.cts": "",
      // "foo.spec.tsx": "", // TODO: typescript-eslint bug.

      ".eslintrc.js": "foobar",
      // ".foorc.ts": "", // TODO: typescript-eslint bug.

      // 2.
      ".env.corepack": "foobar",
      ".env.json": "foobar",

      ".eslintrc": "foobar",
      ".prettierrc": "foobar",

      ".prettierrc.js": "foobar",
      ".foorc.json": "foobar",
      ".foorc.yaml": "foobar",

      // 3.
      ".foo.js": "export const foo = 1;",
      ".foo.jsx": "export function Foo() {return <div>foo</div>;}",
      // ".foo.ts": "export const foo = 1;", // TODO: Should be allowed, but commented out because of typescript-eslint bug. Once fixed, uncomment.
      // ".foo.tsx": "export function Foo() {return <div>foo</div>;}",
      ".env.js": "export const foo = 1;",
      ".env.jsx": "export function Foo() {return <div>foo</div>;}",
      // ".env.ts": "export const foo = 1;",
      // ".env.tsx": "export function Foo() {return <div>foo</div>;}",

      // 4.
      "foo.d.bar.ts": "",
    })
      .map(
        ([file, content]) => [path.join(fixturesDir, file), content] as const,
      )
      .map(async ([file, content]) => {
        await fs.writeFile(file, content);
        const res = runLint([file]);
        await fs.rm(file);

        assert.strictEqual(res.status, 1);
        assert.strictEqual(
          res.stdout.includes("check-file/filename-blocklist"),
          true,
          res.stdout,
        );
      });
    await Promise.all(promises);
  });
});
