import { test } from "../test.test.ts";
import { name, rule } from "./no-types-deps.js";

const s = JSON.stringify;

const valid = [
  s({}),
  s({
    dependencies: { "some-package": "1.0.0" },
    devDependencies: { "another-package": "2.0.0" },
  }),
  s({
    peerDependencies: { "@types/web": "1.0.0" },
  }),
];

const invalid = [
  s({
    dependencies: { "@types/foo": "1.0.0" },
  }),
  s({
    dependencies: { "@types/node": "1.0.0" },
    devDependencies: { "@types/jest": "2.0.0" },
  }),
  s({
    dependencies: { "@types/jest": "1.0.0" },
    devDependencies: { "@types/web": "2.0.0" },
  }),
];

await test({ name, rule, valid, invalid, errors: 1 });
