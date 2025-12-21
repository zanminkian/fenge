// TODO: Remove this file when [fnm support devEngines](https://github.com/Schniz/fnm/pull/1433).
// @ts-check
import { Builder } from "fenge/eslint-config";

export default new Builder()
  .enableHtml()
  .enablePackageJson({
    omit: ["pkg-json/no-engines"],
  })
  .enableJavaScript()
  .enableTypeScript()
  .toConfig();
