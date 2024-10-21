# git-validator

## 0.23.1

### Patch Changes

- @git-validator/eslint-config@0.10.1

## 0.23.0

### Minor Changes

- 27bbb4a: feat: migrate `git-validator` to fenge

  IMPORTANT: We migrate all the features from `git-validator` to `fenge` now. `git-validator` will be deprecated later.

### Patch Changes

- Updated dependencies [514733a]
- Updated dependencies [67f298b]
- Updated dependencies [db5931d]
- Updated dependencies [b5b70e3]
  - @git-validator/tsconfig@0.9.0
  - @git-validator/types@0.2.0
  - @git-validator/prettier-config@0.7.0
  - @git-validator/eslint-config@0.10.0

## 0.22.0

### Minor Changes

- 631222b: feat(tsconfig): add compile option `noUncheckedSideEffectImports`, which is required TS 5.6+
- 7961d46: refactor(git-validator): rename cli options `--no-eslint` and `--no-prettier` to `--no-lint` and `--no-format`

### Patch Changes

- Updated dependencies [631222b]
- Updated dependencies [3b6023c]
- Updated dependencies [cb8c5bc]
  - @git-validator/tsconfig@0.8.0
  - @git-validator/eslint-config@0.9.3

## 0.21.0

### Minor Changes

