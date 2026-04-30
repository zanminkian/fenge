import path from "node:path";
import type { Rule } from "eslint";

export function getRuleName(importMetaFilename: string) {
  // remove '.js' extension
  return path.basename(importMetaFilename).slice(0, -3);
}

export type GetNode<T extends keyof Rule.NodeListener> = Parameters<
  NonNullable<Rule.NodeListener[T]>
>[0];
