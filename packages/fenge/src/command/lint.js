// @ts-check
import path from "node:path";
import process from "node:process";
import { ESLint } from "eslint";
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
  const result = await execAsync("📏 Checking linting")(
    [
      process.execPath,
      await getEslintPath(useDefaultConfig),
      ...(timing ? [] : ["--format=json"]),
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
  // Loading formatter in this way is not very elegant, but it's the only way (maybe).
  const formatter = await new ESLint().loadFormatter("stylish");
  const stdoutResult = await handleJson(formatter, result.stdout);
  const stderrResult = await handleJson(formatter, result.stderr);
  return {
    ...result,
    stdout: stdoutResult.content,
    stderr: stderrResult.content,
    fixedFiles: [
      ...new Set([...stdoutResult.fixedFiles, ...stderrResult.fixedFiles]),
    ],
  };
}

/**
 * @param {import('eslint').ESLint.LoadedFormatter} formatter
 * @param {string} str
 */
async function handleJson(formatter, str) {
  try {
    /** @type {import('eslint').ESLint.LintResult[]} */
    const lintResults = JSON.parse(str);
    return {
      fixedFiles: lintResults
        .filter((lintResult) => lintResult.output)
        .map((lintResult) => lintResult.filePath),
      content: await formatter.format(lintResults),
    };
  } catch {
    return {
      fixedFiles: [],
      content: str,
    };
  }
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
