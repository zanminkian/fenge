#!/usr/bin/env node
// @ts-check
import process from "node:process";
import { initAction, setup } from "@fenge/tsconfig/setup";
import { Command } from "commander";
import { format } from "../command/format.js";
import { install } from "../command/install.js";
import { lint } from "../command/lint.js";
import { uninstall } from "../command/uninstall.js";
import { importJson } from "../utils.js";

const pkgJson = await importJson(import.meta.url, "../../package.json");

const program = new Command().enablePositionalOptions();

program
  .name(pkgJson.name)
  .version(pkgJson.version)
  .description("format and then lint code")
  .option(
    "-f, --fix",
    "automatically fix linting problems only, will not format code",
  )
  .option(
    "-w, --write",
    "automatically format code only, will not fix linting problems",
  )
  .option("-u, --update", "automatically format code and fix linting problems")
  .option("-c, --config <path>", "path to configuration file")
  .option(
    "--default",
    "force to use built-in default config, ignore specified config and local config",
  )
  .option(
    "-d, --dry-run",
    "print what command will be executed under the hood instead of executing",
  )
  .argument("[paths...]", "dir or file paths to format and lint")
  .action(async (paths, options) => {
    let code = (await format(paths, options)) || (await lint(paths, options));
    if (options.fix || options.update) {
      code ||= await format(paths, options);
    }
    process.exit(code);
  });

program
  .command("lint")
  .description("lint code")
  .option("-f, --fix", "automatically fix linting problems")
  .option("-u, --update", "alias for '--fix' option")
  .option("-c, --config <path>", "path to configuration file")
  .option(
    "--default",
    "force to use built-in default config, ignore specified config and local config",
  )
  .option(
    "-d, --dry-run",
    "print what command will be executed under the hood instead of executing",
  )
  .argument("[paths...]", "dir or file paths to lint")
  .action(async (paths, options) => process.exit(await lint(paths, options)));

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
  .action(async (paths, options) => process.exit(await format(paths, options)));

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
