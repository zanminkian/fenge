<!-- prettier-ignore-start -->
# no-side-effect-imports

Side effect import is often used for polyfills and css. It's unsafe to use it.

## Rule Details

### Fail

```ts
import 'foo'
import './foo'
import {} from 'foo'
import {} from './foo'
import './reflect-metadata'
import './foo.module.css'
import 'foo.module.css'
import 'foo.css'
import './foo.css'
import 'module.css'
```

### Pass

```ts
import 'reflect-metadata'
import {} from 'reflect-metadata'
import {foo} from 'foo'
```
<!-- prettier-ignore-end -->
