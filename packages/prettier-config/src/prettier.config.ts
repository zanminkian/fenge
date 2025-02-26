import { createRequire } from "node:module";

const resolve = createRequire(import.meta.url).resolve;
const resolvePlugins = (plugins: string[]) =>
  plugins.map((plugin) => resolve(plugin));

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
