import { noDeclarationFileImports } from "./rules/no-declaration-file-imports.js";
import { noDirectoryImports } from "./rules/no-directory-imports.js";
import { noDynamicImports } from "./rules/no-dynamic-imports.js";
import { noEmptyExports } from "./rules/no-empty-exports.js";
import { noGitIgnoredImports } from "./rules/no-git-ignored-imports.js";
import { noPhantomDepImports } from "./rules/no-phantom-dep-imports.js";
import { noRelativeParentImports } from "./rules/no-relative-parent-imports.js";
import { noRenameExports } from "./rules/no-rename-exports.js";
import { noRenameImports } from "./rules/no-rename-imports.js";
import { noSideEffectImports } from "./rules/no-side-effect-imports.js";
import { noUselessPathSegments } from "./rules/no-useless-path-segments.js";
import { requiredExports } from "./rules/required-exports.js";

export const rules = {
  [noDeclarationFileImports.name]: noDeclarationFileImports.rule,
  [noDirectoryImports.name]: noDirectoryImports.rule,
  [noDynamicImports.name]: noDynamicImports.rule,
  [noEmptyExports.name]: noEmptyExports.rule,
  [noGitIgnoredImports.name]: noGitIgnoredImports.rule,
  [noPhantomDepImports.name]: noPhantomDepImports.rule,
  [noRelativeParentImports.name]: noRelativeParentImports.rule,
  [noRenameExports.name]: noRenameExports.rule,
  [noRenameImports.name]: noRenameImports.rule,
  [noSideEffectImports.name]: noSideEffectImports.rule,
  [noUselessPathSegments.name]: noUselessPathSegments.rule,
  [requiredExports.name]: requiredExports.rule,
};
