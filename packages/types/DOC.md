## Why do we export `lib.es2020.d.ts` as main entrypoint?

There is a `/// <reference lib="es2020" />` in `@types/node/index.d.ts` since v16.6.0 (until v22.14.0). If we export `lib.es*.d.ts` which is newer than `lib.es2020.d.ts`, the replacement will not work.

## Why do we use `types` field in `package.json` instead of `exports`?

```json
{
  "exports": {
    ".": {
      "types": "./dist/lib.es2020.d.ts"
    }
  }
}
```

Code above will not work. Only `types` field works.

> TODO: Submit an issue to TypeScript.

## Why does peer dependency of `@types/node` require `>=16.18.126`?

`>=16.6.0` is enough, but it's too old. v16.18.126 is the final version of v16.
