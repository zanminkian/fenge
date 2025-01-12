import type { Rule } from "eslint";
import type { Node } from "estree";
import { getRuleName } from "../utils.ts";

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    messages: {
      default: "Disallow using `declare` statement.",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowClassProperty: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
  },
  create: (context) => ({
    "[declare=true]": (node: Node & { parent: Node }) => {
      const { allowClassProperty = false } = context.options[0] ?? {};
      if (
        allowClassProperty &&
        node.type === "PropertyDefinition" &&
        node.parent.type === "ClassBody"
      ) {
        return;
      }
      context.report({ node, messageId: "default" });
    },
  }),
};
export const noDeclares = { name, rule };
