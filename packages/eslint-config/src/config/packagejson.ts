import * as pkg from "eslint-plugin-pkg-json";
import parser from "eslint-plugin-pkg-json/jsonc-eslint-parser";
import * as publint from "eslint-plugin-publint";

// JSON is a subset of JavaScript, so we use `languageOptions.parser` field. Refer: https://github.com/ota-meshi/eslint-plugin-jsonc?tab=readme-ov-file#how-does-eslint-plugin-jsonc-work
// Using `language` field may be better.
export function packagejson() {
  return [
    {
      name: "fenge/packagejson",
      files: ["**/package.json"],
      languageOptions: {
        parser,
      },
      plugins: {
        "pkg-json": pkg,
        publint,
      },
      rules: {
        "pkg-json/bottom-default": "error",
        "pkg-json/compatible-engines-node-version": "error",
        "pkg-json/consistent-dependency-versions": "error",
        "pkg-json/exact-dependency-version": "error",
        "pkg-json/no-conflict-types": "error",
        "pkg-json/no-dependencies-in-workspace-root": "error",
        "pkg-json/no-engines": "error",
        "pkg-json/no-lifecycle-script": "error",
        "pkg-json/no-nonstandard-property": "error",
        "pkg-json/no-restricted-deps": "error",
        "pkg-json/no-types-dependency-in-workspace-root": "error",
        "pkg-json/no-types-deps": "warn",
        "pkg-json/top-types": "error",
        "pkg-json/private-workspace-root": "error",
        "pkg-json/required-dev-engines": "error",
        "pkg-json/required-engines": "error",
        "pkg-json/required-files": "error",
        "pkg-json/required-hashbang": "error",
        "pkg-json/required-repository": "error",
        "pkg-json/type-module": "error",
        "publint/suggestion": "error",
        "publint/warning": "error",
        "publint/error": "error",
      },
    },
  ] as const;
}
