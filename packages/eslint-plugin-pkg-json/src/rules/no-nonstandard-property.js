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

  // node https://nodejs.org/api/packages.html#nodejs-packagejson-field-definitions
  // "name",
  // "main",
  "packageManager",
  "type",
  "exports",
  "imports",
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
  },
  create: (context) => ({
    "Program > ExpressionStatement > ObjectExpression": (node) => {
      node.properties
        .filter((property) => !standardProperties.has(property.key.value))
        .forEach((property) => {
          context.report({
            node: property.key,
            messageId: name,
          });
        });
    },
  }),
};
