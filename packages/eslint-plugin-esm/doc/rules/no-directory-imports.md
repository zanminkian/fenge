<!-- prettier-ignore-start -->
# no-directory-imports

Disallow importing from a directory.

## Rule Details

### Fail

```ts
import foo from '.' // filename: /foo/src/rules/no-directory-imports.test.ts
import foo from './' // filename: /foo/src/rules/no-directory-imports.test.ts
import foo from '..' // filename: /foo/src/rules/no-directory-imports.test.ts
import foo from '../' // filename: /foo/src/rules/no-directory-imports.test.ts
import foo from '../rules' // filename: /foo/src/rules/no-directory-imports.test.ts
import foo from '../rules/' // filename: /foo/src/rules/no-directory-imports.test.ts
import foo from '../../src' // filename: /foo/src/rules/no-directory-imports.test.ts
import foo from '/foo' // filename: /foo/src/rules/no-directory-imports.test.ts
```

### Pass

```ts
import foo from 'foo' // filename: /foo/src/rules/no-directory-imports.test.ts
import foo from './foo' // filename: /foo/src/rules/no-directory-imports.test.ts
import foo from '/foo/index.js' // filename: /foo/src/rules/no-directory-imports.test.ts
import foo from '/foo/index.ts' // filename: /foo/src/rules/no-directory-imports.test.ts
import foo from '/foo/package.json' // filename: /foo/src/rules/no-directory-imports.test.ts
```
<!-- prettier-ignore-end -->
