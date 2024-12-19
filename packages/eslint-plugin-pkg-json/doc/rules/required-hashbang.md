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
{"bin":"./bad.cli.js"} // filename: /foo/test/required-hashbang/package.json
{"bin":{"foo":"./bad.cli.js"}} // filename: /foo/test/required-hashbang/package.json
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
