import type { Rule } from "eslint";
import { getRuleName } from "../utils.ts";

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    messages: {
      default: "Disallow using `export =` statement.",
    },
  },
  create: (context) => ({
    TSExportAssignment: (node: Rule.Node) => {
      context.report({ node, messageId: "default" });
    },
  }),
};

export const noExportAssignment = { name, rule };
