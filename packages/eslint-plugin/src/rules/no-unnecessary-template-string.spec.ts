import { test } from "@fenge/dev-utils";
import { noUnnecessaryTemplateString } from "./no-unnecessary-template-string.ts";

const valid = [
  "'abc'",
  '"def"',
  "`ab${cd}ef`",
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
