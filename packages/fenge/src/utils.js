// @ts-check
import { Buffer } from "node:buffer";
import childProcess from "node:child_process";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { lilconfig } from "lilconfig";
import ora from "ora";
import prettyMs from "pretty-ms";
import colors from "yoctocolors";

/**
 * @returns {Promise<{name: string, version: string}>}
 */
export async function getPkgJson() {
  const content = await fs.readFile(
    path.join(dir(import.meta.url), "..", "package.json"),
    "utf8",
  );
  return JSON.parse(content);
}

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
 * Creates a spinner wrapper for async functions that shows progress and timing
 * @template {readonly unknown[]} TArgs - The arguments type for the function
 * @template {{ code: number }} TReturn - The return type that must have a code property
 * @param {(...args: TArgs) => Promise<TReturn>} func - The async function to wrap
 * @param {string} topic - The topic/description to show in the spinner
 * @returns {(...args: TArgs) => Promise<TReturn>} The wrapped function with spinner
 */
export function spin(func, topic) {
  return async (...args) => {
    const startTime = Date.now();
    const spinner = ora(`${topic}...`).start();
    /** @type {"succeed" | "fail"} */
    let succeedOrFail = "fail";
    try {
      const result = await func(...args);
      if (result.code === 0) succeedOrFail = "succeed";
      return result;
    } finally {
      spinner[succeedOrFail](
        `${topic} ${succeedOrFail} in ${colors.yellow(prettyMs(Date.now() - startTime))}`,
      );
    }
  };
}

/**
 * @param {string[]} command
 * @param {{dryRun: boolean, env: Record<string, string>}} options
 * @returns {Promise<{code: number, stdout: string, stderr: string}>}
 */
function execCmd(command, { dryRun, env }) {
  const [cmd, ...args] = command;
  if (!cmd) {
    return Promise.reject(new Error("cmd not found"));
  }
  if (dryRun) {
    return Promise.resolve({
      code: 0,
      stdout: `${colors.green(cmd)} ${args.join(" ")};\n`,
      stderr: "",
    });
  }

  return new Promise((resolve, reject) => {
    /**
     * @type {childProcess.ChildProcessWithoutNullStreams | undefined}
     */
    let cp = childProcess.spawn(cmd, args, {
      env: { FORCE_COLOR: "true", ...process.env, ...env },
    });

    /**
     * @param {NodeJS.Signals} signal
     */
    const listener = (signal) => cp && !cp.killed && cp.kill(signal);
    process.on("SIGINT", listener);
    process.on("SIGTERM", listener);

    let stdout = Buffer.alloc(0);
    let stderr = Buffer.alloc(0);
    cp.stdout.on("data", (data) => {
      stdout = Buffer.concat([stdout, data]);
    });
    cp.stderr.on("data", (data) => {
      stderr = Buffer.concat([stderr, data]);
    });
    cp.on("error", (err) => {
      process.removeListener("SIGINT", listener);
      process.removeListener("SIGTERM", listener);
      reject(err);
    });
    // Why not listen to the 'exit' event?
    // 1. The 'close' event will always emit after 'exit' was already emitted, or 'error' if the child failed to spawn.
    // 2. The 'exit' event may or may not fire after an error has occurred.
    cp.on("close", (code, signal) => {
      const stdoutString = stdout.toString("utf8");
      const stderrString = stderr.toString("utf8");
      // When the cp exited, we should clean cp and the buffer to prevent memory leak.
      stdout = Buffer.alloc(0);
      stderr = Buffer.alloc(0);
      cp = undefined;

      process.removeListener("SIGINT", listener);
      process.removeListener("SIGTERM", listener);
      resolve({
        code: code ?? (signal ? 128 + os.constants.signals[signal] : 1),
        stdout: stdoutString.trim(),
        stderr: stderrString.trim(),
      });
    });
  });
}

/**
 * @param {string} topic
 */
export const execAsync = (topic) => spin(execCmd, topic);

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
