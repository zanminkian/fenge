import { test } from "@fenge/dev-utils";
import { noRestrictedLoops } from "./no-restricted-loops.js";

const valid = ["for(const bar of foo) {}", "while(condition){}"];

const invalid = [
  "for(let i = 0; i < foo.length; i++) {}",
  "for(const bar in foo) {}",
  "do{}while(condition)",
  "for await (const bar of foo()) {}",
];

test({ valid, invalid, ...noRestrictedLoops });
