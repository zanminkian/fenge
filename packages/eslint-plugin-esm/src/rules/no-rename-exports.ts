import { createRule, DEFAULT_MESSAGE_ID, getRuleName } from "../common.ts";

export const noRenameExports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow renaming the named-exports.",
  create: (context) => ({
    ExportSpecifier: (node) => {
      if (
        node.exported.type !== "Identifier" ||
        node.local.type !== "Identifier" ||
        node.exported.name !== node.local.name
      ) {
        context.report({ node, messageId: DEFAULT_MESSAGE_ID });
      }
    },
  }),
});
