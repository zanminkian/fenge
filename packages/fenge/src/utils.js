// @ts-check
import { Buffer } from "node:buffer";
import childProcess from "node:child_process";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { styleText } from "node:util";
import { lilconfig } from "lilconfig";
import ora from "ora";
import prettyMs from "pretty-ms";

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
 * @param {string[]} command
 * @param {{topic: string, dryRun: boolean, env: Record<string, string>}} options
 * @returns {Promise<number>}
 */
export function execAsync(command, { topic, dryRun, env }) {
  const [cmd, ...args] = command;
  if (!cmd) {
    return Promise.reject(new Error("cmd not found"));
  }
  if (dryRun) {
    process.stdout.write(`${styleText("green", cmd)} ${args.join(" ")};\n\n`);
    return Promise.resolve(0);
  }

  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const spinner = ora(`${topic}...`).start();
    /**
     * @type {childProcess.ChildProcessWithoutNullStreams | undefined}
     */
    let cp = childProcess.spawn(cmd, args, {
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
      reject(err);
    });
    // Why not listen to the 'exit' event?
    // 1. The 'close' event will always emit after 'exit' was already emitted, or 'error' if the child failed to spawn.
    // 2. The 'exit' event may or may not fire after an error has occurred.
    cp.on("close", (code, signal) => {
      if (code === 0) {
        spinner.succeed(
          `${topic} succeeded in ${styleText("yellow", prettyMs(Date.now() - startTime))}`,
        );
      } else {
        spinner.fail(
          `${topic} failed in ${styleText("yellow", prettyMs(Date.now() - startTime))}`,
        );
      }
      process.stdout.write(stdout);
      process.stderr.write(stderr);
      // When the cp exited, we should clean cp and the buffer to prevent memory leak.
      stdout = Buffer.alloc(0);
      stderr = Buffer.alloc(0);
      cp = undefined;
      resolve(code ?? (signal ? 128 + os.constants.signals[signal] : 1));
    });

    /**
     * @param {NodeJS.Signals} signal
     */
    const listener = (signal) => cp && !cp.killed && cp.kill(signal);
    process.on("SIGINT", listener);
    process.on("SIGTERM", listener);
  });
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
