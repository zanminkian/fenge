<!-- prettier-ignore-start -->
# existing-file-imports

Only allow importing from an existing local file.

## Rule Details

### Fail

```ts
import foo from './existing-file-imports.spec.js' // filename: /foo/src/rules/existing-file-imports.spec.ts
import foo from './existing-file-imports.spec' // filename: /foo/src/rules/existing-file-imports.spec.ts
import foo from './inexistent-file' // filename: /foo/src/rules/existing-file-imports.spec.ts
import foo from '../inexistent-file' // filename: /foo/src/rules/existing-file-imports.spec.ts
import foo from '../rules' // filename: /foo/src/rules/existing-file-imports.spec.ts
import foo from '.' // filename: /foo/src/rules/existing-file-imports.spec.ts
import foo from './' // filename: /foo/src/rules/existing-file-imports.spec.ts
import foo from '..' // filename: /foo/src/rules/existing-file-imports.spec.ts
import foo from '../' // filename: /foo/src/rules/existing-file-imports.spec.ts
```

### Pass

```ts
import foo from 'foo' // filename: /foo/src/rules/existing-file-imports.spec.ts
import foo from './existing-file-imports.spec.ts' // filename: /foo/src/rules/existing-file-imports.spec.ts
```
<!-- prettier-ignore-end -->
