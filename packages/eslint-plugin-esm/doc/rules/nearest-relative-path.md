<!-- prettier-ignore-start -->
# nearest-relative-path

The relative source path should be a nearest relative path.

## Rule Details

### Fail

```ts
import xxx from ".././../a" // filename: /a/b/c/d/e.js
import ".././../a" // filename: /a/b/c/d/e.js
import(".././../a") // filename: /a/b/c/d/e.js
export * from ".././../a" // filename: /a/b/c/d/e.js
export {a} from ".././../a" // filename: /a/b/c/d/e.js
import xxx from "./../a" // filename: /a/b/c/d/e.js
import "./../a" // filename: /a/b/c/d/e.js
import("./../a") // filename: /a/b/c/d/e.js
export * from "./../a" // filename: /a/b/c/d/e.js
export {a} from "./../a" // filename: /a/b/c/d/e.js
import "././foo" // filename: /a/b/c/d/e.js
import "./../.././foo" // filename: /a/b/c/d/e.js
import("./../.././foo") // filename: /a/b/c/d/e.js
export * from "./../.././foo" // filename: /a/b/c/d/e.js
export {a} from "./../.././foo" // filename: /a/b/c/d/e.js
import "./../foo" // filename: /a/b/c/d/e.js
import("./../foo") // filename: /a/b/c/d/e.js
export * from "./../foo" // filename: /a/b/c/d/e.js
export {a} from "./../foo" // filename: /a/b/c/d/e.js
import foo from "./" // filename: /a/b/c/d/e.js
import foo from '../' // filename: /a/b/c/d/e.js
import foo from '../../' // filename: /a/b/c/d/e.js
import foo from './..' // filename: /a/b/c/d/e.js
```

### Pass

```ts
import xxx from "../a" // filename: /a/b/c/d/e.js
import "../a" // filename: /a/b/c/d/e.js
import("../a") // filename: /a/b/c/d/e.js
require("../a") // filename: /a/b/c/d/e.js
import xxx from "./a" // filename: /a/b/c/d/e.js
import xxx from "a" // filename: /a/b/c/d/e.js
import xxx from ".a" // filename: /a/b/c/d/e.js
export * from "a" // filename: /a/b/c/d/e.js
export * from "./a" // filename: /a/b/c/d/e.js
export {a} from "a" // filename: /a/b/c/d/e.js
export {a} from "./a" // filename: /a/b/c/d/e.js
import foo from "." // filename: /a/b/c/d/e.js
import foo from '..' // filename: /a/b/c/d/e.js
import foo from '../..' // filename: /a/b/c/d/e.js
```
<!-- prettier-ignore-end -->
