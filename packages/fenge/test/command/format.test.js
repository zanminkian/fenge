// @ts-check
import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import { describe, test } from "node:test";
import { format } from "../../src/command/format.js";

describe("format command", () => {
  test('should remove "Run Prettier with --write to fix" from stderr', async () => {
    const testFilePath = path.resolve("test-format-file.js");
    const badFormattedContent = "console.log('')";
    try {
      await fs.writeFile(testFilePath, badFormattedContent);
      const result = await format([testFilePath]);
      assert.strictEqual(
        result.code,
        1,
        "Should exit with error code 1 for formatting issues",
      );
      assert.ok(result.stderr.length > 0, "Should have error output");
      assert.ok(
        !result.stderr.includes("Run Prettier with --write to fix"),
        'Should not contain "Run Prettier with --write to fix" message',
      );
      assert.ok(
        result.stderr.includes("test-format-file.js"),
        "Should contain the filename in error message",
      );
      assert.ok(
        result.stderr.endsWith("Code style issues found in the above file."),
        'Should end with "Code style issues found in the above file."',
      );
    } finally {
      await fs.unlink(testFilePath);
    }
  });

  test("should pass for correctly formatted file", async () => {
    const testFilePath = path.resolve("test-format-good-file.js");
    const goodFormattedContent = 'console.log("");\n';
    try {
      await fs.writeFile(testFilePath, goodFormattedContent);
      const result = await format([testFilePath]);
      assert.strictEqual(
        result.code,
        0,
        "Should exit with code 0 for correctly formatted files",
      );
      assert.strictEqual(
        result.stderr.trim(),
        "",
        "Should have no error output for correctly formatted files",
      );
    } finally {
      await fs.unlink(testFilePath);
    }
  });
});
