export const name = "no-engines";
export const rule = {
  meta: {
    messages: {
      noEnginesInPrivate:
        "`engines` field should not be present in private package.json",
    },
    docs: {
      description:
        "`engines` field should not be present in private package.json",
    },
  },
  create: (context) => ({
    "Program > JSONExpressionStatement > JSONObjectExpression": (node) => {
      const privateField = node.properties.find(
        (p) => p.key.value === "private",
      );

      // Only check if private is explicitly set to true
      if (
        privateField?.value.type === "JSONLiteral" &&
        privateField?.value.value === true
      ) {
        const engines = node.properties.find((p) => p.key.value === "engines");
        if (engines) {
          return context.report({
            node: engines,
            messageId: "noEnginesInPrivate",
          });
        }
      }
    },
  }),
};
