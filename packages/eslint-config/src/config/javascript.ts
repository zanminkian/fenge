import { jsBase } from "./js/base.js";
import { jsConfig } from "./js/config.js";
import { jsTest } from "./js/test.js";

export function javascript() {
  return [jsBase, jsConfig, jsTest] as const;
}
