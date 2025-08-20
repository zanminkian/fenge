import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import type { Result } from "publint";

/**
 * Sync function of `(await import('publint')).publint()`.
 * If publint provides sync function, this function should be deleted.
 */
function publint(pkgDir: string) {
  const publintPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "publint.cli.js",
  );
  // Use spawnSync for cross-platform compatibility
  const result = childProcess.spawnSync(
    process.execPath, // Node executable
    [publintPath, pkgDir], // Arguments
    { encoding: "utf8" },
  );

  if (result.error || result.status !== 0) {
    throw new Error("Run publint.cli.js failed.", {
      cause: result.error ?? result.stderr,
    });
  }

  const publintResult: Result | null = JSON.parse(result.stdout);
  return publintResult;
}

const cache = new Map<string, Result>();
export function getPublintInfo(pkgPath: string, useCache = true) {
  if (useCache) {
    const info = cache.get(pkgPath);
    if (info) {
      return info;
    }
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const result: Result = {
    pkg,
    messages: pkg.private
      ? []
      : (publint(path.dirname(pkgPath))?.messages ?? []),
  };
  if (useCache) cache.set(pkgPath, result);
  return result;
}
