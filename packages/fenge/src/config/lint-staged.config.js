// @ts-check
import path from "node:path";
import process from "node:process";
import { dir, resolveConfig } from "../utils.js";

const cliPath = path.resolve(dir(import.meta.url), "..", "bin", "fenge.cli.js");
const defaultConfig = { "*": [`${process.execPath} ${cliPath} -w`] };
export default (await resolveConfig("lint-staged"))?.config ?? defaultConfig;
