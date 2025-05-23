export const name = "no-types-deps";
export const rule = {
  meta: {
    messages: {
      [name]: "`@types/*` dependencies should not be installed in package.json",
    },
    docs: {
      description:
        "`@types/*` dependencies should not be installed in package.json",
    },
    schema: [
      {
        type: "object",
        properties: {
          allow: {
            type: "array",
            items: { type: "string" },
            description:
              "An array of @types/* dependencies to allow in addition to the default allowed types (@types/node, @types/web).",
          },
        },
        additionalProperties: false,
      },
    ],
    defaultOptions: [{ allow: ["@types/node", "@types/web"] }],
  },
  create: (context) => {
    const { allow = [] } = context.options[0] || {};
    const allowedTypes = new Set(allow);

    return {
      "Program > ExpressionStatement > ObjectExpression": (node) => {
        node.properties
          .filter((p) =>
            ["dependencies", "devDependencies"].includes(p.key.value),
          )
          .flatMap((n) => n.value.properties)
          .filter((property) => property.key.value.startsWith("@types/"))
          .filter((property) => !allowedTypes.has(property.key.value))
          .forEach((dependency) => {
            context.report({
              node: dependency.key,
              messageId: name,
            });
          });
      },
    };
  },
};
