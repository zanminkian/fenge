import { test } from "../test.test.ts";
import { name, rule } from "./required-files.js";

const s = JSON.stringify;

const valid = [
  s({ private: true, name: "foo" }),
  s({ private: true }),
  s({ files: ["dist"] }),
  s({ files: ["dist", "*.js"] }),
];

const invalid = [
  s({}),
  s({ name: "foo" }),
  s({ private: false }),
  s({ private: false, files: [] }),
  s({ files: [] }),
  s({ files: "not-an-array" }),
  s({ files: {} }),
];

await test({ name, rule, valid, invalid });
