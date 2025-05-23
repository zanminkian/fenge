import assert from "node:assert";
import { describe, it } from "node:test";
import config from "./eslint.config.ts";

await describe("eslint.config", async () => {
  await it("length of default export should be 13", () => {
    assert.strictEqual(config.length, 14);
  });

  // await it("no warns", () => {
  //   config.forEach((configItem) => {
  //     if (configItem.rules) {
  //       Object.values(configItem.rules).forEach((value) => {
  //         assert.notStrictEqual(getValueString(value), "warn");
  //       });
  //     }
  //   });
  // });

  await it("should not contain deprecated rules", () => {
    // https://eslint.org/blog/2023/10/deprecating-formatting-rules/#the-deprecated-rules
    const deprecatedRules = [
      "array-bracket-newline",
      "array-bracket-spacing",
      "array-element-newline",
      "arrow-parens",
      "arrow-spacing",
      "block-spacing",
      "brace-style",
      "comma-dangle",
      "comma-spacing",
      "comma-style",
      "computed-property-spacing",
      "dot-location",
      "eol-last",
      "func-call-spacing",
      "function-call-argument-newline",
      "function-paren-newline",
      "generator-star-spacing",
      "implicit-arrow-linebreak",
      "indent",
      "jsx-quotes",
      "key-spacing",
      "keyword-spacing",
      "linebreak-style",
      "lines-between-class-members",
      "lines-around-comment",
      "max-len",
      "max-statements-per-line",
      "multiline-ternary",
      "new-parens",
      "newline-per-chained-call",
      "no-confusing-arrow",
      "no-extra-parens",
      "no-extra-semi",
      "no-floating-decimal",
      "no-mixed-operators",
      "no-mixed-spaces-and-tabs",
      "no-multi-spaces",
      "no-multiple-empty-lines",
      "no-tabs",
      "no-trailing-spaces",
      "no-whitespace-before-property",
      "nonblock-statement-body-position",
      "object-curly-newline",
      "object-curly-spacing",
      "object-property-newline",
      "one-var-declaration-per-line",
      "operator-linebreak",
      "padded-blocks",
      "padding-line-between-statements",
      "quote-props",
      "quotes",
      "rest-spread-spacing",
      "semi",
      "semi-spacing",
      "semi-style",
      "space-before-blocks",
      "space-before-function-paren",
      "space-in-parens",
      "space-infix-ops",
      "space-unary-ops",
      "spaced-comment",
      "switch-colon-spacing",
      "template-curly-spacing",
      "template-tag-spacing",
      "wrap-iife",
      "wrap-regex",
      "yield-star-spacing",
    ];
    for (const configItem of config) {
      const containingDeprecatedRules = Object.keys(
        configItem.rules ?? {},
      ).filter((rule) => deprecatedRules.includes(rule));
      assert.deepStrictEqual(containingDeprecatedRules, []);
    }
  });
});

// function getValueString(value: unknown): string {
//   if (typeof value === "string") {
//     return value;
//   } else if (Array.isArray(value) && typeof value[0] === "string") {
//     return value[0];
//   } else {
//     throw new Error("unknown value");
//   }
// }
