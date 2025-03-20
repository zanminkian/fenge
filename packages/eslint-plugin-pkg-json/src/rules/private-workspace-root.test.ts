import path from "node:path";
import process from "node:process";
import { test } from "../test.test.ts";
import { name, rule } from "./private-workspace-root.js";

const s = JSON.stringify;

const valid = [
  {
    code: s({}),
    filename: path.join(process.cwd(), "./package.json"),
  },
  {
    code: s({ private: true }),
    filename: path.join(process.cwd(), "../../package.json"),
  },
];
const invalid = [
  {
    code: s({}),
    filename: path.join(process.cwd(), "../../package.json"),
  },
  {
    code: s({ private: false }),
    filename: path.join(process.cwd(), "../../package.json"),
  },
  {
    code: s({ private: "true" }),
    filename: path.join(process.cwd(), "../../package.json"),
  },
];

await test({ name, rule, valid, invalid });
