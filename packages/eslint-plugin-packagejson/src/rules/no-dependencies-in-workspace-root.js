import { isWorkspaceRootPkg } from "../common.js";

export const name = "no-dependencies-in-workspace-root";
export const rule = {
  meta: {
    messages: {
      [name]:
        "Should not install packages into `dependencies` in workspace root",
    },
  },
  create: (context) => {
    // only check workspace root package.json
    if (!isWorkspaceRootPkg(context.filename)) {
      return {};
    }
    return {
      "Program > ExportDefaultDeclaration > ObjectExpression": (node) => {
        node.properties
          .filter((p) => p.key.value === "dependencies")
          .forEach((property) => {
            context.report({
              node: property,
              messageId: name,
            });
          });
      },
    };
  },
};
