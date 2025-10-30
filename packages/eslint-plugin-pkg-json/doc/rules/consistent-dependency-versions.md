<!-- prettier-ignore-start -->
# consistent-dependency-versions

Ensure consistent dependency versions across all package.json files in the project

## Rule Details

### Fail

```ts
{"dependencies":{"jsonc-eslint-parser":"2.4.0"}}
{"dependencies":{"jsonc-eslint-parser":"2.5.0"}}
{"devDependencies":{"jsonc-eslint-parser":"2.3.0"}}
{"optionalDependencies":{"jsonc-eslint-parser":"2.4.2"}}
{"dependencies":{"semver":"7.7.2"}}
{"dependencies":{"semver":"7.8.0"}}
{"devDependencies":{"semver":"7.6.0"}}
{"optionalDependencies":{"semver":"7.7.1"}}
{"dependencies":{"eslint":"9.21.0"}}
{"devDependencies":{"eslint":"9.23.0"}}
{"optionalDependencies":{"eslint":"9.20.0"}}
{"dependencies":{"@types/node":"18.19.122"}}
{"devDependencies":{"@types/node":"20.0.0"}}
{"optionalDependencies":{"@types/node":"18.19.120"}}
{"dependencies":{"outdent":"0.7.0"}}
{"optionalDependencies":{"outdent":"0.9.0"}}
{"dependencies":{"semver":"7.7.3","jsonc-eslint-parser":"2.4.0"}}
{"dependencies":{"jsonc-eslint-parser":"2.4.1"},"devDependencies":{"eslint":"9.21.0"}}
{"dependencies":{"semver":"7.7.3"},"optionalDependencies":{"eslint":"9.21.0"}}
{"dependencies":{"jsonc-eslint-parser":"2.4.1"},"devDependencies":{"eslint":"9.22.0"},"optionalDependencies":{"semver":"7.6.0"}}
```

### Pass

```ts
{"dependencies":{"jsonc-eslint-parser":"2.4.1"}}
{"devDependencies":{"eslint":"9.22.0"}}
{"optionalDependencies":{"semver":"7.7.3"}}
{"dependencies":{"semver":"7.7.3"},"devDependencies":{"@types/semver":"7.7.1"}}
{"dependencies":{"jsonc-eslint-parser":"2.4.1"},"optionalDependencies":{"semver":"7.7.3"}}
{"dependencies":{"jsonc-eslint-parser":"2.4.1"},"devDependencies":{"eslint":"9.22.0"}}
{"dependencies":{"jsonc-eslint-parser":"2.4.1"},"devDependencies":{"eslint":"9.22.0"},"optionalDependencies":{"outdent":"0.8.0"}}
{"dependencies":{}}
{"devDependencies":{}}
{"optionalDependencies":{}}
{"name":"test-package"}
```
<!-- prettier-ignore-end -->
