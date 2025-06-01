import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { formatMessage } from "publint/utils";
import { getPublintInfo } from "../src/get-publint-info.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await describe(async () => {
  await it("should have no messages", () => {
    const packageJsonPath = path.join(__dirname, "../package.json");
    const { pkg, messages } = getPublintInfo(packageJsonPath, false);
    assert.equal(pkg["name"], "eslint-plugin-publint");
    assert.equal(messages.length, 0);
  });
});

await describe(async () => {
  const packageJsonPath = path.join(__dirname, "../package.json");
  const originalPkgContent = await fs.readFile(packageJsonPath, "utf8");

  before(async () => {
    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(
        Object.fromEntries(
          Object.entries(JSON.parse(originalPkgContent) ?? {}).filter(
            ([key]) => key !== "files",
          ),
        ),
        null,
        2,
      ),
    );
  });

  after(async () => {
    await fs.writeFile(packageJsonPath, originalPkgContent);
  });

  await it('should have messages when package.json has no "files" field', () => {
    const { pkg, messages } = getPublintInfo(packageJsonPath, false);
    assert.equal("files" in pkg, false);
    assert.equal(messages.length, 1);
    assert.equal(messages[0]?.type, "suggestion");
    assert.equal(messages[0].code, "USE_FILES");
    assert.equal(
      formatMessage(messages[0], pkg, { color: false }),
      "The package publishes internal tests or config files. You can use pkg.files to only publish certain files and save user bandwidth.",
    );
  });
});
