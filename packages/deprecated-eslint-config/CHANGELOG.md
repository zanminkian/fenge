# @git-validator/eslint-config

## 0.10.1

### Patch Changes

- @fenge/eslint-config@0.1.1

## 0.10.0

### Minor Changes

- b5b70e3: feat(eslint-config): migrate from `@git-validator/eslint-config` to `@fenge/eslint-config`

### Patch Changes

- Updated dependencies [b5b70e3]
  - @fenge/eslint-config@0.1.0

## 0.9.3

### Patch Changes

- 3b6023c: chore: upgrade deps

## 0.9.2

### Patch Changes

- b1ae4aa: feat(eslint-config): enable `unicorn/prefer-global-this`
- 89ef8e9: feat(eslint-config): add rule `unicorn/no-array-method-this-argument`

## 0.9.1

### Patch Changes

- 28edf1c: feat(eslint-plugin-esm)!: support `allowDevDependencies` option
- Updated dependencies [44584fa]
- Updated dependencies [28edf1c]
  - eslint-plugin-pkg-json@0.1.1
  - eslint-plugin-publint@0.0.3
  - eslint-plugin-esm@0.2.0

## 0.9.0

### Minor Changes

- d564959: refactor: migrate from `@git-validator/eslint-plugin-packagejson` to `eslint-plugin-pkg-json`

### Patch Changes

- d226f01: feat(eslint-config): add rule `@typescript-eslint/no-useless-empty-export`
- Updated dependencies [9aa9d94]
- Updated dependencies [d564959]
- Updated dependencies [5fd6951]
  - @git-validator/eslint-plugin-ts@0.2.4
  - eslint-plugin-pkg-json@0.1.0

## 0.8.3

### Patch Changes

- 6ceacd8: feat(eslint-config): ban `self` and `global`, prefer `globalThis`
- Updated dependencies [5b49895]
  - @git-validator/eslint-plugin@0.11.1

## 0.8.2

### Patch Changes

- 1e65b26: feat(eslint-config): add rule `@typescript-eslint/prefer-optional-chain`
- 6443828: refactor: remove rule `new-parens`
- Updated dependencies [52c7428]
- Updated dependencies [6443828]
- Updated dependencies [638cdbb]
  - eslint-plugin-esm@0.1.1
  - @git-validator/eslint-plugin@0.11.0

## 0.8.1

### Patch Changes

- 605aba8: refactor(eslint-plugin)!: change `no-for-in` to `no-restricted-loops`
- aafe41a: feat(eslint-config): add rule `unicorn/prefer-ternary`
- Updated dependencies [e8324b1]
- Updated dependencies [605aba8]
- Updated dependencies [dec91cb]
  - @git-validator/eslint-plugin@0.10.0

## 0.8.0

### Minor Changes

- d0491d8: refactor: migrate rules from `@git-validator/eslint-plugin` to `eslint-plugin-esm`
- aaeacd0: refactor: remove rules `ban-ts-comment` and `prefer-global-this`

### Patch Changes

- d5f82e6: refactor(eslint-config): remove rule `n/no-sync`
- a94ac0a: chore: upgrade deps
- 1e8b9f0: feat(eslint-config): add `n/prefer-global/*` rules
- Updated dependencies [4a8d62f]
- Updated dependencies [a94ac0a]
- Updated dependencies [2e127fc]
- Updated dependencies [d0491d8]
- Updated dependencies [aaeacd0]
  - @git-validator/eslint-plugin-ts@0.2.3
  - eslint-plugin-publint@0.0.2
  - @git-validator/eslint-plugin-packagejson@0.3.2
  - @git-validator/eslint-plugin@0.9.0
  - eslint-plugin-esm@0.1.0

## 0.7.4

### Patch Changes

- Updated dependencies [6e12f6c]
  - @git-validator/eslint-plugin-ts@0.2.2

## 0.7.3

### Patch Changes

