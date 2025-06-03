import type { Rule } from "eslint";
import { getDocUrl, getRuleName, type GetNode } from "../utils.ts";

type CallExpression = GetNode<"CallExpression">;
type NewExpression = GetNode<"NewExpression">;

// TODO: If https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1356 is implemented, migrate this rule to `eslint-plugin-unicorn`
const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: getDocUrl(name),
      description:
        "Disallow calling a function with incorrect arguments length.",
    },
    messages: {
      [`${name}/error`]:
        "The arguments length of calling `{{ functionPattern }}` should be {{ lengthMsg }}",
    },
    schema: [
      {
        type: "object",
        patternProperties: {
          ".*": {
            anyOf: [
              { type: "number" },
              {
                type: "object",
                properties: {
                  min: { type: "number" },
                  max: { type: "number" },
                },
                additionalProperties: false,
              },
            ],
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create: (context) => {
    const getLengthMsg = (expectedLength: unknown) => {
      if (typeof expectedLength === "number") {
        return String(expectedLength);
      }
      if (Array.isArray(expectedLength)) {
        return expectedLength.join(" or ");
      }
      const result: string[] = [];
      if (
        typeof expectedLength === "object" &&
        expectedLength &&
        "min" in expectedLength
      ) {
        result.push(`>= ${String(expectedLength.min)}`);
      }
      if (
        typeof expectedLength === "object" &&
        expectedLength &&
        "max" in expectedLength
      ) {
        result.push(`<= ${String(expectedLength.max)}`);
      }
      return result.join(" and ");
    };
    const isLengthValid = (length: number, expectedLength: unknown) => {
      if (typeof expectedLength === "number") {
        return length === expectedLength;
      }
      if (Array.isArray(expectedLength)) {
        return expectedLength.includes(length);
      }
      const result: boolean[] = [];
      if (
        typeof expectedLength === "object" &&
        expectedLength &&
        "min" in expectedLength &&
        typeof expectedLength.min === "number"
      ) {
        result.push(length >= expectedLength.min);
      }
      if (
        typeof expectedLength === "object" &&
        expectedLength &&
        "max" in expectedLength &&
        typeof expectedLength.max === "number"
      ) {
        result.push(length <= expectedLength.max);
      }
      return result.every((item) => item);
    };
    const report = (
      node: CallExpression | NewExpression,
      functionPattern: string,
      expectedLength: unknown,
    ) => {
      const argsLength = node.arguments.some(
        (arg) => arg.type === "SpreadElement",
      )
        ? Infinity
        : node.arguments.length;
      if (!isLengthValid(argsLength, expectedLength))
        context.report({
          node,
          messageId: `${name}/error`,
          data: {
            functionPattern,
            lengthMsg: getLengthMsg(expectedLength),
          },
        });
    };

    const options = Object.entries(
      context.options[0] ?? {
        // 1
        "*.reduce": 2,
        "*.reduceRight": 2,
        "*.push": { min: 1 },
        "Math.max": { min: 2 },
        "Math.min": { min: 2 },
        // 2
        "new Set": { max: 1 },
        "new Map": { max: 1 },
      },
    ).map(([pattern, expectedLength]) => ({
      regex: new RegExp(
        `^${pattern.replaceAll(".", "\\.").replaceAll("*", ".*")}$`,
      ),
      pattern,
      expectedLength,
    }));

    const handle = (node: CallExpression | NewExpression) => {
      const prefix = node.type === "NewExpression" ? "new " : "";

      const { callee } = node;
      // function call
      if (callee.type === "Identifier") {
        // code like `foo()` or `new Foo()`
        options
          .filter((option) => option.regex.test(`${prefix}${callee.name}`))
          .forEach(({ pattern, expectedLength }) => {
            report(node, pattern, expectedLength);
          });
      }
      // method call
      else if (
        callee.type === "MemberExpression" &&
        callee.property.type === "Identifier"
      ) {
        const { object: calleeObject, property: calleeProperty } = callee;
        options
          .filter((option) => {
            // code like `Math.max()` or `new Foo.Bar()`, the calleeObject is `Math` or `Foo`
            if (
              "name" in calleeObject &&
              option.regex.test(
                `${prefix}${calleeObject.name}.${calleeProperty.name}`,
              )
            ) {
              return true;
            }
            // code like `[].reduce()` or `new ({Foo: class{}}).Foo()`, the calleeObject is `[]` or `{Foo: class{}}`
            if (
              !("name" in calleeObject) &&
              option.regex.test(`${prefix}.${calleeProperty.name}`)
            ) {
              return true;
            }
            return false;
          })
          .forEach(({ pattern, expectedLength }) => {
            report(node, pattern, expectedLength);
          });
      }
    };

    return {
      CallExpression: handle,
      NewExpression: handle,
    };
  },
};

export const callArgumentsLength = { name, rule };
