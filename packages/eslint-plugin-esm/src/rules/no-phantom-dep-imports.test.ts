import { test } from "@fenge/dev-utils";
import { noPhantomDepImports } from "./no-phantom-dep-imports.ts";

const valid = [
  { code: "import foo from '/foo'" },
  { code: "import foo from './foo'" },
  { code: "import foo from '../foo'" },
  { code: "import foo from 'node:foo'" },

  { code: "import type Foo from 'json-schema'" },
  { code: "import type {Foo} from 'eslint'" },
  {
    code: "import foo from '@fenge/dev-utils'",
    options: [{ allowDevDependencies: true }],
  },
];

const invalid = [
  {
    code: "import type foo from 'foo'",
    options: [{ allowDevDependencies: true }],
  },
  {
    code: "import type foo from 'foo'",
    options: [{ allowDevDependencies: false }],
  },
  { code: "import {type Foo} from 'foo'" },
  { code: "import foo from 'foo'" },

  { code: "import {type Foo} from 'eslint'" },
  { code: "import {Foo} from 'eslint'" },
  { code: "import eslint from 'eslint'" },
];

test({ valid, invalid, ...noPhantomDepImports });
