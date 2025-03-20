import { test } from "../test.test.ts";
import { name, rule } from "./no-nonstandard-property.js";

const s = JSON.stringify;

const valid = [
  s({}),
  s({ name: "foo", type: "foo", config: "foo" }),
  s({ dependencies: { foo: "foo" }, config: { bar: "bar" } }),
];
const invalid = [
  s({ name: "", foo: "foo", bar: "bar" }),
  s({ author: "", public: true, pnpm: {} }),
  s({ name: "foo", type: "foo", yarn: "foo", packageManager: "foo" }),
];

await test({ name, rule, valid, invalid, errors: 2 });
