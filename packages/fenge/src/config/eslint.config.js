// @ts-check
import process from "node:process";
import { resolveConfig } from "../utils.js";

export default (await resolveConfig("fenge", process.env["FENGE_CONFIG"]))
  ?.config?.lint ??
  (await resolveConfig("eslint"))?.config ??
  (await import("../re-export/eslint.config.js")).default;
