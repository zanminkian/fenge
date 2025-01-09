import { fileURLToPath } from "node:url";
import { test } from "../test.spec.ts";
import { noInexistentRelativeImports } from "./no-inexistent-relative-imports.ts";

const filename = fileURLToPath(import.meta.url);

const valid = [
  "import foo from 'foo'",

  // with ext
  "import foo from './no-inexistent-relative-imports.spec.ts'",
  // without ext
  "import foo from './no-inexistent-relative-imports.spec'",
  "import foo from '../rules'",
  "import foo from '.'",
  "import foo from './'",
  "import foo from '..'",
  "import foo from '../'",
].map((code) => ({ code, filename }));

const invalid = [
  "import foo from './no-inexistent-relative-imports.spec.js'",
  "import foo from './inexistent-file'",
  "import foo from '../inexistent-file'",
].map((code) => ({ code, filename }));

test({ valid, invalid, ...noInexistentRelativeImports });
