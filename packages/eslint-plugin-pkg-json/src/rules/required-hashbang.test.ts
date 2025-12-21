import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "../test.test.ts";
import { name, rule } from "./required-hashbang.js";

const s = JSON.stringify;
const dir = path.dirname(fileURLToPath(import.meta.url));

const valid = [
  { code: s({}) },
  { code: s({ name: "foo" }) },
  { code: s({ bin: {} }) },
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
  { code: s({ bin: 123 }) },
  { code: s({ bin: [] }) },
  { code: s({ bin: { foo: true } }) },
  {
    code: s({ bin: "./no-existing.js" }),
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
  {
    code: s({ bin: "./file-have-no-hashbang.js" }),
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
  {
    code: s({ bin: { foo: "./file-have-no-hashbang.js" } }),
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
];

await test({ name, rule, valid, invalid });
