#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { analyze } from "./analyze.js";
import { isDts, isJs, isTs } from "./utils.ts";

const version: string = JSON.parse(
  await fs.readFile(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "package.json",
    ),
    "utf8",
  ),
).version;

const program = new Command();
program
  .name("smells")
  .version(version)
  .description("analyze js/ts project quality and print the report")
  .option(
    "-f, --format <type>",
    'specify the analysis format, which can be "table" or "json"',
    "table",
  )
  .option("-d, --detail", "show analysis detail")
  .option(
    "-i, --ignore <path>",
    "ignore directory or file path. support globby pattern",
  )
  .argument("[path]", "directory or file path. support globby pattern", ".")
  .action(async (pattern, options) => {
    const analysis = await analyze(pattern, options.ignore);
    if (options.detail) {
      [...analysis.entries()].forEach(([file, value]) => {
        Object.entries(value).forEach(([key, locs]) => {
          if (typeof locs !== "number") {
            locs.forEach((loc) => {
              console.log(
                `${key.padEnd(25)} ${file} ${loc.start.line}:${loc.start.column}`,
              );
            });
          }
        });
      });
    }

    const result = {
      "Code lines and files count": {
        "Code Lines": [...analysis.values()].reduce(
          (count, item) => item.codeLines + count,
          0,
        ),
        "JS Files": [...analysis.keys()].reduce(
          (count, file) => count + Number(isJs(file)),
          0,
        ),
        "TS Files": [...analysis.keys()].reduce(
          (count, file) => count + Number(isTs(file)),
          0,
        ),
        "TS Declaration Files": [...analysis.keys()].reduce(
          (count, file) => count + Number(isDts(file)),
          0,
        ),
        "Analyzed Files": [...analysis.keys()].length,
      },
      "Type flaws count": {
        "Any Types": [...analysis.values()].reduce(
          (count, item) => item.anyTypes.length + count,
          0,
        ),
        Assertions: [...analysis.values()].reduce(
          (count, item) => item.assertions.length + count,
          0,
        ),
        "Non-null Assertions": [...analysis.values()].reduce(
          (count, item) => item.nonNullAssertions.length + count,
          0,
        ),
      },
      "Code style flaws count": {
        "Renamed Imports": [...analysis.values()].reduce(
          (count, item) => item.renamedImports.length + count,
          0,
        ),
        "Import Expressions": [...analysis.values()].reduce(
          (count, item) => item.importExpressions.length + count,
          0,
        ),
        "Instanceof Operators": [...analysis.values()].reduce(
          (count, item) => item.instanceofOperators.length + count,
          0,
        ),
      },
      "Module interop issues count": {
        "Export Defaults": [...analysis.values()].reduce(
          (count, item) => item.exportDefaults.length + count,
          0,
        ),
      },
      "Cross-platform issues count": {
        "Node Protocol Imports": [...analysis.values()].reduce(
          (count, item) => item.nodeProtocolImports.length + count,
          0,
        ),
        "Meta Properties": [...analysis.values()].reduce(
          (count, item) => item.metaProperties.length + count,
          0,
        ),
      },
    };

    if (options.format === "json") {
      console.log(JSON.stringify(result));
    } else {
      Object.entries(result).forEach(([key, value], index) => {
        console.log(`${index}. ${key}`);
        console.table(value);
      });
    }
  });
program.parse();
