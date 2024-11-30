export const jsTest = {
  // https://github.com/motemen/minimatch-cheat-sheet
  name: "fenge/javascript/test",
  files: [
    "**/__tests__/**/*.{js,cjs,mjs,jsx}",
    "**/*.{test,spec}.{js,cjs,mjs,jsx}",
  ],
  rules: {
    "esm/no-phantom-dep-imports": ["error", { allowDevDependencies: true }],
  },
} as const;
