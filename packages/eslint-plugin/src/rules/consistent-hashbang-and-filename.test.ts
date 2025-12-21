import { test } from "@fenge/dev-utils";
import { consistentHashbangAndFilename } from "./consistent-hashbang-and-filename.ts";

const valid = [
  // CLI files with hashbang - should be valid
  {
    code: "#!/usr/bin/env node\nconsole.log('hello');",
    filename: "script.cli.js",
  },
  {
    code: "#!/usr/bin/env ts-node\nexport const foo = 'bar';",
    filename: "tool.cli.ts",
  },
  {
    code: "#!/usr/bin/env node\nimport fs from 'fs';",
    filename: "build.cli.mjs",
  },
  {
    code: "#!/usr/bin/env node\nconst path = require('path');",
    filename: "deploy.cli.cjs",
  },
  {
    code: "#!/usr/bin/env node\nexport type Config = {};",
    filename: "config.cli.mts",
  },
  {
    code: "#!/usr/bin/env node\nmodule.exports = {};",
    filename: "utils.cli.cts",
  },
  // Non-CLI files without hashbang - should be valid
  {
    code: "console.log('hello');",
    filename: "script.js",
  },
  {
    code: "export const foo = 'bar';",
    filename: "module.ts",
  },
  {
    code: "import fs from 'fs';",
    filename: "utils.mjs",
  },
  {
    code: "const path = require('path');",
    filename: "config.cjs",
  },
  {
    code: "export type Config = {};",
    filename: "types.mts",
  },
  {
    code: "module.exports = {};",
    filename: "index.cts",
  },
];

const invalid = [
  // CLI files without hashbang - should be invalid
  {
    code: "console.log('hello');",
    filename: "script.cli.js",
    errors: [
      { messageId: "consistent-hashbang-and-filename/missing-hashbang" },
    ],
  },
  {
    code: "export const foo = 'bar';",
    filename: "tool.cli.ts",
    errors: [
      { messageId: "consistent-hashbang-and-filename/missing-hashbang" },
    ],
  },
  {
    code: "import fs from 'fs';",
    filename: "build.cli.mjs",
    errors: [
      { messageId: "consistent-hashbang-and-filename/missing-hashbang" },
    ],
  },
  {
    code: "const path = require('path');",
    filename: "deploy.cli.cjs",
    errors: [
      { messageId: "consistent-hashbang-and-filename/missing-hashbang" },
    ],
  },
  {
    code: "export type Config = {};",
    filename: "config.cli.mts",
    errors: [
      { messageId: "consistent-hashbang-and-filename/missing-hashbang" },
    ],
  },
  {
    code: "module.exports = {};",
    filename: "utils.cli.cts",
    errors: [
      { messageId: "consistent-hashbang-and-filename/missing-hashbang" },
    ],
  },
  // Non-CLI files with hashbang - should be invalid
  {
    code: "#!/usr/bin/env node\nconsole.log('hello');",
    filename: "script.js",
    errors: [
      { messageId: "consistent-hashbang-and-filename/invalid-filename" },
    ],
  },
  {
    code: "#!/usr/bin/env ts-node\nexport const foo = 'bar';",
    filename: "module.ts",
    errors: [
      { messageId: "consistent-hashbang-and-filename/invalid-filename" },
    ],
  },
  {
    code: "#!/usr/bin/env node\nimport fs from 'fs';",
    filename: "utils.mjs",
    errors: [
      { messageId: "consistent-hashbang-and-filename/invalid-filename" },
    ],
  },
  {
    code: "#!/usr/bin/env node\nconst path = require('path');",
    filename: "config.cjs",
    errors: [
      { messageId: "consistent-hashbang-and-filename/invalid-filename" },
    ],
  },
  {
    code: "#!/usr/bin/env node\nexport type Config = {};",
    filename: "types.mts",
    errors: [
      { messageId: "consistent-hashbang-and-filename/invalid-filename" },
    ],
  },
  {
    code: "#!/usr/bin/env node\nmodule.exports = {};",
    filename: "index.cts",
    errors: [
      { messageId: "consistent-hashbang-and-filename/invalid-filename" },
    ],
  },
];

test({ valid, invalid, ...consistentHashbangAndFilename });
