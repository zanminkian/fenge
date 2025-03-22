// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import packageJson from "../../package.json" with { type: "json" };
import { exists } from "../utils.js";

/**
 * @param {string} file
 */
async function removeGitHook(file) {
  const pkgJsonName = packageJson.name; // fenge
  const hookFilePath = path.resolve(process.cwd(), ".git", "hooks", file);
  if (
    (await exists(hookFilePath)) &&
    (await fs.readFile(hookFilePath, "utf8")).includes(pkgJsonName)
  ) {
    await fs.rm(hookFilePath);
  }
}

export async function uninstall() {
  await removeGitHook("pre-commit");
}
