<!-- prettier-ignore-start -->
# no-dependencies-in-workspace-root

Should not install packages into `dependencies` in workspace root

## Rule Details

### Fail

```ts
{"dependencies":{}} // filename: /foo/test/no-dependencies-in-workspace-root/pkg.json
{"devDependencies":{},"dependencies":{"foo":"bar"}} // filename: /foo/test/no-dependencies-in-workspace-root/pkg.json
```

### Pass

```ts
{"dependencies":{}} // filename: /foo/package.json
{"dependencies":{"foo":"bar"}} // filename: /foo/package.json
{"devDependencies":{}} // filename: /foo/test/no-dependencies-in-workspace-root/pkg.json
```
<!-- prettier-ignore-end -->
