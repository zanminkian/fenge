<!-- prettier-ignore-start -->
# no-external-src-imports

Disallow importing from outside the src directory.

## Rule Details

### Fail

```ts
import foo from '..' // filename: /foo/src/rules/no-external-src-imports.test.ts
import foo from '../../src' // filename: /foo/src/rules/no-external-src-imports.test.ts
import baz from '../../package.js' // filename: /foo/src/rules/no-external-src-imports.test.ts
import baz from '../../pkg.json' with {type: 'json'} // filename: /foo/src/rules/no-external-src-imports.test.ts
import baz from '../../../package.json' with {type: 'json'} // filename: /foo/src/rules/no-external-src-imports.test.ts
import qux from '/tmp/external-file' // filename: /foo/src/rules/no-external-src-imports.test.ts
```

### Pass

```ts
import foo from '.' // filename: /foo/src/rules/no-external-src-imports.test.ts
import foo from './valid-file.js' // filename: /foo/src/rules/no-external-src-imports.test.ts
import foo from '../valid-file.js' // filename: /foo/src/rules/no-external-src-imports.test.ts
import foo from '../../src/foo.js' // filename: /foo/src/rules/no-external-src-imports.test.ts
import baz from '../../package.json' with {type: 'json'} // filename: /foo/src/rules/no-external-src-imports.test.ts
import foo from 'node:foo' // filename: /foo/src/rules/no-external-src-imports.test.ts
import foo from 'foo' // filename: /foo/src/rules/no-external-src-imports.test.ts
```
<!-- prettier-ignore-end -->
