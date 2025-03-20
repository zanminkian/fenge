import assert from "node:assert";
import { describe, it } from "node:test";
import { javascript } from "./javascript.ts";

await describe("js config", async () => {
  await it("js main config value should be error", () => {
    Object.values(javascript()[0].rules).forEach((value) => {
      assert.strictEqual(getValueString(value), "error");
    });
  });

  await it("js rest configs rules should exist in main rules", () => {
    const [main, ...restConfigs] = javascript();
    restConfigs.forEach((restConfig) => {
      Object.entries(restConfig.rules).forEach(([key, value]) => {
        assert.strictEqual(key in main.rules, true);
        assert.notDeepStrictEqual(value, Reflect.get(main.rules, key));
      });
    });
  });

  await it("properties in js main config should be valid", () => {
    const jsMainConfig = javascript()[0];
    assert.deepStrictEqual(Object.keys(jsMainConfig), [
      "name",
      "files",
      "languageOptions",
      "plugins",
      "rules",
    ]);
    assert.strictEqual(jsMainConfig.name.endsWith("/javascript"), true);
    assert.strictEqual(
      jsMainConfig.files.every((file) => file.endsWith(".{js,cjs,mjs,jsx}")),
      true,
    );
  });

  await it("properties in js rest configs should be valid", () => {
    const [, ...restConfigs] = javascript();
    for (const restConfig of restConfigs) {
      assert.deepStrictEqual(Object.keys(restConfig), [
        "name",
        "files",
        "rules",
      ]);
      assert.strictEqual(restConfig.name.includes("/javascript/"), true);
      assert.strictEqual(
        restConfig.files.every((file) => file.endsWith(".{js,cjs,mjs,jsx}")),
        true,
      );
    }
  });
});

function getValueString(value: unknown): string {
  if (typeof value === "string") {
    return value;
  } else if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  } else {
    throw new Error("unknown value");
  }
}
