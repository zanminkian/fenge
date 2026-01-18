import { test } from "@fenge/dev-utils";
import { noRestrictedLoops } from "./no-restricted-loops.ts";

const valid = [
  "for(const bar of foo) {}",
  "while(condition){}",
  "for(let i = 0; i < foo.length; i++) {}",
];

const invalid = [
  "for(const bar in foo) {}",
  "do{}while(condition)",
  "for await (const bar of foo()) {}",
];

test({ valid, invalid, ...noRestrictedLoops });
