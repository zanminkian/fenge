import { test } from "../test.spec.ts";
import { name, rule } from "./type-module.js";

const s = JSON.stringify;

const valid = [
  s({ type: "module" }),
  s({ name: "foo", type: "module" }),
  s({ dependencies: {}, type: "module", config: {} }),
];

const invalid = [
  s({}),
  s({ type: "commonjs" }),
  s({ name: "", type: "foo" }),
  s({ name: "", type: "" }),
];

await test({ name, rule, valid, invalid });
