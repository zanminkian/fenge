import type { Rule } from "eslint";
import type { Node } from "estree";
import { getRuleName } from "../utils.js";

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "Disallow nested class. Classes are expected to place at top level.",
    },
    messages: {
      [`${name}/error`]:
        "Disallow nested class. Classes are expected to place at top level.",
    },
  },
  create: (context) => {
    const handle = (node: Node) =>
      context.report({ node, messageId: `${name}/error` });
    return {
      // ClassDeclaration is only allowed when parent is Program, or parent is ExportNamedDeclaration, or parent is ExportDefaultDeclaration
      "ClassDeclaration[parent.type!='Program'][parent.type!='ExportNamedDeclaration'][parent.type!='ExportDefaultDeclaration']":
        handle,
      // ClassExpression is only allowed when parent is ExportNamedDeclaration, or parent is ExportDefaultDeclaration
      "ClassExpression[parent.type!='ExportNamedDeclaration'][parent.type!='ExportDefaultDeclaration']":
        handle,
    };
  },
};

export const noNestedClass = { name, rule };
