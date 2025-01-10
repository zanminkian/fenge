<!-- prettier-ignore-start -->
# no-phantom-dep-imports

Disallow importing from a module which the nearest `package.json` doesn't include it.

## Rule Details

### Fail

```ts
import type foo from 'foo' // options: [{"allowDevDependencies":true}]
import type foo from 'foo' // options: [{"allowDevDependencies":false}]
import {type Foo} from 'foo'
import foo from 'foo'
import {type Foo} from 'eslint'
import {Foo} from 'eslint'
import eslint from 'eslint'
```

### Pass

```ts
import foo from '/foo'
import foo from './foo'
import foo from '../foo'
import foo from 'node:foo'
import type Foo from 'estree'
import type {Foo} from 'eslint'
import foo from '@fenge/dev-utils' // options: [{"allowDevDependencies":true}]
```
<!-- prettier-ignore-end -->
