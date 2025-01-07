import { test } from "@fenge/dev-utils";
import { noConstEnum } from "./no-const-enum.js";

const valid = ["enum E {}"];

const invalid = ["const enum E {}"];

test({ valid, invalid, ...noConstEnum });
