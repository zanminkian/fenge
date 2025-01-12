import { test } from "@fenge/dev-utils";
import { noJsxInNonJsxFile } from "./no-jsx-in-non-jsx-file.ts";

const codes = [
  "const Foo = () => <div></div>",
  "const Foo = () => <></>",
  "function Foo(){const x = <div>foo</div>}",
  "function Foo(){const x = <>foo</>}",
];

const valid = [
  ...codes.map((code) => ({ code, filename: "foo.jsx" })),
  ...codes.map((code) => ({ code, filename: "foo.tsx" })),
];

const invalid = [
  ...codes.map((code) => ({ code, filename: "foo.js" })),
  ...codes.map((code) => ({ code, filename: "foo.cjs" })),
  ...codes.map((code) => ({ code, filename: "foo.mjs" })),
];

test({ valid, invalid, ...noJsxInNonJsxFile });
