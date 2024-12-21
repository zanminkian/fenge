export function getTsDeclaration() {
  return {
    name: "fenge/typescript/declaration",
    files: ["**/*.d.{ts,cts,mts,tsx}"],
    rules: {
      "esm/no-empty-exports": "off",
      "esm/no-side-effect-imports": "off",
      "esm/required-exports": "off",
      "import/no-default-export": "off",
    },
  } as const;
}
