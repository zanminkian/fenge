import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Rule } from "eslint";
import type { GetNode } from "./utils.ts";

type ExtractArray<T> = T extends Array<infer U> ? U[] : never;

type ExportAllDeclaration = GetNode<"ExportAllDeclaration">;
type ExportNamedDeclaration = GetNode<"ExportNamedDeclaration">;
type ImportDeclaration = GetNode<"ImportDeclaration">;
type ImportExpression = GetNode<"ImportExpression">;

export const DEFAULT_MESSAGE_ID = "default";

export function createRule({
  name,
  message,
  schema,
  fixable,
  type = "suggestion",
  create: createFn,
}: {
  name: string;
  message: string;
  schema?: ExtractArray<Rule.RuleMetaData["schema"]>; // I would like to use `JSONSchema4[]` only.
  fixable?: Rule.RuleMetaData["fixable"];
  type?: Rule.RuleMetaData["type"];
  create: (context: Rule.RuleContext) => Rule.RuleListener;
}): { name: string; rule: Rule.RuleModule } {
  const rule: Rule.RuleModule = {
    meta: {
      ...(schema && { schema }),
      ...(fixable && { fixable }),
      messages: {
        [DEFAULT_MESSAGE_ID]: message,
      },
      type,
      docs: {
        url: `https://github.com/zanminkian/fenge/blob/main/packages/eslint-plugin-esm/doc/rules/${name}.md`,
        description: message,
      },
    },
    create: createFn,
  };
  return { name, rule };
}

export function getRuleName(importMetaUrl: string) {
  // remove '.js' extension
  return path.parse(fileURLToPath(importMetaUrl)).name;
}

export type ImportationNode =
  | ImportDeclaration
  | ImportExpression
  | ExportAllDeclaration
  | ExportNamedDeclaration;

/**
 * Create ESLint RuleListener to check string importation source.
 * @param context ESLint RuleContext
 * @param check the check logic
 * @returns ESLint RuleListener
 */
export function create(
  context: Rule.RuleContext,
  check: (filename: string, source: string, node: ImportationNode) => boolean,
): Rule.RuleListener {
  const handle = (node: ImportationNode) => {
    if (!node.source) return;
    if (!("value" in node.source)) return;
    if (typeof node.source.value !== "string") return;
    if (check(context.filename, node.source.value, node))
      context.report({ node: node.source, messageId: DEFAULT_MESSAGE_ID });
  };
  return {
    ImportDeclaration: handle,
    ImportExpression: handle,
    ExportAllDeclaration: handle,
    ExportNamedDeclaration: handle,
  };
}

export function getSourceType(source: string) {
  if (
    source.startsWith("/") ||
    source.startsWith("./") ||
    source.startsWith("../") ||
    source === "." ||
    source === ".."
  ) {
    return "local";
  }
  if (source.startsWith("node:")) {
    return "builtin";
  }
  return "module";
}
