<!-- prettier-ignore-start -->
# no-cli-imports

Disallow importing from a CLI file.

## Rule Details

### Fail

```ts
import foo from './my.cli.ts' // filename: /tmp/no-cli-imports-test/index.ts
import foo from './hashbang.ts' // filename: /tmp/no-cli-imports-test/index.ts
```

### Pass

```ts
import foo from 'foo'
import foo from 'node:fs'
import foo from './normal.ts' // filename: /tmp/no-cli-imports-test/index.ts
```
<!-- prettier-ignore-end -->