- c982671: feat: add rule `no-rename-exports`
- Updated dependencies [c982671]
  - @git-validator/eslint-plugin@0.8.3

## 0.7.2

### Patch Changes

- 6f5ceae: chore: upgrade deps
- 9f7bb83: feat(eslint-plugin): add rule `no-rename-imports`
- Updated dependencies [9f7bb83]
  - @git-validator/eslint-plugin@0.8.2

## 0.7.1

### Patch Changes

- c05b382: feat: add rule `required-hashbang`
- d3d4d00: fix(eslint-config): remove `no-undef-init` as it will be conflict with `init-declaration`
- b124509: feat(eslint-config): allow to override the buit-in rules
- 1305b27: feat(eslint-config): integrate publint
- 4e14cce: feat: add rule `no-phantom-dep-imports`
- Updated dependencies [36a745f]
- Updated dependencies [c05b382]
- Updated dependencies [4e14cce]
  - eslint-plugin-publint@0.0.1
  - @git-validator/eslint-plugin-packagejson@0.3.1
  - @git-validator/eslint-plugin@0.8.1

## 0.7.0

### Minor Changes

- 302d2dc: feat(eslint-config): allow to extend the config

### Patch Changes

- 63dee26: feat(eslint-config): add some rules
- Updated dependencies [6a8cd8e]
  - @git-validator/eslint-plugin-ts@0.2.1

## 0.6.1

### Patch Changes

- 059bc5f: fix(eslint-config): allow PascalCase for type parameters
- 26bc106: feat(eslint-config): make `@typescript-eslint/no-misused-promises` stricter
- Updated dependencies [6f77d2a]
  - @git-validator/eslint-plugin-ts@0.2.0

## 0.6.0

### Minor Changes

- 83a0c36: refactor(eslint-config): remove `@typescript-eslint/no-loss-of-precision`
- 623c34c: feat: sorting imports by prettier instead of eslint
- 26cf6b3: refactor: remove `@git-validator/no-es6-getter-setter` and `@git-validator/no-legacy-getter-setter`

### Patch Changes

- f143acf: feat(eslint-config): add some sonarjs rules
- Updated dependencies [681c8ba]
- Updated dependencies [26cf6b3]
  - @git-validator/eslint-plugin@0.8.0
  - @git-validator/eslint-plugin-ts@0.1.1

## 0.5.12

### Patch Changes

- acd5b9d: feat(eslint-config): enable rule `@typescript-eslint/no-empty-object-type`
- 5dc822f: feat(eslint-config): add some `@typescript-eslint/*` rules

## 0.5.11

### Patch Changes

- 3114cc6: feat(eslint-config): add rule `es-x/no-async-iteration`
- f008e5f: feat(eslint-config): add rule `es-x/no-accessor-properties`

## 0.5.10

### Patch Changes

- d1fa184: feat(eslint-config): enable `getter-return` and `no-setter-return`
- ac82f47: feat(eslint-config): no generators

## 0.5.9

### Patch Changes

- c381164: feat: add rule `no-side-effect-import`
- Updated dependencies [c381164]
  - @git-validator/eslint-plugin@0.7.2

## 0.5.8

### Patch Changes

- 05d4156: feat: add rule `no-directory-imports`
- Updated dependencies [05d4156]
  - @git-validator/eslint-plugin@0.7.1

## 0.5.7

### Patch Changes

- fed12fd: chore: upgrade deps

## 0.5.6

### Patch Changes

- 4e50f10: feat(eslint-config): add more limitation for `naming-convention`
- 40fff71: feat(eslint-config): no default export
- 13b19ee: feat(eslint-config): enable `sonarjs/no-inverted-boolean-check`
- Updated dependencies [cf9187a]
  - @git-validator/eslint-plugin-packagejson@0.3.0
  - @git-validator/eslint-plugin@0.7.0

## 0.5.5

### Patch Changes

