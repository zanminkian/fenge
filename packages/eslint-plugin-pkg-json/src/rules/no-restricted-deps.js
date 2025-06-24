export const name = "no-restricted-deps";
export const rule = {
  meta: {
    messages: {
      [name]:
        "Restricted dependency '{{ dependency }}' is not allowed. Reason: {{ reason }}",
    },
    docs: {
      description:
        "Restricted dependencies should not be installed in package.json",
    },
    schema: [
      {
        type: "object",
        description:
          "An object where keys are dependencies to disallow in dependencies or devDependencies, and values are the reasons for disallowing them.",
        additionalProperties: { type: "string" },
      },
    ],
    defaultOptions: [
      {
        "graceful-fs": "Use built-in `node:fs` module instead.",
        "fs-extra": "Use built-in `node:fs` module instead.",

        "node-fetch": "Use built-in `fetch` api instead.",
        axios: "Use built-in `fetch` api instead.",
        got: "Use built-in `fetch` api instead.",

        // TODO: Uncomment this when we drop support for Node v18.
        // chalk: "Use built-in util.styleText api instead.",
        // picocolors: "Use built-in util.styleText api instead.",
        // yoctocolors: "Use built-in util.styleText api instead.",
        // "ansi-colors": "Use built-in util.styleText api instead.",
        // colorette: "Use built-in util.styleText api instead.",

        lodash: "Use modern ES6+ apis instead.",
      },
    ],
  },
  create: (context) => {
    const disallow = context.options[0] || {};
    const disallowedDependencies = new Map(Object.entries(disallow));

    return {
      "Program > JSONExpressionStatement > JSONObjectExpression": (node) => {
        node.properties
          .filter((p) =>
            ["dependencies", "devDependencies", "peerDependencies"].includes(
              p.key.value,
            ),
          )
          .flatMap((n) => n.value.properties)
          .filter((property) => disallowedDependencies.has(property.key.value))
          .forEach((dependency) => {
            const reason = disallowedDependencies.get(dependency.key.value);
            context.report({
              node: dependency.key,
              messageId: name,
              data: { dependency: dependency.key.value, reason },
            });
          });
      },
    };
  },
};
