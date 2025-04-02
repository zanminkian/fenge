<!-- prettier-ignore-start -->
# top-side-effect-imports

Side effect imports must be placed before other import statements.

## Rule Details

### Fail

```ts
import {foo} from 'foo'; import 'reflect-metadata'
import {bar} from 'bar'; import 'foo.css'
import {foo} from 'foo'; import {} from 'bar'
import {foo} from 'foo'; import 'bar'; import * as foo from 'reflect-metadata'
import {foo} from 'foo'; import {} from 'reflect-metadata'; import * as bar from 'bar'
import 'bar'; import r from 'reflect-metadata'; import {} from 'foo'
```

### Pass

```ts
import 'reflect-metadata'; import {foo} from 'foo'
import 'foo.css'; import {bar} from 'bar'
import 'reflect-metadata'; import 'foo.css'
import 'foo.css'; import 'bar'
import 'reflect-metadata'; import {foo} from 'foo'; import {bar} from 'bar'
import 'foo.css'; import {foo} from 'foo'; import {bar} from 'bar'
import 'reflect-metadata'
import {foo} from 'foo'
```
<!-- prettier-ignore-end -->
