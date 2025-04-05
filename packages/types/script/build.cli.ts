#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { replacements } from "./replacements.ts";

const cwd = path.join(import.meta.dirname, "..");

async function copyFiles(dest = path.join(cwd, "src")) {
  await fs.rm(dest, { recursive: true, force: true });
  await fs.mkdir(dest);

  const promises = (
    await fs.readdir(path.join(cwd, "node_modules", "typescript", "lib"), {
      withFileTypes: true,
    })
  )
    .filter(({ name }) => name.startsWith("lib.") && name.endsWith(".d.ts"))
    .map(({ name, parentPath }) =>
      fs.copyFile(
        path.join(parentPath, name),
        path.join(dest, `${path.parse(name).name}.txt`),
      ),
    );

  await Promise.all(promises);
}

async function compile(
  src = path.join(cwd, "src"),
  dist = path.join(cwd, "dist"),
) {
  await fs.mkdir(dist, { recursive: true });

  const promises = (await fs.readdir(src, { withFileTypes: true })).map(
    async ({ name, parentPath }) => {
      const { name: nameWithoutExt } = path.parse(name);

      const from = path.join(parentPath, name);
      const to = path.join(dist, `${nameWithoutExt}.ts`);

      // 1. handle `/// <reference lib="xxx" />`
      const content = (await fs.readFile(from, "utf8")).replaceAll(
        /^\/\/\/ <reference lib="([^"]+)"\s*\/>/gm,
        '/// <reference path="./lib.$1.d.ts" />',
      );

      // 2. do replace
      const result = replacements
        .filter((replacement) => replacement.file === nameWithoutExt)
        .reduce(
          (result, replacement) =>
            replace(result, replacement.searchValue, replacement.replaceValue),
          content,
        );

      await fs.writeFile(to, result);
    },
  );

  await Promise.all(promises);
}

function replace(content: string, searchValue: string, replaceValue: string) {
  if (!content || !searchValue || !replaceValue)
    throw new Error("content, searchValue, replaceValue are required");
  if (content.split(searchValue).length - 1 !== 1)
    throw new Error("content should only contain one searchValue");
  return content.replace(searchValue, replaceValue);
}

await copyFiles();
await compile();
