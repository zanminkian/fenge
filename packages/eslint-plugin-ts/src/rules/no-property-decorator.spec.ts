import { test } from "@fenge/dev-utils";
import { noPropertyDecorator } from "./no-property-decorator.ts";

const valid = [
  `class A {
    @Get()
    get() {
    }
  }`,
]
  .map((code) => ({ code, filename: "foo.ts" }))
  .concat(
    [
      `class A {
    @Inject()
    declare private readonly name: string;
  }`,
    ].map((code) => ({
      code,
      filename: "foo.ts",
      options: [{ allowDeclaration: true }],
    })),
  );

const invalid = [
  `class A {
    @Inject()
    declare private readonly name: string;
  }`,
  `class A {
    @Inject()
    name: string;
  }`,
  `class A {
    @Inject()
    private readonly name: Map<string, string> = new Map<string, string>();
  }`,
];

test({ valid, invalid, ...noPropertyDecorator });
