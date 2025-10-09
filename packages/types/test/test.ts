import assert from "node:assert";
import childProcess from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { isNativeError } from "node:util/types";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const cwd = path.join(dirname, "..");

async function getTsConfigContent() {
  const content = await fs.readFile(
    path.join(dirname, "..", "..", "tsconfig", "tsconfig", "esm.json"),
    "utf8",
  );
  const tsconfig: any = JSON.parse(content);
  Reflect.deleteProperty(tsconfig.compilerOptions, "lib");
  return JSON.stringify(tsconfig, null, 2);
}

export async function test(
  name: string,
  testCases: {
    code: string;
    expectedMsg: string;
  }[],
) {
  const validDir = path.join(dirname, `${name}-valid`);
  const invalidDir = path.join(dirname, `${name}-invalid`);
  await describe(name, async () => {
    before(async () => {
      await fs.mkdir(validDir);
      await fs.mkdir(invalidDir);
      await fs.writeFile(
        path.join(validDir, "tsconfig.json"),
        await getTsConfigContent(),
      );
      await fs.writeFile(
        path.join(invalidDir, "tsconfig.json"),
        await getTsConfigContent(),
      );
    });
    after(async () => {
      await fs.rm(validDir, { recursive: true });
      await fs.rm(invalidDir, { recursive: true });
    });

    await Promise.all(
      testCases.map(async (testCase, index) => {
        await it(`Valid: ${testCase.code}`, async () => {
          await fs.writeFile(
            path.join(validDir, `foo${index}.ts`),
            testCase.code,
          );

          const [success, msg] = exec({ project: validDir, noLib: false });
          assert.strictEqual(success, true);
          assert.strictEqual(msg, "");
        });
        await it(`Invalid: ${testCase.code}`, async () => {
          await fs.writeFile(
            path.join(invalidDir, `foo${index}.ts`),
            `/// <reference path="../../dist/lib.es2020.d.ts" />\n${testCase.code}`,
          );

          const [success, msg] = exec({ project: invalidDir, noLib: true });
          assert.strictEqual(success, false);
          assert.strictEqual(msg.includes(testCase.expectedMsg), true, msg);
        });
      }),
    );
  });
}

function exec({
  project,
  noLib,
}: {
  project: string;
  noLib: boolean;
}): [boolean, string] {
  try {
    childProcess.execSync(
      `${path.join(cwd, "node_modules", ".bin", "tsc")} --project ${project} ${noLib ? "--noLib" : ""} --noEmit --rootDir test`,
      {
        encoding: "utf8",
      },
    );
  } catch (e) {
    if (isNativeError(e) && "stdout" in e && typeof e.stdout === "string") {
      return [false, e.stdout];
    }
  }
  return [true, ""];
}
