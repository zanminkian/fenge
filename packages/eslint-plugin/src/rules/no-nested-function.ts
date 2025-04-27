import type { Rule } from "eslint";
import { getRuleName } from "../utils.ts";

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "Non top-level functions are expected to be arrow functions instead of function declarations.",
    },
    messages: {
      [`${name}/error`]:
        "Non top-level functions are expected to be arrow functions instead of function declarations.",
    },
  },
  create: (context) => {
    const handle = (node: Rule.Node) =>
      context.report({ node, messageId: `${name}/error` });
    return {
      // FunctionDeclaration is only allowed when parent is Program, or parent is ExportNamedDeclaration, or parent is ExportDefaultDeclaration
      // function foo(){}
      "FunctionDeclaration[parent.type!='Program'][parent.type!='ExportNamedDeclaration'][parent.type!='ExportDefaultDeclaration']":
        handle,
      // FunctionExpression is only allowed when parent is MethodDefinition
      // function (){}
      "FunctionExpression[parent.type!='MethodDefinition']": handle,
    };
  },
};

export const noNestedFunction = { name, rule };
