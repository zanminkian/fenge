import { test } from "../test.spec.ts";
import { name, rule } from "./top-types.js";

const s = JSON.stringify;

const valid = [
  s({ name: "foo", types: "foo" }),
  s({ exports: {} }),
  s({ exports: { types: "foo" } }),
  s({ exports: { types: "foo", default: "foo" } }),
  s({ exports: { require: { types: "foo", default: "foo" } } }),
  s({ exports: { foo: { bar: { types: "" } } } }),
];

const invalid = [
  s({ exports: { default: "foo", types: "foo" } }),
  s({ exports: { require: { default: "foo", types: "foo" } } }),
  s({ exports: { foo: { default: "foo", types: "foo" } } }),
  s({ exports: { foo: { bar: { x: "", types: "" } } } }),
];

await test({ name, rule, valid, invalid });
