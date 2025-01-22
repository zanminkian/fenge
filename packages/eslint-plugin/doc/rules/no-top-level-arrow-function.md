<!-- prettier-ignore-start -->
# no-top-level-arrow-function

Top-level functions are expected to be function declarations instead of arrow functions.

## Rule Details

### Fail

```ts
let foo = () => {}
const foo = () => {}
let foo = () => {
}
const foo = () => {
}
let foo; foo = () => {
}
export const foo = () => {
}
export let foo = () => {
}
export default () => {
}
```

### Pass

```ts
function foo(){}
const foo = function(){}
const foo = function foo(){}
if(true) const foo = () => {
}
let foo = () => ''
let foo = () => [
]
let foo = () => ({})
const foo = () => ({})
let foo; foo = () => ({})
export const foo = () => ({})
export let foo = () => ({})
export default () => ({})
```
<!-- prettier-ignore-end -->
