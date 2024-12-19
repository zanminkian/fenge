export function getJsTest() {
  return {
    // https://github.com/motemen/minimatch-cheat-sheet
    name: "fenge/javascript/test",
    files: [
      "**/__tests__/**/*.{js,cjs,mjs,jsx}",
      "**/*.{test,spec}.{js,cjs,mjs,jsx}",
    ],
    rules: {
      "es-x/no-top-level-await": "off",
      "esm/no-phantom-dep-imports": ["error", { allowDevDependencies: true }],
      "esm/required-exports": "off",
    },
  } as const;
}
