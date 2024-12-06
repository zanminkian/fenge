export const jsCli = {
  name: "fenge/javascript/cli",
  files: ["**/*.cli.{js,cjs,mjs,jsx}"],
  rules: {
    "es-x/no-top-level-await": "off",
    "no-console": "off",
  },
} as const;
