import assert from "node:assert";
import { describe, it } from "node:test";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import { disabledTypeCheckedRules } from "./base.js";

await describe("ts base", async () => {
  await it("disable-type-checked rules should be the same", () => {
    assert.deepStrictEqual(
      tsPlugin.configs["disable-type-checked"]?.rules,
      disabledTypeCheckedRules,
    );
  });
});
