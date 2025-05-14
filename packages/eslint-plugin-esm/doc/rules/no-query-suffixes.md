<!-- prettier-ignore-start -->
# no-query-suffixes

Disallow using query suffixes in import paths.

## Rule Details

### Fail

```ts
import foo from './foo?foo=bar'
import './foo?foo=bar'
import('./foo?foo=bar')
export * from './foo?foo=bar'
export {name} from './foo?foo=bar'
import foo from 'foo?foo=bar'
import 'foo?foo=bar'
import('foo?foo=bar')
export * from 'foo?foo=bar'
export {name} from 'foo?foo=bar'
import foo from 'foo?foo'
import 'foo?foo'
import('foo?foo')
export * from 'foo?foo'
export {name} from 'foo?foo'
```

### Pass

```ts
import foo from 'foo'
import 'foo'
require('foo')
import('foo')
export * from 'foo'
export {name} from 'foo'
```
<!-- prettier-ignore-end -->
