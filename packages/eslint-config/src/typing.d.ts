module "eslint-plugin-*" {
  const plugin: unknown = {}; // TODO: Add initializer because of this issue https://github.com/IanVS/prettier-plugin-sort-imports/issues/196
  export default plugin;
}
module "@eslint-community/eslint-plugin-eslint-comments" {
  const plugin: unknown = {}; // TODO: Add initializer because of this issue https://github.com/IanVS/prettier-plugin-sort-imports/issues/196
  export default plugin;
}
module "confusing-browser-globals" {
  const keys: string[] = [];
  export default keys;
}
