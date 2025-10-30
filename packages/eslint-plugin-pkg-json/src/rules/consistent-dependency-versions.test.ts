import { test } from "../test.test.ts";
import { name, rule } from "./consistent-dependency-versions.js";

const s = JSON.stringify;

const valid = [
  // Single package.json - no inconsistency possible
  s({ dependencies: { "jsonc-eslint-parser": "2.4.1" } }),
  s({ devDependencies: { eslint: "9.22.0" } }),
  s({ optionalDependencies: { semver: "7.7.3" } }),
  s({
    dependencies: { semver: "7.7.3" },
    devDependencies: { "@types/semver": "7.7.1" },
  }),
  s({
    dependencies: { "jsonc-eslint-parser": "2.4.1" },
    optionalDependencies: { semver: "7.7.3" },
  }),
  // Different dependencies - no conflict
  s({
    dependencies: { "jsonc-eslint-parser": "2.4.1" },
    devDependencies: { eslint: "9.22.0" },
  }),
  s({
    dependencies: { "jsonc-eslint-parser": "2.4.1" },
    devDependencies: { eslint: "9.22.0" },
    optionalDependencies: { outdent: "0.8.0" },
  }),
  // Empty dependencies
  s({ dependencies: {} }),
  s({ devDependencies: {} }),
  s({ optionalDependencies: {} }),
  // No dependencies section
  s({ name: "test-package" }),
];

const invalid = [
  // Using different version of jsonc-eslint-parser than in package.json (2.4.1)
  s({ dependencies: { "jsonc-eslint-parser": "2.4.0" } }),
  s({ dependencies: { "jsonc-eslint-parser": "2.5.0" } }),
  s({ devDependencies: { "jsonc-eslint-parser": "2.3.0" } }),
  s({ optionalDependencies: { "jsonc-eslint-parser": "2.4.2" } }),

  // Using different version of semver than in package.json (7.7.3)
  s({ dependencies: { semver: "7.7.2" } }),
  s({ dependencies: { semver: "7.8.0" } }),
  s({ devDependencies: { semver: "7.6.0" } }),
  s({ optionalDependencies: { semver: "7.7.1" } }),

  // Using different version of eslint than in package.json devDependencies (9.22.0)
  s({ dependencies: { eslint: "9.21.0" } }),
  s({ devDependencies: { eslint: "9.23.0" } }),
  s({ optionalDependencies: { eslint: "9.20.0" } }),

  // Using different version of @types/node than in package.json devDependencies (18.19.123)
  s({ dependencies: { "@types/node": "18.19.122" } }),
  s({ devDependencies: { "@types/node": "20.0.0" } }),
  s({ optionalDependencies: { "@types/node": "18.19.120" } }),

  // Using different version of outdent than in package.json devDependencies (0.8.0)
  s({ dependencies: { outdent: "0.7.0" } }),
  s({ optionalDependencies: { outdent: "0.9.0" } }),

  // Mixed case - some consistent, some inconsistent
  s({
    dependencies: {
      semver: "7.7.3", // consistent
      "jsonc-eslint-parser": "2.4.0", // inconsistent
    },
  }),
  s({
    dependencies: { "jsonc-eslint-parser": "2.4.1" }, // consistent
    devDependencies: { eslint: "9.21.0" }, // inconsistent
  }),
  s({
    dependencies: { semver: "7.7.3" }, // consistent
    optionalDependencies: { eslint: "9.21.0" }, // inconsistent
  }),
  s({
    dependencies: { "jsonc-eslint-parser": "2.4.1" }, // consistent
    devDependencies: { eslint: "9.22.0" }, // consistent
    optionalDependencies: { semver: "7.6.0" }, // inconsistent
  }),
];

await test({ name, rule, valid, invalid });
