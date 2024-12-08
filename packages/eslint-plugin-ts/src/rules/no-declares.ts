import type { Node } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

export const noDeclares = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using `declare` statement.",
  schema: [
    {
      type: "object",
      properties: {
        allowClassProperty: { type: "boolean" },
      },
      additionalProperties: false,
    },
  ],
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
      context.reportNode(node);
    },
  }),
});
