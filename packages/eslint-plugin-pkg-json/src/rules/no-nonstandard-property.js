const standardProperties = new Set([
  // npm https://docs.npmjs.com/cli/v10/configuring-npm/package-json
  "name",
  "version",
  "description",
  "keywords",
  "homepage",
  "bugs",
  "license",
  "author",
  "contributors",
  "funding",
  "files",
  "main",
  "browser",
  "bin",
  "man",
  "directories",
  "repository",
  "scripts",
  "config",
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "peerDependenciesMeta",
  "bundleDependencies",
  "optionalDependencies",
  "overrides",
  "engines",
  "os",
  "cpu",
  "devEngines",
  "private",
  "publishConfig",
  "workspaces",

  // For node. See https://nodejs.org/api/packages.html#nodejs-packagejson-field-definitions.
  // "name",
  // "main",
  // "packageManager", // Corepack will be removed from node in Node 25.
  "type",
  "exports",
  "imports",

  // For TypeScript.
  // TODO: Remove `types`.
  // We need types because of `libReplacement`. `exports` not works for `libReplacement`.
  // This is the bug of TypeScript. Once TS support `exports` field for `libReplacement`, we should remove `types`.
  "types",
]);

export const name = "no-nonstandard-property";
export const rule = {
  meta: {
    messages: {
      [name]:
        "Disallow using the property that is out of node and npm standard",
    },
    docs: {
      description:
        "Disallow using the property that is out of node and npm standard",
    },
    schema: [
      {
        type: "object",
        properties: {
          allow: {
            type: "array",
            items: {
              type: "string",
            },
            description:
              "An array of custom property names to allow in addition to the standard properties.",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create: (context) => {
    const { allow = [] } = context.options[0] || {};
    const allowedProperties = new Set([...standardProperties, ...allow]);
    return {
      "Program > ExpressionStatement > ObjectExpression": (node) => {
        node.properties
          .filter((property) => !allowedProperties.has(property.key.value))
          .forEach((property) => {
            context.report({
              node: property.key,
              messageId: name,
            });
          });
      },
    };
  },
};
