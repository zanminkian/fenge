import { getJsBase } from "./js/base.js";
import { getJsCli } from "./js/cli.js";
import { getJsConfig } from "./js/config.js";
import { getJsTest } from "./js/test.js";

export function javascript() {
  return [getJsBase(), getJsCli(), getJsConfig(), getJsTest()] as const;
}
