import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

await describe("types-node", async () => {
  await it("should include es2020", async () => {
    const nodePath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "node_modules",
      "@types",
      "node",
    );
    const pkgJson: any = JSON.parse(
      await fs.readFile(path.join(nodePath, "package.json"), "utf8"),
    );
    assert.strictEqual(pkgJson.types, "index.d.ts");

    const content = await fs.readFile(
      path.join(nodePath, "index.d.ts"),
      "utf8",
    );
    assert.strictEqual(
      content.includes('/// <reference lib="es2020" />'),
      true,
    );
  });
});
