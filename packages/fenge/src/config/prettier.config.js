// @ts-check
import process from "node:process";
import { resolveConfig } from "../utils.js";

async function getFormatConfig() {
  const format = (await resolveConfig("fenge", process.env["FENGE_CONFIG"]))
    ?.config?.format;
  if (!format) return undefined;
  return typeof format === "function" ? await format() : format;
}

export default (await getFormatConfig()) ??
  (await resolveConfig("prettier"))?.config ??
  (await import("../re-export/prettier.config.js")).default;
