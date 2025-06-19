<!-- prettier-ignore-start -->
# required-repository

`repository` field is required in a public package.json

## Rule Details

### Fail

```ts
{}
{"name":"foo"}
{"private":false}
{"private":false,"repository":""}
{"repository":""}
{"repository":{}}
```

### Pass

```ts
{"private":true,"name":"foo"}
{"private":true}
{"repository":"http://example.com"}
{"repository":{"url":""}}
```
<!-- prettier-ignore-end -->
