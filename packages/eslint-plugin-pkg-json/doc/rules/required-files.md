<!-- prettier-ignore-start -->
# required-files

`files` field is required in a public package.json

## Rule Details

### Fail

```ts
{}
{"name":"foo"}
{"private":false}
{"private":false,"files":[]}
{"files":[]}
{"files":"not-an-array"}
{"files":{}}
```

### Pass

```ts
{"private":true,"name":"foo"}
{"private":true}
{"files":["dist"]}
{"files":["dist","*.js"]}
```
<!-- prettier-ignore-end -->
