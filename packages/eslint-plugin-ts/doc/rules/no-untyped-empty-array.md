<!-- prettier-ignore-start -->
# no-untyped-empty-array

undefined

## Rule Details

### Fail

```ts
const arr = []
let arr = []
var arr = []
let arr1=[],arr2
var arr1,arr2=[]
```

### Pass

```ts
const arr: number[] = []
const arr: any[] = []
const arr = [] as unknown[]
const arr = ['foo']
const arr = [[]]
const arr = [{}]
class A {names = []}
const foo = {arr: []}
```
<!-- prettier-ignore-end -->
