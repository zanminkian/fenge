export const name = "required-files";
export const rule = {
  meta: {
    messages: {
      [name]: "`files` field is required in a public package.json",
    },
    docs: {
      description: "`files` field is required in a public package.json",
    },
  },
  create: (context) => ({
    "Program > JSONExpressionStatement > JSONObjectExpression": (node) => {
      if (
        node.properties.find((p) => p.key.value === "private")?.value?.value ===
        true
      ) {
        return;
      }
      const filesProperty = node.properties.find(
        (p) => p.key.value === "files",
      );
      if (!filesProperty) {
        return context.report({
          node,
          messageId: name,
        });
      }
      if (
        filesProperty.value.type !== "JSONArrayExpression" ||
        filesProperty.value.elements.length === 0
      ) {
        return context.report({
          node: filesProperty,
          messageId: name,
        });
      }
    },
  }),
};
