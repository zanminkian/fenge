import type { Rule } from "eslint";
import type { Node } from "estree";
import { getRuleName } from "../utils.ts";

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    messages: {
      default: "Disallow using Map and Set without type arguments.",
    },
  },
  create: (context) => {
    const handle = (node: Node) =>
      context.report({ node, messageId: "default" });
    return {
      // new Set();
      "Identifier[name=/^(Set|Map|WeakSet|WeakMap)$/][parent.type='NewExpression'][parent.arguments.length=0][parent.typeArguments=undefined]":
        handle,
      // class Foo {foo: Set}
      "Identifier[name=/^(Set|Map|WeakSet|WeakMap)$/][parent.type!='NewExpression'][parent.typeArguments=undefined]":
        handle,
    };
  },
};

export const exactMapSetType = { name, rule };
