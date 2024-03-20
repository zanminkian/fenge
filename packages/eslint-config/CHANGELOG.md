# @git-validator/eslint-config

## 0.4.1

### Patch Changes

- 66c444f: feat(eslint-config): enable `unicorn/no-array-callback-reference`
- cb671f9: feat(eslint-plugin-packagejson): add `packagejson/exact-dependency-version` rule
- Updated dependencies [cb671f9]
  - @git-validator/eslint-plugin-packagejson@0.2.1

## 0.4.0

### Minor Changes

- c7ed624: chore: upgrade deps

### Patch Changes

- 42ced10: feat(eslint-config): type guard for pick and omit functions
- 9356686: feat(eslint-config): disallow importing file without extension
- 4a61e44: feat(eslint-config): detect tsconfig.build.json for eslint config
- 4dceedd: feat(eslint-config): change all `warn` to `error`
- f562948: feat(eslint-config): move `dot-notation`, remove `promise/param-names`, add `unicorn/import-style`
- Updated dependencies [c7ed624]
  - @git-validator/eslint-plugin@0.4.0

## 0.3.3

### Patch Changes

- 5015e4c: fix(eslint-config): fix globally ignore
- d991038: feat(eslint-config): support `pick` and `omit` config

## 0.3.2

### Patch Changes

- 168abe1: fix: filter comments in gitignore

## 0.3.1

### Patch Changes

- 404ab8a: feat(eslint-config): enable some unicorn rules
- Updated dependencies [7221d89]
  - @git-validator/eslint-plugin@0.3.0

## 0.3.0

### Minor Changes

- f7213e1: chore: upgrade deps, drop support for node 16

### Patch Changes

- Updated dependencies [f7213e1]
  - @git-validator/eslint-plugin@0.2.0
  - @git-validator/eslint-plugin-packagejson@0.2.0

## 0.2.0

### Minor Changes

- cfdf8b2: refactor(eslint-config): remove base.js
- ea5984b: refactor(eslint-config)!: do not apply ts rules to js files

### Patch Changes

- 171e720: feat(eslint-plugin): ban ts comment
- 21d5be8: feat(eslint-config): add eslint-plugin-react
- 9d69f9c: feat(eslint-config): re-enable `no-undef`
- Updated dependencies [171e720]
  - @git-validator/eslint-plugin@0.1.13

## 0.1.32

### Patch Changes

- Updated dependencies [02d2513]
  - @git-validator/eslint-plugin@0.1.12

## 0.1.31

### Patch Changes

- 200e5a4: feat(eslint-config): enable `@typescript-eslint/restrict-plus-operands`
- 17cac66: refactor: lock dependencies version
- Updated dependencies [17cac66]
  - @git-validator/eslint-plugin@0.1.11

## 0.1.30

### Patch Changes

- 4421499: revert(eslint-config): remove `array-callback-return` as it's already existing

## 0.1.29

### Patch Changes

- 3d32924: chore: add repository field to package.json
- 56396ca: feat: validate repository field in package.json
- Updated dependencies [3d32924]
- Updated dependencies [56396ca]
  - @git-validator/eslint-plugin-packagejson@0.1.4
  - @git-validator/eslint-plugin@0.1.10

## 0.1.28

### Patch Changes

- f7f8b93: feat(eslint-config): no delete and arguments
- 060128e: feat(eslint-config): enable `array-callback-return`

## 0.1.27

### Patch Changes

- 6797115: fix(eslint-config): allow PacalCase for functions

## 0.1.26

### Patch Changes

- 7e059c2: feat(eslint-config): enable `func-name-matching`
- 560c8e1: feat(eslint-config): enable `no-multi-assign`
- ef5108b: feat(eslint-config): make function and class naming consistent
- f39d37c: feat(eslint-config): enable `@typescript-eslint/consistent-generic-constructors`

## 0.1.25

### Patch Changes

- 2a169bf: feat(eslint-config): allow to use `res` and `rej` as Promise constructor params name

## 0.1.24

### Patch Changes

- b565091: feat(eslint-config): enable `no-shadow`

## 0.1.23

### Patch Changes

- f42e719: feat: required workspace root package.json to be private
- Updated dependencies [f42e719]
  - @git-validator/eslint-plugin-packagejson@0.1.3

