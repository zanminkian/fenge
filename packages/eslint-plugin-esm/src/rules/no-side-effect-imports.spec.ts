import { test } from "@fenge/dev-utils";
import { noSideEffectImports } from "./no-side-effect-imports.ts";

const valid = [
  "import 'reflect-metadata'",
  "import {} from 'reflect-metadata'",
  "import {foo} from 'foo'",
];

const invalid = [
  "import 'foo'",
  "import './foo'",
  "import {} from 'foo'",
  "import {} from './foo'",
  "import './reflect-metadata'",
  "import './foo.module.css'",
  "import 'foo.module.css'",

  "import 'foo.css'",
  "import './foo.css'",
  "import 'module.css'",
];

test({ valid, invalid, ...noSideEffectImports });
