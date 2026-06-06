# @fenge/tsconfig

A strict sharable tsconfig preset.

[![](https://img.shields.io/npm/l/@fenge/tsconfig.svg)](https://github.com/zanminkian/fenge/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@fenge/tsconfig.svg)](https://www.npmjs.com/package/@fenge/tsconfig)
[![](https://img.shields.io/npm/dm/@fenge/tsconfig.svg)](https://www.npmjs.com/package/@fenge/tsconfig)
[![](https://packagephobia.com/badge?p=@fenge/tsconfig)](https://packagephobia.com/result?p=@fenge/tsconfig)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

## Feature

- The best practice about `tsconfig.json`.
- Strictest.
- One-line of tsconfig.
- Support `ESM` and `CommonJS`.
- Support FE (eg: [React](https://github.com/facebook/react)) & BE (eg: [Nest](https://github.com/nestjs/nest)) project.

## Usage

### Install

```sh
npm i @fenge/tsconfig -D
```

For node project, you may need to install `@types/node` additionally.

```sh
npm i @types/node -D
```

For frontend project (like React), you may need to install `@types/web` additionally.

```sh
npm i @types/web -D
```

### Config `tsconfig.json`

```json
{
  "extends": "@fenge/tsconfig"
}
```

## Best Practices

Here are the best practices if you are using this package.

### For polyrepo

```
├── src
│   └── index.ts
├── test
│   └── index.test.ts
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```

#### tsconfig.json

```json
{
  // If the project is for web, you may need to change `@fenge/tsconfig/node` to `@fenge/tsconfig/web`.
  "extends": ["@fenge/tsconfig", "@fenge/tsconfig/node"]
}
```

#### tsconfig.build.json

```json
{
  "extends": ["./tsconfig.json"],
  "include": ["src"],
  "exclude": ["**/*.test.ts"]
}
```

### For monorepo

```
├── packages
│   ├── pkg1
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── test
│   │   │   └── index.test.ts
│   │   ├── package.json
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   └── pkg2
│       ├── src
│       │   └── index.ts
│       ├── test
│       │   └── index.test.ts
│       ├── package.json
│       ├── tsconfig.build.json
│       └── tsconfig.json
└── package.json
```

#### tsconfig.json in each package

```json
{
  // If the package is for web, you may need to change `@fenge/tsconfig/node` to `@fenge/tsconfig/web`.
  "extends": ["@fenge/tsconfig", "@fenge/tsconfig/node"]
}
```

#### tsconfig.build.json in each package

```json
{
  "extends": ["./tsconfig.json"],
  "include": ["src"],
  "exclude": ["**/*.test.ts"]
}
```

## Commands

After installing `@fenge/tsconfig`, you can run `npx tsconfig init` command to generate a `tsconfig.json` file. Run `npx tsconfig -h` for all commands details:

```txt
Usage: tsconfig [options] [command]

Options:
  -h, --help      display help for command

Commands:
  init [options]  init a tsconfig file
  diff [options]  show differences between recommended tsconfig and current project tsconfig
  help [command]  display help for command
```

## License

MIT
