## About Compile Options

- `"checkJs": false`: Don't check js for better experience. User can add `// @ts-check` on the top of js file to check it manually.
- `"module": "node16"`: According to https://www.typescriptlang.org/docs/handbook/modules/theory.html, we should use Node16 only.
- `"moduleDetection": "force"`: https://github.com/zanminkian/fenge/issues/88#issuecomment-1734416707.
- `types`: Ts will load all the `node_modules/@types/*` declaration files when `types` is removed. Remove it will improve the extensibility.
- `isolatedDeclarations`: Just wait and see. This flag will do harm to development experience. See [TS 5.5 release post](https://devblogs.microsoft.com/typescript/announcing-typescript-5-5).
- `allowArbitraryExtensions`: 1. We encourage users to use tailwind in frontend project. Tailwind project do not need this this option. 2. Adding `/// <reference types="vite/client" />` to the top of frontend project entrance (like `main.ts`) works well for most of frontend projects. Adding to much `foo.d.ts` in project makes it complex. Using `/// <reference types="vite/client" />` is enough.

## Why do we specify `lib`?

The reason to specify lib is that the default is to load `<target>.full.lib.d.ts` which will pull in `DOM`. It's incorrect for some node cli or backend projects. Web projects can install `@types/web` to pull in `DOM`.

## Why do we put `esm.json`, `cjs.json` and `tsconfig.json` in the package root?

Because before TS 5.0, TS always look up the extends by path, while ignoring `exports` field in `package.json`. Refer to [here](https://github.com/microsoft/TypeScript/issues/53314#issuecomment-1474354281). After TS 5.0, TS will consider `exports` field in `package.json`. Refer to [here](https://github.com/microsoft/TypeScript/issues/53314#issuecomment-1480295680). Some third-party libraries still use the old strategy, so we decide to put `esm.json`, `cjs.json` and `tsconfig.json` in the package root for compatibility.

> TODO: When TS reach to 6.0 and still consider `exports` field, move `esm.json`, `cjs.json` and `tsconfig.json` to a folder instead of in package root.

## Why we need a `tsconfig.json` in the root of monorepo project?

We can remove the `tsconfig.json` in the root of monorepo project. But when opening a `*.test.ts` file using VSCode, TypeScript will fall back to use the root `tsconfig.json`. If there is no `tsconfig.json` in the root of monorepo project, opening `*.test.ts` file using VSCode will shows incorrect errors.

> TODO: Once [this issue](https://github.com/microsoft/TypeScript/issues/60748) has been solved. We can add `"include": ["${configDir}/src"]` and `"exclude": ["**/*.test.ts"]` to `cjs.json` and `esm.json`. And then remove the root `tsconfig.json`.

## Why setting `lib` and `target` to `es2022`?

- Node 16 supports es2022
- Node 18 supports es2022
- [Node 18 does not support some features of es2023](https://github.com/tsconfig/bases/issues/217)

## Why don't we specify `types` field?

Ts will load all the `node_modules/@types/*` declaration files when `types` field is removed. It's not very type-safe when one of `@types/*` packages modifies the global scope declaration. The best practice is `"types": ["node", "web"]`. It means only `@types/node` and `@types/web` are allowed modifying global scope declaration. But Ts will throw an error when one of `@types/node` and `@types/web` is not installed.
