import { test } from "../test.test.ts";
import { name, rule } from "./required-engines.js";

const s = JSON.stringify;

const valid = [
  s({ engines: { node: "1.0.0" } }),
  s({ private: true, engines: {} }),
  s({ private: true }),
  s({ private: false, engines: { node: "1.0.0" } }),
  s({ private: false, engines: { node: ">=14.0.0", npm: ">=6.0.0" } }),
];

const invalid = [
  s({}),
  s({ engines: null }),
  s({ engines: {} }),
  s({ engines: { npm: "1.0.0" } }),
  s({ engines: { node: null } }),
  s({ engines: { node: "" } }),
  s({ engines: { node: " " } }),
  s({ private: false }),
  s({ private: false, engines: null }),
  s({ private: false, engines: {} }),
  s({ private: false, engines: { npm: "1.0.0" } }),
  s({ private: false, engines: { node: null } }),
  s({ private: false, engines: { node: "" } }),
  s({ private: false, engines: { node: " " } }),
];

await test({ name, rule, valid, invalid });
