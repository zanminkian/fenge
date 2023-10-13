import packagejsonPlugin, { processor } from "@git-validator/eslint-plugin-packagejson";

export default {
  files: ["**/package.json"],
  processor,
  plugins: {
    packagejson: packagejsonPlugin,
  },
  rules: {
    "packagejson/type-module": "warn",
    "packagejson/no-dependencies-in-workspace-root": "warn",
  },
};
