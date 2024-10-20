import { test } from "../test.spec.js";
import { noUnnecessaryTemplateString } from "./no-unnecessary-template-string.js";

const valid = [
  "'abc'",
  '"def"',
  "`ab${cd}ef`", // eslint-disable-line no-template-curly-in-string
  "`\n`",
  "`abc\n`",
  "`\nabc`",
  "`a\nbc`",
];

const invalid = [
  // Currently, tagged template string should be reported as well.
  // Moving it to `valid` part is also reasonable.
  "outdent`foo`",
  "``",
  "`abc`",
  "`abc\\n`",
  "`\\nabc`",
  "`a\\nbc`",
];

test({ valid, invalid, ...noUnnecessaryTemplateString });
