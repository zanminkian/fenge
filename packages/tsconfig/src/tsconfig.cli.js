#!/usr/bin/env node
// @ts-check
import { Command } from "commander";
import { setup } from "./setup.js";

const program = new Command();
program.name("tsconfig");
setup(program);
program.parse();
