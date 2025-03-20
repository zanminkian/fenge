import { fileURLToPath } from "node:url";
import { test } from "@fenge/dev-utils";
import { existingFileImports } from "./existing-file-imports.ts";

const filename = fileURLToPath(import.meta.url);

const valid = [
  "import foo from 'foo'",

  // with ext
  "import foo from './existing-file-imports.test.ts'",
].map((code) => ({ code, filename }));

const invalid = [
  "import foo from './existing-file-imports.test.js'",
  // without ext
  "import foo from './existing-file-imports.test'",
  "import foo from './inexistent-file'",
  "import foo from '../inexistent-file'",
  // directory
  "import foo from '../rules'",
  "import foo from '.'",
  "import foo from './'",
  "import foo from '..'",
  "import foo from '../'",
].map((code) => ({ code, filename }));

test({ valid, invalid, ...existingFileImports });
