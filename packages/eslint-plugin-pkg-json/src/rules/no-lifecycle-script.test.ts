import { test } from "../test.test.ts";
import { name, rule } from "./no-lifecycle-script.js";

const s = JSON.stringify;

const valid = [
  s({}),
  s({ private: true, scripts: { postinstall: "foo" } }),
  s({ foo: { postinstall: "bar" } }),
];

const invalid = [
  s({ private: false, scripts: { postinstall: "foo" } }),
  s({ scripts: { preinstall: "foo" } }),
  s({ scripts: { install: "foo" } }),
  s({ scripts: { postinstall: "foo" } }),
  s({ scripts: { preuninstall: "foo" } }),
  s({ scripts: { uninstall: "foo" } }),
  s({ scripts: { postuninstall: "foo" } }),
  s({ scripts: { prepublish: "foo" } }),
];

await test({ name, rule, valid, invalid });
