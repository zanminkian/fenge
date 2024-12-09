export function getJsConfig() {
  return {
    name: "fenge/javascript/config",
    files: ["**/*.config.{js,cjs,mjs,jsx}"],
    rules: {
      "es-x/no-top-level-await": "off",
      "esm/no-phantom-dep-imports": ["error", { allowDevDependencies: true }],
      "import/no-default-export": "off",
    },
  } as const;
}
