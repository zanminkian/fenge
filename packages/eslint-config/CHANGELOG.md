# @fenge/eslint-config

## 0.5.4

### Patch Changes

- cb2a822: feat: remove `esm/no-ts-file-imports`, and add `esm/no-declaration-file-imports`
- cb2a822: feat: add rule `no-inexistent-relative-imports`
- Updated dependencies [cb2a822]
- Updated dependencies [cb2a822]
  - eslint-plugin-esm@0.5.0

## 0.5.3

### Patch Changes

- d0e9357: feat: add rule `no-nested-function`
- d0e9357: feat: add rule `no-top-level-arrow-function`
- 2560801: chore: upgrade deps
- d0e9357: feat: add rule `no-nested-class`
- Updated dependencies [d0e9357]
- Updated dependencies [d0e9357]
- Updated dependencies [d0e9357]
  - @fenge/eslint-plugin@0.1.3

## 0.5.2

### Patch Changes

- 9fcef9d: fix(eslint-config): move `class-literal-property-style` back to ts base
- 3f45e5f: feat(eslint-config): add rule `unicorn/prefer-object-from-entries`

## 0.5.1

### Patch Changes

- 57d1dfe: chore: upgrade deps
- 553928a: feat(eslint-config): add rule `func-style`
- 8c4b1d4: feat(eslint-config): add rule `no-inner-declarations`
- 6c0185f: feat(eslint-config): add rule `logical-assignment-operators`
- 9bb1dd5: feat(eslint-config): add rule `func-names`
- Updated dependencies [85cd2d5]
- Updated dependencies [a2e9f23]
- Updated dependencies [36c4c6b]
  - eslint-plugin-esm@0.4.0
  - eslint-plugin-pkg-json@0.1.3

## 0.5.0

### Minor Changes

- a3b985c: refactor: rename `Builder` methods to be camel case
- 8b468ec: refactor: remove `append` property for Builder. user can use append method

### Patch Changes

- d832aad: chore: upgrade deps
- 6c64129: feat: add rule `no-empty-exports`
- 692d3e8: feat(eslint-config): support `append` method
- 9cde584: feat(eslint-config): add rule `prefer-spread`
- b26463e: feat(eslint-config): add rule `n/no-process-exit`
- 778a198: feat: add rule `esm/required-exports`
- 9b1f20a: feat(eslint-config): add rule `es-x/no-hashbang`
- 4056ab2: feat(eslint-config): add rule `import/no-empty-named-blocks`
- e36c13c: feat(eslint-config): enforce checking unused jsx
- Updated dependencies [6c64129]
- Updated dependencies [d54423b]
- Updated dependencies [1b7d98c]
- Updated dependencies [778a198]
- Updated dependencies [2d485c9]
  - eslint-plugin-esm@0.3.0

## 0.4.1

### Patch Changes

- 1957781: fix(eslint-config): change `project` to `projectService`, close #309

## 0.4.0

### Minor Changes

- c7a01e8: refactor(eslint-config): replace `override` and `extend` properties with `append` property for overriding or extending the built-in rules
- c5a6425: feat(eslint-config): allow configuring global linter options, and disable `reportUnusedDisableDirectives` by default
- 1f5fce3: refactor(eslint-config): optimize config structure
- 2f12ec2: refactor(eslint-config): optimize config structure and remove `project` param for ts config

### Patch Changes

- 5adeeed: fix: add missing peerDependencies and peerDependenciesMeta
- 36d1fb0: chore: upgrade deps
- 84944a3: feat(eslint-config): add rule `es-x/no-top-level-await`
- 0d71378: fix(eslint-config): allow import module from devDependencies for config files
- 740fdb7: feat(eslint-config): remove rule `no-template-curly-in-string` for flexibility
- 41c783a: feat(eslint-config): add many built-in and @typescript-eslint recommended rules
- 3f4e737: feat(eslint-config): add many rules of `eslint-plugin-unicorn`
- 905e445: chore: update deps
- 51502cc: feat: add rule `@fenge/no-jsx-in-non-jsx-file`
- af6e004: feat(eslint-config): add rule `no-console`
- Updated dependencies [58c81c0]
- Updated dependencies [905e445]
- Updated dependencies [51502cc]
- Updated dependencies [cd5aead]
- Updated dependencies [0c4462d]
- Updated dependencies [713d9a2]
  - @fenge/eslint-plugin-ts@0.2.0
  - eslint-plugin-esm@0.2.2
  - @fenge/eslint-plugin@0.1.2
  - eslint-plugin-pkg-json@0.1.2
  - eslint-plugin-publint@0.0.5

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
