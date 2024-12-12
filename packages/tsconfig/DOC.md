## About Compile Options

- `"checkJs": false`: Don't check js for better experience. User can add `// @ts-check` on the top of js file to check it manually.
- `"module": "node16"`: According to https://www.typescriptlang.org/docs/handbook/modules/theory.html, we should use Node16 only.
- `"moduleDetection": "force"`: https://github.com/zanminkian/fenge/issues/88#issuecomment-1734416707.
- `lib`: 1. Typescript will include APIs for newer JS features matching the `target`. See https://www.typescriptlang.org/tsconfig#lib. Therefore, there is no need to add "ESNext" to lib. 2. In ts 4.5, lib files can be overrode by npm modules. See https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/#supporting-lib-from-node_modules. Therefore, libs like "DOM" can be included by installing `@types/web`. No need to add "DOM" to lib.
- `types`: Ts will load all the `node_modules/@types/*` declaration files when `types` is removed. Remove it will improve the extensibility.
- `isolatedDeclarations`: Just wait and see. This flag will do harm to development experience. See [TS 5.5 release post](https://devblogs.microsoft.com/typescript/announcing-typescript-5-5).
- `allowArbitraryExtensions`: 1. We encourage users to use tailwind in frontend project. Tailwind project do not need this this option. 2. Adding `/// <reference types="vite/client" />` to the top of frontend project entrance (like `main.ts`) works well for most of frontend projects. Adding to much `foo.d.ts` in project makes it complex. Using `/// <reference types="vite/client" />` is enough.

## Why do we put `esm.json`, `cjs.json` and `tsconfig.json` in the package root?

Because before TS 5.0, TS always look up the extends by path, while ignoring `exports` field in `package.json`. Refer to [here](https://github.com/microsoft/TypeScript/issues/53314#issuecomment-1474354281). After TS 5.0, TS will consider `exports` field in `package.json`. Refer to [here](https://github.com/microsoft/TypeScript/issues/53314#issuecomment-1480295680). Some third-party libraries still use the old strategy, so we decide to put `esm.json`, `cjs.json` and `tsconfig.json` in the package root for compatibility.

> TODO: When TS reach to 6.0 and still consider `exports` field, move `esm.json`, `cjs.json` and `tsconfig.json` to a folder instead of in package root.

> TODO: Once [this issue](https://github.com/microsoft/TypeScript/issues/60748) has been solved. We can add `"include": ["${configDir}/src"]` and `"exclude": ["**/*.spec.ts", "**/*.test.ts"]` to `cjs.json` and `esm.json`. And then remove the root `tsconfig.json`.
