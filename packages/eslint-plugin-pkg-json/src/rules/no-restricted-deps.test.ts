import { test } from "../test.test.ts";
import { name, rule } from "./no-restricted-deps.js";

const s = JSON.stringify;

const valid = [
  s({}),
  s({
    dependencies: { "some-package": "1.0.0" },
    devDependencies: { "another-package": "2.0.0" },
  }),
  s({
    peerDependencies: { "fs-extra": "1.0.0" },
  }),
];

const invalid = [
  s({
    dependencies: { "fs-extra": "1.0.0" },
  }),
  s({
    dependencies: { lodash: "1.0.0" },
  }),
  s({
    dependencies: { "fs-extra": "1.0.0" },
    peerDependencies: { lodash: "2.0.0" },
  }),
  s({
    dependencies: { lodash: "1.0.0" },
    peerDependencies: { "fs-extra": "2.0.0" },
  }),
];

await test({ name, rule, valid, invalid, errors: 1 });
