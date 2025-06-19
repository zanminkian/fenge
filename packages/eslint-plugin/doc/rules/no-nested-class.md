<!-- prettier-ignore-start -->
# no-nested-class

Disallow nested class. Classes are expected to place at top level.

## Rule Details

### Fail

```ts
if(true) class Foo{}
if(true) const foo = class {}
function foo(){class Foo{}}
function foo(){const foo = class {}}
function foo(){return class Foo{}}
function foo(){return class{}}
class Foo {foo(){class Bar{}}}
const Foo = class{}
let Foo = class Bar{}
let Foo; Foo = class{}
(class {})
```

### Pass

```ts
class Foo{}
export class Foo{}
export default class Foo{}
export default class {}
```
<!-- prettier-ignore-end -->
