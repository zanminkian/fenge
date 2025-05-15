import type { Rule } from "eslint";
import { getRuleName } from "../utils.ts";

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Disallow triple slash directives (/// <...>) in code.",
    },
    messages: {
      [`${name}/error`]: "Triple slash directives (/// <...) are not allowed.",
    },
  },
  create: (context) => ({
    Program: (node) => {
      context.sourceCode
        .getAllComments()
        .filter((comment) => comment.type === "Line")
        .filter((comment) => /^\/\s*<.*/.test(comment.value.trim()))
        .forEach((comment) => {
          context.report(
            comment.loc
              ? {
                  loc: comment.loc,
                  messageId: `${name}/error`,
                }
              : {
                  node,
                  messageId: `${name}/error`,
                },
          );
        });
    },
  }),
};

export const noTripleSlashDirective = { name, rule };
