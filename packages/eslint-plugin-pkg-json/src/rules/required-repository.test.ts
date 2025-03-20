import { test } from "../test.test.ts";
import { name, rule } from "./required-repository.js";

const s = JSON.stringify;

const valid = [
  s({ private: true, name: "foo" }),
  s({ private: true }),
  s({ repository: "http://example.com" }),
  s({ repository: { url: "" } }),
];

const invalid = [
  s({}),
  s({ name: "foo" }),
  s({ private: false }),
  s({ private: false, repository: "" }),
  s({ repository: "" }),
  s({ repository: {} }),
];

await test({ name, rule, valid, invalid });
