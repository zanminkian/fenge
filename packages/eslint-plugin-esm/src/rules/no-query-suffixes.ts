import { create, createRule, getRuleName } from "../common.ts";

export const noQuerySuffixes = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using query suffixes in import paths.",
  create: (context) => create(context, checkQuerySuffix),
});

function checkQuerySuffix(_filename: string, source: string) {
  return /\?.*$/.test(source);
}
