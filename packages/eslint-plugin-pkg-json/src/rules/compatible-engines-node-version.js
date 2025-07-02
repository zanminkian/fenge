// @ts-check
import fs from "node:fs";
import { createRequire } from "node:module";
import semver from "semver";

/**
 * @param {semver.SemVer|string} version
 */
const toMinor = (version) =>
  `${semver.major(version)}.${semver.minor(version)}.0`;

export const name = "compatible-engines-node-version";
export const rule = {
  meta: {
    messages: {
      invalidVersion:
        "Cannot get the minimum node version because of the invalid version format",
      incompatibleVersion:
        "The version of installed `@types/node` {{typesNodeVersion}} should not be higher than engines.node minimum version {{enginesNodeVersion}}",
    },
    docs: {
      description:
        "Ensures @types/node version is less than or equal to engines.node minimum version",
    },
  },
  /**
   * @param {import('eslint').Rule.RuleContext} context
   */
  create: (context) => ({
    /**
     * @param {any} node
     */
    "Program > JSONExpressionStatement > JSONObjectExpression": (node) => {
      const nodeField = getEnginesNodeField(node);
      if (!nodeField || typeof nodeField.value.value !== "string") {
        return;
      }

      /** @type {string|undefined} */
      let enginesNodeVersion = undefined;
      try {
        enginesNodeVersion = semver
          .minVersion(nodeField.value.value.trim())
          ?.toString();
      } catch {}
      if (!enginesNodeVersion) {
        context.report({
          node: nodeField.value,
          messageId: "invalidVersion",
        });
        return;
      }

      /** @type {string} */
      let typesNodeVersion = "";
      try {
        // TODO: Bug. If there is no `@types/node` in the root node_modules, this will not throw an error which is unexpected.
        // We should look directories up or use `import-meta-resolve` package.
        const typesNodePkgPath = createRequire(context.filename).resolve(
          "@types/node/package.json",
        );
        const typesNodePkg = JSON.parse(
          fs.readFileSync(typesNodePkgPath, "utf8"),
        );
        typesNodeVersion = typesNodePkg.version;
      } catch {}
      if (!typesNodeVersion) return;
      if (!semver.lte(toMinor(typesNodeVersion), toMinor(enginesNodeVersion))) {
        context.report({
          node: getDependenciesTypesNodeField(node)?.value ?? nodeField.value,
          messageId: "incompatibleVersion",
          data: {
            typesNodeVersion,
            enginesNodeVersion,
          },
        });
      }
    },
  }),
};

/** @param {any} node */
function getEnginesNodeField(node) {
  const engines = node.properties.find(
    (/** @type {any} */ p) => p.key.value === "engines",
  );
  if (!engines || engines.value.type !== "JSONObjectExpression") {
    return undefined;
  }
  return engines.value.properties.find(
    (/** @type {any} */ p) => p.key.value === "node",
  );
}

/** @param {any} node */
function getDependenciesTypesNodeField(node) {
  const depsList = node.properties.filter((/** @type {any} */ p) =>
    ["dependencies", "devDependencies"].includes(p.key.value),
  );
  for (const dependencies of depsList) {
    if (!dependencies || dependencies.value.type !== "JSONObjectExpression") {
      break;
    }
    const typesNodeField = dependencies.value.properties.find(
      (/** @type {any} */ p) => p.key.value === "@types/node",
    );
    if (typesNodeField) return typesNodeField;
  }
  return undefined;
}
