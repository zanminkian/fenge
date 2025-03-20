<!-- prettier-ignore-start -->
# no-git-ignored-imports

Disallow to import module from a git-ignored path.

## Rule Details

### Fail

```ts
import foo from './dist/foo' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import './dist/foo' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import('./dist/foo') // filename: /foo/src/rules/no-git-ignored-imports.test.ts
export * from './dist/foo' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
export {name} from './dist/foo' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import foo from '../dist/index.js' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import foo from '../../node_modules/foo/bar.js' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import foo from '/foo/tmp' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import foo from '/foo/tmp' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import foo from '../../test/for-test' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import foo from '../../../../../for-test' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
```

### Pass

```ts
import foo from 'foo' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import 'foo' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
require('foo') // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import('foo') // filename: /foo/src/rules/no-git-ignored-imports.test.ts
export * from 'foo' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
export {name} from 'foo' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import foo from '.foo' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
import foo from '../../../../for-test' // filename: /foo/src/rules/no-git-ignored-imports.test.ts
```
<!-- prettier-ignore-end -->
