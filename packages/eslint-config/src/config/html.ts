import htmlPlugin from "@html-eslint/eslint-plugin";

export function html() {
  return [
    {
      name: "fenge/html",
      files: ["**/*.html"],
      plugins: {
        "@html-eslint": htmlPlugin,
      },
      language: "@html-eslint/html",
      rules: {
        // "@html-eslint/require-lang": "error",
        "@html-eslint/require-img-alt": "error",
        "@html-eslint/require-doctype": "error",
        "@html-eslint/require-title": "error",
        "@html-eslint/no-multiple-h1": "error",
        "@html-eslint/no-duplicate-id": "error",
        "@html-eslint/require-li-container": "error",
        "@html-eslint/no-obsolete-tags": "error",
        "@html-eslint/require-closing-tags": [ // Follow the style of Prettier
          "error",
          { selfClosing: "always" },
        ],
        "@html-eslint/no-duplicate-attrs": "error",
        "@html-eslint/use-baseline": "error",
        "@html-eslint/no-duplicate-in-head": "error",
      },
    },
  ] as const;
}
