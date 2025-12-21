<!-- prettier-ignore-start -->
# no-engines

`engines` field should not be present in private package.json

## Rule Details

### Fail

```ts
{"private":true,"engines":{"node":"1.0.0"}}
{"private":true,"engines":{}}
{"private":true,"engines":{"node":">=14.0.0","npm":">=6.0.0"}}
{"private":true,"engines":null}
{"private":true,"engines":{"npm":"1.0.0"}}
```

### Pass

```ts
{"engines":{"node":"1.0.0"}}
{}
{"private":false,"engines":{"node":"1.0.0"}}
{"private":false,"engines":{}}
{"private":false}
{"private":true}
{"private":true,"name":"test"}
{"private":"true","engines":{"node":"1.0.0"}}
{"private":null,"engines":{"node":"1.0.0"}}
```
<!-- prettier-ignore-end -->
