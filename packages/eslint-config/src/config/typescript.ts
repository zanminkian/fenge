import { tsBase } from "./ts/base.js";
import { tsCli } from "./ts/cli.js";
import { tsConfig } from "./ts/config.js";
import { tsDeclaration } from "./ts/declaration.js";
import { tsTest } from "./ts/test.js";

export function typescript() {
  return [tsBase, tsCli, tsConfig, tsTest, tsDeclaration] as const;
}
