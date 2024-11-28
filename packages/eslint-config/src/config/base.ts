import childProcess from "node:child_process";

function gitignore() {
  let stdout = "";
  try {
    stdout = childProcess.execSync(
      "git ls-files --others --ignored --exclude-standard --directory",
      { encoding: "utf8" },
    );
  } catch (e) {
    console.warn(
      "Warn: Running `git ls-files` fail. We recommend to run `git init` to setup the project first.",
      e,
    );
  }
  // https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores
  return [
    {
      name: "fenge/gitignore",
      ignores: stdout.split("\n").filter(Boolean),
    },
  ] as const;
}

export function base() {
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
        // noInlineConfig: true, // too strict
        reportUnusedDisableDirectives: true,
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
