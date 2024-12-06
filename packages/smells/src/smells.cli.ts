#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { analyze } from "./analyze.js";

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
      analysis.anyTypes.forEach((i) => {
        console.log("Any Type", i);
      });
      analysis.assertions.forEach((i) => {
        console.log("Assertion", i);
      });
      analysis.nonNullAssertions.forEach((i) => {
        console.log("Non-null Assertion", i);
      });
      analysis.renamedImports.forEach((i) => {
        console.log("Renamed Import", i);
      });
      analysis.importExpressions.forEach((i) => {
        console.log("Import Expression", i);
      });
      analysis.instanceofOperators.forEach((i) => {
        console.log("Instanceof Operator", i);
      });
      analysis.exportDefaults.forEach((i) => {
        console.log("Export Default", i);
      });
      analysis.nodeProtocolImports.forEach((i) => {
        console.log("Node Protocol Import", i);
      });
      analysis.metaProperties.forEach((i) => {
        console.log("Meta Property", i);
      });
    }
    if (options.format === "json") {
      console.log(
        JSON.stringify({
          // 1. Code lines and files count:
          codeLines: analysis.codeLines,
          tsFiles: analysis.tsFiles,
          jsFiles: analysis.jsFiles,
          analyzedFiles: analysis.analyzedFiles,

          // 2. Type flaws count:
          anyTypes: analysis.anyTypes.length,
          assertions: analysis.assertions.length,
          nonNullAssertions: analysis.nonNullAssertions.length,

          // 3. Code style flaws count:
          renamedImports: analysis.renamedImports.length,
          importExpressions: analysis.importExpressions.length,
          instanceofOperators: analysis.instanceofOperators.length,

          // 4. Module interop issues count:
          exportDefaults: analysis.exportDefaults.length,

          // 5. Cross-platform issues count:
          nodeProtocolImports: analysis.nodeProtocolImports.length,
          metaProperties: analysis.metaProperties.length,
        }),
      );
    } else {
      console.log("1. Code lines and files count:");
      console.table({
        "Code Lines": analysis.codeLines,
        "TS Files": analysis.tsFiles,
        "JS Files": analysis.jsFiles,
        "Analyzed Files": analysis.analyzedFiles,
      });
      console.log("2. Type flaws count:");
      console.table({
        "Any Types": analysis.anyTypes.length,
        Assertions: analysis.assertions.length,
        "Non-null Assertions": analysis.nonNullAssertions.length,
      });
      console.log("3. Code style flaws count:");
      console.table({
        "Renamed Imports": analysis.renamedImports.length,
        "Import Expressions": analysis.importExpressions.length,
        "Instanceof Operators": analysis.instanceofOperators.length,
      });
      console.log("4. Module interop issues count:");
      console.table({
        "Export Defaults": analysis.exportDefaults.length,
      });
      console.log("5. Cross-platform issues count:");
      console.table({
        "Node Protocol Imports": analysis.nodeProtocolImports.length,
        "Meta Properties": analysis.metaProperties.length,
      });
    }
  });
program.parse();
