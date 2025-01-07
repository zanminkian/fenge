<!-- prettier-ignore-start -->
# no-instanceof-builtin

Right hand of `instanceof` can't be a builtin class.

## Rule Details

### Fail

```ts
const i = {} instanceof Number
const i = {} instanceof String
const i = {} instanceof Boolean
const i = {} instanceof Symbol
const i = {} instanceof BigInt
const i = {} instanceof Object
const i = {} instanceof Array
const i = {} instanceof Function
const i = {} instanceof ArrayBuffer
const i = {} instanceof BigInt64Array
const i = {} instanceof BigUint64Array
const i = {} instanceof DataView
const i = {} instanceof Date
const i = {} instanceof Float32Array
const i = {} instanceof Float64Array
const i = {} instanceof Int16Array
const i = {} instanceof Int32Array
const i = {} instanceof Int8Array
const i = {} instanceof Map
const i = {} instanceof Error
const i = {} instanceof Promise
const i = {} instanceof Proxy
const i = {} instanceof RegExp
const i = {} instanceof Set
const i = {} instanceof SharedArrayBuffer
const i = {} instanceof Uint16Array
const i = {} instanceof Uint32Array
const i = {} instanceof Uint8Array
const i = {} instanceof Uint8ClampedArray
const i = {} instanceof WeakMap
const i = {} instanceof WeakSet
```

### Pass

```ts
const i = Math.random() > 0.5 ? true: false
const i = {} instanceof await import('http')
```
<!-- prettier-ignore-end -->
