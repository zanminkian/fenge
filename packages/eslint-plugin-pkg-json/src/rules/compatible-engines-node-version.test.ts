import path from "node:path";
import process from "node:process";
import { test } from "../test.test.ts";
import { name, rule } from "./compatible-engines-node-version.js";

const s = JSON.stringify;

const valid = [
  {
    code: s({ engines: { node: "^24.0.0" } }),
    filename: path.join(process.cwd(), "./package.json"),
  },
];
const invalid = [
  {
    code: s({ engines: { node: "^16.0.0" } }),
    filename: path.join(process.cwd(), "./package.json"),
  },
];

await test({ name, rule, valid, invalid });
