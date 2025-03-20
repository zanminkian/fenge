import path from "node:path";
import process from "node:process";
import { test } from "../test.test.ts";
import { name, rule } from "./no-dependencies-in-workspace-root.js";

const s = JSON.stringify;

const valid = [
  {
    code: s({ dependencies: {} }),
    filename: path.join(process.cwd(), "./package.json"),
  },
  {
    code: s({ dependencies: { foo: "bar" } }),
    filename: path.join(process.cwd(), "./package.json"),
  },
  {
    code: s({ devDependencies: {} }),
    filename: path.join(
      process.cwd(),
      "./test/no-dependencies-in-workspace-root/pkg.json",
    ),
  },
];
const invalid = [
  {
    code: s({ dependencies: {} }),
    filename: path.join(
      process.cwd(),
      "./test/no-dependencies-in-workspace-root/pkg.json",
    ),
  },
  {
    code: s({ devDependencies: {}, dependencies: { foo: "bar" } }),
    filename: path.join(
      process.cwd(),
      "./test/no-dependencies-in-workspace-root/pkg.json",
    ),
  },
];

await test({ name, rule, valid, invalid });
