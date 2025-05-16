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
    pkg: "package.json",
  } as const;
  const blockedFilesMap = {
    "**/.env.*": ".*.env",
    "**/.*rc": "*.config.js",
    "**/.*rc.*": "*.config.*",
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
      files: enabledPatterns,
      linterOptions: options,
    },
    {
      name: "fenge/disallowed-files",
      files: blockedPatterns,
      ignores: enabledPatterns,
      processor: {
        preprocess: (_text: string, _filename: string) => [""],
        postprocess: (messages) => messages[0] ?? [],
      },
      plugins: {
        "check-file": checkFilePlugin,
      },
      rules: {
        "check-file/filename-blocklist": ["error", blockedFilesMap],
      },
    },
    // Ignore unsupported files.
    // This config is for suppressing error when linting a directory which does not contain supported files.
    {
      name: "fenge/ignore",
      files: ["**"], // I've tried all. Only '**' works.
      ignores: [...enabledPatterns, ...blockedPatterns],
      processor: {
        preprocess: (_text: string, _filename: string) => [""],
        postprocess: (_messages: unknown[][]) => [], // Returning empty array to ignore all errors
      },
    },
  ] as const;
}
