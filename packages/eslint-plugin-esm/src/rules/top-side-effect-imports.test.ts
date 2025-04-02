import { test } from "@fenge/dev-utils";
import { topSideEffectImports } from "./top-side-effect-imports.ts";

const valid = [
  "import 'reflect-metadata'; import {foo} from 'foo'",
  "import 'foo.css'; import {bar} from 'bar'",
  "import 'reflect-metadata'; import 'foo.css'",
  "import 'foo.css'; import 'bar'",
  "import 'reflect-metadata'; import {foo} from 'foo'; import {bar} from 'bar'",
  "import 'foo.css'; import {foo} from 'foo'; import {bar} from 'bar'",
  "import 'reflect-metadata'", // Single side-effect import
  "import {foo} from 'foo'", // Single non-side-effect import
];

const invalid = [
  "import {foo} from 'foo'; import 'reflect-metadata'",
  "import {bar} from 'bar'; import 'foo.css'",
  "import {foo} from 'foo'; import {} from 'bar'",
  "import {foo} from 'foo'; import 'bar'; import * as foo from 'reflect-metadata'", // Three import statements
  "import {foo} from 'foo'; import {} from 'reflect-metadata'; import * as bar from 'bar'", // Three import statements
  "import 'bar'; import r from 'reflect-metadata'; import {} from 'foo'", // Three import statements
];

test({ valid, invalid, ...topSideEffectImports });
