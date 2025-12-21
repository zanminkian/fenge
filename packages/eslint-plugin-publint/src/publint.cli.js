#!/usr/bin/env node
// @ts-check
import process from "node:process";
import { publint } from "publint";

const pkgDir = process.argv[2];
if (!pkgDir) {
  throw new Error("pkgDir is required");
}

process.stdout.write(
  JSON.stringify(
    // If the pnpm is not installed, it will throw an error when linting pnpm projects. So does the yarn.
    await publint({ pkgDir }).catch((e) => {
      console.warn("Call publint failed:", e?.message);
      return null;
    }),
  ),
);
