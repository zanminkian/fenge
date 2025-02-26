import type { Rule } from "eslint";
import type { ObjectExpression } from "estree";
import type { MessageType } from "publint";
import { formatMessage } from "publint/utils";
import { getPublintInfo } from "./get-publint-info.ts";
import { getReportingNode } from "./get-reporting-node.ts";

export function createRule(
  type: MessageType,
  meta: NonNullable<Rule.RuleModule["meta"]>,
): Rule.RuleModule {
  return {
    meta,
    create: (context: Rule.RuleContext) => {
      const { pkg, messages } = getPublintInfo(context.filename);
      const filteredMessages = messages.filter((msg) => msg.type === type);
      if (filteredMessages.length <= 0) return {};
      return {
        "Program > ExpressionStatement > ObjectExpression": (
          node: ObjectExpression,
        ) => {
          filteredMessages.forEach((msg) => {
            context.report({
              node: getReportingNode(node, msg.path),
              message:
                formatMessage(msg, pkg, { color: false }) ??
                JSON.stringify(msg),
            });
          });
        },
      };
    },
  };
}
