import { test } from "../test.test.ts";
import { name, rule } from "./no-engines.js";

const s = JSON.stringify;

const valid = [
  // No private field - engines allowed
  s({ engines: { node: "1.0.0" } }),
  s({}),

  // private is false - engines allowed
  s({ private: false, engines: { node: "1.0.0" } }),
  s({ private: false, engines: {} }),
  s({ private: false }),

  // private is true but no engines - valid
  s({ private: true }),
  s({ private: true, name: "test" }),

  // private is not boolean - engines allowed
  s({ private: "true", engines: { node: "1.0.0" } }),
  s({ private: null, engines: { node: "1.0.0" } }),
];

const invalid = [
  // private is true and engines exists - invalid
  s({ private: true, engines: { node: "1.0.0" } }),
  s({ private: true, engines: {} }),
  s({ private: true, engines: { node: ">=14.0.0", npm: ">=6.0.0" } }),
  s({ private: true, engines: null }),
  s({ private: true, engines: { npm: "1.0.0" } }),
];

await test({ name, rule, valid, invalid });
