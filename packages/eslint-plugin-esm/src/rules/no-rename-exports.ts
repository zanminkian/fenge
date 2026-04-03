import { createRule, DEFAULT_MESSAGE_ID, getRuleName } from "../common.ts";

export const noRenameExports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow renaming the named-exports.",
  create: (context) => ({
    ExportSpecifier: (node) => {
      const parent = node.parent;
      if (parent.type !== "ExportNamedDeclaration") return;

      const hasLocalAndExported =
        node.local.type === "Identifier" && node.exported.type === "Identifier";
      if (!hasLocalAndExported) return;

      // `export { foo }` has the same source position as local and exported
      if (node.local.range?.[0] === node.exported.range?.[0]) return;

      // Exception: `export { default as X } from '...'` where X is not "default"
      const isReexportAsNamed =
        parent.source &&
        node.local.type === "Identifier" &&
        node.local.name === "default" &&
        node.exported.type === "Identifier" &&
        node.exported.name !== "default";
      if (isReexportAsNamed) return;

      context.report({ node, messageId: DEFAULT_MESSAGE_ID });
    },
  }),
});
