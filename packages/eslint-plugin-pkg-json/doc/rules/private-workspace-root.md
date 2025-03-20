<!-- prettier-ignore-start -->
# private-workspace-root

`package.json` in workspace root should be private

## Rule Details

### Fail

```ts
{} // filename: /foo/test/private-workspace-root/pkg.json
{"private":false} // filename: /foo/test/private-workspace-root/pkg.json
{"private":"true"} // filename: /foo/test/private-workspace-root/pkg.json
```

### Pass

```ts
{} // filename: /foo/package.json
{"private":true} // filename: /foo/test/private-workspace-root/pkg.json
```
<!-- prettier-ignore-end -->
