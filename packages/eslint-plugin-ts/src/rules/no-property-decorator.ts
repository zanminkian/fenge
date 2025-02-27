import type { Rule } from "eslint";
import type { Node } from "estree";
import { getRuleName } from "../utils.ts";

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    messages: {
      default:
        "Disallow using property decorator. Consider adding `declare` keyword in front of the property to fix it.",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowDeclaration: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
  },
  create: (context) => ({
    "ClassBody > PropertyDefinition[decorators.length>0]": (node: Node) => {
      if (
        "declare" in node &&
        node.declare &&
        context.options[0]?.allowDeclaration
      ) {
        return;
      }
      context.report({ node, messageId: "default" });
    },
  }),
};
export const noPropertyDecorator = { name, rule };
