import path from "node:path";
import process from "node:process";
import { test } from "../test.test.ts";
import { name, rule } from "./required-dev-engines.js";

const s = JSON.stringify;
const rootPkgJson = path.join(process.cwd(), "package.json");

const valid = [
  { code: s({}), filename: "" },
  {
    code: s({
      devEngines: {
        runtime: { name: "node", version: "1.0.0" },
        packageManager: { name: "npm", version: "8.0.0" },
      },
    }),
    filename: rootPkgJson,
  },
  {
    code: s({
      devEngines: {
        runtime: { name: "node", version: "1.0.0", onFail: "error" },
        packageManager: { name: "npm", version: "8.0.0", onFail: "error" },
      },
    }),
    filename: rootPkgJson,
  },
  {
    code: s({
      devEngines: {
        runtime: { name: "node", version: ">=22", onFail: "error" },
        packageManager: { name: "npm", version: "8.0.0" },
      },
    }),
    filename: rootPkgJson,
  },
];

const invalid = [
  // 1. check required field
  { code: s({}), filename: rootPkgJson },
  {
    code: s({ devEngines: null }),
    filename: rootPkgJson,
  },
  {
    code: s({ devEngines: {} }),
    filename: rootPkgJson,
  },
  {
    code: s({ devEngines: { runtime: { name: "node", version: ">=22" } } }),
    filename: rootPkgJson,
  },
  {
    code: s({
      devEngines: { packageManager: { name: "npm", version: "1.0.0" } },
    }),
    filename: rootPkgJson,
  },
  {
    code: s({
      devEngines: {
        packageManager: { name: "npm" },
        runtime: { name: "node", version: ">=22" },
      },
    }),
    filename: rootPkgJson,
  },
  // 2. check `packageManager.version`
  {
    code: s({
      devEngines: {
        runtime: { name: "node", version: "1.0.0" },
        packageManager: { name: "npm", version: "^1.0.0" },
      },
    }),
    filename: rootPkgJson,
  },
  {
    code: s({
      devEngines: {
        runtime: { name: "node", version: "1.0.0", onFail: "error" },
        packageManager: { name: "npm", version: "^1.0.0", onFail: "error" },
      },
    }),
    filename: rootPkgJson,
  },
  // 3. check `onFail`
  {
    code: s({
      devEngines: {
        runtime: { name: "node", version: "1.0.0" },
        packageManager: { name: "npm", version: "8.0.0", onFail: "warn" },
      },
    }),
    filename: rootPkgJson,
  },
  {
    code: s({
      devEngines: {
        runtime: { name: "node", version: "1.0.0", onFail: "warn" },
        packageManager: { name: "npm", version: "8.0.0" },
      },
    }),
    filename: rootPkgJson,
  },
  {
    code: s({
      devEngines: {
        runtime: { name: "node", version: "1.0.0", onFail: "Error" },
        packageManager: { name: "npm", version: "8.0.0", onFail: "error" },
      },
    }),
    filename: rootPkgJson,
  },
];

await test({ name, rule, valid, invalid });
