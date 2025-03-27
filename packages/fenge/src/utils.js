// @ts-check
import { Buffer } from "node:buffer";
import childProcess from "node:child_process";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { lilconfig } from "lilconfig";
import ora from "ora";
import colors from "yoctocolors"; // TODO: Use [util.styleText](https://nodejs.org/api/util.html#utilstyletextformat-text-options) once we drop support for Node.js < 20.12.0.

/**
 * @param {string} filepath
 */
export async function exists(filepath) {
  return await fs
    .access(filepath)
    .then(() => true)
    .catch(() => false);
}

/**
 * Get current directory of the js file
 * Usage: `dir(import.meta.url)`
 * @param {string} importMetaUrl
 */
export function dir(importMetaUrl) {
  return path.dirname(fileURLToPath(importMetaUrl));
}

/**
 * @param {string} module
 * @param {string} [loadPath]
 */
export async function resolveConfig(module, loadPath) {
  const searcher = lilconfig(module, { stopDir: process.cwd() });
  return loadPath
    ? await searcher.load(loadPath)
    : await searcher.search(process.cwd());
}

/**
 * @param {number} startTime
 */
function getSpentTime(startTime) {
  const cost = Date.now() - startTime;
  if (cost < 1000) {
    return `${cost}ms`;
  } else if (cost < 60 * 1000) {
    return `${cost / 1000}s`;
  } else {
    const second = Math.floor(cost / 1000);
    return `${Math.floor(second / 60)}m${Math.floor(second % 60)}s`;
  }
}

/**
 * @param {string[]} command
 * @param {{topic: string, dryRun: boolean, env: Record<string, string>}} options
 * @returns {Promise<number>}
 */
export function execAsync(command, { topic, dryRun, env }) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const [cmd, ...args] = command;
    if (!cmd) {
      return reject(new Error("cmd not found"));
    }
    if (dryRun) {
      process.stdout.write(`${colors.green(cmd)} ${args.join(" ")};\n\n`);
      return resolve(0);
    }

    const spinner = ora(`${topic}...`).start();
    const cp = childProcess.spawn(cmd, args, {
      env: { FORCE_COLOR: "true", ...process.env, ...env },
    });
    let stdout = Buffer.alloc(0);
    let stderr = Buffer.alloc(0);
    cp.stdout.on("data", (data) => {
      stdout = Buffer.concat([stdout, data]);
    });
    cp.stderr.on("data", (data) => {
      stderr = Buffer.concat([stderr, data]);
    });
    cp.on("error", (err) => {
      spinner.fail(
        `${topic} got error in ${colors.yellow(getSpentTime(startTime))}`,
      );
      process.stderr.write(err.message);
      resolve(getExitCode(err));
    });
    // Why not listen to the 'exit' event?
    // 1. The 'close' event will always emit after 'exit' was already emitted, or 'error' if the child failed to spawn.
    // 2. The 'exit' event may or may not fire after an error has occurred.
    cp.on("close", (code, signal) => {
      const exitCode = getExitCode({ code, signal });
      if (exitCode === 0) {
        spinner.succeed(
          `${topic} succeeded in ${colors.yellow(getSpentTime(startTime))}`,
        );
      } else {
        spinner.fail(
          `${topic} failed in ${colors.yellow(getSpentTime(startTime))}`,
        );
      }
      process.stdout.write(stdout);
      process.stderr.write(stderr);
      resolve(exitCode);
    });
    process.on("SIGINT", () => !cp.killed && cp.kill("SIGINT"));
    process.on("SIGTERM", () => !cp.killed && cp.kill("SIGTERM"));
  });
}

/**
 * @param {object} error
 */
function getExitCode(error) {
  if ("signal" in error && error.signal === "SIGINT") {
    return 2;
  }
  if ("signal" in error && error.signal === "SIGTERM") {
    return 15;
  }
  if ("code" in error && typeof error.code === "number") {
    return error.code;
  }
  return 1;
}

/**
 * @param {string} moduleName `eslint` or `prettier` or `@commitlint/cli` or `lint-staged`
 * @param {string} from directory path or file path
 */
export async function getBinPath(
  moduleName,
  from = fileURLToPath(import.meta.url),
  cliName = moduleName,
) {
  const fromPath =
    !from.endsWith(path.sep) && (await fs.stat(from)).isDirectory()
      ? from + path.sep
      : from;
  const packageJsonPath = createRequire(fromPath).resolve(
    `${moduleName}/package.json`,
  );
  /** @type {any} */
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
  const modulePath = path.dirname(packageJsonPath);
  const binPath =
    typeof packageJson.bin === "string"
      ? packageJson.bin
      : packageJson.bin[cliName];
  if (typeof binPath !== "string")
    throw new Error(`Cannot find bin ${cliName} in module ${moduleName}`);
  return path.resolve(modulePath, binPath);
}
