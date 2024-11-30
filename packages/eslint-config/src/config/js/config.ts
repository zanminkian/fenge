export const jsConfig = {
  name: "fenge/javascript/config",
  files: ["**/*.config.{js,cjs,mjs,jsx}"],
  rules: {
    "esm/no-phantom-dep-imports": ["error", { allowDevDependencies: true }],
    "import/no-default-export": "off",
  },
} as const;
