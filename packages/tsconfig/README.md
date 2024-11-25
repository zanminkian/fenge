# @fenge/tsconfig

Strict shared tsconfig out-of-box.

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
│   └── index.spec.ts
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```

#### tsconfig.json

```json
{
  "extends": "@fenge/tsconfig"
}
```

#### tsconfig.build.json

```json
{
  "extends": "./tsconfig",
  "include": ["src"],
  "exclude": ["**/*.spec.ts", "**/*.test.ts"]
}
```

### For monorepo (TS < 5.7)

```
├── apps
│   ├── app1
│   │   ├── src
│   │   │   └── main.ts
│   │   ├── test
│   │   │   └── main.spec.ts
│   │   ├── package.json
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   └── app2
│       ├── src
│       │   └── main.ts
│       ├── test
│       │   └── main.spec.ts
│       ├── package.json
│       ├── tsconfig.build.json
│       └── tsconfig.json
├── package.json
└── tsconfig.json
```

#### tsconfig.json in the root of project

```json
{
  "extends": "@fenge/tsconfig"
}
```

#### tsconfig.json in each app

```json
{
  "extends": "../../tsconfig"
}
```

#### tsconfig.build.json in each app

```json
{
  "extends": "./tsconfig",
  "include": ["src"],
  "exclude": ["**/*.spec.ts", "**/*.test.ts"]
}
```

> Tips: Why do we still need a `tsconfig.json` in each app? In short, for the DX. VSCode usually use the nearest `tsconfig.json` as the TypeScript config for the opening ts file. If there is only one `tsconfig.json` in the root, the declarations in one app will affect the others. Thus, VSCode will perform wrong type hints. If VSCode smart enough to use nearest `tsconfig.build.json` rather than `tsconfig.json`, we don't need a `tsconfig.json` in each app.

### For monorepo (TS >= 5.7)

```
├── apps
│   ├── app1
│   │   ├── src
│   │   │   └── main.ts
│   │   ├── test
│   │   │   └── main.spec.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── app2
│       ├── src
│       │   └── main.ts
│       ├── test
│       │   └── main.spec.ts
│       ├── package.json
│       └── tsconfig.json
├── package.json
└── tsconfig.json
```

#### tsconfig.json in the root of project

```json
{
  "extends": "@fenge/tsconfig"
}
```

#### tsconfig.json in each app

```json
{
  "extends": "../../tsconfig",
  "include": ["src"],
  "exclude": ["**/*.spec.ts", "**/*.test.ts"]
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
