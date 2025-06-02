import type {
  AST,
  TSESTreeOptions,
} from "@typescript-eslint/typescript-estree";

export async function parse(
  code: string,
  options: TSESTreeOptions,
): Promise<AST<TSESTreeOptions>> {
  // this package require typescript as its peer dependencies
  const estree = await import("@typescript-eslint/typescript-estree").catch(
    (e: unknown) => {
      throw new Error(
        "Importing `@typescript-eslint/typescript-estree` fail! Please make sure that typescript has been installed or npm config `legacy-peer-deps` is disabled.",
        { cause: e },
      );
    },
  );
  return estree.parse(code, options);
}
