# @fenge/eslint-config

## 0.4.0-beta.1

### Minor Changes

- c7a01e8: refactor(eslint-config): replace `override` and `extend` properties with `append` property for overriding or extending the built-in rules
- c5a6425: feat(eslint-config): allow configuring global linter options, and disable `reportUnusedDisableDirectives` by default

### Patch Changes

- 740fdb7: feat(eslint-config): remove rule `no-template-curly-in-string` for flexibility

## 0.4.0-beta.0

### Minor Changes

- 1f5fce3: refactor(eslint-config): optimize config structure
- 2f12ec2: refactor(eslint-config): optimize config structure and remove `project` param for ts config

### Patch Changes

- 5adeeed: fix: add missing peerDependencies and peerDependenciesMeta
- 36d1fb0: chore: upgrade deps
- 0d71378: fix(eslint-config): allow import module from devDependencies for config files
- 41c783a: feat(eslint-config): add many built-in and @typescript-eslint recommended rules
- 3f4e737: feat(eslint-config): add many rules of `eslint-plugin-unicorn`
- 51502cc: feat: add rule `@fenge/no-jsx-in-non-jsx-file`
- Updated dependencies [51502cc]
- Updated dependencies [0c4462d]
- Updated dependencies [713d9a2]
  - @fenge/eslint-plugin@0.1.2-beta.0
  - eslint-plugin-esm@0.2.2-beta.0

## 0.3.0

### Minor Changes

- 55cf874: chore: upgrade typescript-eslint to v8

### Patch Changes

- 1848169: chore: upgrade deps
- 9f04b44: refactor(eslint-config): replace `eslint-plugin-deprecation` with `@typescript-eslint/no-deprecated`

## 0.2.1

### Patch Changes

- 974ac53: feat(eslint-config): update function type signature. `pick` and `omit` properties disallow duplicated rule names

## 0.2.0

### Minor Changes

- a2d5f7c: chore: require eslint >= 8.57.1

### Patch Changes

- 1c3fa77: chore: update deps

## 0.1.3

### Patch Changes

- 9e94865: chore: upgrade deps

## 0.1.2

### Patch Changes

- e7376a3: feat(eslint-config): add rule `unicorn/prefer-export-from`
- c8cf96d: chore: upgrade deps
- 84e0219: refactor(eslint-config): remove deprecated rules
- Updated dependencies [c8cf96d]
  - eslint-plugin-publint@0.0.4

## 0.1.1

### Patch Changes

- Updated dependencies [e3bed52]
- Updated dependencies [2b04bbd]
  - @fenge/eslint-plugin@0.1.1
  - eslint-plugin-esm@0.2.1

## 0.1.0

### Minor Changes

- b5b70e3: feat(eslint-config): migrate from `@git-validator/eslint-config` to `@fenge/eslint-config`

### Patch Changes

- Updated dependencies [0beda11]
- Updated dependencies [615a726]
  - @fenge/eslint-plugin@0.1.0
  - @fenge/eslint-plugin-ts@0.1.0
