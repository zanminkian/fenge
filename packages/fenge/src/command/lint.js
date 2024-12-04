// @ts-check
import path from "node:path";
import process from "node:process";
import { dir, execAsync, getBinPath } from "../utils.js";

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, fix?: boolean, dryRun?: boolean, config?: string, default?: boolean}} options
 */
export async function lint(paths = [], options = {}) {
  const {
    update = false,
    fix = false,
    dryRun = false,
    config,
    default: useDefaultConfig = false,
  } = options;

  return execAsync(
    [
      // "node",
      await getEslintPath(useDefaultConfig),
      "--config",
      path.join(dir(import.meta.url), "..", "config", "eslint.config.js"),
      ...(update || fix ? ["--fix"] : []),
      ...(paths.length <= 0 ? ["."] : paths).map((p) =>
        path.resolve(process.cwd(), p),
      ),
    ],
    {
      topic: "📏 Checking linting",
      dryRun,
      env: {
        ESLINT_USE_FLAT_CONFIG: "true", // TODO remove it once upgrade to eslint 9
        ...(config && { FENGE_CONFIG: config }),
        ...(useDefaultConfig && { FENGE_USE_DEFAULT_CONFIG: "true" }),
      },
    },
  );
}

/**
 * @param {boolean} useDefaultConfig
 */
async function getEslintPath(useDefaultConfig) {
  const builtinBinPath = await getBinPath("eslint");
  if (useDefaultConfig) {
    return builtinBinPath;
  }
  return await getBinPath("eslint", process.cwd()).catch(() => builtinBinPath);
}
