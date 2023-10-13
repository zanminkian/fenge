const messageId = "typeModule";
const message = "'type' field in package.json should set to 'module'";

export default {
  meta: {
    messages: {
      [messageId]: message,
    },
  },
  create: (context) => ({
    "Program > ExportDefaultDeclaration > ObjectExpression": (node) => {
      const typeProperty = node.properties.find((p) => p.key.value === "type");
      if (!typeProperty) {
        return context.report({
          node,
          messageId,
        });
      }
      if (typeProperty.value.value !== "module") {
        return context.report({
          node: typeProperty,
          messageId,
        });
      }
    },
  }),
};
