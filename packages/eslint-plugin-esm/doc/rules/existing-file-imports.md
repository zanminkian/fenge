<!-- prettier-ignore-start -->
# existing-file-imports

Only allow importing from an existing local file.

## Rule Details

### Fail

```ts
import foo from './existing-file-imports.test.js' // filename: /foo/src/rules/existing-file-imports.test.ts
import foo from './existing-file-imports.test' // filename: /foo/src/rules/existing-file-imports.test.ts
import foo from './inexistent-file' // filename: /foo/src/rules/existing-file-imports.test.ts
import foo from '../inexistent-file' // filename: /foo/src/rules/existing-file-imports.test.ts
import foo from '../rules' // filename: /foo/src/rules/existing-file-imports.test.ts
import foo from '.' // filename: /foo/src/rules/existing-file-imports.test.ts
import foo from './' // filename: /foo/src/rules/existing-file-imports.test.ts
import foo from '..' // filename: /foo/src/rules/existing-file-imports.test.ts
import foo from '../' // filename: /foo/src/rules/existing-file-imports.test.ts
```

### Pass

```ts
import foo from 'foo' // filename: /foo/src/rules/existing-file-imports.test.ts
import foo from './existing-file-imports.test.ts' // filename: /foo/src/rules/existing-file-imports.test.ts
```
<!-- prettier-ignore-end -->
