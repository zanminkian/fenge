<!-- prettier-ignore-start -->
# no-rename-exports

Disallow renaming the named-exports.

## Rule Details

### Fail

```ts
let foo=1; export {foo as bar}
let foo=1; export {foo as default}
export {foo as default} from './foo'
export {foo as default} from 'foo'
export {foo as bar} from './foo'
export {foo as bar} from 'foo'
export {default as foo};
export {foo as default};
export {foo as bar};
export {type Foo as Bar}
export type {Foo as Bar}
```

### Pass

```ts
let foo=1; export {foo}
export let foo
export const foo = bar
export default foo
export default {}
export {}
export {default as foo} from './foo'
export {default as foo} from 'foo'
```
<!-- prettier-ignore-end -->
