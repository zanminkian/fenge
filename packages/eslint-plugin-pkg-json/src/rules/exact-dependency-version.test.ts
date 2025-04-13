import { test } from "../test.test.ts";
import { name, rule } from "./exact-dependency-version.js";

const s = JSON.stringify;

const valid = [
  s({ peerDependencies: { foo: "^1.0.0", bar: "1.0.0-beta.1" } }),
  s({ foo: { foo: "^1.0.0", bar: "1.0.0-beta.1" } }),
  s({ dependencies: { foo: "0.0.0", bar: "2.0.0-beta", baz: "3.0.0-beta.0" } }),
  s({
    devDependencies: { foo: "npm:bar@1.0.0" },
    dependencies: { bar: "npm:foo@1.0.0-beta.1" },
  }),
  s({ dependencies: { foo: "file:../foo" } }),
  s({
    devDependencies: { foo: "workspace:*" },
    dependencies: { bar: "1.0.0" },
  }),
];

const invalid = [
  s({ dependencies: { foo: "^1.0.0" } }),
  s({ devDependencies: { foo: "~1.0.0" } }),
  s({ dependencies: { foo: "01.0.0" } }),
  s({ dependencies: { foo: "1.0.00" } }),
  s({ dependencies: { foo: "1.0" } }),
  s({ dependencies: { foo: "2.0-tmp" } }),
  s({ dependencies: { foo: "workspace:^" } }),
  s({ dependencies: { bar: "npm:foo@^1.0.0" } }),
  s({ dependencies: { bar: "npm:foo" } }),
  s({ dependencies: { bar: "npm:foo@*" } }),
  s({ dependencies: { foo: "../foo" } }),
  s({
    devDependencies: { foo: "workspace:*" },
    dependencies: { bar: "^1.0.0" },
  }),
];

await test({ name, rule, valid, invalid });
