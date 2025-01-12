import { getJsTest } from "../js/test.ts";

export function getTsTest() {
  const jsTest = getJsTest();
  return {
    ...jsTest,
    name: "fenge/typescript/test",
    files: [
      "**/__tests__/**/*.{ts,cts,mts,tsx}",
      "**/*.{test,spec}.{ts,cts,mts,tsx}",
    ],
    rules: {
      ...jsTest.rules,
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/unbound-method": "off",
    },
  } as const;
}
