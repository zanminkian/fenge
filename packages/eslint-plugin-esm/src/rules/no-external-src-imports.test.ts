import { fileURLToPath } from "node:url";
import { test } from "@fenge/dev-utils";
import { noExternalSrcImports } from "./no-external-src-imports.ts";

const valid = [
  "import foo from '.'",
  "import foo from './valid-file.js'",
  "import foo from '../valid-file.js'",
  "import foo from '../../src/foo.js'",

  "import foo from 'node:foo'",
  "import foo from 'foo'",
].map((code) => ({
  code,
  filename: fileURLToPath(import.meta.url),
}));

const invalid = [
  "import foo from '..'",
  "import foo from '../../src'",
  "import baz from '../../package.js'",
  "import baz from '../../pkg.json' with {type: 'json'}",
  "import baz from '../../package.json' with {type: 'json'}",
  "import baz from '../../../package.json' with {type: 'json'}",
  "import qux from '/tmp/external-file'",
].map((code) => ({
  code,
  filename: fileURLToPath(import.meta.url),
}));

test({ valid, invalid, ...noExternalSrcImports });
