## Project Overview

**Fenge** (风格, meaning "style") is a monorepo CLI tool for JavaScript/TypeScript code quality. It wraps ESLint, Prettier, and TypeScript into a single zero-config tool with built-in strict defaults.

## Monorepo Architecture

### Root package.json

@package.json

### Packages

12 packages under `packages/`, structured as a pnpm workspace:

| Package                   | Description                                                                     |
| ------------------------- | ------------------------------------------------------------------------------- |
| `fenge` (main CLI)        | CLI entry point; orchestrates ESLint, Prettier, lint-staged, and tsconfig       |
| `@fenge/eslint-config`    | Central ESLint config aggregator; depends on all other ESLint plugin packages   |
| `@fenge/eslint-plugin`    | Custom JS linting rules                                                         |
| `@fenge/eslint-plugin-ts` | TypeScript-specific linting rules                                               |
| `eslint-plugin-esm`       | ESM module import/export linting rules                                          |
| `eslint-plugin-pkg-json`  | package.json validation rules                                                   |
| `eslint-plugin-publint`   | Publint integration for package publishing validation                           |
| `@fenge/prettier-config`  | Shared Prettier config with import/package.json sorting plugins                 |
| `@fenge/tsconfig`         | Strict shared tsconfig presets + CLI for managing tsconfig files                |
| `@fenge/types`            | TypeScript type replacements for enhanced built-in APIs                         |
| `smells`                  | Code smell detection tool                                                       |
| `@fenge/dev-utils`        | Internal test utilities for ESLint rule testing (valid/invalid fixture pattern) |
| `prettier-ignore`         | Common ignore patterns for Prettier                                             |

Key dependency flow:

- `fenge` CLI consumes `@fenge/eslint-config`, `@fenge/prettier-config`, `@fenge/tsconfig`
- `@fenge/eslint-config` aggregates all `eslint-plugin-*` workspace packages
- ESLint rule packages use `@fenge/dev-utils` for test fixtures

## Tips

### Creating a new rule of an ESLint plugin

Each rule follows a consistent structure:

- Rule file: `src/rules/rule-name.ts`
- Test file: `src/rules/rule-name.test.ts`
- Before creating a new rule, read and study 1 or 2 existing rules and their test files in the same directory
