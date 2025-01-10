import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Rule } from "eslint";
import type {
  ExportAllDeclaration,
  ExportNamedDeclaration,
  ImportDeclaration,
  ImportExpression,
} from "estree";
import type { JSONSchema4 } from "json-schema";

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
  schema?: JSONSchema4[];
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
        // TODO: add url
        description: message,
      },
    },
    create: createFn,
  };
  return { name, rule };
}

export function getRuleName(importMetaUrl: string) {
  // remove '.js' extension
  return path.basename(fileURLToPath(importMetaUrl)).slice(0, -3);
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
