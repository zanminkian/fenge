import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "@fenge/dev-utils";
import { noCliImports } from "./no-cli-imports.ts";

const fixtureDir = path.join(os.tmpdir(), "no-cli-imports-test");
const indexFile = path.join(fixtureDir, "index.ts");

function createFixtures() {
  fs.mkdirSync(fixtureDir, { recursive: true });
  fs.writeFileSync(path.join(fixtureDir, "normal.ts"), "export const foo = 1;");
  fs.writeFileSync(path.join(fixtureDir, "my.cli.ts"), "export const bar = 2;");
  fs.writeFileSync(
    path.join(fixtureDir, "hashbang.ts"),
    "#!/usr/bin/env node\nexport const baz = 3;",
  );
}

function removeFixtures() {
  fs.rmSync(fixtureDir, { recursive: true });
}

createFixtures();

const valid = [
  { code: "import foo from 'foo'" },
  { code: "import foo from 'node:fs'" },
  { code: "import foo from './normal.ts'", filename: indexFile },
];

const invalid = [
  { code: "import foo from './my.cli.ts'", filename: indexFile },
  { code: "import foo from './hashbang.ts'", filename: indexFile },
];

test({ valid, invalid, ...noCliImports }).finally(removeFixtures);
