// @ts-check
import { Buffer } from "node:buffer";
import childProcess from "node:child_process";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import { lilconfig } from "lilconfig";
import ora from "ora";

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
 * Usage: `importJson(import.meta.url, '../xx.json')`
 * @param {string} importMetaUrl
 * @param {string} jsonPath
 * @returns {Promise<any>}
 */
export async function importJson(importMetaUrl, jsonPath) {
  return JSON.parse(
    await fs.readFile(path.resolve(dir(importMetaUrl), jsonPath), "utf8"),
  );
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
export async function execAsync(command, { topic, dryRun, env }) {
  const [cmd, ...args] = command;
  if (!cmd) {
    throw new Error("cmd not found");
  }
  if (dryRun) {
    console.log(`${chalk.green(cmd)} ${args.join(" ")}`);
    return 0;
  }
  const startTime = Date.now();
  return new Promise((resolve) => {
    const spinner = ora(`${topic}...`).start();
    const cp = childProcess.spawn(cmd, args, {
      env: { FORCE_COLOR: "true", ...process.env, ...env },
    });
    let stdout = Buffer.from([]);
    let stderr = Buffer.from([]);
    cp.stdout.on("data", (data) => {
      stdout = Buffer.concat([stdout, data]);
    });
    cp.stderr.on("data", (data) => {
      stderr = Buffer.concat([stderr, data]);
    });
    // The 'close' event will always emit after 'exit' was already emitted, or 'error' if the child failed to spawn.
    cp.on("close", () => {
      process.stdout.write(stdout);
      process.stderr.write(stderr);
    });
    cp.on("error", (err) => {
      spinner.fail(
        `${topic} got error in ${chalk.yellow(getSpentTime(startTime))}`,
      );
      resolve(getExitCode(err));
    });
    // The 'exit' event may or may not fire after an error has occurred.
    cp.on("exit", (code, signal) => {
      const exitCode = getExitCode({ code, signal });
      if (exitCode === 0) {
        spinner.succeed(
          `${topic} succeeded in ${chalk.yellow(getSpentTime(startTime))}`,
        );
      } else {
        spinner.fail(
          `${topic} failed in ${chalk.yellow(getSpentTime(startTime))}`,
        );
      }
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
 * @param {string} cliName
 */
export async function getBinPath(moduleName, cliName = moduleName) {
  const packageJsonPath = createRequire(import.meta.url).resolve(
    `${moduleName}/package.json`,
  );
  /** @type {any} */
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
  const modulePath = packageJsonPath.slice(0, -"/package.json".length);
  const binPath =
    typeof packageJson.bin === "string"
      ? packageJson.bin
      : packageJson.bin[cliName];
  return path.resolve(modulePath, binPath);
}
