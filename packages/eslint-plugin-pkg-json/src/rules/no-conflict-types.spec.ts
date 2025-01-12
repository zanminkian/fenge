import { test } from "../test.spec.ts";
import { name, rule } from "./no-conflict-types.js";

const s = JSON.stringify;

const valid = [
  s({}),
  s({
    dependencies: { "@types/web": "1.0.0" },
    peerDependencies: { "@types/node": "2.0.0" },
  }),
];
const invalid = [
  s({
    dependencies: { "@types/web": "1.0.0", "@types/node": "2.0.0" },
    devDependencies: {},
  }),
  s({
    dependencies: {},
    devDependencies: { "@types/web": "1.0.0", "@types/node": "2.0.0" },
  }),
  s({
    dependencies: { "@types/web": "1.0.0" },
    devDependencies: { "@types/node": "2.0.0" },
  }),
];

await test({ name, rule, valid, invalid, errors: 2 });
