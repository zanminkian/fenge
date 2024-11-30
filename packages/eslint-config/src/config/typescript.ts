import { tsBase } from "./ts/base.js";
import { tsConfig } from "./ts/config.js";
import { tsDeclaration } from "./ts/declaration.js";
import { tsTest } from "./ts/test.js";

export function typescript() {
  return [tsBase, tsConfig, tsTest, tsDeclaration] as const;
}
