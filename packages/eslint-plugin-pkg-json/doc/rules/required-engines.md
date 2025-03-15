<!-- prettier-ignore-start -->
# required-engines

`engines` field is required in public package.json, and it must contain `node` field

## Rule Details

### Fail

```ts
{}
{"engines":null}
{"engines":{}}
{"engines":{"npm":"1.0.0"}}
{"engines":{"node":null}}
{"engines":{"node":""}}
{"engines":{"node":" "}}
{"private":false}
{"private":false,"engines":null}
{"private":false,"engines":{}}
{"private":false,"engines":{"npm":"1.0.0"}}
{"private":false,"engines":{"node":null}}
{"private":false,"engines":{"node":""}}
{"private":false,"engines":{"node":" "}}
```

### Pass

```ts
{"engines":{"node":"1.0.0"}}
{"private":true,"engines":{}}
{"private":true}
{"private":false,"engines":{"node":"1.0.0"}}
{"private":false,"engines":{"node":">=14.0.0","npm":">=6.0.0"}}
```
<!-- prettier-ignore-end -->
