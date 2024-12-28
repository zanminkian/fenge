import type { Rule } from "eslint";
import type { Node } from "estree";
import { getRuleName } from "../utils.js";

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    messages: {
      default: "Disallow using `const enum` expression.",
    },
  },
  create: (context) => ({
    "TSEnumDeclaration[const=true]": (node: Node) => {
      context.report({ node, messageId: "default" });
    },
  }),
};

export const noConstEnum = { name, rule };
