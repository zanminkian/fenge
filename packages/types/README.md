# @fenge/types

[![](https://img.shields.io/npm/l/@fenge/types.svg)](https://github.com/zanminkian/fenge/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@fenge/types.svg)](https://www.npmjs.com/package/@fenge/types)
[![](https://img.shields.io/npm/dm/@fenge/types.svg)](https://www.npmjs.com/package/@fenge/types)
[![](https://packagephobia.com/badge?p=@fenge/types)](https://packagephobia.com/result?p=@fenge/types)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

A type patch for TypeScript, enhancing type-safe for built-in JavaScript apis.

## Feature

**Without this library:**

- 🚨 `Array.isArray` returns `any[]`.
- 🚨 `JSON.parse` returns `any`.
- 🚨 `new Map()` generates `Map<any, any>`.
- 🚨 `new Promise()` can reject a non `Error` variable.
- 🚨 `<promise object>.catch` accepts `(reason: any) => void | PromiseLike<void>`

**With this library:**

- 👍 `Array.isArray` returns `unknown[]`.
- 👍 `JSON.parse` returns `unknown`.
- 👍 `new Map()` generates `Map<unknown, unknown>`.
- 👍 `new Promise()` must reject an `Error` variable.
- 👍 `<promise object>.catch` accepts `(reason: unknown) => void | PromiseLike<void>`

## Usage

Add a [triple-slash-directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) `/// <reference types="@fenge/types" />` at the top of the ts file that serves as the entry point for your application or package. This will make the entire project more type-safe.

Application/Package Entry Point (eg: `src/main.ts` or `src/app.ts`)

```ts
/// <reference types="@fenge/types" />
import foo from "./foo";
```

Other File (eg: `src/other-file.ts`)

<!-- prettier-ignore-start -->
```ts
console.log(JSON.parse('{"foo":"foo"}').bar.length);
         // ^^^^^^^^^^^^^^^^^^^^^^^^^^^ ❌ Object is of type 'unknown'.
```
<!-- prettier-ignore-end -->

## Differences Between `@total-typescript/ts-reset`

- This library only focus on built-in ECMAScript apis. So it doesn't enhance the browser or Node apis like `fetch`.
- This library only focus on type-safe, not convenience. So it doesn't contain the apis like `array-includes.d.ts`, which `@total-typescript/ts-reset` does.

## License

MIT
