<!-- prettier-ignore-start -->
# required-dev-engines

`devEngines` field is required in the root package.json and must contain `runtime` and `packageManager` with `name` and `version` properties. If `onFail` is present, it must be `error`. The `version` in `packageManager` must be a valid SemVer.

## Rule Details

### Fail

```ts
{} // filename: /foo/package.json
{"devEngines":null} // filename: /foo/package.json
{"devEngines":{}} // filename: /foo/package.json
{"devEngines":{"runtime":{"name":"node","version":">=22"}}} // filename: /foo/package.json
{"devEngines":{"packageManager":{"name":"npm","version":"1.0.0"}}} // filename: /foo/package.json
{"devEngines":{"packageManager":{"name":"npm"},"runtime":{"name":"node","version":">=22"}}} // filename: /foo/package.json
{"devEngines":{"runtime":{"name":"node","version":"1.0.0"},"packageManager":{"name":"npm","version":"^1.0.0"}}} // filename: /foo/package.json
{"devEngines":{"runtime":{"name":"node","version":"1.0.0","onFail":"error"},"packageManager":{"name":"npm","version":"^1.0.0","onFail":"error"}}} // filename: /foo/package.json
{"devEngines":{"runtime":{"name":"node","version":"1.0.0"},"packageManager":{"name":"npm","version":"8.0.0","onFail":"warn"}}} // filename: /foo/package.json
{"devEngines":{"runtime":{"name":"node","version":"1.0.0","onFail":"warn"},"packageManager":{"name":"npm","version":"8.0.0"}}} // filename: /foo/package.json
{"devEngines":{"runtime":{"name":"node","version":"1.0.0","onFail":"Error"},"packageManager":{"name":"npm","version":"8.0.0","onFail":"error"}}} // filename: /foo/package.json
```

### Pass

```ts
{}
{"devEngines":{"runtime":{"name":"node","version":"1.0.0"},"packageManager":{"name":"npm","version":"8.0.0"}}} // filename: /foo/package.json
{"devEngines":{"runtime":{"name":"node","version":"1.0.0","onFail":"error"},"packageManager":{"name":"npm","version":"8.0.0","onFail":"error"}}} // filename: /foo/package.json
{"devEngines":{"runtime":{"name":"node","version":">=22","onFail":"error"},"packageManager":{"name":"npm","version":"8.0.0"}}} // filename: /foo/package.json
```
<!-- prettier-ignore-end -->
