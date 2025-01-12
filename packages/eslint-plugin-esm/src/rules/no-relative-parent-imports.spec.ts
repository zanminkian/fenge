import { test } from "@fenge/dev-utils";
import { noRelativeParentImports } from "./no-relative-parent-imports.ts";

const valid = [
  "import foo from 'foo'",
  "import 'foo'",
  "require('foo')",
  "import('foo')",
  "export * from 'foo'",
  "export {name} from 'foo'",

  "import foo from '.foo'",
  "import foo from './foo'",
  "import foo from '../foo'",
  "import foo from '../../foo'",
];

const invalid = [
  "import foo from '../../../foo'",
  "import '../../../foo'",
  "import('../../../foo')",
  "export * from '../../../foo'",
  "export {name} from '../../../foo'",

  "import foo from '../../../../foo'",
];

test({ valid, invalid, ...noRelativeParentImports });
