// @ts-check
import process from "node:process";
import { resolveConfig } from "../utils.js";

export default (await resolveConfig("fenge", process.env["FENGE_CONFIG"]))
  ?.config?.format ??
  (await resolveConfig("prettier"))?.config ??
  (await import("../re-export/prettier.config.js")).default;
