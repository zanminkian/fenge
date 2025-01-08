<!-- prettier-ignore-start -->
# no-declaration-file-imports

Disallow importing from a declaration style file.

## Rule Details

### Fail

```ts
import foo from 'foo.d.bar'
import foo from './foo.d.bar'
import foo from './foo/foo.d.bar'
import foo from './foo.d.ts'
import foo from './foo.d.cts'
import foo from './foo.d.mts'
import foo from './foo.d.tsx'
import foo from './foo.d.js'
import foo from './foo.d.cjs'
import foo from './foo.d.mjs'
import foo from './foo.d.jsx'
import foo from '/foo.d.js'
```

### Pass

```ts
import foo from 'foo'
import foo from './foo.ts'
import foo from './foo.cts'
import foo from './foo.mts'
import foo from './foo.tsx'
import foo from '/foo.ts'
```
<!-- prettier-ignore-end -->
