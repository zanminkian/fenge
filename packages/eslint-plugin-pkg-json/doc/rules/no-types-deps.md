<!-- prettier-ignore-start -->
# no-types-deps

`@types/*` dependencies should not be installed in package.json

## Rule Details

### Fail

```ts
{"dependencies":{"@types/foo":"1.0.0"}}
{"dependencies":{"@types/node":"1.0.0"},"devDependencies":{"@types/jest":"2.0.0"}}
{"dependencies":{"@types/jest":"1.0.0"},"devDependencies":{"@types/web":"2.0.0"}}
```

### Pass

```ts
{}
{"dependencies":{"some-package":"1.0.0"},"devDependencies":{"another-package":"2.0.0"}}
{"peerDependencies":{"@types/web":"1.0.0"}}
```
<!-- prettier-ignore-end -->
