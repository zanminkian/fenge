import path from "node:path";
import process from "node:process";
import * as fengeTsPlugin from "@fenge/eslint-plugin-ts";
import tsParser from "@typescript-eslint/parser";
import { exists } from "../../utils.js";
import { jsBase } from "../js/base.js";

const getTsExtensionRules = () => {
  // Key is js rule, value is ts rule
  // https://typescript-eslint.io/rules/?=extension
  const extensionRuleMap = {
    "class-methods-use-this": "@typescript-eslint/class-methods-use-this",
    "consistent-return": "@typescript-eslint/consistent-return",
    "default-param-last": "@typescript-eslint/default-param-last",
    "dot-notation": "@typescript-eslint/dot-notation",
    "init-declarations": "@typescript-eslint/init-declarations",
    "max-params": "@typescript-eslint/max-params",
    "no-array-constructor": "@typescript-eslint/no-array-constructor",
    "no-dupe-class-members": "@typescript-eslint/no-dupe-class-members",
    "no-empty-function": "@typescript-eslint/no-empty-function",
    "no-implied-eval": "@typescript-eslint/no-implied-eval",
    "no-invalid-this": "@typescript-eslint/no-invalid-this",
    "no-loop-func": "@typescript-eslint/no-loop-func",
    // "no-loss-of-precision": "@typescript-eslint/no-loss-of-precision", // This rule has been deprecated
    "no-magic-numbers": "@typescript-eslint/no-magic-numbers",
    "no-redeclare": "@typescript-eslint/no-redeclare",
    "no-restricted-imports": "@typescript-eslint/no-restricted-imports",
    "no-shadow": "@typescript-eslint/no-shadow",
    "no-unused-expressions": "@typescript-eslint/no-unused-expressions",
    "no-unused-vars": "@typescript-eslint/no-unused-vars",
    "no-use-before-define": "@typescript-eslint/no-use-before-define",
    "no-useless-constructor": "@typescript-eslint/no-useless-constructor",
    "no-throw-literal": "@typescript-eslint/only-throw-error",
    "prefer-destructuring": "@typescript-eslint/prefer-destructuring",
    "prefer-promise-reject-errors":
      "@typescript-eslint/prefer-promise-reject-errors",
    "require-await": "@typescript-eslint/require-await",
    "no-return-await": "@typescript-eslint/return-await", // no-return-await has been deprecated
  } as const;

  type Js2TsRuleMap = typeof extensionRuleMap;
  type Ts2JsRuleMap = {
    [K in keyof Js2TsRuleMap as Js2TsRuleMap[K]]: K; // reverse
  };

  type JsExtensionKey = Extract<keyof Js2TsRuleMap, keyof typeof jsBase.rules>; // Extract
  type TsExtensionKey = Js2TsRuleMap[JsExtensionKey];

  type JsResult = Record<JsExtensionKey, "off">;
  type TsResult = {
    [Key in TsExtensionKey]: (typeof jsBase.rules)[Ts2JsRuleMap[Key]];
  };
  type Result = JsResult & TsResult;

  const isInExtensionRuleMap = (
    key: string,
  ): key is keyof typeof extensionRuleMap => key in extensionRuleMap;
  return Object.entries(jsBase.rules).reduce(
    (result, [jsRuleKey, jsRuleValue]) =>
      isInExtensionRuleMap(jsRuleKey)
        ? {
            ...result,
            [jsRuleKey]: "off",
            [extensionRuleMap[jsRuleKey]]: jsRuleValue,
          }
        : result,
    {} as Result,
  );
};

const getTypeCheckedParserOptions = async () => {
  const cwd = process.cwd();
  if (await exists(path.resolve(cwd, "tsconfig.json"))) {
    return {
      tsconfigRootDir: cwd,
      // Setting `projectService: true` or `project: true` is pretty slow when lint a monorepo with many tsconfig.json files in each sub-app.
      // For a better performance, we are recommended using one tsconfig.json file in a project.
      // Waiting for typescript-eslint to officially provide a better way to use `projectService`.
      project: "tsconfig.json",
    };
  }
  return undefined;
};

