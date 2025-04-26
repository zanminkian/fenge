export function getTsDeclaration() {
  return {
    name: "fenge/typescript/declaration",
    files: ["**/*.d.{ts,cts,mts,tsx}"],
    rules: {
      "@typescript-eslint/triple-slash-reference": [
        "error",
        { lib: "always", path: "never", types: "never" },
      ],
      "esm/no-declaration-file-imports": "off",
      "esm/no-empty-exports": "off",
      "esm/no-side-effect-imports": "off",
      "esm/required-exports": "off",
      "import/no-default-export": "off",
    },
  } as const;
}
