import { getJsBase } from "./js/base.ts";
import { getJsCli } from "./js/cli.ts";
import { getJsConfig } from "./js/config.ts";
import { getJsEntrance } from "./js/entrance.ts";
import { getJsTest } from "./js/test.ts";

export function javascript() {
  return [
    getJsBase(),
    getJsCli(),
    getJsConfig(),
    getJsTest(),
    getJsEntrance(),
  ] as const;
}
