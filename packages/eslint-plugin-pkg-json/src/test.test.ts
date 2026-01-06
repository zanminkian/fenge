// TODO: Remove this file and use `@fenge/dev-utils` instead.
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { RuleTester, type Rule } from "eslint";
import parser from "jsonc-eslint-parser";
import { outdent } from "outdent";

export type TestCase =
  | string
  | { code: string; filename?: string; errors?: number };

const tester = new RuleTester({
  languageOptions: {
    parser,
  },
});

export async function test({
  name,
  rule,
  valid,
  invalid,
  errors = 1,
}: {
  name: string;
  rule: Rule.RuleModule;
  valid: TestCase[];
  invalid: TestCase[];
  errors?: number;
}) {
  await describe(name, async () => {
    await Promise.all(
      valid
        .map((item) =>
          typeof item !== "string"
            ? {
                code: item.code,
                ...(item.filename && { filename: item.filename }),
              }
            : { code: item },
        )
        .map(async (item) => {
          await it(item.code, () => {
            tester.run(name, rule, {
              valid: [item],
              invalid: [],
            });
          });
        }),
    );

    await Promise.all(
      invalid
        .map((item) =>
          typeof item !== "string"
            ? {
                code: item.code,
                ...(item.filename && { filename: item.filename }),
                errors: item.errors ?? errors,
              }
            : { code: item, errors },
        )
        .map(async (item) => {
          await it(item.code, () => {
            tester.run(name, rule, {
              valid: [],
              invalid: [{ ...item }],
            });
          });
        }),
    );

    await genDoc({ name, rule, valid, invalid });
  });
}

async function genDoc({
  name,
  rule,
  valid,
  invalid,
}: {
  name: string;
  rule: Rule.RuleModule;
  valid: TestCase[];
  invalid: TestCase[];
}) {
  const handle = (testCases: TestCase[]) =>
    testCases
      .map((testCase) =>
        typeof testCase === "string" ? { code: testCase } : testCase,
      )
      .map((testCase) =>
        testCase.filename
          ? `${testCase.code} // filename: ${testCase.filename}`
          : testCase.code,
      )
      .join("\n");
  const mdContent = outdent`
    <!-- prettier-ignore-start -->
    # ${name}

    ${rule.meta?.docs?.description}

    ## Rule Details

    ### Fail

    \`\`\`ts
    ${handle(invalid)}
    \`\`\`

    ### Pass

    \`\`\`ts
    ${handle(valid)}
    \`\`\`
    <!-- prettier-ignore-end -->

  `.replaceAll(process.cwd(), "/foo");

  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  await fs.writeFile(
    path.join(currentDir, "..", "doc", "rules", `${name}.md`),
    mdContent,
  );
}
