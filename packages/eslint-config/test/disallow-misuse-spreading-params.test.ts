import assert from "node:assert/strict";
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
  "disallow-misuse-spreading-params-fixtures",
);

describe("disallow-misuse-spreading-params", () => {
  before(async () => {
    await fs.mkdir(fixturesDir, { recursive: true });
  });
  after(async () => {
    await fs.rm(fixturesDir, { recursive: true });
  });
  it("case 1", async () => {
    const file = path.join(fixturesDir, "foo1.ts");
    await fs.writeFile(
      file,
      "const x = ['ab','cd'];const set = new Set(...x);",
    );
    const res = runLint([file]);
    await fs.rm(file);

    assert.equal(res.status, 1);
    assert.equal(
      res.stdout.includes("@fenge-ts/no-misuse-spreading-parameter"),
      true,
      res.stdout,
    );
    assert.equal(
      res.stdout.includes(
        "Disallow spreading parameter when the corresponding place in the function definition is not a rest parameter",
      ),
      true,
    );
  });

  it("case 2", async () => {
    const file = path.join(fixturesDir, "foo2.ts");
    await fs.writeFile(
      file,
      "function foo(args: string[]) {};const x = ['ab','cd'];foo(...x);",
    );
    const res = runLint([file]);
    await fs.rm(file);

    assert.equal(res.status, 1);
    assert.equal(
      res.stdout.includes("@fenge-ts/no-misuse-spreading-parameter"),
      true,
      res.stdout,
    );
    assert.equal(
      res.stdout.includes(
        "Disallow spreading parameter when the corresponding place in the function definition is not a rest parameter",
      ),
      true,
    );
  });

  it("case 3", async () => {
    const file = path.join(fixturesDir, "foo3.ts");
    await fs.writeFile(
      file,
      "declare function optional(a?: number): void;const nums = [1, 2, 3];optional(...nums);",
    );
    const res = runLint([file]);
    await fs.rm(file);

    assert.equal(res.status, 1);
    assert.equal(
      res.stdout.includes("@fenge-ts/no-misuse-spreading-parameter"),
      true,
      res.stdout,
    );
    assert.equal(
      res.stdout.includes(
        "Disallow spreading parameter when the corresponding place in the function definition is not a rest parameter",
      ),
      true,
    );
  });
});
