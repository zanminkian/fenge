<!-- prettier-ignore-start -->
# no-types-dependency-in-workspace-root

Should not install `@types/*` in workspace root

## Rule Details

### Fail

```ts
{"dependencies":{"@types/node":"foo","@types/bar":"bar"}} // filename: /foo/test/no-types-dependency-in-workspace-root/pkg.json
{"dependencies":{"@types/node":"foo"},"devDependencies":{"@types/types":"bar"}} // filename: /foo/test/no-types-dependency-in-workspace-root/pkg.json
{"dependencies":{"@types/node":"foo","@types/types":"bar"}} // filename: /foo/test/no-types-dependency-in-workspace-root/pkg.json
```

### Pass

```ts
{"dependencies":{"@types/node":"foo"}} // filename: /foo/package.json
{"devDependencies":{"@types/node":"foo"}} // filename: /foo/package.json
{"dependencies":{}} // filename: /foo/test/no-types-dependency-in-workspace-root/pkg.json
{"dependencies":{"types/node":"foo"}} // filename: /foo/test/no-types-dependency-in-workspace-root/pkg.json
{"devDependencies":{"@types":"foo"}} // filename: /foo/test/no-types-dependency-in-workspace-root/pkg.json
```
<!-- prettier-ignore-end -->
