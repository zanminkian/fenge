<!-- prettier-ignore-start -->
# no-export-assignment

undefined

## Rule Details

### Fail

```ts
export = {}
```

### Pass

```ts
export default {}
exports = {}
module.exports = {}
```
<!-- prettier-ignore-end -->
