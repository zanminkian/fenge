// @ts-check
import path from "node:path";
import { dir, resolveConfig } from "../utils.js";

const cliPath = path.resolve(dir(import.meta.url), "..", "bin", "fenge.cli.js");
const defaultConfig = { "*": [`${cliPath} format -u`] };
export default (await resolveConfig("lint-staged"))?.config ?? defaultConfig;
