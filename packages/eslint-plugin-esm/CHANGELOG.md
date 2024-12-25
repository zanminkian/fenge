# eslint-plugin-esm

## 0.4.0

### Minor Changes

- 85cd2d5: refactor(eslint-plugin-esm): rename rule `nearest-relative-path` to `no-useless-path-segments`

### Patch Changes

- 36c4c6b: fix(eslint-plugin-esm): report on `./..` and `./`

## 0.3.0

### Minor Changes

- 1b7d98c: refactor(eslint-plugin-esm): `no-side-effect-imports` will not ignore declaration files now
- 2d485c9: refactor(eslint-plugin-esm): `no-ts-file-imports` will not ignore declaration files now

### Patch Changes

- 6c64129: feat: add rule `no-empty-exports`
- d54423b: fix(eslint-plugin-esm): additionally check for importing node built-in module
- 778a198: feat: add rule `esm/required-exports`

## 0.2.2

### Patch Changes

- 905e445: chore: update deps
- 0c4462d: fix(eslint-plugin-esm): fix incorrect report on `import type {} from "@foo/bar"`

## 0.2.1

### Patch Changes

- 2b04bbd: fix(eslint-plugin-esm): allow module existing in peerDependencies for `no-phantom-dep-imports` rule

## 0.2.0

### Minor Changes

- 28edf1c: feat(eslint-plugin-esm)!: support `allowDevDependencies` option

## 0.1.1

### Patch Changes

- 52c7428: fix(eslint-plugin-esm): fix `nearest-relative-path` rule problem when importing from `.`

## 0.1.0

### Minor Changes

- d0491d8: refactor: migrate rules from `@git-validator/eslint-plugin` to `eslint-plugin-esm`
