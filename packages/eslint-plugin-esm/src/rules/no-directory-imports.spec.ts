import process from "node:process";
import { fileURLToPath } from "node:url";
import { test } from "@fenge/dev-utils";
import { noDirectoryImports } from "./no-directory-imports.js";

const valid = [
  "import foo from 'foo'",
  "import foo from './foo'",
  `import foo from '${process.cwd()}/index.js'`,
  `import foo from '${process.cwd()}/index.ts'`,
  `import foo from '${process.cwd()}/package.json'`,
].map((code) => ({
  code,
  filename: fileURLToPath(import.meta.url),
}));

const invalid = [
  "import foo from '.'",
  "import foo from './'",
  "import foo from '..'",
  "import foo from '../'",
  "import foo from '../rules'",
  "import foo from '../rules/'",
  "import foo from '../../src'",
  `import foo from '${process.cwd()}'`,
].map((code) => ({
  code,
  filename: fileURLToPath(import.meta.url),
}));

test({ valid, invalid, ...noDirectoryImports });
