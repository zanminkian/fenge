import type { Rule } from "eslint";
import type { ArrowFunctionExpression } from "estree";
import { getRuleName } from "../utils.ts";

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "Top-level functions are expected to be function declarations instead of arrow functions.",
    },
    messages: {
      [`${name}/error`]:
        "Top-level functions are expected to be function declarations instead of arrow functions.",
    },
  },
  create: (context) => {
    const handle = (node: ArrowFunctionExpression) => {
      if (node.body.type === "BlockStatement") {
        context.report({ node, messageId: `${name}/error` });
      }
    };
    return {
      "VariableDeclaration[parent.type='Program'] > VariableDeclarator > ArrowFunctionExpression":
        handle,
      "ExpressionStatement[parent.type='Program'] > AssignmentExpression > ArrowFunctionExpression":
        handle,
      "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression":
        handle,
      "ExportDefaultDeclaration > ArrowFunctionExpression": handle,
    };
  },
};

export const noTopLevelArrowFunction = { name, rule };
