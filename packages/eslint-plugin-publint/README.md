# eslint-plugin-publint

[![](https://img.shields.io/npm/l/eslint-plugin-publint.svg)](https://github.com/zanminkian/fenge/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/eslint-plugin-publint.svg)](https://www.npmjs.com/package/eslint-plugin-publint)
[![](https://img.shields.io/npm/dm/eslint-plugin-publint.svg)](https://www.npmjs.com/package/eslint-plugin-publint)
[![](https://packagephobia.com/badge?p=eslint-plugin-publint)](https://packagephobia.com/result?p=eslint-plugin-publint)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

ESLint plugin for [publint](https://www.npmjs.com/package/publint)

## Preview

![preview](https://raw.githubusercontent.com/zanminkian/static/main/git-validator/eslint-plugin-publint-preview.png)

## Requirement

- ESLint >= 8.57.0

## Usage

Install

```sh
npm i -D eslint eslint-plugin-publint
```

Config `eslint.config.js`

```js
import * as publint from "eslint-plugin-publint";
import parser from "eslint-plugin-publint/jsonc-eslint-parser";

export default [
  {
    files: ["**/package.json"],
    languageOptions: {
      parser,
    },
    plugins: { publint },
    rules: {
      /**
       * The 'suggestion' type messages created by publint will cause eslint warns
       */
      "publint/suggestion": "warn",
      /**
       * The 'warning' type messages created by publint will cause eslint warns
       */
      "publint/warning": "warn",
      /**
       * The 'error' type messages created by publint will cause eslint errors
       */
      "publint/error": "error",
    },
  },
];
```

Config `package.json`

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Rules

This plugin contains only 3 rules, which have no options to configure.

- `publint/suggestion`: correspond with the `Suggestions` section of publint outputs.
- `publint/waning`: correspond with the `Warnings` section of publint outputs.
- `publint/error`: correspond with the `Errors` section of publint outputs.

## License

MIT