- b52d915: refactor(git-validator)!: remove `commitlint`

  BREAKING CHANGE: We now remove `commitlint`. It means this tool will not check commit message on git `commit-msg` stage. We encourage to use [git-commit-msg-linter](https://www.npmjs.com/package/git-commit-msg-linter) as the alternative. After upgrading this tool, you will need to delete `commit-msg` file in the `.git/hooks` folder of the project root.

### Patch Changes

- 7c26453: fix: correct the peerDependencies
- Updated dependencies [332239c]
- Updated dependencies [b1ae4aa]
- Updated dependencies [edd988d]
- Updated dependencies [89ef8e9]
  - @git-validator/prettier-config@0.6.0
  - @git-validator/eslint-config@0.9.2

## 0.20.10

### Patch Changes

- Updated dependencies [28edf1c]
  - @git-validator/eslint-config@0.9.1

## 0.20.9

### Patch Changes

- Updated dependencies [d564959]
- Updated dependencies [d226f01]
  - @git-validator/eslint-config@0.9.0

## 0.20.8

### Patch Changes

- Updated dependencies [6ceacd8]
  - @git-validator/eslint-config@0.8.3

## 0.20.7

### Patch Changes

- Updated dependencies [1e65b26]
- Updated dependencies [6443828]
  - @git-validator/eslint-config@0.8.2

## 0.20.6

### Patch Changes

- Updated dependencies [605aba8]
- Updated dependencies [aafe41a]
  - @git-validator/eslint-config@0.8.1

## 0.20.5

### Patch Changes

- a94ac0a: chore: upgrade deps
- Updated dependencies [d5f82e6]
- Updated dependencies [a94ac0a]
- Updated dependencies [1e8b9f0]
- Updated dependencies [d0491d8]
- Updated dependencies [aaeacd0]
  - @git-validator/eslint-config@0.8.0
  - @git-validator/tsconfig@0.7.3

## 0.20.4

### Patch Changes

- Updated dependencies [06c52c7]
  - @git-validator/tsconfig@0.7.2
  - @git-validator/eslint-config@0.7.4

## 0.20.3

### Patch Changes

- Updated dependencies [c982671]
  - @git-validator/eslint-config@0.7.3

## 0.20.2

### Patch Changes

- 6f5ceae: chore: upgrade deps
- Updated dependencies [6f5ceae]
- Updated dependencies [9f7bb83]
  - @git-validator/eslint-config@0.7.2
  - @git-validator/tsconfig@0.7.1

## 0.20.1

### Patch Changes

- ddc3e1d: perf(git-validator): dynamically load default config
- 81f2bb9: chore: upgrade deps
- Updated dependencies [c05b382]
- Updated dependencies [d3d4d00]
- Updated dependencies [b124509]
- Updated dependencies [1305b27]
- Updated dependencies [81f2bb9]
- Updated dependencies [4e14cce]
  - @git-validator/eslint-config@0.7.1
  - @git-validator/prettier-config@0.5.1

## 0.20.0

### Minor Changes

- 28c8284: feat: migrate analyze command from `git-validator` to `smells`

### Patch Changes

- Updated dependencies [302d2dc]
- Updated dependencies [63dee26]
  - @git-validator/eslint-config@0.7.0

## 0.19.1

### Patch Changes

- Updated dependencies [059bc5f]
- Updated dependencies [26bc106]
  - @git-validator/eslint-config@0.6.1

## 0.19.0

### Minor Changes

- 681c8ba: feat: migrate ts rules from `@git-validator/eslint-plugin` to `@git-validator/eslint-plugin-ts`
- 623c34c: feat: sorting imports by prettier instead of eslint
- 1249b7a: perf(git-validator)!: only load custom config from `process.cwd()`
- eaf5caa: perf(git-validator)!: do not load config twice. drop support for legacy eslint config
- 7692950: feat: remove `allowArbitraryExtensions` option from tsconfig

### Patch Changes

- Updated dependencies [83a0c36]
- Updated dependencies [f143acf]
- Updated dependencies [623c34c]
- Updated dependencies [26cf6b3]
- Updated dependencies [7692950]
  - @git-validator/eslint-config@0.6.0
  - @git-validator/prettier-config@0.5.0
  - @git-validator/tsconfig@0.7.0

## 0.18.12

### Patch Changes

- Updated dependencies [acd5b9d]
- Updated dependencies [5dc822f]
  - @git-validator/eslint-config@0.5.12

## 0.18.11

### Patch Changes

- Updated dependencies [3114cc6]
- Updated dependencies [f008e5f]
  - @git-validator/eslint-config@0.5.11

## 0.18.10

### Patch Changes

- Updated dependencies [d1fa184]
- Updated dependencies [ac82f47]
  - @git-validator/eslint-config@0.5.10

## 0.18.9

### Patch Changes

- Updated dependencies [c381164]
  - @git-validator/eslint-config@0.5.9

## 0.18.8

### Patch Changes

- Updated dependencies [05d4156]
  - @git-validator/eslint-config@0.5.8

## 0.18.7

### Patch Changes

- c7e97ea: refactor(git-validator): don't export unnecessary bin
- 4602b54: fix(git-validator): subprocess will correctly be killed after process is killed
- Updated dependencies [fed12fd]
  - @git-validator/eslint-config@0.5.7

## 0.18.6

### Patch Changes

- Updated dependencies [4e50f10]
- Updated dependencies [40fff71]
- Updated dependencies [13b19ee]
  - @git-validator/eslint-config@0.5.6

## 0.18.5

### Patch Changes

- Updated dependencies [08cbf99]
- Updated dependencies [71a4794]
- Updated dependencies [16b4a02]
- Updated dependencies [b923cbb]
  - @git-validator/eslint-config@0.5.5

## 0.18.4

### Patch Changes

- a26419e: feat(git-validator): support `--dry-run` option for cli
- Updated dependencies [ac9714c]
  - @git-validator/eslint-config@0.5.4

## 0.18.3

### Patch Changes

- 28d1046: chore: upgrade deps
- 131b1fe: feat(git-validator): optimize spinner log
- Updated dependencies [28d1046]
  - @git-validator/prettier-config@0.4.8
  - @git-validator/eslint-config@0.5.3
  - @git-validator/tsconfig@0.6.1

## 0.18.2

### Patch Changes

- bb788b7: feat(git-validator): show spin during running time
- Updated dependencies [ecb2565]
  - @git-validator/eslint-config@0.5.2

## 0.18.1

### Patch Changes

- 20296e9: perf(git-validator): don't format again when there was no changes during linting
  - @git-validator/eslint-config@0.5.1

## 0.18.0

### Minor Changes

- 577e646: feat(tsconfig): add `${configDir}` template variable, requires ts 5.5

### Patch Changes

- edf2c80: chore: upgrade deps
- Updated dependencies [577e646]
- Updated dependencies [edf2c80]
- Updated dependencies [fbdf8a3]
  - @git-validator/tsconfig@0.6.0
  - @git-validator/eslint-config@0.5.0

## 0.17.13

### Patch Changes

- a31d977: chore: upgrade deps
- Updated dependencies [97007ad]
- Updated dependencies [a31d977]
  - @git-validator/eslint-config@0.4.23

## 0.17.12

### Patch Changes

- 7ca4f81: chore: upgrade deps
- Updated dependencies [a93b53a]
- Updated dependencies [222f68a]
- Updated dependencies [18617b4]
- Updated dependencies [7ca4f81]
- Updated dependencies [be32605]
  - @git-validator/eslint-config@0.4.22
  - @git-validator/tsconfig@0.5.1

## 0.17.11

### Patch Changes

- Updated dependencies [a0ba890]
- Updated dependencies [704cab7]
  - @git-validator/eslint-config@0.4.21

## 0.17.10

### Patch Changes

- Updated dependencies [57d7345]
- Updated dependencies [63ceae5]
- Updated dependencies [3edd6fa]
  - @git-validator/eslint-config@0.4.20

## 0.17.9

### Patch Changes

- 8319a36: feat(git-validator): add `git-validator/types` support
- Updated dependencies [1cab379]
- Updated dependencies [7636080]
- Updated dependencies [c2d6668]
- Updated dependencies [f3614fb]
- Updated dependencies [79a2fff]
- Updated dependencies [3bb8aee]
  - @git-validator/types@0.1.0
  - @git-validator/eslint-config@0.4.19
  - @git-validator/tsconfig@0.5.0

## 0.17.8

### Patch Changes

- 745e5a7: feat(git-validator): support to print json format on analyze command

## 0.17.7

### Patch Changes

- 831a17a: chore: upgrade deps
- a1356e0: fix(git-validator): remove npx
- Updated dependencies [831a17a]
  - @git-validator/prettier-config@0.4.7
  - @git-validator/eslint-config@0.4.18

## 0.17.6

### Patch Changes

- ce32960: chore: upgrade deps
- f2b309e: chore: upgrade deps
- Updated dependencies [ce32960]
- Updated dependencies [25dba0e]
- Updated dependencies [be836ea]
- Updated dependencies [5460a42]
- Updated dependencies [01c72e8]
- Updated dependencies [f2b309e]
  - @git-validator/prettier-config@0.4.6
  - @git-validator/eslint-config@0.4.17

## 0.17.5

### Patch Changes

- 76202ce: chore: upgrade deps
- 691145f: chore: lock dependencies version
- Updated dependencies [76202ce]
- Updated dependencies [691145f]
  - @git-validator/eslint-config@0.4.16

## 0.17.4

### Patch Changes

- 7cdfe03: fix(git-validator): resolve config from cwd
- 9ff6df9: chore: upgrade deps
- Updated dependencies [4e8e7b4]
- Updated dependencies [9ff6df9]
  - @git-validator/eslint-config@0.4.15
  - @git-validator/tsconfig@0.4.7

## 0.17.3

### Patch Changes

- Updated dependencies [03b51e2]
  - @git-validator/eslint-config@0.4.14

## 0.17.2

### Patch Changes

- Updated dependencies [a3dfa23]
  - @git-validator/eslint-config@0.4.13

## 0.17.1

### Patch Changes

- 14da17b: fix(git-validator): ignore unknown for formatter, align with linter

## 0.17.0

### Minor Changes

- 4635ad8: fix: do not update via linting on pre-commit stage

### Patch Changes

- dccb700: feat(git-validator): make formatter logger more silent
- 07366db: chore: upgrade deps
- Updated dependencies [de7e7a9]
- Updated dependencies [07366db]
  - @git-validator/eslint-config@0.4.12
  - @git-validator/prettier-config@0.4.5
  - prettier-ignore@0.1.3
  - @git-validator/tsconfig@0.4.6

## 0.16.1

### Patch Changes

- 28f95d7: chore: upgrade deps
- 2fa96b3: perf(git-validator): optimize lint-staged config
- Updated dependencies [28f95d7]
  - @git-validator/eslint-config@0.4.11

## 0.16.0

### Minor Changes

- 40a591c: feat(git-validator)!: `git-validator -u` do `format` -> `lint` -> `format`
- bb7f060: feat(git-validator): support globby patter on analyzing command

### Patch Changes

- da4320c: feat(git-validator): support ignore on analyze command
- 0bc27cd: feat(git-validator): print costed time after formatting or linting
- ab8226c: chore: upgrade deps
- Updated dependencies [991e9f3]
- Updated dependencies [ab8226c]
- Updated dependencies [298a933]
- Updated dependencies [1dbaf24]
  - @git-validator/eslint-config@0.4.10
  - @git-validator/prettier-config@0.4.4
  - prettier-ignore@0.1.2
  - @git-validator/tsconfig@0.4.5

## 0.15.13

### Patch Changes

- Updated dependencies [7227983]
  - @git-validator/eslint-config@0.4.9

## 0.15.12

### Patch Changes

- d0dce38: chore: bump version
- 0dddf34: feat(git-validator): count for `export default` expressions
- Updated dependencies [d0dce38]
  - @git-validator/eslint-config@0.4.8
  - @git-validator/prettier-config@0.4.3
  - prettier-ignore@0.1.1
  - @git-validator/tsconfig@0.4.4

## 0.15.11

### Patch Changes

- 9293f05: fix(tsconfig): do not diff `exclude` and `outDir`
- Updated dependencies [9293f05]
  - @git-validator/tsconfig@0.4.3

## 0.15.10

### Patch Changes

- Updated dependencies [c11f37c]
  - @git-validator/eslint-config@0.4.7

## 0.15.9

### Patch Changes

- 6c72cea: chore: upgrade deps
- Updated dependencies [0666572]
- Updated dependencies [6c72cea]
- Updated dependencies [6142bbe]
- Updated dependencies [8408a08]
  - @git-validator/eslint-config@0.4.6
  - @git-validator/prettier-config@0.4.2

## 0.15.8

### Patch Changes

- 0bcadde: chore: upgrade deps
- Updated dependencies [0bcadde]
- Updated dependencies [24e5f5d]
  - @git-validator/prettier-config@0.4.1
  - @git-validator/eslint-config@0.4.5
  - @git-validator/tsconfig@0.4.2

## 0.15.7

### Patch Changes

- Updated dependencies [f604ff4]
  - @git-validator/eslint-config@0.4.4

## 0.15.6

### Patch Changes

- Updated dependencies [6c0f136]
  - @git-validator/eslint-config@0.4.3

## 0.15.5

### Patch Changes

- df92eba: feat(git-validator): count for instanceof operators
- Updated dependencies [5f85872]
- Updated dependencies [5248c01]
- Updated dependencies [a87f82d]
- Updated dependencies [3af8795]
- Updated dependencies [1ac0fc4]
  - @git-validator/eslint-config@0.4.2

## 0.15.4

### Patch Changes

- 190bfc9: feat(git-validator): support show analysis detail
- 2c3ef1a: fix(git-validator): count non null assertions in class property definitions

## 0.15.3

### Patch Changes

- 0736748: chore(tsconfig): remove `forceConsistentCasingInFileNames`
- Updated dependencies [0736748]
  - @git-validator/tsconfig@0.4.1

## 0.15.2

### Patch Changes

- Updated dependencies [66c444f]
- Updated dependencies [cb671f9]
  - @git-validator/eslint-config@0.4.1

## 0.15.1

### Patch Changes

- 3085ba3: feat(git-validator): support --update alias
- 8b17253: fix(git-validator): counting renamed import includes import expressions
- 86d766a: feat(git-validator): support counting node protocol imports
- 7bad3bc: feat(git-validator): support counting import expressions
- 5182605: feat(git-validator): support counting `import.meta` expressions

## 0.15.0

### Minor Changes

- c7ed624: chore: upgrade deps

### Patch Changes

- 6d3da0d: feat(git-validator): count renamed import
- ba79174: fix(git-validator): ignore as const when analyzing
- Updated dependencies [207cf6a]
- Updated dependencies [42ced10]
- Updated dependencies [9356686]
- Updated dependencies [4a61e44]
- Updated dependencies [4dceedd]
- Updated dependencies [c7ed624]
- Updated dependencies [f562948]
  - prettier-ignore@0.1.0
  - @git-validator/eslint-config@0.4.0
  - @git-validator/prettier-config@0.4.0
  - @git-validator/tsconfig@0.4.0

## 0.14.8

### Patch Changes

- Updated dependencies [5015e4c]
- Updated dependencies [d991038]
  - @git-validator/eslint-config@0.3.3

## 0.14.7

### Patch Changes

- d3650fb: fix(git-validator): lazy import typescript estree

## 0.14.6

### Patch Changes

- a9bc033: fix(git-validator): add typescript to peer dependencies

## 0.14.5

### Patch Changes

- 8af7555: feat(git-validator): support analyze js files
- 4c20fdd: feat(git-validator): support more analyzing infos

## 0.14.4

### Patch Changes

- 168abe1: fix: filter comments in gitignore
- Updated dependencies [168abe1]
  - @git-validator/eslint-config@0.3.2

## 0.14.3

### Patch Changes

- d9d1279: fix(git-validator): support both tsx and ts

## 0.14.2

### Patch Changes

- 34826c0: fix(git-validator): support jsx file

## 0.14.1

### Patch Changes

- d4b48db: feat(git-validator): support analyze ts project to print some infos about code quality
- Updated dependencies [404ab8a]
  - @git-validator/eslint-config@0.3.1

## 0.14.0

### Minor Changes

- f7213e1: chore: upgrade deps, drop support for node 16

### Patch Changes

- Updated dependencies [f7213e1]
  - @git-validator/eslint-config@0.3.0
  - @git-validator/prettier-config@0.3.0
  - @git-validator/tsconfig@0.3.0

## 0.13.0

### Minor Changes

- 854efdd: feat(git-validator)!: do not apply eslint fix when committing code for safety
- a69f56e: fix(tsconfig)!: remove resolveJsonModule in esm

### Patch Changes

- fa53d68: refactor(tsconfig): remove some useless compile options
- Updated dependencies [cfdf8b2]
- Updated dependencies [171e720]
- Updated dependencies [21d5be8]
- Updated dependencies [a69f56e]
- Updated dependencies [9d69f9c]
- Updated dependencies [fa53d68]
- Updated dependencies [ea5984b]
  - @git-validator/eslint-config@0.2.0
  - @git-validator/tsconfig@0.2.0

## 0.12.1

### Patch Changes

- 02d2513: fix(eslint-plugin): report error when re-exporting path is not the shortest
  - @git-validator/eslint-config@0.1.32

## 0.12.0

### Minor Changes

- 7229e2e: refactor(git-validator)!: remove tsconfig cli

### Patch Changes

- 200e5a4: feat(eslint-config): enable `@typescript-eslint/restrict-plus-operands`
- 17cac66: refactor: lock dependencies version
- Updated dependencies [200e5a4]
- Updated dependencies [17cac66]
  - @git-validator/eslint-config@0.1.31
  - @git-validator/prettier-config@0.2.3
  - @git-validator/tsconfig@0.1.14

## 0.11.10

### Patch Changes

- 4421499: revert(eslint-config): remove `array-callback-return` as it's already existing
- Updated dependencies [4421499]
  - @git-validator/eslint-config@0.1.30

## 0.11.9

### Patch Changes

- 3d32924: chore: add repository field to package.json
- 56396ca: feat: validate repository field in package.json
- Updated dependencies [3d32924]
- Updated dependencies [56396ca]
  - @git-validator/prettier-config@0.2.2
  - @git-validator/eslint-config@0.1.29
  - @git-validator/tsconfig@0.1.13

## 0.11.8

### Patch Changes

- f7f8b93: feat(eslint-config): no delete and arguments
- 060128e: feat(eslint-config): enable `array-callback-return`
- Updated dependencies [f7f8b93]
- Updated dependencies [060128e]
  - @git-validator/eslint-config@0.1.28

## 0.11.7

### Patch Changes

- 6797115: fix(eslint-config): allow PacalCase for functions
- Updated dependencies [6797115]
  - @git-validator/eslint-config@0.1.27

## 0.11.6

### Patch Changes

- 7e059c2: feat(eslint-config): enable `func-name-matching`
- 560c8e1: feat(eslint-config): enable `no-multi-assign`
- ef5108b: feat(eslint-config): make function and class naming consistent
- f39d37c: feat(eslint-config): enable `@typescript-eslint/consistent-generic-constructors`
- Updated dependencies [7e059c2]
- Updated dependencies [560c8e1]
- Updated dependencies [ef5108b]
- Updated dependencies [f39d37c]
  - @git-validator/eslint-config@0.1.26

## 0.11.5

### Patch Changes

- 2a169bf: feat(eslint-config): allow to use `res` and `rej` as Promise constructor params name
- Updated dependencies [2a169bf]
  - @git-validator/eslint-config@0.1.25

## 0.11.4

### Patch Changes

- b565091: feat(eslint-config): enable `no-shadow`
- Updated dependencies [b565091]
  - @git-validator/eslint-config@0.1.24

## 0.11.3

### Patch Changes

- Updated dependencies [f42e719]
  - @git-validator/eslint-config@0.1.23

## 0.11.2

### Patch Changes

- 9940082: chore: change `module` and `target` value to lowercase
- Updated dependencies [9940082]
- Updated dependencies [f08baca]
  - @git-validator/tsconfig@0.1.12
  - @git-validator/prettier-config@0.2.1

## 0.11.1

### Patch Changes

- 82b5a51: feat(git-validator): support `init-tsconfig` and `diff-tsconfig` subcommand
- Updated dependencies [6ad7c09]
  - @git-validator/tsconfig@0.1.11

## 0.11.0

### Minor Changes

- a662960: refactor(prettier-config)!: remove printWidth to use default printWidth, which is 80

### Patch Changes

- 537a8a1: chore: upgrade deps
- Updated dependencies [537a8a1]
- Updated dependencies [a662960]
  - @git-validator/prettier-config@0.2.0
  - @git-validator/eslint-config@0.1.22

## 0.10.26

### Patch Changes

- ff60268: fix: add shebang to improve compatibility with npm
- Updated dependencies [ff60268]
  - @git-validator/tsconfig@0.1.10

## 0.10.25

### Patch Changes

- b7f83a0: chore: upgrade deps
- Updated dependencies [69713fe]
- Updated dependencies [b7f83a0]
  - @git-validator/eslint-config@0.1.21
  - @git-validator/prettier-config@0.1.6

## 0.10.24

### Patch Changes

- Updated dependencies [3fdc049]
- Updated dependencies [f79938e]
  - @git-validator/eslint-config@0.1.20
  - @git-validator/tsconfig@0.1.9

## 0.10.23

### Patch Changes

- 8025d53: fix: compatible with windows
- Updated dependencies [8025d53]
  - @git-validator/eslint-config@0.1.19

## 0.10.22

### Patch Changes

- 26acc6d: fix(git-validator): fix crash on window
- 05feb6d: fix(git-validator): use stable api to mute warning from node
- Updated dependencies [85539d0]
- Updated dependencies [238f3d9]
  - @git-validator/tsconfig@0.1.8

## 0.10.21

### Patch Changes

- 37ef6e0: feat(git-validator): dont need to install eslint and prettier when running `npx git-validator`

## 0.10.20

### Patch Changes

- 03f32fd: chore: upgrade deps
- e6e1e35: feat(tsconfig): support sub-command 'diff'
- Updated dependencies [03f32fd]
- Updated dependencies [e6e1e35]
  - @git-validator/eslint-config@0.1.18
  - @git-validator/tsconfig@0.1.7

## 0.10.19

### Patch Changes

- d4e00e4: feat(git-validator): support `--no-eslint` and `--no-prettier`
- 998fa3b: refactor(git-validator): replace `spawnSync` with `spawn`

## 0.10.18

### Patch Changes

- 8715429: chore: upgrade deps
- Updated dependencies [8715429]
  - @git-validator/prettier-config@0.1.5
  - @git-validator/eslint-config@0.1.17
  - @git-validator/tsconfig@0.1.6

## 0.10.17

### Patch Changes

- 2179bde: fix(eslint-config): remove jest rule restrictions
- Updated dependencies [2179bde]
  - @git-validator/eslint-config@0.1.16

## 0.10.16

### Patch Changes

- 1ea8f1f: feat(eslint-config,eslint-plugin-packagejson,git-validator): support validate package json
- 876dd47: feat: force `types` on the top
- 814b294: feat: force `default` field to be the bottom
- Updated dependencies [fc487cd]
- Updated dependencies [1ea8f1f]
- Updated dependencies [876dd47]
- Updated dependencies [814b294]
  - @git-validator/eslint-config@0.1.15

## 0.10.15

### Patch Changes

- 382e264: fix(eslint-config): loosen restriction about type assertions
- Updated dependencies [382e264]
  - @git-validator/eslint-config@0.1.14

## 0.10.14

### Patch Changes

- 2831bef: chore: upgrade deps
- Updated dependencies [2831bef]
  - @git-validator/prettier-config@0.1.4
  - @git-validator/eslint-config@0.1.13

## 0.10.13

### Patch Changes

- 80165c4: feat(git-validator): print log before linting

## 0.10.12

### Patch Changes

- d04e6b5: feat(eslint-config): required return await
- 632d4f3: feat(eslint-config): lint js if detected tsconfig
- Updated dependencies [d04e6b5]
- Updated dependencies [632d4f3]
  - @git-validator/eslint-config@0.1.12

## 0.10.11

### Patch Changes

- fdb0038: feat(eslint-config): ban ts comment
- Updated dependencies [fdb0038]
  - @git-validator/eslint-config@0.1.11

## 0.10.10

### Patch Changes

- fede930: fix(eslint-config): ignore ts files when there is no tsconfig
- Updated dependencies [fede930]
  - @git-validator/eslint-config@0.1.10

## 0.10.9

### Patch Changes

- 7e7f807: feat(git-validator,tsconfig): enable `inlineSources` in tsconfig
- d613c3e: feat(git-validator): allow `-V, --version` option
- Updated dependencies [7e7f807]
  - @git-validator/tsconfig@0.1.5

## 0.10.8

### Patch Changes

- 0729249: fix(prettier-config): fix some crashes, close #102
- Updated dependencies [0729249]
  - @git-validator/prettier-config@0.1.3

## 0.10.7

### Patch Changes

- @git-validator/eslint-config@0.1.9

## 0.10.6

### Patch Changes

- b2bea40: fix(eslint-config): fix crash if there is no `tsconfig.json` in project root
- 9e6174e: chore: upgrade deps
- Updated dependencies [b2bea40]
- Updated dependencies [9e6174e]
  - @git-validator/eslint-config@0.1.8

## 0.10.4

### Patch Changes

- c578679: feat(tsconfig): set `moduleDetection` to be `force`
- Updated dependencies [c578679]
  - @git-validator/tsconfig@0.1.4

## 0.10.3

### Patch Changes

- Updated dependencies [b1ffc74]
- Updated dependencies [317fd54]
  - @git-validator/eslint-config@0.1.6
  - @git-validator/prettier-config@0.1.2

## 0.10.2

### Patch Changes

- Updated dependencies [b59e756]
  - @git-validator/tsconfig@0.1.3

## 0.10.1

### Patch Changes

- Updated dependencies [2bda39a]
- Updated dependencies [76d635e]
  - @git-validator/eslint-config@0.1.5

## 0.10.0

### Minor Changes

- 20c91cc: refactor(git-validator): move tsconfig files

### Patch Changes

- Updated dependencies [e7a1c9f]
- Updated dependencies [c9b0c89]
  - @git-validator/eslint-config@0.1.4

## 0.9.15

### Patch Changes

- Updated dependencies [2b7cf18]
  - @git-validator/eslint-config@0.1.3

## 0.9.14

### Patch Changes

- Updated dependencies [d19ba77]
- Updated dependencies [829cdf6]
  - @git-validator/eslint-config@0.1.2

## 0.9.13

### Patch Changes

- ffb246f: fix(git-validator): make the `extends` field right
- Updated dependencies [33a5435]
- Updated dependencies [2686f0b]
- Updated dependencies [79c8264]
- Updated dependencies [dd0ecd9]
  - @git-validator/tsconfig@0.1.2
  - @git-validator/eslint-config@0.1.1
  - @git-validator/prettier-config@0.1.1

## 0.9.12

### Patch Changes

- 1455583: fix(git-validator): fix tsconfig not work

## 0.9.11

### Patch Changes

- b1380d5: feat(git-validator): add tsconfig presets
- 1600513: feat: add `exports` and add `tsconfig` script
- Updated dependencies [d9c91f3]
- Updated dependencies [1600513]
  - @git-validator/tsconfig@0.1.1

## 0.9.10

### Patch Changes

- Updated dependencies [118dcce]
  - @git-validator/eslint-config@0.1.0

## 0.9.9

### Patch Changes

- Updated dependencies [5b63fe2]
  - @git-validator/prettier-config@0.1.0

## 0.9.8

### Patch Changes

- Updated dependencies [615ee22]
  - @zanminkian/eslint-config@0.4.4

## 0.9.7

### Patch Changes

- Updated dependencies [87153b0]
  - @zanminkian/eslint-config@0.4.3

## 0.9.6

### Patch Changes

- Updated dependencies [f8958cc]
  - @zanminkian/eslint-config@0.4.2

## 0.9.5

### Patch Changes

- c37841e: chore: upgrade deps
- Updated dependencies [c37841e]
- Updated dependencies [ebdcef9]
  - @zanminkian/eslint-config@0.4.1
  - @zanminkian/prettier-config@0.5.0

## 0.9.4

### Patch Changes

- 60feb0c: fix(git-validator): can get esm config

## 0.9.3

### Patch Changes

- 3285d42: chore: upgrade deps
- 2cf49ad: refactor(git-validator): use flat eslint config
- Updated dependencies [b25ebab]
- Updated dependencies [06e8f50]
- Updated dependencies [c17c4f8]
- Updated dependencies [3285d42]
- Updated dependencies [2d5d113]
- Updated dependencies [9087a92]
  - @zanminkian/prettier-config@0.4.0
  - @zanminkian/eslint-config@0.4.0

## 0.9.2

### Patch Changes

- @zanminkian/eslint-config@0.3.6

## 0.9.1

### Patch Changes

- 5c5fe5a: chore: upgrade deps
- Updated dependencies [003b95f]
- Updated dependencies [5c5fe5a]
- Updated dependencies [eb12d1c]
  - @zanminkian/prettier-config@0.3.0
  - @zanminkian/eslint-config@0.3.5

## 0.9.0

### Minor Changes

- 55857b3: refactor(git-validator): change option name `apply` to `update`

## 0.8.1

### Patch Changes

- Updated dependencies [067593c]
  - @zanminkian/eslint-config@0.3.4

## 0.8.0

### Minor Changes

- e73b5f3: refactor(prettier-config): remove `semi` and `singleQuote` config

### Patch Changes

- 3438566: chore: upgrade deps
- Updated dependencies [3438566]
- Updated dependencies [e73b5f3]
  - @zanminkian/eslint-config@0.3.3
  - @zanminkian/prettier-config@0.2.0

## 0.7.0

### Minor Changes

- b9078f4: refactor(git-validator): lint before format
- e60a66b: refactor(git-validator): merge cli options into one

### Patch Changes

- Updated dependencies [4a7f63e]
  - @zanminkian/eslint-config@0.3.2

## 0.6.1

### Patch Changes

- bdce62a: feat(git-validator): add lock file to prettierignore
- Updated dependencies [9ebe282]
- Updated dependencies [61bf00c]
  - @zanminkian/eslint-config@0.3.1

## 0.6.0

### Minor Changes

- 8c125be: feat(git-validator): format before lint at pre-commit stage

### Patch Changes

- 16fc95c: feat(git-validator): add prettier config
- 1b9ba94: feat(git-validator): built-in ignore when formatting
- d1dcd55: feat(git-validator): support format and lint serially
- 071e427: feat(git-validator): install prettier to allow user use prettier cmd
- Updated dependencies [526d46a]
- Updated dependencies [6cfd8b2]
  - @zanminkian/eslint-config@0.3.0
  - @zanminkian/prettier-config@0.1.0

## 0.5.3

### Patch Changes

- Updated dependencies [77f9a47]
  - @zanminkian/eslint-config@0.2.3

## 0.5.2

### Patch Changes

- Updated dependencies [d9a8673]
- Updated dependencies [1f383c8]
- Updated dependencies [bfadfeb]
- Updated dependencies [f4753e5]
- Updated dependencies [76313e6]
  - @zanminkian/eslint-config@0.2.2

## 0.5.1

### Patch Changes

- 736777d: feat: add `no-const-enum` rule
- bf1abe4: feat: add `no-export-assignment` rule
- Updated dependencies [c10ce8c]
- Updated dependencies [736777d]
- Updated dependencies [986f92a]
- Updated dependencies [abb6de1]
- Updated dependencies [bf1abe4]
  - @zanminkian/eslint-config@0.2.1

## 0.5.0

### Minor Changes

- 7b18678: refactor!: remove antfu eslint config

### Patch Changes

- Updated dependencies [7b18678]
  - @zanminkian/eslint-config@0.2.0

## 0.4.9

### Patch Changes

- Updated dependencies [f044668]
  - @zanminkian/eslint-config@0.1.15

## 0.4.8

### Patch Changes

- 01046b0: refactor(git-validator): optimize the config file
- Updated dependencies [b46b908]
  - @zanminkian/eslint-config@0.1.14

## 0.4.7

### Patch Changes

- 4a75c02: chore: upgrade deps
- Updated dependencies [4a75c02]
  - @zanminkian/eslint-config@0.1.13

## 0.4.6

### Patch Changes

- 45b67df: chore: upgrade deps
- Updated dependencies [45b67df]
  - @zanminkian/eslint-config@0.1.12

## 0.4.5

### Patch Changes

- 66b12c7: chore: update dependencies

## 0.4.4

### Patch Changes

- 856ce42: chore(git-validator): upgrade deps
- Updated dependencies [02836c5]
- Updated dependencies [881c15a]
  - @zanminkian/eslint-config@0.1.11

## 0.4.3

### Patch Changes

- 5460169: chore: upgrade deps
- e13f27d: fix(git-validator): fix `git-validator` command that only lint one file
- 1a29ff5: fix(git-validator): print correct error message if `.git` not exist

## 0.4.2

### Patch Changes

- cedaae2: feat: shorten the command

## 0.4.1

### Patch Changes

- 86a7064: feat: support customizing lint-staged config

## 0.4.0

### Minor Changes

- 566d909: refactor(git-validator)!: optimize commands

## 0.3.3

### Patch Changes

- 7e8b471: feat(git-validator): add prettier

## 0.3.2

### Patch Changes

- 849c8eb: feat(git-validator): use `commitlint` for better expansibility

## 0.3.1

### Patch Changes

- d3248be: chore: upgrade deps
- Updated dependencies [d3248be]
  - @zanminkian/eslint-config@0.1.9

## 0.3.0

### Minor Changes

- 98ab2da: feat(git-validator): init from `@zanminkian/git-hooks`
