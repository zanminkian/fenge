import { createRule, DEFAULT_MESSAGE_ID, getRuleName } from "../common.ts";
import type { GetNode } from "../utils.ts";

type ImportDeclaration = GetNode<"ImportDeclaration">;

const ignores = [
  "^reflect-metadata$",
  // https://github.com/vitejs/vite/blob/main/packages/vite/client.d.ts
  // "(?<!\\.module)\\.css$",
  // "(?<!\\.module)\\.scss$",
  // "(?<!\\.module)\\.sass$",
  // "(?<!\\.module)\\.less$",
  // "(?<!\\.module)\\.styl$",
  // "(?<!\\.module)\\.stylus$",
  // "(?<!\\.module)\\.pcss$",
  // "(?<!\\.module)\\.sss$",
];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
export const noSideEffectImports = createRule({
  name: getRuleName(import.meta.url),
  message:
    "Side effect import is often used for polyfills and css. It's unsafe to use it.",
  create: (context) => {
    const ignoreExps = ignores.map((ignore) => new RegExp(ignore));
    return {
      "ImportDeclaration[specifiers.length=0]": (node: ImportDeclaration) => {
        if (
          ignoreExps.some(
            (exp) =>
              typeof node.source.value === "string" &&
              exp.test(node.source.value),
          )
        ) {
          return;
        }
        context.report({ node, messageId: DEFAULT_MESSAGE_ID });
      },
    };
  },
});
