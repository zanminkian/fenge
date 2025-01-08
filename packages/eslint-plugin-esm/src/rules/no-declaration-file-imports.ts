import { create, createRule, getRuleName } from "../common.js";

export const noDeclarationFileImports = createRule({
  name: getRuleName(import.meta.url),
  message: "Disallow importing from a declaration style file.",
  create: (context) => create(context, check),
});

function check(_filename: string, source: string) {
  const file = source.split("/").at(-1);
  return !file || file.includes(".d.");
}
