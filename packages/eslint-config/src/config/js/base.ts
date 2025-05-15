import * as fengePlugin from "@fenge/eslint-plugin";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import confusingKeys from "confusing-browser-globals";
import checkFilePlugin from "eslint-plugin-check-file";
import esxPlugin from "eslint-plugin-es-x";
import * as esmPlugin from "eslint-plugin-esm";
import fpPlugin from "eslint-plugin-fp";
import importPlugin from "eslint-plugin-import";
import nPlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";

export function getJsBase() {
  // copied from https://github.com/standard/eslint-config-standard/blob/master/src/index.ts
  // prettier-ignore
  const standardConfigRules = {
    'no-var': 'error',
    'object-shorthand': ['error', 'properties'],

    'accessor-pairs': ['error', { setWithoutGet: true, enforceForClassMembers: true }],
    'array-callback-return': ['error', {
      allowImplicit: false,
      checkForEach: false
    }],
    camelcase: ['error', {
      allow: ['^UNSAFE_'],
      properties: 'never',
      ignoreGlobals: true
    }],
    'constructor-super': 'error',
    'default-case-last': 'error',
    // 'dot-notation': ['error', { allowKeywords: true }], // TODO: This should be enabled. Disable it as it conflicts with ts when enabling ts-check
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
    // 'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-async-promise-executor': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-const-assign': 'error',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-useless-backreference': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-fallthrough': 'error',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implied-eval': 'error',
    'no-import-assign': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
    'no-lone-blocks': 'error',
    'no-loss-of-precision': 'error',
    'no-misleading-character-class': 'error',
    'no-prototype-builtins': 'error',
    'no-useless-catch': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-redeclare': ['error', { builtinGlobals: false }],
    'no-regex-spaces': 'error',
    'no-return-assign': ['error', 'except-parens'],
    'no-self-assign': ['error', { props: true }],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    // 'no-template-curly-in-string': 'error', // VSCode an WebStorm can detect it. Enabling this will decrease flexibility. For example, long content containing ${foo} is reasonable.
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-undef': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unused-expressions': ['error', {
      enforceForJSX: true,
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true
    }],
    'no-unused-vars': ['error', {
      args: 'none',
      caughtErrors: 'none',
      ignoreRestSiblings: true,
      vars: 'all'
    }],
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'one-var': ['error', { initialized: 'never' }],
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    'symbol-description': 'error',
    'unicode-bom': ['error', 'never'],
    'use-isnan': ['error', {
      enforceForSwitchCase: true,
      enforceForIndexOf: true
    }],
    'valid-typeof': ['error', { requireStringLiterals: true }],
    yoda: ['error', 'never'],
  } as const;

  return {
    name: "fenge/javascript",
    files: ["**/*.{js,cjs,mjs,jsx}"],
    // https://eslint.org/docs/latest/use/configure/language-options
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        // TODO `ecmaVersion` and `sourceType` are no standard here. import/no-default-export required this
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser)
            .filter(([k]) => !confusingKeys.includes(k))
            .filter(([k]) => !["self", "global"].includes(k)), // prefer `globalThis`
        ),
      },
    },
    plugins: {
      "check-file": checkFilePlugin,
      fp: fpPlugin,
      n: nPlugin,
      import: importPlugin,
      promise: promisePlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      sonarjs: sonarjsPlugin,
      unicorn: unicornPlugin,
      "es-x": esxPlugin,
      esm: esmPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "@fenge": fengePlugin,
      "@typescript-eslint": { rules: tsPlugin.rules }, // TODO: Ugly. Submit a pr to typescript-plugin to fix it.
    },
    rules: {
      // 1. standard config rules
      ...standardConfigRules,

      // 2. code style for a better readability
      "arrow-body-style": ["error", "as-needed"],
      // Sort imports by prettier. Turn in off.
      // "simple-import-sort/imports": [
      //   "error",
      //   { groups: [["^\\u0000", "^node:", "^@?\\w", "^", "^\\."]] },
      // ],
      "simple-import-sort/exports": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/escape-case": "error", // '\ud834' -> '\uD834'
      // "unicorn/number-literal-case": "error", // 0XFF -> 0xFF // conflict with prettier

      // 3. ban some syntaxes to reduce mistakes
      "default-param-last": "error",
      "for-direction": "error",
      "func-name-matching": "error",
      "func-names": "error", // always require a name for function declaration
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "getter-return": "error",
      "init-declarations": "error",
      "logical-assignment-operators": [
        "error",
        "always",
        { enforceForIfStatements: true },
      ],
      "max-depth": ["error", { max: 5 }],
      "max-params": ["error", { max: 4 }],
      "no-bitwise": "error",
      "no-console": "error",
      "no-constant-binary-expression": "error",
      "no-dupe-else-if": "error",
      "no-duplicate-imports": "error",
      "no-empty-static-block": "error",
      "no-empty-function": "error",
      "no-implicit-coercion": [
        "error",
        { disallowTemplateShorthand: true, allow: ["!!"] },
      ], // forbid code like `const num = +str`;
      "no-inner-declarations": "error", // TODO: change the rule value to `["error","functions",{blockScopedFunctions:"disallow"}]` when eslint is v9
      "no-invalid-this": "error",
      "no-lonely-if": "error",
      "no-multi-assign": "error",
      "no-new-native-nonconstructor": "error",
      "no-nonoctal-decimal-escape": "error",
      "no-object-constructor": "error",
      "no-param-reassign": "error",
      "no-plusplus": "error",
      "no-setter-return": "error",
      "no-shadow": ["error", { ignoreOnInitialization: true }],
      "no-unsafe-optional-chaining": [
        "error",
        { disallowArithmeticOperators: true },
      ],
      "no-unused-labels": "error",
      "no-unused-private-class-members": "error",
      "require-await": "error",
      "require-yield": "error",
      "prefer-arrow-callback": "error",
      "prefer-exponentiation-operator": "error",
      "prefer-object-has-own": "error",
      // "prefer-object-spread": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      // check-file
      "check-file/filename-blocklist": [
        "error",
        {
          "**/*.mjs": "*.js",
          "**/*.cjs": "*.js",
          "**/*.mts": "*.ts",
          "**/*.cts": "*.ts",

          "**/*.spec.*": "*.test.*", // Node.js built-in support *.test.js. See https://nodejs.org/api/test.html#running-tests-from-the-command-line.
        },
      ],
      // es
      "es-x/no-accessor-properties": "error",
      "es-x/no-async-iteration": "error",
      "es-x/no-generators": "error",
      "es-x/no-hashbang": "error",
      "es-x/no-legacy-object-prototype-accessor-methods": "error",
      "es-x/no-top-level-await": "error",
      // esm
      "esm/existing-file-imports": "error",
      "esm/no-declaration-file-imports": "error",
      "esm/no-directory-imports": "error",
      "esm/no-dynamic-imports": "error",
      "esm/no-empty-exports": "error",
      "esm/no-git-ignored-imports": "error",
      "esm/no-phantom-dep-imports": "error",
      "esm/no-query-suffixes": "error",
      "esm/no-relative-parent-imports": "error",
      "esm/no-rename-exports": "error",
      "esm/no-rename-imports": "error",
      "esm/no-side-effect-imports": "error",
      "esm/no-useless-path-segments": "error",
      "esm/required-exports": "error",
      "esm/top-side-effect-imports": "error",
      // fp
      "fp/no-arguments": "error",
      "fp/no-delete": "error",
      // import
      "import/export": "error",
      "import/first": "error",
      // "import/newline-after-import": "error", // already handled by prettier's plugin `@ianvs/prettier-plugin-sort-imports`
      "import/no-absolute-path": "error",
      "import/no-commonjs": [
        "error",
        {
          allowRequire: false,
          allowConditionalRequire: false,
          allowPrimitiveModules: false,
        },
      ],
      /**
       * 1. The ESM specification didn’t say anything about interoperability with CommonJS. See: https://blog.andrewbran.ch/default-exports-in-commonjs-libraries/
       * 2. Reexporting like `export * from 'foo'` will be difficult.
       */
      "import/no-default-export": "error",
      "import/no-duplicates": "error",
      "import/no-dynamic-require": "error",
      "import/no-empty-named-blocks": "error", // The feature of this rule is already handled by Prettier. But we still put it here.
      "import/no-mutable-exports": "error", // forbid code like `export let count = 3`
      "import/no-named-default": "error",
      "import/no-relative-packages": "error", // forbid to import module from other monorepo packages by relative paths
      "import/no-self-import": "error",
      "import/no-webpack-loader-syntax": "error",
      // n
      "n/handle-callback-err": ["error", "^(err|error)$"],
      "n/no-callback-literal": "error",
      "n/no-deprecated-api": "error",
      "n/no-exports-assign": "error",
      "n/no-new-require": "error",
      "n/no-path-concat": "error",
      "n/no-process-exit": "error",
      "n/no-unpublished-bin": "error",
      "n/prefer-global/buffer": ["error", "never"],
      "n/prefer-global/console": "error",
      "n/prefer-global/process": ["error", "never"],
      "n/prefer-global/text-decoder": "error",
      "n/prefer-global/text-encoder": "error",
      "n/prefer-global/url": "error",
      "n/prefer-global/url-search-params": "error",
      "n/process-exit-as-throw": "error",
      // promise
      "promise/no-return-wrap": "error",
      "promise/param-names": "error",
      "promise/prefer-catch": "error",
      // react
      // "react/hook-use-state": "error", // This rule will cause some warnings because we don't specify the version of react.
      "react/jsx-filename-extension": [
        "error",
        { allow: "as-needed", extensions: [".jsx", ".tsx"] },
      ],
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-props-no-spread-multi": "error",
      "react/jsx-uses-vars": "error",
      // react-hooks
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
      // sonarjs
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/no-all-duplicated-branches": "error",
      "sonarjs/no-identical-conditions": "error",
      "sonarjs/no-identical-expressions": "error",
      "sonarjs/no-ignored-return": "error",
      "sonarjs/no-inverted-boolean-check": "error",
      "sonarjs/no-nested-switch": "error",
      "sonarjs/no-useless-catch": "error",
      "sonarjs/prefer-immediate-return": "error",
      // unicorn
      // 'unicorn/no-null': 'error', // null can be useful when interact with json.
      "unicorn/consistent-assert": "error",
      "unicorn/consistent-date-clone": "error",
      "unicorn/consistent-destructuring": "error",
      "unicorn/consistent-empty-array-spread": "error",
      "unicorn/error-message": "error",
      "unicorn/explicit-length-check": "error",
      "unicorn/filename-case": [
        "error",
        { cases: { kebabCase: true, pascalCase: true } },
      ],
      "unicorn/import-style": [
        "error",
        {
          styles: {
            react: { named: true },

            child_process: { default: true },
            fs: { default: true },
            "fs/promises": { default: true },
            process: { default: true },
            "util/types": { named: true },
            "node:child_process": { default: true },
            "node:fs": { default: true },
            "node:fs/promises": { default: true },
            "node:process": { default: true },
            "node:util/types": { named: true },
          },
        },
      ],
      "unicorn/new-for-builtins": "error",
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/no-accessor-recursion": "error",
      "unicorn/no-array-callback-reference": "error",
      "unicorn/no-array-method-this-argument": "error",
      "unicorn/no-await-in-promise-methods": "error",
      "unicorn/no-for-loop": "error",
      "unicorn/no-instanceof-builtins": "error",
      "unicorn/no-lonely-if": "error",
      "unicorn/no-named-default": "error",
      "unicorn/no-negation-in-equality-check": "error",
      "unicorn/no-new-array": "error",
      "unicorn/no-new-buffer": "error",
      "unicorn/no-process-exit": "error", // Prefer `n/no-process-exit`, but at the same time using this rule seems have no problem
      "unicorn/no-single-promise-in-promise-methods": "error",
      "unicorn/no-static-only-class": "error",
      "unicorn/no-thenable": "error",
      "unicorn/no-this-assignment": "error",
      "unicorn/no-typeof-undefined": "error",
      "unicorn/no-unreadable-array-destructuring": "error",
      "unicorn/no-unreadable-iife": "error",
      "unicorn/no-useless-fallback-in-spread": "error",
      "unicorn/no-useless-spread": "error",
      "unicorn/no-useless-switch-case": "error",
      "unicorn/no-zero-fractions": "error",
      "unicorn/prefer-array-flat-map": "error",
      "unicorn/prefer-date-now": "error",
      "unicorn/prefer-export-from": "error",
      "unicorn/prefer-global-this": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-logical-operator-over-ternary": "error",
      "unicorn/prefer-math-min-max": "error",
      "unicorn/prefer-module": "error",
      "unicorn/prefer-negative-index": "error",
      "unicorn/prefer-number-properties": "error",
      "unicorn/prefer-object-from-entries": "error",
      "unicorn/prefer-optional-catch-binding": "error",
      "unicorn/prefer-reflect-apply": "error", // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2365
      "unicorn/prefer-regexp-test": "error",
      "unicorn/prefer-string-replace-all": "error",
      "unicorn/prefer-string-slice": "error",
      "unicorn/prefer-ternary": "error",
      "unicorn/require-array-join-separator": "error",
      "unicorn/require-number-to-fixed-digits-argument": "error",
      "unicorn/text-encoding-identifier-case": "error",
      "unicorn/throw-new-error": "error",

      "@fenge/call-arguments-length": "error",
      "@fenge/no-instanceof-builtin": "error",
      "@fenge/no-nested-class": "error",
      "@fenge/no-nested-function": "error",
      "@fenge/no-restricted-loops": "error",
      "@fenge/no-top-level-arrow-function": "error",
      "@fenge/no-unnecessary-template-string": "error",

      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": true,
          "ts-ignore": true,
          "ts-nocheck": true,
        },
      ],
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/triple-slash-reference": [
        "error",
        { lib: "never", path: "never", types: "never" }, // TODO: submit a PR to this rule to support `"never"` as the option. Refer https://github.com/typescript-eslint/typescript-eslint/issues/11196
      ],
    },
  } as const;
}