- 08cbf99: feat: add rule `no-es6-getter-setter`
- 71a4794: feat: add rule `packagejson/no-nonstandard-property`
- 16b4a02: feat(eslint-config): add rule `unicorn/no-useless-spread`
- b923cbb: feat(eslint-config): add plugin `eslint-plugin-sonarjs`
- Updated dependencies [08cbf99]
- Updated dependencies [71a4794]
  - @git-validator/eslint-plugin@0.6.11
  - @git-validator/eslint-plugin-packagejson@0.2.8

## 0.5.4

### Patch Changes

- ac9714c: fix(eslint-config): don't throw errors when a dir does not contain supported files
- Updated dependencies [349c609]
- Updated dependencies [421f042]
  - @git-validator/eslint-plugin@0.6.10

## 0.5.3

### Patch Changes

- 28d1046: chore: upgrade deps
- Updated dependencies [28d1046]
  - @git-validator/eslint-plugin@0.6.9

## 0.5.2

### Patch Changes

- ecb2565: feat(eslint-config): add rule `no-param-reassign`

## 0.5.1

### Patch Changes

- Updated dependencies [9035843]
  - @git-validator/eslint-plugin@0.6.8

## 0.5.0

### Minor Changes

- fbdf8a3: feat(eslint-config)!: add new builder, drop strict mode, tsconfig.json in project root is required for ts projects (js projects don't require it)

### Patch Changes

- edf2c80: chore: upgrade deps

## 0.4.23

### Patch Changes

- 97007ad: feat(eslint-config): enable `unicorn/explicit-length-check`
- a31d977: chore: upgrade deps
- Updated dependencies [a31d977]
  - @git-validator/eslint-plugin@0.6.7

## 0.4.22

### Patch Changes

- a93b53a: feat(eslint-config): enable `@typescript-eslint/switch-exhaustiveness-check`
- 18617b4: feat: add rule `@git-validator/no-unnecessary-template-string`
- 7ca4f81: chore: upgrade deps
- be32605: feat: add `@git-validator/no-untyped-empty-array`
- Updated dependencies [18617b4]
- Updated dependencies [7ca4f81]
- Updated dependencies [be32605]
  - @git-validator/eslint-plugin@0.6.6

## 0.4.21

### Patch Changes

- a0ba890: feat(eslint-config): consistent type definitions in ts
- 704cab7: feat(eslint-config): no empty

## 0.4.20

### Patch Changes

- 57d7345: feat(eslint-config): enable `@typescript-eslint/prefer-readonly`
- 63ceae5: feat(eslint-config): enable `prefer-arrow-callback`
- 3edd6fa: feat: add rule `@git-validator/require-reduce-initial-value`
- Updated dependencies [3edd6fa]
- Updated dependencies [a251612]
  - @git-validator/eslint-plugin@0.6.5

## 0.4.19

### Patch Changes

- 7636080: feat: add `no-types-dependency-in-workspace-root`
- c2d6668: feat(eslint-config): enable `unicorn/prefer-includes`
- f3614fb: feat: add no-conflict-types
- Updated dependencies [7636080]
- Updated dependencies [f3614fb]
  - @git-validator/eslint-plugin-packagejson@0.2.7

## 0.4.18

### Patch Changes

- 831a17a: chore: upgrade deps
- Updated dependencies [831a17a]
  - @git-validator/eslint-plugin@0.6.4

## 0.4.17

### Patch Changes

- ce32960: chore: upgrade deps
- 25dba0e: fix(eslint-config): turn off @typescript-eslint/no-restricted-imports in declaration files
- be836ea: feat(eslint-config): add some ts rules
- 5460a42: feat(eslint-config): enable `prefer-template`
- 01c72e8: feat(eslint-config): disallow to import from a ts file
- f2b309e: chore: upgrade deps
- Updated dependencies [ce32960]
- Updated dependencies [f2b309e]
  - @git-validator/eslint-plugin@0.6.3

## 0.4.16

### Patch Changes

- 76202ce: chore: upgrade deps
- 691145f: chore: lock dependencies version
- Updated dependencies [76202ce]
- Updated dependencies [eb8e9cc]
  - @git-validator/eslint-plugin@0.6.2
  - @git-validator/eslint-plugin-packagejson@0.2.6

## 0.4.15

### Patch Changes

- 4e8e7b4: feat(eslint-config): add `unicorn/consistent-empty-array-spread`
- 9ff6df9: chore: upgrade deps
- Updated dependencies [9ff6df9]
  - @git-validator/eslint-plugin@0.6.1

## 0.4.14

### Patch Changes

- 03b51e2: fix(eslint-config): respect the non-root `.gitignore` file
- Updated dependencies [ff873b4]
- Updated dependencies [ac53ca5]
  - @git-validator/eslint-plugin@0.6.0

## 0.4.13

### Patch Changes

- a3dfa23: feat(eslint-config): add `@typescript-eslint/dot-notation` for ts

## 0.4.12

### Patch Changes

- de7e7a9: feat: no lifecycle script
- 07366db: chore: upgrade deps
- Updated dependencies [de7e7a9]
- Updated dependencies [07366db]
  - @git-validator/eslint-plugin-packagejson@0.2.5
  - @git-validator/eslint-plugin@0.5.4

## 0.4.11

### Patch Changes

- 28f95d7: chore: upgrade deps
- Updated dependencies [28f95d7]
  - @git-validator/eslint-plugin@0.5.3

## 0.4.10

### Patch Changes

- 991e9f3: feat(eslint-config): fs,process,child_process should be named imported
- ab8226c: chore: upgrade deps
- 298a933: refactor(eslint-config): optimize ts test config
- 1dbaf24: feat(eslint-config): restrict the import style of `fs/promises` and `util/types`
- Updated dependencies [ab8226c]
  - @git-validator/eslint-plugin-packagejson@0.2.4
  - @git-validator/eslint-plugin@0.5.2

## 0.4.9

### Patch Changes

- 7227983: feat(eslint-config): disable `no-floating-promise` in test file

## 0.4.8

### Patch Changes

- d0dce38: chore: bump version
- Updated dependencies [d0dce38]
  - @git-validator/eslint-plugin@0.5.1
  - @git-validator/eslint-plugin-packagejson@0.2.3

## 0.4.7

### Patch Changes

- c11f37c: feat: add `required-engines`
- Updated dependencies [c11f37c]
  - @git-validator/eslint-plugin-packagejson@0.2.2

## 0.4.6

### Patch Changes

- 0666572: feat(eslint-config): add `@typescript-eslint/only-throw-error`
- 6142bbe: feat(eslint-config): add some rules
- 8408a08: feat: add `new-parens`
- Updated dependencies [4ae0856]
- Updated dependencies [8408a08]
  - @git-validator/eslint-plugin@0.5.0

## 0.4.5

### Patch Changes

- 0bcadde: chore: upgrade deps
- Updated dependencies [0bcadde]
  - @git-validator/eslint-plugin@0.4.3

## 0.4.4

### Patch Changes

- f604ff4: fix(eslint-config): move `@git-validator/no-property-decorator` to ts from js

## 0.4.3

### Patch Changes

- 6c0f136: feat(eslint-plugin): add `no-property-decorator`
- Updated dependencies [6c0f136]
  - @git-validator/eslint-plugin@0.4.2

## 0.4.2

### Patch Changes

- 5f85872: feat(eslint-plugin): add `exact-map-set-type`
- 5248c01: feat(eslint-plugin): add `no-for-in`
- a87f82d: feat(eslint-config): add `prefer-object-has-own` and `@typescript-eslint/no-for-in-array`
- 3af8795: feat(eslint-config): add `unicorn/no-for-loop`
- 1ac0fc4: feat(eslint-plugin): add `no-instanceof-builtin`
- Updated dependencies [5f85872]
- Updated dependencies [5248c01]
- Updated dependencies [1ac0fc4]
  - @git-validator/eslint-plugin@0.4.1

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
