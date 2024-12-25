<!-- prettier-ignore-start -->
# no-lifecycle-script

Using lifecycle script in public npm package is considered a bad practice. You should expose a cli entrance. Users who need it will invoke it manually

## Rule Details

### Fail

```ts
{"private":false,"scripts":{"postinstall":"foo"}}
{"scripts":{"preinstall":"foo"}}
{"scripts":{"install":"foo"}}
{"scripts":{"postinstall":"foo"}}
{"scripts":{"preuninstall":"foo"}}
{"scripts":{"uninstall":"foo"}}
{"scripts":{"postuninstall":"foo"}}
{"scripts":{"prepublish":"foo"}}
```

### Pass

```ts
{}
{"private":true,"scripts":{"postinstall":"foo"}}
{"foo":{"postinstall":"bar"}}
```
<!-- prettier-ignore-end -->
