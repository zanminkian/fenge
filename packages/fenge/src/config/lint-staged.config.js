// @ts-check
import path from "node:path";
import process from "node:process";
import { resolveConfig } from "../utils.js";

const cliPath = path.resolve(import.meta.dirname, "..", "bin", "fenge.cli.js");
const defaultConfig = { "*": [`${process.execPath} ${cliPath} -w`] };
export default (await resolveConfig("lint-staged"))?.config ?? defaultConfig;
