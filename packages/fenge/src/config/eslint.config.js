// @ts-check
import process from "node:process";
import { resolveConfig } from "../utils.js";

async function getConfig() {
  // 1.
  if (process.env["FENGE_USE_DEFAULT_CONFIG"]) {
    return (await import("../re-export/eslint.config.js")).default;
  }

  // 2.
  const lint = (await resolveConfig("fenge", process.env["FENGE_CONFIG"]))
    ?.config?.lint;
  const lintConfig = typeof lint === "function" ? await lint() : lint;
  if (lintConfig) return lintConfig;

  // 3.
  const eslintConfig = (await resolveConfig("eslint"))?.config;
  if (eslintConfig) return eslintConfig;

  // 4.
  return (await import("../re-export/eslint.config.js")).default;
}

export default await getConfig();
