import { test } from "@fenge/dev-utils";
import { noQuerySuffixes } from "./no-query-suffixes.ts";

const valid = [
  "import foo from 'foo'",
  "import 'foo'",
  "require('foo')",
  "import('foo')",
  "export * from 'foo'",
  "export {name} from 'foo'",
];

const invalid = [
  "import foo from './foo?foo=bar'",
  "import './foo?foo=bar'",
  "import('./foo?foo=bar')",
  "export * from './foo?foo=bar'",
  "export {name} from './foo?foo=bar'",

  "import foo from 'foo?foo=bar'",
  "import 'foo?foo=bar'",
  "import('foo?foo=bar')",
  "export * from 'foo?foo=bar'",
  "export {name} from 'foo?foo=bar'",

  "import foo from 'foo?foo'",
  "import 'foo?foo'",
  "import('foo?foo')",
  "export * from 'foo?foo'",
  "export {name} from 'foo?foo'",
];

test({ valid, invalid, ...noQuerySuffixes });
