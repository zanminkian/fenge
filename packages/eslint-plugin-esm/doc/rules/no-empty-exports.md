<!-- prettier-ignore-start -->
# no-empty-exports

Disallow `export {}`.

## Rule Details

### Fail

```ts
export {};
console.log(123); export {};
export default {}; export {};
export {} from 'foo';
export {} from './foo';
```

### Pass

```ts
var name = 123; export {name as age};
const name = {}; export {name};
export const name = {};
export default {};
var foo = 213; export {foo as default};
export {default} from 'foo';
export * as foo from 'foo';
```
<!-- prettier-ignore-end -->
