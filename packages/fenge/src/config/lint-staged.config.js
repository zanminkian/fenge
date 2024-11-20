// @ts-check
import path from "node:path";
import { dir, resolveConfig } from "../utils.js";

const cliPath = path.resolve(dir(import.meta.url), "..", "bin", "cli.js");
const defaultConfig = { "*": [`${cliPath} -w`] };
export default (await resolveConfig("lint-staged"))?.config ?? defaultConfig;
