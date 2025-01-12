<!-- prettier-ignore-start -->
# no-inexistent-relative-imports

Disallow importing from a relative file which is inexistent.

## Rule Details

### Fail

```ts
import foo from './no-inexistent-relative-imports.spec.js' // filename: /foo/packages/eslint-plugin-esm/src/rules/no-inexistent-relative-imports.spec.ts
import foo from './inexistent-file' // filename: /foo/packages/eslint-plugin-esm/src/rules/no-inexistent-relative-imports.spec.ts
import foo from '../inexistent-file' // filename: /foo/packages/eslint-plugin-esm/src/rules/no-inexistent-relative-imports.spec.ts
```

### Pass

```ts
import foo from 'foo' // filename: /foo/packages/eslint-plugin-esm/src/rules/no-inexistent-relative-imports.spec.ts
import foo from './no-inexistent-relative-imports.spec.ts' // filename: /foo/packages/eslint-plugin-esm/src/rules/no-inexistent-relative-imports.spec.ts
import foo from './no-inexistent-relative-imports.spec' // filename: /foo/packages/eslint-plugin-esm/src/rules/no-inexistent-relative-imports.spec.ts
import foo from '../rules' // filename: /foo/packages/eslint-plugin-esm/src/rules/no-inexistent-relative-imports.spec.ts
import foo from '.' // filename: /foo/packages/eslint-plugin-esm/src/rules/no-inexistent-relative-imports.spec.ts
import foo from './' // filename: /foo/packages/eslint-plugin-esm/src/rules/no-inexistent-relative-imports.spec.ts
import foo from '..' // filename: /foo/packages/eslint-plugin-esm/src/rules/no-inexistent-relative-imports.spec.ts
import foo from '../' // filename: /foo/packages/eslint-plugin-esm/src/rules/no-inexistent-relative-imports.spec.ts
```
<!-- prettier-ignore-end -->
