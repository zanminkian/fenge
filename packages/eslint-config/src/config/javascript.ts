import { jsBase } from "./js/base.js";
import { jsCli } from "./js/cli.js";
import { jsConfig } from "./js/config.js";
import { jsTest } from "./js/test.js";

export function javascript() {
  return [jsBase, jsCli, jsConfig, jsTest] as const;
}
