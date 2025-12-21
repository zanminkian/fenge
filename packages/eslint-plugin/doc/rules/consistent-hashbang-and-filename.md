<!-- prettier-ignore-start -->
# consistent-hashbang-and-filename

Ensure consistency between hashbang and CLI filename. CLI files must start with hashbang, and files with hashbang must be CLI files.

## Rule Details

### Fail

```ts
console.log('hello'); // filename: script.cli.js
export const foo = 'bar'; // filename: tool.cli.ts
import fs from 'fs'; // filename: build.cli.mjs
const path = require('path'); // filename: deploy.cli.cjs
export type Config = {}; // filename: config.cli.mts
module.exports = {}; // filename: utils.cli.cts
#!/usr/bin/env node
console.log('hello'); // filename: script.js
#!/usr/bin/env ts-node
export const foo = 'bar'; // filename: module.ts
#!/usr/bin/env node
import fs from 'fs'; // filename: utils.mjs
#!/usr/bin/env node
const path = require('path'); // filename: config.cjs
#!/usr/bin/env node
export type Config = {}; // filename: types.mts
#!/usr/bin/env node
module.exports = {}; // filename: index.cts
```

### Pass

```ts
#!/usr/bin/env node
console.log('hello'); // filename: script.cli.js
#!/usr/bin/env ts-node
export const foo = 'bar'; // filename: tool.cli.ts
#!/usr/bin/env node
import fs from 'fs'; // filename: build.cli.mjs
#!/usr/bin/env node
const path = require('path'); // filename: deploy.cli.cjs
#!/usr/bin/env node
export type Config = {}; // filename: config.cli.mts
#!/usr/bin/env node
module.exports = {}; // filename: utils.cli.cts
console.log('hello'); // filename: script.js
export const foo = 'bar'; // filename: module.ts
import fs from 'fs'; // filename: utils.mjs
const path = require('path'); // filename: config.cjs
export type Config = {}; // filename: types.mts
module.exports = {}; // filename: index.cts
```
<!-- prettier-ignore-end -->
