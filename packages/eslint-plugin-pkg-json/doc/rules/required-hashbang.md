<!-- prettier-ignore-start -->
# required-hashbang

The bin file should starts with a hashbang

## Rule Details

### Fail

```ts
{"bin":123}
{"bin":[]}
{"bin":{"foo":true}}
{"bin":"./no-existing.js"} // filename: /foo/test/required-hashbang/package.json
{"bin":"./file-have-no-hashbang.js"} // filename: /foo/test/required-hashbang/package.json
{"bin":{"foo":"./file-have-no-hashbang.js"}} // filename: /foo/test/required-hashbang/package.json
```

### Pass

```ts
{}
{"name":"foo"}
{"bin":{}}
{"bin":"./good.cli.js"} // filename: /foo/test/required-hashbang/package.json
{"bin":{"foo":"./good.cli.js","bar":"./good.cli.js"}} // filename: /foo/test/required-hashbang/package.json
```
<!-- prettier-ignore-end -->
