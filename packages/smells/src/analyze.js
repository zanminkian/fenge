// @ts-check
import fs from "node:fs/promises";
import { parse } from "./parse.ts";
import { walkDir } from "./utils.ts";

/**
 * @param {string} filepath ts or js file absolute path
 */
async function getAnalysis(filepath) {
  const code = await fs.readFile(filepath, "utf8");
  const result = {
    /** @type {{start:{line:number,column:number}}[]} */
    anyTypes: [],
    /** @type {{start:{line:number,column:number}}[]} */
    assertions: [],
    /** @type {{start:{line:number,column:number}}[]} */
    nonNullAssertions: [],
    /** @type {{start:{line:number,column:number}}[]} */
    renamedImports: [],
    /** @type {{start:{line:number,column:number}}[]} */
    importExpressions: [],
    /** @type {{start:{line:number,column:number}}[]} */
    instanceofOperators: [],
    /** @type {{start:{line:number,column:number}}[]} */
    exportDefaults: [],
    /** @type {{start:{line:number,column:number}}[]} */
    nodeProtocolImports: [],
    /** @type {{start:{line:number,column:number}}[]} */
    metaProperties: [],
    codeLines: code.split("\n").length,
  };

  /**
   * @param {any} node
   */
  const walk = (node) => {
    if (!node || typeof node !== "object") {
      return;
    }
    switch (node.type) {
      case "TSAnyKeyword":
        result.anyTypes.push(node.loc);
        break;
      case "TSAsExpression":
      case "TSTypeAssertion":
        // ignore `as const`
        if (node.typeAnnotation.typeName?.name !== "const") {
          result.assertions.push(node.loc);
        }
        break;
      case "TSNonNullExpression":
        result.nonNullAssertions.push(node.loc);
        break;
      case "PropertyDefinition":
        if (node.definite) {
          result.nonNullAssertions.push(node.loc);
        }
        break;
      case "ImportDeclaration":
        result.renamedImports.push(
          ...node.specifiers
            .filter((/** @type {any} */ s) => s.type === "ImportSpecifier")
            .filter((/** @type {any} */ s) => s.imported.name !== s.local.name)
            .map((/** @type {any} */ s) => s.loc),
        );
        if (node.source.value.startsWith("node:")) {
          result.nodeProtocolImports.push(node.loc);
        }
        break;
      case "ImportExpression":
        result.importExpressions.push(node.loc);
        if (node.source.value?.startsWith("node:")) {
          result.nodeProtocolImports.push(node.loc);
        }
        break;
      case "BinaryExpression":
        if (node.operator === "instanceof") {
          result.instanceofOperators.push(node.loc);
        }
        break;
      case "ExportDefaultDeclaration":
        result.exportDefaults.push(node.loc);
        break;
      case "VariableDeclarator":
        if (
          node.id.type === "ObjectPattern" &&
          node.init?.type === "AwaitExpression" &&
          node.init?.argument.type === "ImportExpression"
        ) {
          result.renamedImports.push(
            ...node.id.properties
              .filter((/** @type {any} */ p) => p.key.name !== p.value.name)
              .map((/** @type {any} */ p) => p.loc),
          );
        }
        break;
      case "MetaProperty":
        if (node.meta.name === "import" && node.property.name === "meta") {
          result.metaProperties.push(node.loc);
        }
        break;
    }
    Object.values(node).forEach((sub) => walk(sub));
  };

  walk(
    await parse(code, {
      jsx: filepath.endsWith("x") || filepath.endsWith("js"),
      loc: true,
    }),
  );
  return result;
}

/**
 * @param {string} pattern
 * @param {string|undefined} ignore
 */
export async function analyze(pattern, ignore) {
  /** @type {Map<string, Awaited<ReturnType<typeof getAnalysis>>>} */
  const result = new Map();
  await walkDir(pattern, ignore, async (file) => {
    const analysis = await getAnalysis(file);
    result.set(file, analysis);
  });
  return result;
}
