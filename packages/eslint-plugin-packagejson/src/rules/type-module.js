export const name = "type-module";
export const rule = {
  meta: {
    messages: {
      [name]: "The value of 'type' field in package.json should be 'module'",
    },
  },
  create: (context) => ({
    "Program > ExportDefaultDeclaration > ObjectExpression": (node) => {
      const typeProperty = node.properties.find((p) => p.key.value === "type");
      if (!typeProperty) {
        return context.report({
          node,
          messageId: name,
        });
      }
      if (typeProperty.value.value !== "module") {
        return context.report({
          node: typeProperty,
          messageId: name,
        });
      }
    },
  }),
};
