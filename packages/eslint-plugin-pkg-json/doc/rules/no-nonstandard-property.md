<!-- prettier-ignore-start -->
# no-nonstandard-property

Disallow using the property that is out of node and npm standard

## Rule Details

### Fail

```ts
{"name":"","foo":"foo","bar":"bar"}
{"author":"","public":true,"pnpm":{}}
{"name":"foo","type":"foo","yarn":"foo","packageManager":"foo"}
```

### Pass

```ts
{}
{"name":"foo","type":"foo","config":"foo"}
{"dependencies":{"foo":"foo"},"config":{"bar":"bar"}}
```
<!-- prettier-ignore-end -->
