---
"@fenge/eslint-config": patch
---

feat(eslint-config): enable stricter constant loop condition checking

The upstream typescript-eslint bug (#11978) has been fixed, so
`allowConstantLoopConditions` can now use `"only-allowed-literals"`.
