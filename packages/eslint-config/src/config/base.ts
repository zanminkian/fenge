import childProcess from "node:child_process";
import type { Linter } from "eslint";
import checkFilePlugin from "eslint-plugin-check-file";

export type BaseOptions = Linter.LinterOptions;

export function base(
  options: BaseOptions,
  enabled: Set<"js" | "ts" | "pkg">,
): Linter.Config[] {
  const filesMap = {
    js: "**/*.{js,cjs,mjs,jsx}",
    ts: "**/*.{ts,cts,mts,tsx}",
    pkg: "**/package.json",
  } as const;
  const blockedFilesMap = {
    "**/.env.*": ".*.env",
    "**/.*rc": "*.config.js",
    "**/.*rc.*": "*.config.*",

    "**/*.{cjs,mjs,cts,mts}": "*.{js,ts}",
    "**/*.spec.{js,cjs,mjs,jsx,ts,cts,mts,tsx}":
      "*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}", // Node.js built-in support *.test.js. See https://nodejs.org/api/test.html#running-tests-from-the-command-line.
    "**/.*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}":
      "*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
  } as const;

  const enabledPatterns = [...enabled].map((key) => filesMap[key]);
  const blockedPatterns = Object.keys(blockedFilesMap);
  return [
    // Global ignore. Refer: https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores.
    {
      name: "fenge/gitignore",
      // There are 2 kinds of exception when running `git ls-files`:
      // 1. Git is not installed. The `stdout` will be null.
      // 2. The running directory is not initialized by `git init` command. The `stdout` will an empty string.
      ignores: (
        childProcess.spawnSync(
          "git",
          [
            "ls-files",
            "--others",
            "--ignored",
            "--exclude-standard",
            "--directory",
          ],
          { encoding: "utf8" },
        ).stdout || ""
      )
        .split("\n")
        .filter(Boolean),
    },
    {
      name: "fenge/common",
      files: [...enabledPatterns, ...blockedPatterns],
      linterOptions: options,
      plugins: {
        "check-file": checkFilePlugin,
      },
      rules: {
        "check-file/filename-blocklist": ["error", blockedFilesMap],
      },
    },
  ] as const;
}
