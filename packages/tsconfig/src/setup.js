// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { parseTsconfig } from "get-tsconfig";
import JSON5 from "json5";
import { printUnifiedDiff } from "print-diff";
import sortKeys from "sort-keys";

/**
 * @returns {Promise<{name: string, version: string}>}
 */
async function getPkgJson() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const content = await fs.readFile(
    path.join(__dirname, "..", "package.json"),
    "utf8",
  );
  return JSON.parse(content);
}

/**
 * @param {string} filepath
 */
async function exists(filepath) {
  return await fs
    .access(filepath)
    .then(() => true)
    .catch(() => false);
}

/**
 * @param {{path: string, name: string, force: boolean, ext?: string}} options
 */
export async function initAction(options) {
  const generatingTsconfigContent = `{
  "extends": "${options.ext ?? (await getPkgJson()).name}",
  "include": ["src"],
  "exclude": ["**/*.test.ts"]
}
`;

  const { path: filepath, name, force } = options;
  const fullName = path.resolve(process.cwd(), filepath, name);
  if (force || !(await exists(fullName))) {
    await fs.writeFile(fullName, generatingTsconfigContent);
  } else {
    throw new Error(
      `${fullName} is already existing! You can apply --force option to overwrite it.`,
    );
  }
}

/**
 * @param {{path: string, name: string, to: string}} options
 */
export async function diffAction(options) {
  const {
    path: filepath = ".",
    name = "tsconfig.json",
    to = "esm.json",
  } = options;

  const cwd = process.cwd();
  const dir = path.dirname(fileURLToPath(import.meta.url));

  const recommendedTsconfigPath = path.resolve(dir, "..", "tsconfig", to);
  const projectTsconfigPath = path.resolve(cwd, filepath, name);
  if (!(await exists(recommendedTsconfigPath))) {
    throw new Error(`Tsconfig ${recommendedTsconfigPath} is not found!`);
  }
  if (!(await exists(projectTsconfigPath))) {
    throw new Error(`Tsconfig ${projectTsconfigPath} is not found!`);
  }

  const recommendedTsconfig = parseTsconfig(recommendedTsconfigPath);
  const projectTsconfig = parseTsconfig(projectTsconfigPath);

  // correct the recommended tsconfig for a better diff view
  if (projectTsconfig.compilerOptions?.outDir) {
    recommendedTsconfig.compilerOptions ??= {};
    recommendedTsconfig.compilerOptions.outDir =
      projectTsconfig.compilerOptions.outDir;
  }
  if (projectTsconfig.exclude) {
    recommendedTsconfig.exclude = projectTsconfig.exclude;
  }

  printUnifiedDiff(
    JSON5.stringify(sortKeys(recommendedTsconfig, { deep: true }), null, 2),
    JSON5.stringify(sortKeys(projectTsconfig, { deep: true }), null, 2),
    {
      write: (data) => {
        process.stdout.write(
          data
            .replace("+ expected", "+ current project tsconfig")
            .replace("- actual", "- recommended tsconfig"),
        );
      },
    },
  );
}

/**
 * @param {import('commander').Command} program
 * @param {{initCommand?: string, diffCommand?: string, initAction?: typeof initAction, diffAction?: typeof diffAction}} options
 */
export function setup(program, options = {}) {
  program
    .command(options.initCommand ?? "init")
    .description("init a tsconfig file")
    .option("-p, --path <path>", "directory path to generate file to", ".")
    .option("-n, --name <filename>", "tsconfig file name", "tsconfig.json")
    .option("-f, --force", "forcefully overwrite existing file")
    .action(options.initAction ?? initAction);

  program
    .command(options.diffCommand ?? "diff")
    .description(
      "show differences between recommended tsconfig and current project tsconfig",
    )
    .option(
      "-p, --path <path>",
      "project directory path containing tsconfig",
      ".",
    )
    .option(
      "-n, --name <filename>",
      "project tsconfig file name",
      "tsconfig.json",
    )
    .option(
      "-t, --to <filename>",
      "which built-in recommended tsconfig file to compare with. possible values are 'esm.json'|'cjs.json'",
      "esm.json",
    )
    .action(options.diffAction ?? diffAction);
  return program;
}
