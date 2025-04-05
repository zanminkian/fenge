// TODO: Remove this file when typescript lib replacement supports `exports` field. See [here](./packages/types/DOC.md).
import { Builder } from "fenge/eslint-config";

export default new Builder()
  .enablePackageJson()
  .enableJavaScript()
  .enableTypeScript()
  .append({
    files: ["packages/types/package.json"],
    rules: {
      "pkg-json/no-nonstandard-property": ["error", { allow: ["types"] }],
    },
  })
  .toConfig();
