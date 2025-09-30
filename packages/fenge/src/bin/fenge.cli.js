#!/usr/bin/env node
// @ts-check
import process from "node:process";
import { initAction, setup } from "@fenge/tsconfig/setup";
import { Command } from "commander";
import { format } from "../command/format.js";
import { install } from "../command/install.js";
import { lint } from "../command/lint.js";
import { uninstall } from "../command/uninstall.js";
import { getPkgJson } from "../utils.js";

const program = new Command().enablePositionalOptions();

const pkgJson = await getPkgJson();
program
  .name(pkgJson.name)
  .version(pkgJson.version, "-v, --version")
  .description("format and then lint code")
  .option(
    "-f, --fix",
    "automatically fix linting problems only, will not format code (Warning: use with caution as this may not be completely safe)",
  )
  .option(
    "-w, --write",
    "automatically format code only, will not fix linting problems",
  )
  .option(
    "-u, --update",
    "automatically format code and fix linting problems (Warning: use with caution as this may not be completely safe)",
  )
  .option("-c, --config <path>", "path to configuration file")
  .option(
    "--default",
    "force to use built-in default config, built-in prettier and built-in eslint. ignore specified config, local config, local prettier and local eslint",
  )
  .option(
    "-d, --dry-run",
    "print what command will be executed under the hood instead of executing",
  )
  .argument("[paths...]", "dir or file paths to format and lint")
  .action(async (paths, options) => {
    /**
     * @type {{code: number, stdout: string, stderr: string, fixedFiles?: string[]}}
     */
    let result = await format(paths, options);
    result.stdout && console.log(result.stdout);
    result.stderr && console.error(result.stderr);
    if (result.code === 0) {
      result = await lint(paths, options);
      result.stdout && console.log(result.stdout);
      result.stderr && console.error(result.stderr);
      if (
        result.code === 0 &&
        (options.fix || options.update) &&
        result.fixedFiles?.length
      ) {
        result = await format(result.fixedFiles, options);
        result.stdout && console.log(result.stdout);
        result.stderr && console.error(result.stderr);
      }
    }
    process.exit(result.code);
  });

program
  .command("lint")
  .description("lint code")
  .option(
    "-f, --fix",
    "automatically fix linting problems (Warning: use with caution as this may not be completely safe)",
  )
  .option(
    "-u, --update",
    "alias for '--fix' option (Warning: use with caution as this may not be completely safe)",
  )
  .option("-c, --config <path>", "path to configuration file")
  .option(
    "--default",
    "force to use built-in default config, ignore specified config and local config",
  )
  .option("--timing", "print timing information")
  .option(
    "-d, --dry-run",
    "print what command will be executed under the hood instead of executing",
  )
  .argument("[paths...]", "dir or file paths to lint")
  .action(async (paths, options) => {
    const { code, stdout, stderr } = await lint(paths, options);
    stdout && console.log(stdout);
    stderr && console.error(stderr);
    process.exit(code);
  });

program
  .command("format")
  .description("format code")
  .option("-w, --write", "automatically format code")
  .option("-u, --update", "alias for '--write' option")
  .option("-c, --config <path>", "path to configuration file")
  .option(
    "--default",
    "force to use built-in default config, ignore specified config and local config",
  )
  .option(
    "-d, --dry-run",
    "print what command will be executed under the hood instead of executing",
  )
  .argument("[paths...]", "dir or file paths to format")
  .action(async (paths, options) => {
    const { code, stdout, stderr } = await format(paths, options);
    stdout && console.log(stdout);
    stderr && console.error(stderr);
    process.exit(code);
  });

program
  .command("install")
  .description(
    "write `pre-commit` hook file into `.git/hooks` folder, after that, the committed code will be formatted and linted",
  )
  .option("--no-format", "skip formatting code on git 'pre-commit' stage")
  .option("--no-lint", "skip linting code on git 'pre-commit' stage")
  .action(async (options) => await install(options));
program
  .command("uninstall")
  .description("remove `pre-commit` hook file from `.git/hooks` folder")
  .action(async () => await uninstall());

setup(program, {
  initCommand: "init-tsconfig",
  diffCommand: "diff-tsconfig",
  initAction: (options) =>
    initAction({ ...options, ext: `${pkgJson.name}/tsconfig` }),
});

program.parse();
