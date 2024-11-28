import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { create, createRule, getRuleName, getSourceType } from "../common.js";

function isObject(value: unknown) {
  return value !== null && typeof value === "object";
}

function isFile(filePath: string) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

const cache = new Map<string, { path: string; content: object } | undefined>(); // key is dir, value is package.json
function getPkgJson(
  dir: string,
): { path: string; content: object } | undefined {
  if (cache.has(dir)) {
    return cache.get(dir);
  }
  const pkgJsonPath = path.join(dir, "package.json");
  if (isFile(pkgJsonPath)) {
    const content: unknown = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
    const result = isObject(content)
      ? { path: pkgJsonPath, content }
      : undefined;
    cache.set(dir, result);
    return result;
  }

  // if it is a directory
  if (dir === process.cwd() || dir === "/") {
    // stop here
    cache.set(dir, undefined);
    return undefined;
  }

  return getPkgJson(path.join(dir, ".."));
}

export const noPhantomDepImports = createRule({
  name: getRuleName(import.meta.url),
  message:
    "Disallow importing from a module which the nearest `package.json` doesn't include it.",
  schema: [
    {
      type: "object",
      properties: {
        allowDevDependencies: { type: "boolean" },
      },
      additionalProperties: false,
    },
  ],
  create: (context) =>
    create(context, (filename, source, node) => {
      const {
        allowDevDependencies = false,
      }: { allowDevDependencies: boolean } = context.options[0] ?? {};

      // ignore `import {foo} from './'` and `import {foo} from 'node:foo'`
      if (getSourceType(source) !== "module") {
        return false;
      }
      const pkgJson = getPkgJson(path.dirname(filename));
      // cannot find package.json file
      if (!pkgJson) {
        return true;
      }
      const dep =
        "dependencies" in pkgJson.content &&
        isObject(pkgJson.content.dependencies)
          ? pkgJson.content.dependencies
          : {};
      const peerDep =
        "peerDependencies" in pkgJson.content &&
        isObject(pkgJson.content.peerDependencies)
          ? pkgJson.content.peerDependencies
          : {};
      const devDep =
        "devDependencies" in pkgJson.content &&
        isObject(pkgJson.content.devDependencies)
          ? pkgJson.content.devDependencies
          : {};

      const moduleName = source
        .split("/")
        .slice(0, source.startsWith("@") ? 2 : 1)
        .join("/");

      const isInDep = moduleName in dep || moduleName in peerDep;
      const isInDev = moduleName in devDep;
      if ("importKind" in node && node.importKind === "type") {
        return moduleName.startsWith("@") && moduleName.includes("/")
          ? !(
              isInDep ||
              isInDev ||
              `@types/${moduleName.slice(1).replace("/", "__")}` in devDep
            )
          : !(isInDep || isInDev || `@types/${moduleName}` in devDep);
      } else {
        return allowDevDependencies ? !(isInDep || isInDev) : !isInDep;
      }
    }),
});
