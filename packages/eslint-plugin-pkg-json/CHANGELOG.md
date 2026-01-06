# eslint-plugin-pkg-json

## 0.4.9

### Patch Changes

- 2d3ab34: fix: support array for `devEngines.runtime` and `devEngines.packageManager` fields in `require-dev-engines` rule

## 0.4.8

### Patch Changes

- 4a875ee: feat: add `no-engines` eslint rule

## 0.4.7

### Patch Changes

- 006063c: feat: add rule `consistent-dependency-versions`

## 0.4.6

### Patch Changes

- e200e01: feat: disallow some libs for `no-restricted-deps` rules

## 0.4.5

### Patch Changes

- 8585424: feat: disallow `package-up` and `read-package-up` package.json
- e3f5738: chore: upgrade deps

## 0.4.4

### Patch Changes

- e85826b: chore: upgrade deps

## 0.4.3

### Patch Changes

- 0e780db: feat(eslint-plugin-pkg-json): disallow `import-meta-resolve` by default

## 0.4.2

### Patch Changes

- 83eeabd: fix(eslint-plugin-pkg-json): optimize error message

## 0.4.1

### Patch Changes

- 435ade1: feat(eslint-plguin-pkg-json): check `peerDependencies` for no-restricted-deps rule
- c6e7472: feat: add rule `compatible-engines-node-version`
- 641ac58: feat: add `required-files` rule to enforce files field in public package.json

## 0.4.0

### Minor Changes

- b42adb6: refactor!: use parser instead of processor

### Patch Changes

- c76339b: feat(eslint-plugin-pkg-json): disallow deps about http for `no-restricted-deps` rule
- f2b6a0d: feat(eslint-plugin-pkg-json): allow `types` field for `no-nonstandard-property` rule

## 0.3.3

### Patch Changes

- 8957a82: feat: add rule `no-types-deps`
- 84859a0: feat: add `no-restricted-deps` rule

## 0.3.2

### Patch Changes

- 6386e07: feat(eslint-plugin-pkg-json): add `allow` option to `no-nonstandard-property`

## 0.3.1

### Patch Changes

- 3ba345e: feat(eslint-plugin-pkg-json): support `npm:` and `file:` protocol for `exact-dependency-version` rule

## 0.3.0

### Minor Changes

- 28d8553: chore: required node ^18.20.0 or >=20.10.0

## 0.2.0

### Minor Changes

- 0d630e7: feat(eslint-plugin-pkg-json): disallow `packageManager` for `no-nonstandard-property` rule
- 5a33140: feat: `required-engines` works for public package.json now

### Patch Changes

- 0b642a5: feat: add rule `pkg-json/required-dev-engines`

## 0.1.3

### Patch Changes

- a2e9f23: fix(eslint-plugin-pkg-json): disallow `prepublish` script

## 0.1.2

### Patch Changes

- cd5aead: chore: no significant changes

## 0.1.1

### Patch Changes

- 44584fa: refactor(eslint-plugin-publint,eslint-plugin-pkg-json): change export default to statement

## 0.1.0

### Minor Changes

- d564959: refactor: migrate from `@git-validator/eslint-plugin-packagejson` to `eslint-plugin-pkg-json`
