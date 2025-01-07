import { test } from "@fenge/dev-utils";
import { callArgumentsLength } from "./call-arguments-length.js";

const valid = [
  "push()",
  "[].push('')",
  "foo.push('')",
  "foo.push(bar)",
  "[].push('', '', '')",
  "[].push(...foo)",
  "foo.push(...([]))",

  "[].reduce(()=>123, 0)",
  "foo.reduce(()=>123, 0)",
  "foo.reduce(bar, baz)",
  "[].reduceRight(()=>123, 0)",
  "foo.reduceRight(()=>123, 0)",
  "foo.reduceRight(bar, baz)",
  "reduce(()=>123)",
  "foo.reduceLeft(()=>123)",
  "Math.max(...foo)",

  "new foo.Set(...bar)",
  "new Set(bar)",
  "new Set()",
];
const invalid = [
  "[].push()",
  "foo.push()",

  "foo.reduce()",
  "[].reduce(()=>123)",
  "foo.reduce(()=>123)",
  "foo.reduce(bar)",
  "[].reduceRight(()=>123)",
  "foo.reduceRight(()=>123)",
  "foo.reduceRight(bar)",
  "[].reduce(...foo)",
  "[].reduce(...foo, ...bar)",
  "Math.max()",
  "Math.max(1)",
  "Math.min(foo)",

  "new Set(...foo)",
  "new Set(foo,bar)",
];

test({ valid, invalid, ...callArgumentsLength });
