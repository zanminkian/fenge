import assert from "node:assert";
import { describe, it } from "node:test";
import prettierConfig from "eslint-config-prettier";
import { javascript } from "../src/config/javascript.js";
import { packagejson } from "../src/config/packagejson.js";
import { typescript } from "../src/config/typescript.js";

await describe("prettier", async () => {
  await it("prettier config should be standard", () => {
    const properties = Object.keys(prettierConfig);
    assert.deepStrictEqual(properties, ["rules"]);

    const ruleValues = [...new Set(Object.values(prettierConfig.rules))];
    assert.strictEqual(ruleValues.length, 2);
    assert.strictEqual(ruleValues.includes(0), true);
    assert.strictEqual(ruleValues.includes("off"), true);
  });

  await it("should not have prettier-conflicted rules", () => {
    const included = (rule: string) => rule in prettierConfig.rules;

    // 1
    const jsForbidRule = Object.keys(javascript()[0].rules).find((rule) =>
      included(rule),
    );
    assert.strictEqual(jsForbidRule, undefined);

    // 2
    assert.strictEqual(typeof typescript()[0], "object");
    assert.strictEqual(typescript().length, 5);
    const tsForbidRule = typescript()
      .flatMap((config) => Object.keys(config.rules))
      .find((rule) => included(rule));
    assert.strictEqual(tsForbidRule, undefined);

    // 3
    const packagejsonRule = Object.keys(packagejson()[0].rules).find((rule) =>
      included(rule),
    );
    assert.strictEqual(packagejsonRule, undefined);
  });
});
