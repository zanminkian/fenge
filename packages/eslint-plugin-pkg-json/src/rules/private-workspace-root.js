import { isWorkspaceRootPkg } from "../common.ts";

export const name = "private-workspace-root";
export const rule = {
  meta: {
    messages: {
      [name]: "`package.json` in workspace root should be private",
    },
    docs: {
      description: "`package.json` in workspace root should be private",
    },
  },
  create: (context) => {
    // only check workspace root package.json
    if (!isWorkspaceRootPkg(context.filename)) {
      return {};
    }
    return {
      "Program > ExpressionStatement > ObjectExpression": (node) => {
        const privateProperty = node.properties.find(
          (p) => p.key.value === "private",
        );
        if (!privateProperty) {
          return context.report({
            node,
            messageId: name,
          });
        }
        if (privateProperty.value.value !== true) {
          return context.report({
            node: privateProperty,
            messageId: name,
          });
        }
      },
    };
  },
};
