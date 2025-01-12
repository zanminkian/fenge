import type { Rule } from "eslint";
import { getRuleName } from "../utils.ts";

// TODO: If https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2452 is accepted, migrate this rule to `eslint-plugin-unicorn`
const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Right hand of `instanceof` can't be a builtin class.",
    },
    messages: {
      [`${name}/error`]: "Right hand of `instanceof` can't be a builtin class.",
    },
  },
  create: (context) => {
    let builtins: Set<string> | undefined = undefined;
    return {
      // ESLint visit the Node from root to leaf. The Program Node is the root.
      // Therefore, Program will be called before BinaryExpression.
      // https://eslint.org/docs/latest/extend/code-path-analysis
      Program: (node) => {
        const scope = context.sourceCode.getScope(node);
        builtins = new Set([
          // Variables declared in `globals`
          ...scope.variables.map((v) => v.name),
          // Variables not declared at all
          ...scope.through.map((ref) => ref.identifier.name),
        ]);
      },
      BinaryExpression: (node) => {
        if (
          node.operator !== "instanceof" ||
          node.right.type !== "Identifier"
        ) {
          return;
        }

        if (builtins?.has(node.right.name) ?? true) {
          context.report({ node: node.right, messageId: `${name}/error` });
        }
      },
    };
  },
};

export const noInstanceofBuiltin = { name, rule };
