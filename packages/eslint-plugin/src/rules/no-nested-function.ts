import type { Rule } from "eslint";
import type { Node } from "estree";
import { getRuleName } from "../utils.js";

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
    const selectors = [
      "FunctionDeclaration[parent.type!='Program'][parent.type!='ExportNamedDeclaration'][parent.type!='ExportDefaultDeclaration']", // function foo(){}
      "FunctionExpression[parent.type!='Program'][parent.type!='MethodDefinition']", // function (){}
    ];
    return {
      [`:matches(${selectors.join(", ")})`]: (node: Node) => {
        context.report({ node, messageId: `${name}/error` });
      },
    };
  },
};

export const noNestedFunction = { name, rule };
