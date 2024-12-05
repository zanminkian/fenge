// We have to disabled it. Otherwise formatter will failed due to @ianvs/prettier-plugin-sort-imports bug
// TODO remove declare keyword if this bug has been solved
/* eslint-disable @fenge-ts/no-declares */
declare module "eslint-plugin-*" {
  const plugin: unknown;
  export default plugin;
}
declare module "confusing-browser-globals" {
  const keys: string[];
  export default keys;
}
