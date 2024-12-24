// https://docs.npmjs.com/cli/v11/using-npm/scripts#pre--post-scripts
const invalid = new Set([
  "preinstall",
  "install",
  "postinstall",
  "preuninstall",
  "uninstall",
  "postuninstall",
  "prepublish", // this script is deprecated by npm
]);

export const name = "no-lifecycle-script";
export const rule = {
  meta: {
    messages: {
      [name]:
        "Using lifecycle script in public npm package is considered a bad practice. You should expose a cli entrance. Users who need it will invoke it manually",
    },
    docs: {
      description:
        "Using lifecycle script in public npm package is considered a bad practice. You should expose a cli entrance. Users who need it will invoke it manually",
    },
  },
  create: (context) => ({
    "Program > ExpressionStatement > ObjectExpression": (node) => {
      if (
        node.properties.find((p) => p.key.value === "private")?.value?.value ===
        true
      ) {
        return;
      }
      node.properties
        .find((p) => p.key?.value === "scripts")
        ?.value?.properties?.filter((property) =>
          invalid.has(property.key.value),
        )
        .forEach((property) => {
          context.report({ node: property.key, messageId: name });
        });
    },
  }),
};
