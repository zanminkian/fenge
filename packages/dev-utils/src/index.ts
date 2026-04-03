import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { describe, it } from "node:test";
import tsParser from "@typescript-eslint/parser";
import { RuleTester, type Rule } from "eslint";
import { outdent } from "outdent";

export interface TestCase {
  code: string;
  filename?: string;
  options?: unknown;
  errors?: number | { messageId: string }[];
}

export interface TestOptions {
  name: string;
  rule: Rule.RuleModule;
  valid: (TestCase | string)[];
  invalid: (TestCase | string)[];
  errors?: number;
  parser?: any;
}

const defaultTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  },
});

export async function test({
  name,
  rule,
  valid: originValid,
  invalid: originInvalid,
  errors = 1,
  parser,
}: TestOptions) {
  const normalize = (testCases: (TestCase | string)[]): TestCase[] =>
    testCases.map((testCase) =>
      typeof testCase === "string" ? { code: testCase } : testCase,
    );
  const valid = normalize(originValid);
  const invalid = normalize(originInvalid);
  const transformedValid = valid.map((testCase) => ({
    ...testCase,
    code: testCase.code,
  }));
  const transformedInvalid = invalid.map((testCase) => ({
    ...testCase,
    code: testCase.code,
  }));
  const ruleTester = parser
    ? new RuleTester({ languageOptions: { parser } })
    : defaultTester;
  await describe(name, async () => {
    await Promise.all(
      transformedValid.map(async (testCase) => {
        await it(JSON.stringify(testCase), () => {
          ruleTester.run(name, rule, {
            valid: [testCase],
            invalid: [],
            ...(testCase.options ? { options: testCase.options } : {}),
          });
        });
      }),
    );

    await Promise.all(
      transformedInvalid.map(async (testCase) => {
        await it(JSON.stringify(testCase), () => {
          const { code, filename, options, errors: caseErrors } = testCase;
          ruleTester.run(name, rule, {
            valid: [],
            invalid: [
              {
                code,
                errors: caseErrors ?? errors,
                ...(filename && { filename }),
              },
            ],
            ...(options ? { options } : {}),
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
