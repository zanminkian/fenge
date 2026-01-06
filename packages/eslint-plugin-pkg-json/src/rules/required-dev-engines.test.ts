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
  // check `packageManager.version`
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
  {
    code: s({
      devEngines: {
        runtime: [{ name: "node", version: "18.0.0" }],
        packageManager: [{ name: "npm", version: "^8.0.0" }], // invalid semver
      },
    }),
    filename: rootPkgJson,
  },
  // Array format tests
  {
    code: s({
      devEngines: {
        runtime: [{ name: "node", version: "18.0.0" }],
        packageManager: [{ name: "npm", version: "8.0.0" }],
      },
    }),
    filename: rootPkgJson,
  },
  {
    code: s({
      devEngines: {
        runtime: [
          { name: "deno", version: "18.0.0" },
          { name: "node", version: "20.0.0", onFail: "error" },
        ],
        packageManager: [
          { name: "npm", version: "8.0.0" },
          { name: "pnpm", version: "7.0.0", onFail: "error" },
        ],
      },
    }),
    filename: rootPkgJson,
  },
  {
    code: s({
      devEngines: {
        runtime: [{ name: "node", version: ">=18", onFail: "error" }],
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
  // 2. check `onFail`
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
  // Array format invalid tests
  {
    code: s({
      devEngines: {
        runtime: [{ name: "node" }], // missing version
        packageManager: [{ name: "npm", version: "8.0.0" }],
      },
    }),
    filename: rootPkgJson,
  },
  {
    code: s({
      devEngines: {
        runtime: [{ name: "node", version: "18.0.0", onFail: "warn" }], // invalid onFail
        packageManager: [{ name: "npm", version: "8.0.0" }],
      },
    }),
    filename: rootPkgJson,
  },
  {
    code: s({
      devEngines: {
        runtime: ["invalid"], // array element should be object
        packageManager: [{ name: "npm", version: "8.0.0" }],
      },
    }),
    filename: rootPkgJson,
    errors: 2,
  },
];

await test({ name, rule, valid, invalid });
