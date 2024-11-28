import assert from "node:assert";
import fs from "node:fs/promises";
import { describe, it } from "node:test";
import prettier from "prettier";
import { javascript } from "../src/config/javascript.js";
import { typescript } from "../src/config/typescript.js";

function count(content: string, substring: string) {
  return (content.match(new RegExp(`"${substring}"`, "g")) ?? []).length;
}

await describe("no duplicated", async () => {
  await it("no duplicated js rules is defined", async () => {
    const configContent = await prettier.format(
      (await fs.readFile("./src/config/javascript.ts", "utf8")).replace(
        "// prettier-ignore",
        "",
      ),
      { parser: "typescript", quoteProps: "consistent" },
    );

    Object.keys(javascript()[0].rules)
      .filter(
        (rule) =>
          !["import/no-default-export", "esm/no-phantom-dep-imports"].includes(
            rule,
          ),
      )
      .forEach((rule) => {
        assert.strictEqual(count(configContent, rule), 1);
      });
  });

  await it("no duplicated ts rules is defined", async () => {
    const configContent = await prettier.format(
      (await fs.readFile("./src/config/typescript.ts", "utf8")).replace(
        "// prettier-ignore",
        "",
      ),
      { parser: "typescript", quoteProps: "consistent" },
    );

    typescript()
      .flatMap((c) => Object.keys(c.rules))
      .forEach((rule) => {
        if (
          [
            "@typescript-eslint/no-floating-promises",
            "@typescript-eslint/unbound-method",
            "esm/no-phantom-dep-imports",
            "import/no-default-export",
            // extension rule
            "@typescript-eslint/dot-notation",
            "@typescript-eslint/return-await",
          ].includes(rule)
        ) {
          assert.strictEqual(
            count(configContent, rule),
            2,
            `The rule name is ${rule}`,
          );
        } else {
          assert.strictEqual(
            count(configContent, rule) <= 1,
            true,
            `Duplicated rule name is ${rule}`,
          );
        }
      });
  });
});