## 0.1.22

### Patch Changes

- 537a8a1: chore: upgrade deps
- Updated dependencies [537a8a1]
  - @git-validator/eslint-plugin@0.1.9

## 0.1.21

### Patch Changes

- 69713fe: feat(eslint-config): enable rule `unicorn/prefer-module`
- b7f83a0: chore: upgrade deps
- Updated dependencies [b7f83a0]
  - @git-validator/eslint-plugin@0.1.8

## 0.1.20

### Patch Changes

- 3fdc049: feat(eslint-config): enable `no-unused-private-class-members`

## 0.1.19

### Patch Changes

- 8025d53: fix: compatible with windows
- Updated dependencies [8025d53]
  - @git-validator/eslint-plugin@0.1.7

## 0.1.18

### Patch Changes

- 03f32fd: chore: upgrade deps
- Updated dependencies [5e8fbd0]
- Updated dependencies [03f32fd]
  - @git-validator/eslint-plugin-packagejson@0.1.2
  - @git-validator/eslint-plugin@0.1.6

## 0.1.17

### Patch Changes

- 8715429: chore: upgrade deps
- Updated dependencies [a45875d]
  - @git-validator/eslint-plugin-packagejson@0.1.1

## 0.1.16

### Patch Changes

- 2179bde: fix(eslint-config): remove jest rule restrictions

## 0.1.15

### Patch Changes

- fc487cd: feat(eslint-config): warn on non null assertion
- 1ea8f1f: feat(eslint-config,eslint-plugin-packagejson,git-validator): support validate package json
- 876dd47: feat: force `types` on the top
- 814b294: feat: force `default` field to be the bottom
- Updated dependencies [1ea8f1f]
- Updated dependencies [876dd47]
- Updated dependencies [814b294]
  - @git-validator/eslint-plugin-packagejson@0.1.0

## 0.1.14

### Patch Changes

- 382e264: fix(eslint-config): loosen restriction about type assertions

## 0.1.13

### Patch Changes

- 2831bef: chore: upgrade deps
- Updated dependencies [2831bef]
  - @git-validator/eslint-plugin@0.1.5

## 0.1.12

### Patch Changes

- d04e6b5: feat(eslint-config): required return await
- 632d4f3: feat(eslint-config): lint js if detected tsconfig

## 0.1.11

### Patch Changes

- fdb0038: feat(eslint-config): ban ts comment

## 0.1.10

### Patch Changes

- fede930: fix(eslint-config): ignore ts files when there is no tsconfig

## 0.1.9

### Patch Changes

- Updated dependencies [ebb333e]
  - @git-validator/eslint-plugin@0.1.4

## 0.1.8

### Patch Changes

- b2bea40: fix(eslint-config): fix crash if there is no `tsconfig.json` in project root
- 9e6174e: chore: upgrade deps
- Updated dependencies [9e6174e]
  - @git-validator/eslint-plugin@0.1.3

## 0.1.6

### Patch Changes

- b1ffc74: fix(eslint-config): fix crash when there is no .gitignore file in project root

## 0.1.5

### Patch Changes

- 2bda39a: feat(eslint-config): enable `@typescript-eslint/unbound-method`
- 76d635e: feat(eslint-config): ignore files in `.gitignore`
- Updated dependencies [aa8dd92]
  - @git-validator/eslint-plugin@0.1.2

## 0.1.4

### Patch Changes

- e7a1c9f: feat(eslint-config): enable some ts rules
- c9b0c89: feat(eslint-config): support strict mode

## 0.1.3

### Patch Changes

- 2b7cf18: feat(eslint-config): remove `__dirname` and `__filename` in globals

## 0.1.2

### Patch Changes

- d19ba77: feat(eslint-config): turn off no-undef
- 829cdf6: feat(eslint-config): enable react hooks rules

## 0.1.1

### Patch Changes

- 2686f0b: feat(eslint-config): ban commonjs in js file
- dd0ecd9: feat(eslint-config): enable some rules
- Updated dependencies [b36ba4b]
  - @git-validator/eslint-plugin@0.1.1

## 0.1.0

### Minor Changes

- 118dcce: refactor(eslint-config): rename

### Patch Changes

- Updated dependencies [d2f3bb4]
  - @git-validator/eslint-plugin@0.1.0
