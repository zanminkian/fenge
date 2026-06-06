<div align="center">

<img height="180" src="https://raw.githubusercontent.com/zanminkian/static/main/fenge/style.svg">

# Fenge(风格)

> A CLI tool for JavaScript and TypeScript code quality.

<font size=4> 😎 = 🇹 + 💃 + 📏 </font>

[![](https://img.shields.io/npm/l/fenge.svg)](https://github.com/zanminkian/fenge/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/fenge.svg)](https://www.npmjs.com/package/fenge)
[![](https://img.shields.io/npm/dm/fenge.svg)](https://www.npmjs.com/package/fenge)
[![](https://packagephobia.com/badge?p=fenge)](https://packagephobia.com/result?p=fenge)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

</div>

---

## Philosophy

<details>
<summary>简体中文</summary>

### 核心：`类型安全`、`Formatting` 和 `Linting`

经过多年实践，我们发现，最影响现代 JavaScript 工程的代码质量和开发体验的主要有 3 个方面：

- **类型安全**：用于提前发现类型、拼写错误，例如对象方法是否正确调用、函数参数传递的类型是否符合函数体的期望等。
- **Formatting**：用于统一格式，提升代码可读性，减少代码冲突。主要关注例如缩进、换行、单/双引号、带/不带分号等问题。
- **Linting**：用于提前发现逻辑漏洞和糟粕用法，减少 Bug，降低维护成本。其关注点可以是除了 `Formatting` 之外的任何地方，例如重复定义变量、switch 不带 break、圈复杂度等。

这 3 个方面也是更先进的运行时 [Deno](https://deno.com) 所内置的功能，[Node](https://nodejs.org) 并没有内置支持，取而代之的是社区里百花齐放的工具：TypeScript、Flow、Biome、ESLint、oxc-lint、Prettier、dprint。这些工具用在 Node 项目中存在 3 个非常影响**开发体验**的问题：

- **工具选型问题**：我应该选择哪些工具集合来优化上述 3 个问题？选择后，下一个 Node 项目又选择不同工具集怎么办？
- **工具之间冲突磨合问题**：确定使用的工具后，这些工具之间是否有冲突？代码提交时是先 format 还是先 lint？工具之间配合的最佳实践是什么？
- **工具们的复杂配置问题**：每个工具都有很复杂难懂的配置，在项目根目录（或 `package.json` 里）到处拉屎。一来不美观简洁，二来增加理解成本。每个 Node 项目可能工具统一但配置不统一，进一步导致开发体验不一致。

为了解决上述问题，现在有非常多教程文章讲解 TypeScript + Prettier + ESLint 的配置和实践，这些文章教程能缓解一部分问题，但仍然将<u>杂乱的工具链和繁琐的配置暴露给用户</u>。这不是我们的目标，我们的目标是**提供一个统一的工具屏蔽这些复杂的实践细节，给用户带来简单一致、开箱即用的良好开发体验**。

### `类型安全`、`Formatting` 和 `Linting` 的关系

为了阐述三者之间的关系，这里以三者最具代表性的解决方案 `TypeScript`、`Prettier` 和 `ESLint` 作为例子。

| -           | 类型安全   | Formatting | Linting |
| ----------- | ---------- | ---------- | ------- |
| 代表        | TypeScript | Prettier   | ESLint  |
| 关注逻辑    | ✅         | ❌         | ✅      |
| Auto Fixing | ❌         | ✅         | ✅      |

经过多年演进，三者关注点存在一定的交集：

1. `类型安全`和 `Linting` 关注点的交集：例如，“函数入参数量对不上”，既可能被 TypeScript 检测到，也可能被 ESLint检测出来。
2. `Formatting` 和 `Linting` 关注点的交集：例如，“是否使用分号结尾”、“使用单引号还是双引号”等，既可以被 Prettier 检测出来并执行格式化，也可以被 ESLint 检测出来并执行修复。

虽然当下情况是三者存在一定的交集，但这不是最理想的情况，最理想的情况是：**类型安全、Formatting 和 Linting 关注不同的领域，不存在交集**。

### 为什么把 Formatting 和 Linting 分开

虽然类型安全也可能和 Linting 的关注点重合，但是社区主流做法也不会将 TypeScript 和 ESLint 混为一谈，所以这里不过多赘述。然而，社区内不少人将 `Formatting` 和 `Linting` 合并起来一并处理，例如 [@antfu/eslint-config](https://github.com/antfu/eslint-config)。我们强烈**不建议**这样做，主要有以下原因：

1. 首先是因为它们目的不一样，专业的事情应该交给专业的工具。
2. Formatting 和 Linting 它们造成的心智负担不同，Review 代码时，我们往往不需要关注 Formatting 的改动，但是我们必须要仔细检查确认 Linting 的改动，因为 Formatting 的改动一般是安全的，但是 Linting 的改动可能存在错误的修复。
3. 因为 Linting 的改动可能存在错误的修复，配合 Git Hooks 时，如果 Linting 的修复和 Formatting 的修复混合在一起，代码提交时容易让错误的修复直接进入 Git Commit，导致 bug 更难被发现。
4. 社区主流趋势是将 Formatter 和 Linter 分开。例如：早期 ESLint 也被用于格式化，但是从 v8.53.0 开始， [ESLint 废弃 Formatting Rules](https://eslint.org/blog/2023/10/deprecating-formatting-rules)。Deno 和 Biome 也均把 `Linter` 和 `Formatter` 分开。

### 小结

总而言之，类型安全、Formatting 和 Linting 是未来 JavaScript 和 TypeScript 代码生态绕不过去的三个方面。这三板斧在 Node 官方提供解决方案之前，都是割裂、难用、影响代码质量的方面。我们等不急 Node 官方提供相关方案，所以创建了 `Fenge`，尽可能屏蔽复杂，暴露简单，让开发者专注于业务代码。

</details>

<details>
<summary>English</summary>

### Core: `Type Safety`, `Formatting`, and `Linting`

After years of practice, we have found that the three main aspects affecting modern JavaScript project code quality and development experience are:

- **Type Safety**: Used to detect type and spelling errors in advance, such as whether object methods are called correctly, whether function parameters match the expected types within the function body, etc.
- **Formatting**: Used to unify code style, improve readability, and reduce conflicts. It mainly focuses on issues like indentation, line breaks, single/double quotes, with/without semicolons, etc.
- **Linting**: Used to identify logical flaws and poor practices early, reducing bugs and maintenance costs. Its focus can be anywhere except for `Formatting`, such as redefining variables, switch statements without break, cyclomatic complexity, etc.

These three aspects are also built-in features in more advanced runtimes like [Deno](https://deno.com), which [Node](https://nodejs.org) does not natively support. Instead, the community offers a variety of tools: TypeScript, Flow, Biome, ESLint, oxc-lint, Prettier, dprint. Using these tools in Node projects brings three major issues impacting **development experience**:

- **Tool Selection Problem**: Which set of tools should I choose to optimize the above three problems? If I choose different toolsets for the next Node project, how do I handle it?
- **Tool Conflict and Integration Problem**: After determining the tools to use, do these tools conflict with each other? Should formatting or linting come first when committing code? What is the best practice for integrating these tools?
- **Complex Configuration Problem**: Each tool has complex and difficult-to-understand configurations scattered across the project root directory (or `package.json`). This not only looks messy but also increases the learning curve. Even if the tools are consistent across Node projects, the configurations may vary, leading to inconsistent development experiences.

To address these issues, there are now many tutorials explaining the configuration and practices of TypeScript + Prettier + ESLint, which can alleviate some problems but still expose users to a cluttered toolchain and cumbersome configurations. Our goal is not this; our goal is to **provide a unified tool that abstracts away these complex details, offering a simple, consistent, and ready-to-use development experience**.

### Relationship between `Type Safety`, `Formatting`, and `Linting`

To illustrate the relationship among these three, let's take the most representative solutions `TypeScript`, `Prettier`, and `ESLint` as examples.

| -              | Type Safety | Formatting | Linting |
| -------------- | ----------- | ---------- | ------- |
| Representative | TypeScript  | Prettier   | ESLint  |
| Focus on Logic | ✅          | ❌         | ✅      |
| Auto Fixing    | ❌          | ✅         | ✅      |

Over time, these three areas have developed certain intersections:

1. Intersection between `Type Safety` and `Linting`: For example, "mismatched function parameter count" can be detected by both TypeScript and ESLint.
2. Intersection between `Formatting` and `Linting`: For example, "whether to end with a semicolon" or "use single or double quotes" can be detected and fixed by both Prettier and ESLint.

Although there are overlaps among them today, the ideal situation is that **Type Safety, Formatting, and Linting focus on different domains without overlap**.

### Why Separate Formatting from Linting

While `Type Safety` might also overlap with `Linting`, the community generally does not confuse TypeScript with ESLint, so this aspect is not elaborated here. However, many people in the community combine `Formatting` and `Linting` together, such as [@antfu/eslint-config](https://github.com/antfu/eslint-config). We strongly **do not recommend** doing this for several reasons:

1. They serve different purposes; specialized tasks should be handled by specialized tools.
2. Formatting and Linting impose different cognitive loads. When reviewing code, we often don't need to pay attention to Formatting changes, but we must carefully check Linting changes because Formatting changes are generally safe, while Linting changes may contain incorrect fixes.
3. Since Linting changes may contain incorrect fixes, when used with Git Hooks, mixing Linting and Formatting fixes can lead to erroneous fixes entering Git Commits directly, making bugs harder to detect.
4. The community trend is to separate Formatters and Linters. For example, early versions of ESLint were also used for formatting, but starting from v8.53.0, [ESLint deprecated Formatting Rules](https://eslint.org/blog/2023/10/deprecating-formatting-rules). Deno and Biome also separate `Linter` and `Formatter`.

### Summary

In summary, Type Safety, Formatting, and Linting are three indispensable aspects of the future JavaScript and TypeScript code ecosystem. Before Node provides official solutions, these three areas have been fragmented, difficult to use, and negatively impacted code quality. We couldn't wait for Node to provide related solutions, so we created `Fenge` to shield developers from complexity, simplify their workflow, and allow them to focus on business logic.

</details>

## Features

Based on the philosophy outlined above, this tool offers the following features:

- 💪 **Enhanced Type Safety**: This tool provides the strictest `tsconfig` settings to bolster the type safety of TypeScript projects. It is also compatible with pure JavaScript projects.
- 💃 **Formatting**: This tool ensures code consistency across your codebase and minimizes merge conflicts by automatically formatting code. It additionally supports the sorting of imports and `package.json` files.
- 📏 **Linting**: This tool comes equipped with a comprehensive set of rules for static code analysis, which helps catch errors and prevent poor coding practices in JavaScript.
- 🪝 **Git Hooks**: After installation, committing code via Git triggers automatic formatting, linting checks, and changeset creation. No additional package installations are required.

## Highlights

We place a high value on `Development Experience` (DX).

- 📦 **All-In-One**: You don't need to install `prettier`, `eslint`, `lint-staged` or `husky`.
- ⚙️ **Zero Configs**: Comes with sensible default configurations for type safety, formatting, and linting, so you don't need to set up any configurations.
- 😉 **Highly Customizable**: Every thing is optional. Every thing can be customized.
- 🤖 **AI Agent Friendly**: Optimized for AI coding agents like Cursor, Claude Code, and Codex, ensuring smooth integration in AI-assisted development workflows.

## Quick Start

To quick start, run command below to check formatting and linting style in your project.

```sh
npx fenge
```

## Install

We recommend installing it as one of `devDependencies` in your project.

```sh
npm i -D fenge
```

## Usages

Each of the following usages is optional. You can choose the ones that best fit your needs.

### Type Safe

#### Config the strictest `tsconfig.json`

Config `tsconfig.json` file in your project root.

```json
{
  // If the project is for web, you may need to change `fenge/tsconfig/node` to `fenge/tsconfig/web`.
  "extends": ["fenge/tsconfig", "fenge/tsconfig/node"]
}
```

Config `tsconfig.build.json` file in your project root.

```json
{
  "extends": ["./tsconfig.json"],
  "include": ["src"],
  "exclude": ["**/*.test.ts"]
}
```

Build your project by executing:

```sh
tsc -p ./tsconfig.build.json
```

Type-check your project by executing:

```sh
tsc -p ./tsconfig.build.json --noEmit
```

For more beat practices, please refer to [@fenge/tsconfig](https://www.npmjs.com/package/@fenge/tsconfig).

### Formatting & Linting

Here are some main commands to format or lint code.

```sh
# Check project's formatting problems only
$ fenge format

# Check project's formatting problems and apply updates
$ fenge format -u

# Check project's linting problems only
$ fenge lint

# Check project's linting problems and apply updates
$ fenge lint -u

# Check both formatting and linting problems
$ fenge

# Check both formatting and linting problems and apply updates
$ fenge -u
```

This tool does not require a configuration file. However, you can add a `fenge.config.js` file to customize formatting and linting rules. This file should export an object with two properties:

- `format`: Accept a function that returns a [Prettier Config](https://prettier.io/docs/en/configuration.html).
- `lint`: Accept a function that returns an [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files).

> Tips: These two functions can be async or sync. So you can add `async` or not in font of the function.

```js
export default {
  format: async () => ({
    semi: false,
    singleQuote: true,
  }),
  lint: async () => [
    {
      files: ["**/*.{js,cjs,mjs,jsx}", "**/*.{ts,cts,mts,tsx}"],
      rules: {
        "no-unused-vars": "error",
      },
    },
  ],
};
```

Usually, we recommend reusing the built-in configurations rather than writing them from scratch. The built-in configurations re-export from [@fenge/prettier-config](https://www.npmjs.com/package/@fenge/prettier-config) and [@fenge/eslint-config](https://www.npmjs.com/package/@fenge/eslint-config).

```js
// @ts-check
export default {
  format: async () => {
    // See https://www.npmjs.com/package/@fenge/prettier-config for prettier-config detail usage
    const prettierConfig = (await import("fenge/prettier-config")).default;
    return {
      ...prettierConfig,
      // add config below to override the default behavior
      semi: false,
    };
  },
  lint: async () => {
    // See https://www.npmjs.com/package/@fenge/eslint-config for eslint-config detail usage
    const { Builder } = await import("fenge/eslint-config");
    return (
      new Builder()
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
        .toConfig()
    );
  },
};
```

> Tips: You can even install and use other third-party eslint-config, like [@sxzz/eslint-config](https://www.npmjs.com/package/@sxzz/eslint-config).

### Set up Git hooks

Executing `fenge install` writes a `pre-commit` and `post-commit` file to the `.git/hooks` folder of the current working directory (it is skipped when there is no `.git` directory). After editing `package.json -> scripts -> prepare` script and executing it once, each commit (via Git) will trigger a code style check for the committed files, and automatically create a changeset file if the `.changeset` directory exists.

```json
{
  "scripts": {
    "prepare": "fenge install"
  }
}
```

```sh
npm run prepare
```

## Contributing

- Clone this repository.
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` or globally install [@rnm/pm](https://www.npmjs.com/package/@rnm/pm).
- Install dependencies using `pnpm install`.
- Run `pnpm style:update` to develop.
- Start coding and submit your PR.

## Show your support

Give a ⭐️ if this project helped you!

## License

MIT
