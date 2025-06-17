import { isValidSemVer } from "../common.ts";

function isExactVersion(version) {
  if (!version) {
    return false;
  }
  if (version.startsWith("file:")) {
    return true;
  }
  if (version.startsWith("workspace:")) {
    return version === "workspace:*";
  }
  if (version.startsWith("npm:")) {
    return isValidSemVer(version.split("@")[1]);
  }
  return isValidSemVer(version);
}

export const name = "exact-dependency-version";
/**
 * Background:
 * This rule is for npm package projects,
 * not for application projects (including node applications and frontend applications) because they usually have a lock file (pnpm-lock.yaml, package-lock.json) to ensure they are using the exact dependencies.
 * As for npm package projects, they are expected to be stable when they are installed by other projects. So locking the dependency versions will be more stable for npm package projects.
 */
export const rule = {
  meta: {
    messages: {
      [name]: "Dependencies are expected an exact version",
    },
    docs: {
      description: "Dependencies are expected an exact version",
    },
  },
  create: (context) => ({
    "Program > JSONExpressionStatement > JSONObjectExpression": (node) => {
      node.properties
        .filter(
          (p) => ["dependencies", "devDependencies"].includes(p.key.value), // Should we remove devDependencies?
        )
        .flatMap((n) => n.value.properties)
        .filter((property) => !isExactVersion(property.value.value))
        .forEach((property) => {
          context.report({
            node: property.value,
            messageId: name,
          });
        });
    },
  }),
};
