<!-- prettier-ignore-start -->
# compatible-engines-node-version

Ensures @types/node version is less than or equal to engines.node minimum version

## Rule Details

### Fail

```ts
{"engines":{"node":"^16.0.0"}} // filename: /foo/package.json
```

### Pass

```ts
{"engines":{"node":"^24.0.0"}} // filename: /foo/package.json
```
<!-- prettier-ignore-end -->
