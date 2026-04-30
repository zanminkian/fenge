import type { Rule } from "eslint";
import { getDocUrl, getRuleName, type GetNode } from "../utils.ts";

type FunctionDeclaration = GetNode<"FunctionDeclaration">;
type FunctionExpression = GetNode<"FunctionExpression">;
type ArrowFunctionExpression = GetNode<"ArrowFunctionExpression">;
type Pattern = FunctionDeclaration["params"][number];

const name = getRuleName(import.meta.filename);

function getUnderscoreParamName(param: Pattern): string | undefined {
  switch (param.type) {
    case "Identifier":
      return param.name.startsWith("_") ? param.name : undefined;
    case "RestElement":
      return param.argument.type === "Identifier" &&
        param.argument.name.startsWith("_")
        ? param.argument.name
        : undefined;
    case "AssignmentPattern":
      return param.left.type === "Identifier" && param.left.name.startsWith("_")
        ? param.left.name
        : undefined;
    case "ArrayPattern":
    case "MemberExpression":
    case "ObjectPattern":
      return undefined;
  }
}

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: getDocUrl(name),
      description:
        "Disallow underscore-prefixed function parameters that are actually used in the function body.",
    },
    messages: {
      [`${name}/error`]:
        "Underscore-prefixed parameter '{{name}}' is used in the function body.",
    },
  },
  create: (context) => ({
    "FunctionDeclaration, FunctionExpression, ArrowFunctionExpression": (
      node: FunctionDeclaration | FunctionExpression | ArrowFunctionExpression,
    ) => {
      if (node.params.length === 0) return;

      const scope = context.sourceCode.getScope(node);
      const bodyRange = node.body.range;
      if (!bodyRange) return;

      for (const param of node.params) {
        const paramName = getUnderscoreParamName(param);
        if (!paramName) continue;

        const variable = scope.variables.find((v) => v.name === paramName);
        if (!variable) continue;

        const usedInBody = variable.references.some((ref) => {
          if (!ref.identifier.range) return false;
          const [start, end] = ref.identifier.range;
          return start >= bodyRange[0] && end <= bodyRange[1];
        });
        if (usedInBody) {
          context.report({
            node: param,
            messageId: `${name}/error`,
            data: { name: paramName },
          });
        }
      }
    },
  }),
};

export const noUsedUnderscoreParam = { name, rule };
