import assert from "node:assert";
import { describe, it } from "node:test";
import { typescript } from "./typescript.js";

await describe("ts config", async () => {
  await it("ts main config rules values should be error", () => {
    Object.entries(typescript()[0].rules).forEach(([key, value]) => {
      // Key is js rule, value is ts rule
      // https://typescript-eslint.io/rules/?=extension
      const extensionRuleMap = {
        "class-methods-use-this": "@typescript-eslint/class-methods-use-this",
        "consistent-return": "@typescript-eslint/consistent-return",
        "default-param-last": "@typescript-eslint/default-param-last",
        "dot-notation": "@typescript-eslint/dot-notation",
        "init-declarations": "@typescript-eslint/init-declarations",
        "max-params": "@typescript-eslint/max-params",
        "no-array-constructor": "@typescript-eslint/no-array-constructor",
        "no-dupe-class-members": "@typescript-eslint/no-dupe-class-members",
        "no-empty-function": "@typescript-eslint/no-empty-function",
        "no-implied-eval": "@typescript-eslint/no-implied-eval",
        "no-invalid-this": "@typescript-eslint/no-invalid-this",
        "no-loop-func": "@typescript-eslint/no-loop-func",
        // "no-loss-of-precision": "@typescript-eslint/no-loss-of-precision", // This rule has been deprecated
        "no-magic-numbers": "@typescript-eslint/no-magic-numbers",
        "no-redeclare": "@typescript-eslint/no-redeclare",
        "no-restricted-imports": "@typescript-eslint/no-restricted-imports",
        "no-shadow": "@typescript-eslint/no-shadow",
        "no-unused-expressions": "@typescript-eslint/no-unused-expressions",
        "no-unused-vars": "@typescript-eslint/no-unused-vars",
        "no-use-before-define": "@typescript-eslint/no-use-before-define",
        "no-useless-constructor": "@typescript-eslint/no-useless-constructor",
        "no-throw-literal": "@typescript-eslint/only-throw-error",
        "prefer-destructuring": "@typescript-eslint/prefer-destructuring",
        "prefer-promise-reject-errors":
          "@typescript-eslint/prefer-promise-reject-errors",
        "require-await": "@typescript-eslint/require-await",
        "no-return-await": "@typescript-eslint/return-await", // no-return-await has been deprecated
      } as const;
      if (key in extensionRuleMap) {
        assert.strictEqual(getValueString(value), "off");
      } else {
        assert.strictEqual(getValueString(value), "error");
      }
    });
  });

  await it("ts rest configs rules should exist in main rules", () => {
    const [main, ...restConfigs] = typescript();
    restConfigs.forEach((restConfig) => {
      Object.entries(restConfig.rules).forEach(([key, value]) => {
        assert.strictEqual(key in main.rules, true);
        assert.notDeepStrictEqual(value, Reflect.get(main.rules, key));
      });
    });
  });

  await it("properties in ts main config should be valid", () => {
    const tsMainConfig = typescript()[0];
    assert.deepStrictEqual(Object.keys(tsMainConfig), [
      "name",
      "files",
      "languageOptions",
      "plugins",
      "rules",
    ]);
    assert.strictEqual(tsMainConfig.name.endsWith("/typescript"), true);
    assert.strictEqual(
      tsMainConfig.files.every((file) => file.endsWith(".{ts,cts,mts,tsx}")),
      true,
    );
  });

  await it("properties in ts rest configs should be valid", () => {
    const [, ...restConfigs] = typescript();
    for (const restConfig of restConfigs) {
      assert.deepStrictEqual(Object.keys(restConfig), [
        "name",
        "files",
        "rules",
      ]);
      assert.strictEqual(restConfig.name.includes("/typescript/"), true);
      assert.strictEqual(
        restConfig.files.every((file) => file.endsWith(".{ts,cts,mts,tsx}")),
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
