// @ts-check
import process from "node:process";
import { resolveConfig } from "../utils.js";

async function getConfig() {
  // 1.
  if (process.env["FENGE_USE_DEFAULT_CONFIG"]) {
    return (await import("../re-export/prettier.config.js")).default;
  }

  // 2.
  const format = (await resolveConfig("fenge", process.env["FENGE_CONFIG"]))
    ?.config?.format;
  const formatConfig = typeof format === "function" ? await format() : format;
  if (formatConfig) return formatConfig;

  // 3.
  const prettierConfig = (await resolveConfig("prettier"))?.config;
  if (prettierConfig) return prettierConfig;

  // 4.
  return (await import("../re-export/prettier.config.js")).default;
}

export default await getConfig();
