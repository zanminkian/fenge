import process from "node:process";
import * as fengeTsPlugin from "@fenge/eslint-plugin-ts";
import tsParser from "@typescript-eslint/parser";
import deprecationPlugin from "eslint-plugin-deprecation";
import { javascript } from "./javascript.js";

export function typescript(project?: string) {
  const jsConfig = javascript()[0];

  const getTsExtensionRules = () => {
    // https://typescript-eslint.io/rules/?=extension
    const extensionRuleKeys = [
      "block-spacing",
      "brace-style",
      "class-methods-use-this",
      "comma-dangle",
      "comma-spacing",
      "consistent-return",
      "default-param-last",
      "dot-notation",
      "func-call-spacing",
      "indent",
      "init-declarations",
      "key-spacing",
      "keyword-spacing",
      "lines-around-comment",
      "lines-between-class-members",
      "max-params",
      "no-array-constructor",
      "no-dupe-class-members",
      "no-empty-function",
      "no-extra-parens",
      "no-extra-semi",
      "no-implied-eval",
      "no-invalid-this",
      "no-loop-func",
      // "no-loss-of-precision",
      "no-magic-numbers",
      "no-redeclare",
      "no-restricted-imports",
      "no-shadow",
      "no-throw-literal",
      "no-unused-expressions",
      "no-unused-vars",
      "no-use-before-define",
      "no-useless-constructor",
      "object-curly-spacing",
      "only-throw-error", // this rule based on 'eslint/no-throw-literal'
      "padding-line-between-statements",
      "prefer-destructuring",
      "prefer-promise-reject-errors",
      "quotes",
      "require-await",
      "return-await", // this rule based on 'eslint/no-return-await' instead of 'eslint/return-await'
      "semi",
      "space-before-blocks",
      "space-before-function-paren",
      "space-infix-ops",
    ] as const;
    type ExtensionRuleKey = (typeof extensionRuleKeys)[number];
    type JsConfigRuleKey = keyof typeof jsConfig.rules;

    type JsExtensionKey = Extract<ExtensionRuleKey, JsConfigRuleKey>; // Extract
    type TsExtensionKey = `@typescript-eslint/${JsExtensionKey}`;

    type GetJsKey<T extends TsExtensionKey> =
      T extends `@typescript-eslint/${infer K}` ? K : never;
    type JsResult = {
      [Key in JsExtensionKey]: "off";
    };
    type TsResult = {
      [Key in TsExtensionKey]: (typeof jsConfig.rules)[GetJsKey<Key>];
    };
    type Result = JsResult & TsResult;

    const extensionRuleKeySet = new Set<string>(extensionRuleKeys);
    return Object.entries(jsConfig.rules)
      .filter(([key]) => extensionRuleKeySet.has(key))
      .reduce(
        (prev, [jsRuleKey, jsRuleValue]) => ({
          ...prev,
          [jsRuleKey]: "off",
          [`@typescript-eslint/${jsRuleKey}`]: jsRuleValue,
        }),
        {} as Result,
      );
  };

  return [
    {
      ...jsConfig,
      name: "fenge/typescript",
      files: ["**/*.{ts,cts,mts,tsx}"],
      languageOptions: {
        ...jsConfig.languageOptions,
        parser: tsParser, // Unfortunately parser cannot be a string. Eslint should support it. https://eslint.org/docs/latest/use/configure/configuration-files-new#configuring-a-custom-parser-and-its-options
        parserOptions: {
          ...jsConfig.languageOptions.parserOptions,
          tsconfigRootDir: process.cwd(),
          project: project ?? "tsconfig.json",
        },
      },
      plugins: {
        ...jsConfig.plugins,
        deprecation: deprecationPlugin,
        "@fenge-ts": fengeTsPlugin,
      },
      rules: {
        ...jsConfig.rules,
        ...getTsExtensionRules(),

        // deprecation
        "deprecation/deprecation": "error",
        // fenge
        "@fenge-ts/exact-map-set-type": "error",
        "@fenge-ts/no-const-enum": "error",
        "@fenge-ts/no-declares-in-ts-file": "error",
        "@fenge-ts/no-export-assignment": "error",
        "@fenge-ts/no-property-decorator": "error",
        "@fenge-ts/no-untyped-empty-array": "error",
        // typescript
        "@typescript-eslint/adjacent-overload-signatures": "error",
        // "@typescript-eslint/array-type": ["error", 'array-simple'], // The default option is 'array'. Not very sure if we need to change the option. So disabled it.
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/ban-types": "error",
        "@typescript-eslint/consistent-generic-constructors": "error",
        "@typescript-eslint/consistent-indexed-object-style": "error",
        "@typescript-eslint/consistent-type-assertions": [
          "error",
          {
            assertionStyle: "as",
            objectLiteralTypeAssertions: "allow-as-parameter",
          },
        ],
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ], // TODO should we change to 'type'?
        "@typescript-eslint/consistent-type-exports": "error",
        // "@typescript-eslint/consistent-type-imports": "error,
        "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }],
        "@typescript-eslint/method-signature-style": "error",
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "function",
            format: ["camelCase", "PascalCase"],
          },
          {
            selector: "variable",
            types: ["function"],
            format: ["camelCase", "PascalCase"], // decorators need PascalCase
          },
          {
            selector: "class",
            format: ["PascalCase"],
          },
          {
            selector: "interface",
            format: ["PascalCase"],
          },
          {
            selector: "typeAlias",
            format: ["PascalCase"],
          },
          {
            selector: "typeParameter",
            format: ["UPPER_CASE", "PascalCase"],
          },
        ],
        "@typescript-eslint/no-array-delete": "error",
        "@typescript-eslint/no-base-to-string": [
          "error",
          { ignoredTypeNames: [] },
        ],
        "@typescript-eslint/no-confusing-non-null-assertion": "error",
        "@typescript-eslint/no-duplicate-enum-values": "error",
        "@typescript-eslint/no-duplicate-type-constituents": "error",
        "@typescript-eslint/no-empty-object-type": "error",
        "@typescript-eslint/no-extra-non-null-assertion": "error",
        "@typescript-eslint/no-floating-promises": [
          "error",
          {
            ignoreVoid: false,
          },
        ],
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/no-mixed-enums": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-unnecessary-parameter-property-assignment":
          "error",
        "@typescript-eslint/no-unnecessary-template-expression": "error", // js also need this rule
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-unnecessary-type-constraint": "error",
        "@typescript-eslint/no-unsafe-declaration-merging": "error",
        // '@typescript-eslint/no-unsafe-function-type': "error",
        // "@typescript-eslint/no-wrapper-object-types": "error",
        "@typescript-eslint/only-throw-error": "error",
        "@typescript-eslint/prefer-as-const": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/prefer-readonly": "error",
        "@typescript-eslint/prefer-ts-expect-error": "error",
        "@typescript-eslint/restrict-plus-operands": [
          "error",
          {
            // allowAny: false,
            allowBoolean: false,
            allowNullish: false,
            allowNumberAndString: false,
            allowRegExp: false,
          },
        ],
        // "@typescript-eslint/restrict-template-expressions": "error",
        "@typescript-eslint/return-await": ["error", "always"],
        "@typescript-eslint/switch-exhaustiveness-check": [
          "error",
          { requireDefaultForNonUnion: true },
        ],
        "@typescript-eslint/unbound-method": "error",
        "@typescript-eslint/unified-signatures": "error",
      },
    },
    {
      name: "fenge/typescript/config",
      files: ["**/*.config.{ts,cts,mts,tsx}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      name: "fenge/typescript/declaration",
      files: ["**/*.d.{ts,cts,mts,tsx}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      // https://github.com/motemen/minimatch-cheat-sheet
      name: "fenge/typescript/test",
      files: [
        "**/__tests__/**/*.{ts,cts,mts,tsx}",
        "**/*.{test,spec}.{ts,cts,mts,tsx}",
      ],
      rules: {
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/unbound-method": "off",
        "esm/no-phantom-dep-imports": ["error", { allowDevDependencies: true }],
      },
    },
  ] as const;
}
