export function getJsCli() {
  return {
    name: "fenge/javascript/cli",
    files: ["**/*.cli.{js,cjs,mjs,jsx}"],
    rules: {
      "es-x/no-top-level-await": "off",
      "n/no-process-exit": "off",
      // "unicorn/no-process-exit": "off", // This rule can detect a file if is a cli file, so there is no need to disable it here.
      "no-console": "off",
    },
  } as const;
}
