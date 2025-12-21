import type { Rule } from "eslint";
import { getDocUrl, getRuleName } from "../utils.ts";

const name = getRuleName(import.meta.url);

const CLI_FILE_EXTENSIONS = /\.cli\.(ts|mts|cts|js|mjs|cjs)$/;

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: getDocUrl(name),
      description:
        "Ensure consistency between hashbang and CLI filename. CLI files must start with hashbang, and files with hashbang must be CLI files.",
    },
    messages: {
      [`${name}/missing-hashbang`]:
        "CLI file (*.cli.[ts/mts/cts/js/mjs/cjs]) must start with hashbang (#!).",
      [`${name}/invalid-filename`]:
        "File with hashbang must have CLI filename (*.cli.[ts/mts/cts/js/mjs/cjs]).",
    },
  },
  create: (context) => {
    const { filename, sourceCode } = context;
    const text = sourceCode.getText();

    const isCliFile = CLI_FILE_EXTENSIONS.test(filename);
    const hasHashbang = text.trimStart().startsWith("#!");

    return {
      Program: (node) => {
        if (isCliFile && !hasHashbang) {
          context.report({
            node,
            messageId: `${name}/missing-hashbang`,
          });
        } else if (hasHashbang && !isCliFile) {
          context.report({
            node,
            messageId: `${name}/invalid-filename`,
          });
        }
      },
    };
  },
};

export const consistentHashbangAndFilename = { name, rule };
