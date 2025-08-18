import path from "node:path";
import process from "node:process";
import { test } from "@fenge/dev-utils";
import { noPhantomDepImports } from "./no-phantom-dep-imports.ts";

const valid = [
  { code: "import foo from '/foo'" },
  { code: "import foo from './foo'" },
  { code: "import foo from '../foo'" },
  { code: "import foo from 'node:foo'" },

  { code: "import type Foo from 'node'" },
  { code: "import type {Foo} from 'eslint'" },
  {
    code: "import foo from '@fenge/dev-utils'",
    options: [{ allowDevDependencies: true }],
  },
  {
    code: "import bar from 'node:bar'",
    filename: path.join(
      process.cwd(),
      "test",
      "no-phantom-dep-imports",
      "for-electron",
      "bar.js",
    ),
  },
  {
    code: "import {app} from 'electron'",
    filename: path.join(
      process.cwd(),
      "test",
      "no-phantom-dep-imports",
      "for-electron",
      "bar.js",
    ),
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
