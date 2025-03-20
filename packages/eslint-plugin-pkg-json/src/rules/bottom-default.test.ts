import { test } from "../test.test.ts";
import { name, rule } from "./bottom-default.js";

const s = JSON.stringify;

const valid = [
  s({ default: "foo", name: "foo" }),
  s({ exports: { default: "foo" } }),
  s({ exports: { types: "foo", default: "foo" } }),
  s({ exports: { require: { types: "foo", default: "foo" } } }),
  s({ exports: { foo: { bar: { default: "" } } } }),
];

const invalid = [
  s({ exports: { default: "foo", types: "foo" } }),
  s({ exports: { require: { default: "foo", types: "foo" } } }),
  s({ exports: { foo: { default: "foo", types: "foo" } } }),
  s({ exports: { foo: { bar: { default: "", x: "" } } } }),
];

await test({ name, rule, valid, invalid });
