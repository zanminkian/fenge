import { existingFileImports } from "./rules/existing-file-imports.ts";
import { noDeclarationFileImports } from "./rules/no-declaration-file-imports.ts";
import { noDirectoryImports } from "./rules/no-directory-imports.ts";
import { noDynamicImports } from "./rules/no-dynamic-imports.ts";
import { noEmptyExports } from "./rules/no-empty-exports.ts";
import { noGitIgnoredImports } from "./rules/no-git-ignored-imports.ts";
import { noPhantomDepImports } from "./rules/no-phantom-dep-imports.ts";
import { noQuerySuffixes } from "./rules/no-query-suffixes.ts";
import { noRelativeParentImports } from "./rules/no-relative-parent-imports.ts";
import { noRenameExports } from "./rules/no-rename-exports.ts";
import { noRenameImports } from "./rules/no-rename-imports.ts";
import { noSideEffectImports } from "./rules/no-side-effect-imports.ts";
import { noUselessPathSegments } from "./rules/no-useless-path-segments.ts";
import { requiredExports } from "./rules/required-exports.ts";
import { topSideEffectImports } from "./rules/top-side-effect-imports.ts";

export const rules = {
  [existingFileImports.name]: existingFileImports.rule,
  [noDeclarationFileImports.name]: noDeclarationFileImports.rule,
  [noDirectoryImports.name]: noDirectoryImports.rule,
  [noDynamicImports.name]: noDynamicImports.rule,
  [noEmptyExports.name]: noEmptyExports.rule,
  [noGitIgnoredImports.name]: noGitIgnoredImports.rule,
  [noPhantomDepImports.name]: noPhantomDepImports.rule,
  [noQuerySuffixes.name]: noQuerySuffixes.rule,
  [noRelativeParentImports.name]: noRelativeParentImports.rule,
  [noRenameExports.name]: noRenameExports.rule,
  [noRenameImports.name]: noRenameImports.rule,
  [noSideEffectImports.name]: noSideEffectImports.rule,
  [noUselessPathSegments.name]: noUselessPathSegments.rule,
  [requiredExports.name]: requiredExports.rule,
  [topSideEffectImports.name]: topSideEffectImports.rule,
};
