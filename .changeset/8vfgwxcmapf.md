---
"fenge": patch
---

fix(fenge): skip git hook install when no `.git` directory

Instead of throwing when `.git` is absent, `writeGitHook` now returns
early, making `fenge install` a no-op in projects without a git repo.
