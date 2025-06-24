const resolvePlugins = (plugins: string[]) =>
  // TODO: Remove this comment below when we drop support for Node v18.
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  plugins.map((plugin) => import.meta.resolve?.(plugin));

export default {
  overrides: [
    {
      files: "package.json",
      options: {
        plugins: resolvePlugins(["prettier-plugin-packagejson"]),
      },
    },
    {
      files: "*.{js,cjs,mjs,ts,cts,mts}",
      options: {
        plugins: resolvePlugins(["@ianvs/prettier-plugin-sort-imports"]),
        importOrderParserPlugins: ["typescript", "decorators-legacy"],
      },
    },
    {
      files: "*.{jsx,tsx}",
      options: {
        plugins: resolvePlugins([
          "@ianvs/prettier-plugin-sort-imports",
          "prettier-plugin-tailwindcss",
        ]),
        importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
      },
    },
  ],
};
