import path from "node:path";
import process from "node:process";
import { test } from "../test.spec.ts";
import { name, rule } from "./required-engines.js";

const s = JSON.stringify;

const valid = [
  { code: s({}), filename: "" },
  {
    code: s({ engines: { node: "1.0.0" } }),
    filename: path.join(process.cwd(), "package.json"),
  },
];
const invalid = [
  { code: s({}), filename: path.join(process.cwd(), "package.json") },
  {
    code: s({ engines: null }),
    filename: path.join(process.cwd(), "package.json"),
  },
  {
    code: s({ engines: {} }),
    filename: path.join(process.cwd(), "package.json"),
  },
];

await test({ name, rule, valid, invalid });
