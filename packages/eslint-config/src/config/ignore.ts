/**
 * This config is for suppressing error when linting a directory which does not contain supported files
 */
export function ignore() {
  return [
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
      rules: {},
    },
  ] as const;
}
