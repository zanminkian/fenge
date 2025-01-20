import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";

async function getTailwindConfig() {
  const exists = (filepath: string) =>
    fs
      .access(filepath)
      .then(() => true)
      .catch(() => false);
  return (
    await Promise.all(
      ["js", "ts", "json"]
        .map((i) => path.resolve(process.cwd(), `tailwind.config.${i}`))
        .map(async (filepath) =>
          (await exists(filepath)) ? filepath : undefined,
        ),
    )
  ).find(Boolean);
}

const resolve = createRequire(import.meta.url).resolve;
const tailwindConfig = await getTailwindConfig();

export default {
  overrides: [
    {
      files: "package.json",
      options: {
        plugins: ["prettier-plugin-packagejson"].map((moduleName) =>
          resolve(moduleName),
        ),
      },
    },
    {
      files: "*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
      options: {
        plugins: [
          "@ianvs/prettier-plugin-sort-imports",
          ...(tailwindConfig ? ["prettier-plugin-tailwindcss"] : []),
        ].map((moduleName) => resolve(moduleName)),
        importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
        ...(tailwindConfig ? { tailwindConfig } : {}),
      },
    },
  ],
};
