import type { Rule } from "eslint";
import type { CallExpression, NewExpression } from "estree";
import { getRuleName } from "../utils.js";

// TODO: If https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1356 is implemented, migrate this rule to `eslint-plugin-unicorn`
const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "Disallow calling a function with incorrect arguments length.",
    },
    messages: {
      [`${name}/error`]:
        "The arguments length of calling `{{ functionPattern }}` should be {{ lengthMsg }}",
    },
    schema: [{ type: "object" }], // TODO: enhance schema for checking options
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
        "*.reduce": 2,
        "*.reduceRight": 2,
        "*.push": { min: 1 },
        "new Set": { max: 1 },
        "new Map": { max: 1 },
      },
    );
    return {
      CallExpression: (node) => {
        // function call
        if (node.callee.type === "Identifier") {
          for (const [pattern, expectedLength] of options.filter(
            ([pattern]) =>
              !pattern.startsWith("*.") && !pattern.startsWith("new "),
          )) {
            if (node.callee.name !== pattern) continue;
            report(node, pattern, expectedLength);
          }
        }
        // method call
        else if (
          node.callee.type === "MemberExpression" &&
          node.callee.property.type === "Identifier"
        ) {
          for (const [pattern, expectedLength] of options.filter(([pattern]) =>
            pattern.startsWith("*."),
          )) {
            if (node.callee.property.name !== pattern.split(".")[1]) continue;
            report(node, pattern, expectedLength);
          }
        }
      },
      // new call
      NewExpression: (node) => {
        if (node.callee.type !== "Identifier") return;
        for (const [pattern, expectedLength] of options.filter(([pattern]) =>
          pattern.startsWith("new "),
        )) {
          if (node.callee.name !== pattern.split(" ")[1]) continue;
          report(node, pattern, expectedLength);
        }
      },
    };
  },
};

export const callArgumentsLength = { name, rule };
