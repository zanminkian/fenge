// @ts-check
import process from "node:process";
import { resolveConfig } from "../utils.js";

async function getLintConfig() {
  const lint = (await resolveConfig("fenge", process.env["FENGE_CONFIG"]))
    ?.config?.lint;
  return typeof lint === "function" ? await lint() : lint;
}

export default (await getLintConfig()) ??
  (await resolveConfig("eslint"))?.config ??
  (await import("../re-export/eslint.config.js")).default;
