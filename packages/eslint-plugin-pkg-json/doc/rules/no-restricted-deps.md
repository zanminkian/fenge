<!-- prettier-ignore-start -->
# no-restricted-deps

Restricted dependencies should not be installed in package.json

## Rule Details

### Fail

```ts
{"dependencies":{"fs-extra":"1.0.0"}}
{"dependencies":{"lodash":"1.0.0"}}
{"dependencies":{"fs-extra":"1.0.0"},"peerDependencies":{"foo":"2.0.0"}}
{"dependencies":{"lodash":"1.0.0"},"peerDependencies":{"foo":"2.0.0"}}
{"peerDependencies":{"fs-extra":"1.0.0"}}
{"peerDependencies":{"axios":"^1.0.0"}}
```

### Pass

```ts
{}
{"dependencies":{"some-package":"1.0.0"},"devDependencies":{"another-package":"2.0.0"}}
```
<!-- prettier-ignore-end -->
