# @fenge/eslint-config

[![](https://img.shields.io/npm/l/@fenge/eslint-config.svg)](https://github.com/zanminkian/fenge/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@fenge/eslint-config.svg)](https://www.npmjs.com/package/@fenge/eslint-config)
[![](https://img.shields.io/npm/dm/@fenge/eslint-config.svg)](https://www.npmjs.com/package/@fenge/eslint-config)
[![](https://packagephobia.com/badge?p=@fenge/eslint-config)](https://packagephobia.com/result?p=@fenge/eslint-config)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

A strict eslint config preset containing a comprehensive set of rules for linting `js` / `ts` / `package.json` files.

## Feature

- Lint `js` / `mjs` / `cjs` / `jsx` / `ts` / `mts` / `cts` / `tsx` / `package.json` files only.
- Strict. More than 400+ rules.
- Highly customizable by omitting unwanted.
- Type safe. TypeScript friendly.
- Pure JavaScript project friendly.
- React friendly.
- NestJS friendly.
- Have no stylistic opinions. Prettier friendly.
- Respect `.gitignore`.
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Modern. ESM first.
- One-line of config.

## Usage

Install it in the root of js / ts project.

```sh
npm i -D eslint @fenge/eslint-config
```

Config `eslint.config.js` (for ESM).

```js
export { default } from "@fenge/eslint-config";
```

If you are in CommonJS, config `eslint.config.js` bellow:

```js
module.exports = import("@fenge/eslint-config");
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

> Note: For TypeScript project, adding a `tsconfig.json` file in the root is recommended.

## Advanced Usage

### Config Builder

You can use `Builder` class to customize for selecting or omitting some rules.

```ts
// @ts-check
import { Builder } from "@fenge/eslint-config";

export default new Builder()
  .enablePackageJson({
    pick: ["packagejson/top-types"], // only these rules will work for package.json files
  })
  .enableJavaScript({
    omit: ["no-var"], // these rules will not work for js files
  })
  .enableTypeScript()
  // apply additional rules or override the built-in rules for ts files
  .append({
    name: "strictest",
    files: ["**/*.{ts,cts,mts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
    },
  })
  .toConfig();
```

> Tips: By adding a `// @ts-check` at the top of the config file, you will get code hinting in VSCode/WebStorm. It will highly improve your development experience.

## License

MIT
