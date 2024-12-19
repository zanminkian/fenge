import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "../test.spec.js";
import { name, rule } from "./required-hashbang.js";

const s = JSON.stringify;
const dir = path.dirname(fileURLToPath(import.meta.url));

const valid = [
  { code: s({}), filename: undefined },
  { code: s({ name: "foo" }), filename: undefined },
  { code: s({ bin: {} }), filename: undefined },
  {
    code: s({ bin: "./good.cli.js" }),
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
  {
    code: s({ bin: { foo: "./good.cli.js", bar: "./good.cli.js" } }),
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
];

const invalid = [
  { code: s({ bin: 123 }), filename: undefined },
  { code: s({ bin: [] }), filename: undefined },
  { code: s({ bin: { foo: true } }), filename: undefined },
  {
    code: s({ bin: "./no-existing.js" }),
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
  {
    code: s({ bin: "./bad.cli.js" }),
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
  {
    code: s({ bin: { foo: "./bad.cli.js" } }),
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
];

await test({ name, rule, valid, invalid });
