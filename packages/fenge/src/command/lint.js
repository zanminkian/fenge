// @ts-check
import path from "node:path";
import process from "node:process";
import { dir, execAsync, getBinPath } from "../utils.js";

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, fix?: boolean, dryRun?: boolean, config?: string, default?: boolean}} options
 */
export async function lint(paths = [], options = {}) {
  const { update = false, fix = false, dryRun = false, config } = options;
  const useDefaultConfig = options["default"] ?? false;

  if (config) {
    process.env["FENGE_CONFIG"] = config;
  }
  if (useDefaultConfig) {
    process.env["FENGE_USE_DEFAULT_CONFIG"] = "true";
  }
  process.env["ESLINT_USE_FLAT_CONFIG"] = "true"; // TODO remove it once upgrade to eslint 9
  return execAsync(
    [
      // "node",
      await getBinPath("eslint"),
      "--config",
      path.join(dir(import.meta.url), "..", "config", "eslint.config.js"),
      ...(update || fix ? ["--fix"] : []),
      ...(paths.length <= 0 ? ["."] : paths).map((p) =>
        path.resolve(process.cwd(), p),
      ),
    ],
    { topic: "📏 Checking linting", dryRun },
  );
}
