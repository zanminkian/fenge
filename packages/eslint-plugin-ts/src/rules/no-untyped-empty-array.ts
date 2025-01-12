import type { Rule } from "eslint";
import type { Node } from "estree";
import { getRuleName } from "../utils.ts";

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    messages: {
      default:
        "Defining a variable with an empty array should annotate the array type",
    },
  },
  create: (context) => ({
    "VariableDeclarator:not([id.typeAnnotation]) > ArrayExpression.init[elements.length=0]":
      (node: Node) => {
        context.report({ node, messageId: "default" });
      },
  }),
};
export const noUntypedEmptyArray = { name, rule };
