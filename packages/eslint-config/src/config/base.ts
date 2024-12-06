import childProcess from "node:child_process";

export interface LinterOptions {
  reportUnusedDisableDirectives?: "error" | "warn" | "off";
  noInlineConfig?: boolean;
}

function gitignore() {
  // There are 2 kinds of exception:
  // 1. Git is not installed. The `stdout` will be null.
  // 2. The running directory is not initialized by `git init` command. The `stdout` will an empty string.
  const { stdout } = childProcess.spawnSync(
    "git",
    ["ls-files", "--others", "--ignored", "--exclude-standard", "--directory"],
    { encoding: "utf8" },
  );
  // https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores
  return [
    {
      name: "fenge/gitignore",
      ignores: (stdout || "").split("\n").filter(Boolean),
    },
  ] as const;
}

export function base({
  reportUnusedDisableDirectives = "off",
  noInlineConfig = false,
}: LinterOptions = {}) {
  return [
    ...gitignore(), // global ignore
    {
      name: "fenge/common",
      files: [
        "**/*.{js,cjs,mjs,jsx}",
        "**/*.{ts,cts,mts,tsx}",
        "**/package.json",
      ],
      linterOptions: {
        reportUnusedDisableDirectives,
        noInlineConfig,
      },
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
