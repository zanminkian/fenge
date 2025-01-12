import path from "node:path";
import process from "node:process";
import { test } from "../test.spec.ts";
import { name, rule } from "./no-types-dependency-in-workspace-root.js";

const s = JSON.stringify;

const valid = [
  {
    code: s({ dependencies: { "@types/node": "foo" } }),
    filename: path.join(process.cwd(), "./package.json"),
  },
  {
    code: s({ devDependencies: { "@types/node": "foo" } }),
    filename: path.join(process.cwd(), "./package.json"),
  },
  {
    code: s({ dependencies: {} }),
    filename: path.join(process.cwd(), "../../package.json"),
  },
  {
    code: s({ dependencies: { "types/node": "foo" } }),
    filename: path.join(process.cwd(), "../../package.json"),
  },
  {
    code: s({ devDependencies: { "@types": "foo" } }),
    filename: path.join(process.cwd(), "../../package.json"),
  },
];
const invalid = [
  {
    code: s({ dependencies: { "@types/node": "foo", "@types/bar": "bar" } }),
    filename: path.join(process.cwd(), "../../package.json"),
  },
  {
    code: s({
      dependencies: { "@types/node": "foo" },
      devDependencies: { "@types/types": "bar" },
    }),
    filename: path.join(process.cwd(), "../../package.json"),
  },
  {
    code: s({ dependencies: { "@types/node": "foo", "@types/types": "bar" } }),
    filename: path.join(process.cwd(), "../../package.json"),
  },
];

await test({ name, rule, valid, invalid, errors: 2 });
