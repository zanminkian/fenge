import { test } from "../test.spec.js";
import { nearestRelativePath } from "./nearest-relative-path.js";

const valid = [
  'import xxx from "../a"',
  'import "../a"',
  'import("../a")',
  'require("../a")',
  'import xxx from "./a"',
  'import xxx from "a"',
  'import xxx from ".a"',
  'export * from "a"',
  'export * from "./a"',
  'export {a} from "a"',
  'export {a} from "./a"',

  'import foo from "."',
  "import foo from '..'",
  "import foo from '../..'",
].map((code) => ({ code, filename: "/a/b/c/d/e.js" }));

const invalid = [
  'import xxx from ".././../a"',
  'import ".././../a"',
  'import(".././../a")',
  'export * from ".././../a"',
  'export {a} from ".././../a"',

  'import xxx from "./../a"',
  'import "./../a"',
  'import("./../a")',
  'export * from "./../a"',
  'export {a} from "./../a"',

  'import "././foo"',
  'import "./../.././foo"',
  'import("./../.././foo")',
  'export * from "./../.././foo"',
  'export {a} from "./../.././foo"',

  'import "./../foo"',
  'import("./../foo")',
  'export * from "./../foo"',
  'export {a} from "./../foo"',

  'import foo from "./"',
  "import foo from '../'",
  "import foo from '../../'",
  "import foo from './..'",
].map((code) => ({ code, filename: "/a/b/c/d/e.js" }));

test({ valid, invalid, ...nearestRelativePath });
