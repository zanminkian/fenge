import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { describe, it } from "node:test";
import { RuleTester, type Rule } from "eslint";
import { outdent } from "outdent";

export type TestCase =
  | string
  | { code: string; filename?: string; options?: unknown };

const tester = new RuleTester({
  parser: createRequire(import.meta.url).resolve("@typescript-eslint/parser"),
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
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
      valid.map(async (testCase) => {
        await it(JSON.stringify(testCase), () => {
          tester.run(name, rule, {
            valid: [testCase],
            invalid: [],
            ...(typeof testCase === "object" && testCase.options
              ? { options: testCase.options }
              : {}),
          });
        });
      }),
    );

    await Promise.all(
      invalid.map(async (testCase) => {
        await it(JSON.stringify(testCase), () => {
          const code = typeof testCase === "string" ? testCase : testCase.code;
          const filename =
            typeof testCase === "string" ? undefined : testCase.filename;
          tester.run(name, rule, {
            valid: [],
            invalid: [{ code, errors, filename }],
            ...(typeof testCase === "object" && testCase.options
              ? { options: testCase.options }
              : {}),
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
      .map((testCase) => {
        if (!testCase.filename && !testCase.options) {
          return testCase.code;
        }
        const filename = testCase.filename && `filename: ${testCase.filename}`;
        const options =
          testCase.options && `options: ${JSON.stringify(testCase.options)}`;
        const comment = [filename, options].filter((i) => !!i).join(", ");
        return `${testCase.code} // ${comment}`;
      })
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

  await fs.writeFile(
    path.join(process.cwd(), "doc", "rules", `${name}.md`),
    mdContent,
  );
}
