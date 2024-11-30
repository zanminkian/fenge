export const tsDeclaration = {
  name: "fenge/typescript/declaration",
  files: ["**/*.d.{ts,cts,mts,tsx}"],
  rules: {
    "import/no-default-export": "off",
  },
} as const;
