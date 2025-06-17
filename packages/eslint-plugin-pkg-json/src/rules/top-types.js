export const name = "top-types";
export const rule = {
  meta: {
    messages: {
      [name]: "`types` field in exports must be on the top of an object",
    },
    docs: {
      description: "`types` field in exports must be on the top of an object",
    },
  },
  create: (context) => ({
    "Program > JSONExpressionStatement JSONObjectExpression": (node) => {
      if (node.parent.type === "JSONExpressionStatement") {
        return;
      }
      const index = node.properties.findIndex((p) => p.key.value === "types");
      if (index > 0) {
        return context.report({
          node: node.properties[index],
          messageId: name,
        });
      }
    },
  }),
};
