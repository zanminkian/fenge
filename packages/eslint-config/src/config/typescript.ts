import { getTsBase } from "./ts/base.js";
import { getTsCli } from "./ts/cli.js";
import { getTsConfig } from "./ts/config.js";
import { getTsDeclaration } from "./ts/declaration.js";
import { getTsTest } from "./ts/test.js";

export function typescript() {
  return [
    getTsBase(),
    getTsCli(),
    getTsConfig(),
    getTsTest(),
    getTsDeclaration(),
  ] as const;
}
