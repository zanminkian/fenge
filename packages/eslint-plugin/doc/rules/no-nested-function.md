<!-- prettier-ignore-start -->
# no-nested-function

Non top-level functions are expected to be arrow functions instead of function declarations.

## Rule Details

### Fail

```ts
Foo.prototype.bar = function(){}
Foo.prototype.bar = function bar(){}
const foo = function(){}
const foo = function foo(){}
let foo; foo = function(){}
let foo; foo = function foo(){}
(function(){})
const foo = () => {function bar(){}}
function foo() {function bar(){}}
function foo() {let bar = function(){}}
function foo() {let bar = function bar(){}}
if(true) function foo(){}
class Foo{bar = function(){}}
class Foo{bar = function bar(){}}
const foo = {bar: function() {}}
const foo = {bar: function bar() {}}
const foo = {bar() {}}
setTimeout(function(){},100)
setTimeout(function callback(){},100)
```

### Pass

```ts
function foo(){}
const foo = () => {}
export function foo() {}
export default function foo() {}
export default function() {}
class Foo{bar(){}}
```
<!-- prettier-ignore-end -->
