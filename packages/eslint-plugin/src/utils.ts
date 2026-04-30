import path from "node:path";
import type { Rule } from "eslint";

export function getRuleName(importMetaFilename: string) {
  // remove '.js' extension
  return path.basename(importMetaFilename).slice(0, -3);
}

export function getDocUrl(name: string) {
  return `https://github.com/zanminkian/fenge/blob/main/packages/eslint-plugin/doc/rules/${name}.md`;
}

export type GetNode<T extends keyof Rule.NodeListener> = Parameters<
  NonNullable<Rule.NodeListener[T]>
>[0];
