import { test } from "@fenge/dev-utils";
import { noDeclarationFileImports } from "./no-declaration-file-imports.ts";

const invalid = [
  "import foo from 'foo.d.bar'",
  "import foo from './foo.d.bar'",
  "import foo from './foo/foo.d.bar'",

  "import foo from './foo.d.ts'",
  "import foo from './foo.d.cts'",
  "import foo from './foo.d.mts'",
  "import foo from './foo.d.tsx'",

  "import foo from './foo.d.js'",
  "import foo from './foo.d.cjs'",
  "import foo from './foo.d.mjs'",
  "import foo from './foo.d.jsx'",

  "import foo from '/foo.d.js'",
];

const valid = [
  "import foo from 'foo'",

  "import foo from './foo.ts'",
  "import foo from './foo.cts'",
  "import foo from './foo.mts'",
  "import foo from './foo.tsx'",

  "import foo from '/foo.ts'",
];

test({ valid, invalid, ...noDeclarationFileImports });
