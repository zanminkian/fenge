import { getTsBase } from "./ts/base.ts";
import { getTsCli } from "./ts/cli.ts";
import { getTsConfig } from "./ts/config.ts";
import { getTsDeclaration } from "./ts/declaration.ts";
import { getTsTest } from "./ts/test.ts";

export function typescript() {
  return [
    getTsBase(),
    getTsCli(),
    getTsConfig(),
    getTsTest(),
    getTsDeclaration(),
  ] as const;
}
