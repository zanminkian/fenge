import { createRule, DEFAULT_MESSAGE_ID, getRuleName } from "../common.ts";

export const requiredExports = createRule({
  name: getRuleName(import.meta.url),
  message: "It's required at least one `export` statement in a file.",
  create: (context) => {
    let existExport = false;
    const hasExport = () => {
      existExport = true;
    };
    return {
      ExportAllDeclaration: () => hasExport(),
      ExportDefaultDeclaration: () => hasExport(),
      ExportNamedDeclaration: () => hasExport(),
      "Program:exit": (node) => {
        if (!existExport) {
          context.report({ node, messageId: DEFAULT_MESSAGE_ID });
        }
      },
    };
  },
});