// export it for unit test
// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/disable-type-checked.ts
export const disabledTypeCheckedRules = {
  "@typescript-eslint/await-thenable": "off",
  "@typescript-eslint/consistent-return": "off",
  "@typescript-eslint/consistent-type-exports": "off",
  "@typescript-eslint/dot-notation": "off",
  "@typescript-eslint/naming-convention": "off",
  "@typescript-eslint/no-array-delete": "off",
  "@typescript-eslint/no-base-to-string": "off",
  "@typescript-eslint/no-confusing-void-expression": "off",
  "@typescript-eslint/no-deprecated": "off",
  "@typescript-eslint/no-duplicate-type-constituents": "off",
  "@typescript-eslint/no-floating-promises": "off",
  "@typescript-eslint/no-for-in-array": "off",
  "@typescript-eslint/no-implied-eval": "off",
  "@typescript-eslint/no-meaningless-void-operator": "off",
  "@typescript-eslint/no-misused-promises": "off",
  "@typescript-eslint/no-mixed-enums": "off",
  "@typescript-eslint/no-redundant-type-constituents": "off",
  "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
  "@typescript-eslint/no-unnecessary-condition": "off",
  "@typescript-eslint/no-unnecessary-qualifier": "off",
  "@typescript-eslint/no-unnecessary-template-expression": "off",
  "@typescript-eslint/no-unnecessary-type-arguments": "off",
  "@typescript-eslint/no-unnecessary-type-assertion": "off",
  "@typescript-eslint/no-unnecessary-type-parameters": "off",
  "@typescript-eslint/no-unsafe-argument": "off",
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unsafe-enum-comparison": "off",
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-unsafe-return": "off",
  "@typescript-eslint/no-unsafe-type-assertion": "off",
  "@typescript-eslint/no-unsafe-unary-minus": "off",
  "@typescript-eslint/non-nullable-type-assertion-style": "off",
  "@typescript-eslint/only-throw-error": "off",
  "@typescript-eslint/prefer-destructuring": "off",
  "@typescript-eslint/prefer-find": "off",
  "@typescript-eslint/prefer-includes": "off",
  "@typescript-eslint/prefer-nullish-coalescing": "off",
  "@typescript-eslint/prefer-optional-chain": "off",
  "@typescript-eslint/prefer-promise-reject-errors": "off",
  "@typescript-eslint/prefer-readonly": "off",
  "@typescript-eslint/prefer-readonly-parameter-types": "off",
  "@typescript-eslint/prefer-reduce-type-parameter": "off",
  "@typescript-eslint/prefer-regexp-exec": "off",
  "@typescript-eslint/prefer-return-this-type": "off",
  "@typescript-eslint/prefer-string-starts-ends-with": "off",
  "@typescript-eslint/promise-function-async": "off",
  "@typescript-eslint/related-getter-setter-pairs": "off",
  "@typescript-eslint/require-array-sort-compare": "off",
  "@typescript-eslint/require-await": "off",
  "@typescript-eslint/restrict-plus-operands": "off",
  "@typescript-eslint/restrict-template-expressions": "off",
  "@typescript-eslint/return-await": "off",
  "@typescript-eslint/strict-boolean-expressions": "off",
  "@typescript-eslint/switch-exhaustiveness-check": "off",
  "@typescript-eslint/unbound-method": "off",
  "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
} as const;

const typeCheckedParserOptions = await getTypeCheckedParserOptions();

export const tsBase = {
  ...jsBase,
  name: "fenge/typescript",
  files: ["**/*.{ts,cts,mts,tsx}"],
  languageOptions: {
    ...jsBase.languageOptions,
    parser: tsParser, // Unfortunately parser cannot be a string. Eslint should support it. https://eslint.org/docs/latest/use/configure/configuration-files-new#configuring-a-custom-parser-and-its-options
    parserOptions: {
      ...jsBase.languageOptions.parserOptions,
      ...typeCheckedParserOptions,
    },
  },
  plugins: {
    ...jsBase.plugins,
    "@fenge-ts": fengeTsPlugin,
  },
  rules: {
    ...jsBase.rules,
    ...getTsExtensionRules(),

    // fenge
    "@fenge-ts/exact-map-set-type": "error",
    "@fenge-ts/no-const-enum": "error",
    "@fenge-ts/no-declares": "error",
    "@fenge-ts/no-export-assignment": "error",
    "@fenge-ts/no-property-decorator": "error",
    "@fenge-ts/no-untyped-empty-array": "error",
    // typescript
    "@typescript-eslint/adjacent-overload-signatures": "error",
    // "@typescript-eslint/array-type": ["error", 'array-simple'], // The default option is 'array'. Not very sure if we need to change the option. So disabled it.
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/consistent-generic-constructors": "error",
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "allow-as-parameter",
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"], // TODO should we change to 'type'?
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
    "@typescript-eslint/no-base-to-string": ["error", { ignoredTypeNames: [] }],
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-deprecated": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-duplicate-type-constituents": "error",
    "@typescript-eslint/no-empty-object-type": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    // "@typescript-eslint/no-extraneous-class": "error", // Classes have only static member is reasonable sometimes.
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        ignoreVoid: false,
      },
    ],
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-invalid-void-type": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-mixed-enums": "error",
    "@typescript-eslint/no-namespace": "error", // consider to add option `{"allowDefinitionFiles": false}` to strictly forbid `namespace` keyword
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-redundant-type-constituents": "error",
    "@typescript-eslint/no-require-imports": "error",
    // "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error", // unsafe when `strictNullChecks` in tsconfig.json is disabled
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-parameter-property-assignment": "error",
    "@typescript-eslint/no-unnecessary-template-expression": "error", // js also need this rule
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/no-unsafe-declaration-merging": "error",
    "@typescript-eslint/no-unsafe-enum-comparison": "error",
    "@typescript-eslint/no-unsafe-function-type": "error",
    "@typescript-eslint/no-unsafe-return": "error", // This rule is not very perfect. See https://github.com/typescript-eslint/typescript-eslint/issues/10439
    "@typescript-eslint/no-unsafe-unary-minus": "error",
    "@typescript-eslint/no-wrapper-object-types": "error",
    "@typescript-eslint/non-nullable-type-assertion-style": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-literal-enum-member": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/prefer-return-this-type": "error",
    "@typescript-eslint/restrict-plus-operands": [
      "error",
      {
        // allowAny: false,
        allowBoolean: false,
        allowNullish: false,
        allowNumberAndString: false,
        allowRegExp: false,
        skipCompoundAssignments: false,
      },
    ],
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allow: [],
        // allowAny: false,
        allowBoolean: false,
        allowNever: false,
        allowNullish: false,
        allowNumber: false,
        allowRegExp: false,
      },
    ],
    "@typescript-eslint/related-getter-setter-pairs": "error",
    "@typescript-eslint/return-await": ["error", "always"],
    "@typescript-eslint/switch-exhaustiveness-check": [
      "error",
      { requireDefaultForNonUnion: true },
    ],
    "@typescript-eslint/unbound-method": "error",
    "@typescript-eslint/unified-signatures": "error",

    ...(typeCheckedParserOptions ? {} : disabledTypeCheckedRules),
  },
} as const;
