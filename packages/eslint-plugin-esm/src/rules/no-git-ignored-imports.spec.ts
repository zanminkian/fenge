import process from "node:process";
import { fileURLToPath } from "node:url";
import { test } from "@fenge/dev-utils";
import { noGitIgnoredImports } from "./no-git-ignored-imports.js";

const valid = [
  "import foo from 'foo'",
  "import 'foo'",
  "require('foo')",
  "import('foo')",
  "export * from 'foo'",
  "export {name} from 'foo'",

  "import foo from '.foo'",
  "import foo from '../../../../for-test'",
].map((code) => ({
  code,
  filename: fileURLToPath(import.meta.url),
}));

const invalid = [
  "import foo from './dist/foo'",
  "import './dist/foo'",
  "import('./dist/foo')",
  "export * from './dist/foo'",
  "export {name} from './dist/foo'",

  "import foo from '../dist/index.js'",
  "import foo from '../../node_modules/foo/bar.js'",

  "import foo from '/foo/tmp'",
  `import foo from '${process.cwd()}/tmp'`,
  "import foo from '../../test/for-test'",
  "import foo from '../../../../../for-test'",
].map((code) => ({
  code,
  filename: fileURLToPath(import.meta.url),
}));

test({ valid, invalid, ...noGitIgnoredImports });
