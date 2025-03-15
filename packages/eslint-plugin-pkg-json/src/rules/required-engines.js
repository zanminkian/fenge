export const name = "required-engines";
export const rule = {
  meta: {
    messages: {
      missingEnginesField: "`engines` field is required in public package.json",
      missingNodeField: "`engines` field must contain `node` field",
    },
    docs: {
      description:
        "`engines` field is required in public package.json, and it must contain `node` field",
    },
  },
  create: (context) => ({
    "Program > ExpressionStatement > ObjectExpression": (node) => {
      const privateField = node.properties.find(
        (p) => p.key.value === "private",
      );
      if (
        privateField?.value.type === "Literal" &&
        privateField?.value.value === true
      ) {
        return;
      }

      const engines = node.properties.find((p) => p.key.value === "engines");
      if (
        !engines ||
        engines.value.type !== "ObjectExpression" ||
        engines.value.properties.length <= 0
      ) {
        return context.report({
          node: engines || node,
          messageId: "missingEnginesField",
        });
      }

      const nodeField = engines.value.properties.find(
        (p) => p.key.value === "node",
      );
      if (
        !nodeField ||
        typeof nodeField.value.value !== "string" ||
        !nodeField.value.value.trim()
      ) {
        return context.report({
          node: nodeField || engines,
          messageId: "missingNodeField",
        });
      }
    },
  }),
};
