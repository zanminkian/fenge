import { createRule, DEFAULT_MESSAGE_ID, getRuleName } from "../common.ts";

export const noRenameImports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow renaming the named-imports.",
  create: (context) => ({
    ImportSpecifier: (node) => {
      if (
        node.imported.type !== "Identifier" ||
        node.imported.name !== node.local.name
      ) {
        context.report({ node, messageId: DEFAULT_MESSAGE_ID });
      }
    },
  }),
});
