import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Rule } from "eslint";

export function getRuleName(importMetaUrl: string) {
  // remove '.js' extension
  return path.basename(fileURLToPath(importMetaUrl)).slice(0, -3);
}

export type GetNode<T extends keyof Rule.NodeListener> = Parameters<
  NonNullable<Rule.NodeListener[T]>
>[0];
