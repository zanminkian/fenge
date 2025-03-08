import childProcess from "node:child_process";
import type { Linter } from "eslint";

export type BaseOptions = Linter.LinterOptions;

export function base(options: BaseOptions = {}): Linter.Config[] {
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
      files: [
        "**/*.{js,cjs,mjs,jsx}",
        "**/*.{ts,cts,mts,tsx}",
        "**/package.json",
      ],
      linterOptions: options,
    },
    // Ignore unsupported files.
    // This config is for suppressing error when linting a directory which does not contain supported files.
    {
      name: "fenge/ignore",
      files: ["**"], // I've tried all. Only '**' works.
      ignores: [
        "**/*.{js,cjs,mjs,jsx}",
        "**/*.{ts,cts,mts,tsx}",
        "**/package.json",
      ],
      processor: {
        preprocess: (_text: string, _filename: string) => [""],
        postprocess: (_messages: unknown[][]) => [], // Returning empty array to ignore all errors
      },
    },
  ] as const;
}
