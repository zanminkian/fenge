# @fenge/prettier-config

[![](https://img.shields.io/npm/l/@fenge/prettier-config.svg)](https://github.com/zanminkian/fenge/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@fenge/prettier-config.svg)](https://www.npmjs.com/package/@fenge/prettier-config)
[![](https://img.shields.io/npm/dm/@fenge/prettier-config.svg)](https://www.npmjs.com/package/@fenge/prettier-config)
[![](https://packagephobia.com/badge?p=@fenge/prettier-config)](https://packagephobia.com/result?p=@fenge/prettier-config)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

An elegant prettier shareable config.

## Features

- Sort ESM import statements (powered by [@ianvs/prettier-plugin-sort-imports](https://www.npmjs.com/package/@ianvs/prettier-plugin-sort-imports)).
- Sort `package.json` (powered by [prettier-plugin-packagejson](https://www.npmjs.com/package/prettier-plugin-packagejson)).
- Sort Tailwind CSS classes (powered by [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss)).
- Elegant. One-line of config.
- Compatible with default prettier config `{}`. Only introduced some plugins.

## Usage

Install

```sh
npm i -D prettier @fenge/prettier-config
```

Config `prettier.config.js`

```js
export { default } from "@fenge/prettier-config";
```

Customize

```js
import config from "@fenge/prettier-config";

export default {
  ...config,
  // Add your own configs below
  semi: true,
  singleQuote: true,
};
```

Config `package.json`

```json
{
  "scripts": {
    "format": "prettier -c .",
    "format:write": "prettier -c -w ."
  }
}
```

## License

MIT
