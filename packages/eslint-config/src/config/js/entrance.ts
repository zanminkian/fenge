export function getJsEntrance() {
  return {
    name: "fenge/javascript/entrance",
    files: ["**/main.{js,cjs,mjs,jsx}"],
    rules: {
      "esm/required-exports": "off",
    },
  } as const;
}
