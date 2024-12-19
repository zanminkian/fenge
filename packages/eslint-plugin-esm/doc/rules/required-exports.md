<!-- prettier-ignore-start -->
# required-exports

It's required at least one `export` statement in a file.

## Rule Details

### Fail

```ts
// This rule will also report on empty files

console.log()
import foo from 'foo'
exports.foo = {}
module.exports = {}
```

### Pass

```ts
export {}
const foo = 'foo'; export {foo}
export const foo = {}
export default {}
export {foo} from 'foo'
export {} from 'foo'
export * as foo from 'foo'
export {}; let foo = ''
```
<!-- prettier-ignore-end -->
