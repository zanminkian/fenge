# @fenge/eslint-config

## 0.6.4

### Patch Changes

- a8963ee: chore: upgrade deps
- c833fd7: feat: add rule `@typescript-eslint/prefer-nullish-coalescing`
- Updated dependencies [a8963ee]
  - eslint-plugin-publint@0.2.3

## 0.6.3

### Patch Changes

- a18f616: feat(eslint-config): make `name` of `ConfigItem` optional

## 0.6.2

### Patch Changes

- 57c267d: feat: add rule `esm/top-side-effect-imports`
- Updated dependencies [57c267d]
- Updated dependencies [106e43b]
  - eslint-plugin-esm@0.8.1
  - eslint-plugin-publint@0.2.2

## 0.6.1

### Patch Changes

- c4931eb: chore: upgrade deps
- 9b7c7f4: feat: add rule `n/no-unpublished-bin`
- d15775e: feat: add more rules of `eslint-plugin-unicorn`
- Updated dependencies [c4931eb]
- Updated dependencies [e62e708]
  - eslint-plugin-publint@0.2.1

## 0.6.0

### Minor Changes

- 28d8553: chore: required node ^18.20.0 or >=20.10.0

### Patch Changes

- Updated dependencies [28d8553]
  - eslint-plugin-pkg-json@0.3.0
  - eslint-plugin-publint@0.2.0
  - eslint-plugin-esm@0.8.0
  - @fenge/eslint-plugin-ts@0.4.0
  - @fenge/eslint-plugin@0.4.0

## 0.5.13

### Patch Changes

- b6cbd84: fix(eslint-config): pure js should work now

## 0.5.12

### Patch Changes

- 995ac57: feat(eslint-config): disallow `.[mc][tj]s` file extension
- Updated dependencies [01657a8]
- Updated dependencies [0b642a5]
- Updated dependencies [0d630e7]
- Updated dependencies [5a33140]
  - eslint-plugin-esm@0.7.0
  - eslint-plugin-pkg-json@0.2.0

## 0.5.11

### Patch Changes

- 84db81d: feat(eslint-config): add rule `react/jsx-props-no-spread-multi` and `react/jsx-uses-vars`
- d36061e: feat(eslint-config): replace rule `@fenge/no-jsx-in-non-jsx-file` with `react/jsx-filename-extension`
- a20ec6a: feat(eslint-config): add rule `react/jsx-no-useless-fragment`
- Updated dependencies [9f27f60]
  - @fenge/eslint-plugin@0.3.0

## 0.5.10

### Patch Changes

- ee96c15: chore: upgrade deps
- 67f3677: feat(eslint-config): add rule `promise/no-return-wrap` and `promise/prefer-catch`
- 3927795: chore(eslint-config): remove rule `import/newline-after-import`
- Updated dependencies [ee96c15]
- Updated dependencies [501e3b4]
- Updated dependencies [69c449c]
- Updated dependencies [da63d2e]
  - eslint-plugin-publint@0.1.3
  - @fenge/eslint-plugin-ts@0.3.0
  - eslint-plugin-esm@0.6.1

## 0.5.9

### Patch Changes

- ba3e2f5: feat(eslint-config): add rule `@typescript-eslint/no-unnecessary-boolean-literal-compare`
- c44f1fb: refactor(eslint-config): builder options defaults to `{}`
- 2be3d29: chore: upgrade deps
- Updated dependencies [2be3d29]
  - eslint-plugin-publint@0.1.2
  - @fenge/eslint-plugin-ts@0.2.3

## 0.5.8

### Patch Changes

- 17936c7: feat: add `for-direction`
- Updated dependencies [0c3b8f0]
- Updated dependencies [d2e61d3]
  - eslint-plugin-publint@0.1.1
  - @fenge/eslint-plugin@0.2.0

## 0.5.7

### Patch Changes

- 2e702e2: chore: upgrade deps
- 10b7f69: feat: add rule `@typescript-eslint/consistent-type-imports`
- Updated dependencies [2e702e2]
- Updated dependencies [60c56ed]
  - @fenge/eslint-plugin-ts@0.2.2
  - eslint-plugin-publint@0.1.0

## 0.5.6

### Patch Changes

- 1c35021: feat: add rule `no-misuse-spreading-parameter`
- Updated dependencies [1c35021]
  - @fenge/eslint-plugin-ts@0.2.1

## 0.5.5

### Patch Changes

- Updated dependencies [02d0164]
  - eslint-plugin-esm@0.6.0

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
