# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Fenge** (风格, meaning "style") is a monorepo CLI tool for JavaScript/TypeScript code quality. It wraps ESLint, Prettier, and TypeScript into a single zero-config tool with built-in strict defaults.

## Essential Commands

```sh
pnpm install          # Install deps + auto-build (via install script)
pnpm build            # Build all packages (pnpm -r build)
pnpm test             # Run style check + all package tests
pnpm style            # Run fenge (check formatting + linting)
pnpm style:update     # Run fenge -u (fix formatting + linting auto)
pnpm release          # Publish all packages (via @changesets/cli)
```

Running tests for a single package:

```sh
cd packages/eslint-plugin-esm && pnpm test
```

Running a single test file:

```sh
node --test packages/eslint-plugin-esm/src/rules/existing-file-imports.test.ts
```

## Monorepo Architecture

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

## Build Pattern

TypeScript packages build with `tscx` (a thin TypeScript build wrapper):

```
tscx --include src --exclude '**/*.test.ts'
```

## ESLint Rule Pattern

Each rule follows a consistent structure:

- Rule file: `src/rules/rule-name.ts`
- Test file: `src/rules/rule-name.test.ts`
- Tests use `@fenge/dev-utils` with `valid`/`invalid` fixture arrays
- Rule meta includes `messages` for error text and `fixable: "code"` if auto-fixable

## fenge CLI Subcommands

```sh
fenge              # Check formatting + linting
fenge -u           # Fix formatting + linting
fenge lint         # Check linting only
fenge lint -u      # Fix linting
fenge format       # Check formatting only
fenge format -u    # Fix formatting
fenge install      # Install git pre-commit hook
fenge uninstall    # Remove git pre-commit hook
fenge init-tsconfig    # Initialize tsconfig
fenge diff-tsconfig    # Compare tsconfig
```

## Commit Workflow

Before committing `fix` or `feat` type changes, create a changeset file in `.changeset` directory. The changeset file header should include edited package name(s). The changeset file content (description) should be a single sentence in English, starting with `fix:` or `feat:`. The commit message should be the **same** as the changeset file description.
