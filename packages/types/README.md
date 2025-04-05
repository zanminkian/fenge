# @fenge/types

[![](https://img.shields.io/npm/l/@fenge/types.svg)](https://github.com/zanminkian/fenge/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@fenge/types.svg)](https://www.npmjs.com/package/@fenge/types)
[![](https://img.shields.io/npm/dm/@fenge/types.svg)](https://www.npmjs.com/package/@fenge/types)
[![](https://packagephobia.com/badge?p=@fenge/types)](https://packagephobia.com/result?p=@fenge/types)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

A type replacement for enhancing TypeScript built-in apis.

## What is it

TypeScript supports replacing built-in definitions by installing a lib to `node_modules`, since [v4.5](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#supporting-lib-from-node_modules). TypeScript built-in definitions have a large number of `any`, which are not type-safe enough.

This is a library that provides stricter type definitions for enhancing TypeScript built-in apis.

## Features

Here are all features and differences between the built-in definitions and this library.

**Without this library:**

- 🚨 `JSON.parse` returns `any`.
- 🚨 `Array.isArray` returns `any[]`.
- 🚨 `new Map()` generates `Map<any, any>`.
- 🚨 `new Promise()` can reject a non `Error` variable.
- 🚨 `Promise.reject` accepts `any` as a reason.
- 🚨 `Promise.prototype.catch` accepts `(reason: any) => void | PromiseLike<void>`.
- 🚨 `Promise.prototype.then` accepts `(reason: any) => void | PromiseLike<void>` for the second parameter.

**With this library:**

- 👍 `JSON.parse` returns `unknown`.
- 👍 `Array.isArray` returns `unknown[]`.
- 👍 `new Map()` generates `Map<unknown, unknown>`.
- 👍 `new Promise()` must reject an `Error` variable.
- 👍 `Promise.reject` accepts `Error` as a reason.
- 👍 `Promise.prototype.catch` accepts `(reason: unknown) => void | PromiseLike<void>`.
- 👍 `Promise.prototype.then` accepts `(reason: unknown) => void | PromiseLike<void>` for the second parameter.

## Usage

Firstly, if you have install `@types/node`, make sure its version >= `18.0.0`.

Then, add this library to `devDependencies` field in `package.json` file. You can replace the version of `0.4.0` with the expected version.

```json
{
  "devDependencies": {
    "@typescript/lib-es2020": "npm:@fenge/types@0.4.0"
  }
}
```

Finally, run `npm install` or `yarn install` or `pnpm install`.

After that, writing TypeScript code will be more type-safe. Example:

```ts
const foo = JSON.parse('{"bar": 1}'); // The `foo` is `unknown` type now.
console.log(foo.baz + 1); // error: 'foo' is of type 'unknown'.
```

## License

MIT
