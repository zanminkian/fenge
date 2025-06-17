# eslint-plugin-pkg-json

[![](https://img.shields.io/npm/l/eslint-plugin-pkg-json.svg)](https://github.com/zanminkian/fenge/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/eslint-plugin-pkg-json.svg)](https://www.npmjs.com/package/eslint-plugin-pkg-json)
[![](https://img.shields.io/npm/dm/eslint-plugin-pkg-json.svg)](https://www.npmjs.com/package/eslint-plugin-pkg-json)
[![](https://packagephobia.com/badge?p=eslint-plugin-pkg-json)](https://packagephobia.com/result?p=eslint-plugin-pkg-json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

ESLint plugin for linting `package.json` file.

## Features

- Lint `package.json`s.
- Simple. Tiny. Fast.
- Zero dependencies.

## Requirement

- ESLint >= 8.57.0

## Usage

Install

```sh
npm i eslint eslint-plugin-pkg-json -D
```

Config `eslint.config.js`

```js
import * as pkg from "eslint-plugin-pkg-json";
import parser from 'eslint-plugin-pkg-json/jsonc-eslint-parser';

export default [
  ...
  {
    files: ["**/package.json"],
    languageOptions: {
      parser,
    },
    plugins: { "pkg-json": pkg },
    rules: {
      "pkg-json/no-lifecycle-script": "error",
      ...
      // Visit https://github.com/zanminkian/fenge/tree/main/packages/eslint-plugin-pkg-json/doc/rules for more other rules
    },
  },
  ...
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

Click [here](https://github.com/zanminkian/fenge/tree/main/packages/eslint-plugin-pkg-json/doc/rules).

## License

MIT
