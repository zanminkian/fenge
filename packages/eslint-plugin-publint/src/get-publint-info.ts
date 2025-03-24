import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Result } from "publint";

/**
 * Sync function of `(await import('publint')).publint()`.
 * If publint provides sync function, this function should be deleted.
 */
function publint(pkgDir: string) {
  // publint doesn't provide sync function
  const publintPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "publint.cli.js",
  );
  const result: Result | null = JSON.parse(
    childProcess.execSync(`node ${publintPath} ${pkgDir}`, {
      encoding: "utf8",
    }),
  );
  return result;
}

const cache = new Map<string, Result>();
export function getPublintInfo(pkgPath: string) {
  const info = cache.get(pkgPath);
  if (info) {
    return info;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const result: Result = {
    pkg,
    messages: pkg.private
      ? []
      : (publint(path.dirname(pkgPath))?.messages ?? []),
  };
  cache.set(pkgPath, result);
  return result;
}
