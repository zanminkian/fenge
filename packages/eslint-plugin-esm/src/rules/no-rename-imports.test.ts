import { test } from "@fenge/dev-utils";
import { noRenameImports } from "./no-rename-imports.ts";

const valid = [
  "import Foo from 'foo'",
  "import {foo, bar} from 'foo'",
  // ts
  "import {type foo} from 'foo'",
  "import type {foo} from 'foo'",
  "import type Foo from 'foo'",
];
const invalid = [
  "import {foo as bar} from 'foo'",
  "import {default as foo} from 'foo'",
  // ts
  "import type {foo as bar} from 'foo'",
  "import {type foo as bar} from 'foo'",
  "import type {default as foo} from 'foo'",
  "import {type default as foo} from 'foo'",
];

test({ valid, invalid, ...noRenameImports });
