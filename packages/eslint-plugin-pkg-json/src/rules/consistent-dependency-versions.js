// @ts-check
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function getAllPackageJsonPaths(cwd = process.cwd()) {
  /** @type {string[]} */
  const result = [];

  /**
   * @param {string} dir
   */
  const scanDirectory = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isFile() && entry.name === "package.json") {
        result.push(fullPath);
      } else if (
        entry.isDirectory() &&
        ![
          "node_modules",
          ".git",
          "dist",
          "build",
          ".next",
          "coverage",
        ].includes(entry.name)
      ) {
        scanDirectory(fullPath);
      }
    }
  };
  scanDirectory(cwd);
  return result;
}

/**
 * @param {string[]} paths
 */
function getPackageJsons(paths) {
  /** @type {Map<string, Record<string, unknown>>} */
  const packageJsonMap = new Map();

  for (const packagePath of paths) {
    const content = fs.readFileSync(packagePath, "utf8");
    packageJsonMap.set(packagePath, JSON.parse(content));
  }

  return packageJsonMap;
}

/**
 * @param {{ name: string; version: string; }} dependency
 * @param {Map<string, Record<string, unknown>>} packageJsonMap
 */
function checkDependencyVersionInconsistency(
  { name, version },
  packageJsonMap,
) {
  for (const [packagePath, pkg] of packageJsonMap) {
    /** @type {any} */
    const dependencies = pkg["dependencies"] ?? {};
    /** @type {any} */
    const devDependencies = pkg["devDependencies"] ?? {};
    /** @type {any} */
    const optionalDependencies = pkg["optionalDependencies"] ?? {};

    if (dependencies[name] && dependencies[name] !== version) {
      return {
        path: packagePath,
        name,
        version: dependencies[name],
      };
    }
    if (devDependencies[name] && devDependencies[name] !== version) {
      return {
        path: packagePath,
        name,
        version: devDependencies[name],
      };
    }
    if (optionalDependencies[name] && optionalDependencies[name] !== version) {
      return {
        path: packagePath,
        name,
        version: optionalDependencies[name],
      };
    }
  }

  return undefined;
}

/** @type {string[] | undefined} */
let allPackageJsonPaths = undefined;

export const name = "consistent-dependency-versions";

export const rule = {
  meta: {
    messages: {
      [name]:
        "Dependency '{{name}}' has inconsistent versions: current '{{version}}', found '{{otherVersion}}' in {{otherPackageJsonPath}}",
    },
    docs: {
      description:
        "Ensure consistent dependency versions across all package.json files in the project",
    },
  },
  /**
   * @param {import('eslint').Rule.RuleContext} context
   */
  create: (context) => {
    allPackageJsonPaths ||= getAllPackageJsonPaths();
    const packageJsonMap = getPackageJsons(allPackageJsonPaths);

    return {
      /**
       * @param {any} node
       */
      "Program > JSONExpressionStatement > JSONObjectExpression": (node) => {
        // Find dependencies, devDependencies and optionalDependencies properties in current file
        const dependenciesProps = node.properties
          .filter((/** @type {any} */ p) =>
            [
              "dependencies",
              "devDependencies",
              "optionalDependencies",
            ].includes(p.key.value),
          )
          .filter(
            (/** @type {any} */ p) => p.value.type === "JSONObjectExpression",
          );

        for (const depsProp of dependenciesProps) {
          for (const property of depsProp.value.properties) {
            const depName = property.key.value;
            const currentVersion = property.value.value;

            // Check if there's a version inconsistency
            const inconsistencyResult = checkDependencyVersionInconsistency(
              { name: depName, version: currentVersion },
              packageJsonMap,
            );

            if (inconsistencyResult) {
              context.report({
                node: property.value,
                messageId: name,
                data: {
                  name: depName,
                  version: currentVersion,
                  otherVersion: inconsistencyResult.version,
                  otherPackageJsonPath: inconsistencyResult.path,
                },
              });
            }
          }
        }
      },
    };
  },
};
