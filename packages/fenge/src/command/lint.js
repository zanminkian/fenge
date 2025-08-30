// @ts-check
import path from "node:path";
import process from "node:process";
import { dir, execAsync, getBinPath } from "../utils.js";

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, fix?: boolean, config?: string, default?: boolean, timing?: boolean}} options
 */
export async function lint(
  paths = [],
  {
    update = false,
    fix = false,
    config,
    default: useDefaultConfig = false,
    timing = false,
  } = {},
) {
  return execAsync("📏 Checking linting")(
    [
      process.execPath,
      await getEslintPath(useDefaultConfig),
      "--config",
      path.join(dir(import.meta.url), "..", "config", "eslint.config.js"),
      ...(update || fix ? ["--fix"] : []),
      ...(paths.length <= 0 ? ["."] : paths).map((p) =>
        path.resolve(process.cwd(), p),
      ),
    ],
    {
      env: {
        ...(config && { FENGE_CONFIG: config }),
        ...(useDefaultConfig && { FENGE_USE_DEFAULT_CONFIG: "true" }),
        ...(timing && { TIMING: "1" }),
      },
    },
  );
}

/**
 * @param {boolean} useDefaultConfig
 */
async function getEslintPath(useDefaultConfig) {
  if (useDefaultConfig) {
    return await getBinPath("eslint");
  }
  return await getBinPath("eslint", process.cwd()).catch(() =>
    getBinPath("eslint"),
  );
}
