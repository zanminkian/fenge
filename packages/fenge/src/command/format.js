// @ts-check
import path from "node:path";
import process from "node:process";
import { prettierignore } from "prettier-ignore";
import { dir, execAsync, getBinPath } from "../utils.js";

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, write?: boolean, dryRun?: boolean, config?: string, default?: boolean}} options
 */
export async function format(
  paths = [],
  {
    update = false,
    write = false,
    dryRun = false,
    config,
    default: useDefaultConfig = false,
  } = {},
) {
  return execAsync(
    [
      await getPrettierPath(useDefaultConfig),
      // setup 3 ignore files
      ...[".gitignore", ".prettierignore", prettierignore]
        .map((p) => path.resolve(p))
        .flatMap((p) => ["--ignore-path", p]),
      "--log-level",
      "warn",
      "--config",
      path.join(dir(import.meta.url), "..", "config", "prettier.config.js"),
      "--ignore-unknown",
      "--no-error-on-unmatched-pattern", // Not a good option name. It's for skipping formatting symlinks. https://github.com/prettier/prettier/pull/15533
      ...(update || write ? ["--write"] : ["--check"]),
      ...(paths.length <= 0 ? ["."] : paths).map((p) =>
        path.resolve(process.cwd(), p),
      ),
    ],
    {
      topic: "💃 Checking formatting",
      dryRun,
      env: {
        ...(config && { FENGE_CONFIG: config }),
        ...(useDefaultConfig && { FENGE_USE_DEFAULT_CONFIG: "true" }),
      },
    },
  );
}

/**
 * @param {boolean} useDefaultConfig
 */
async function getPrettierPath(useDefaultConfig) {
  const builtinBinPath = await getBinPath("prettier");
  if (useDefaultConfig) {
    return builtinBinPath;
  }
  return await getBinPath("prettier", process.cwd()).catch(
    () => builtinBinPath,
  );
}
