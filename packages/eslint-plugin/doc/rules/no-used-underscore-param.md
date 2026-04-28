<!-- prettier-ignore-start -->
# no-used-underscore-param

Disallow underscore-prefixed function parameters that are actually used in the function body.

## Rule Details

### Fail

```ts
function foo(_x) { _x; }
function foo(_x) { _x = 1 }
function foo(_x) { return _x; }
const foo = function(_x) { return _x; }
const foo = (_x) => _x
const foo = _x => _x
function foo(..._args) { return _args; }
function foo(_x = 5) { return _x; }
class Foo { bar(_x) { return _x; } }
class Foo { constructor(_x) { this.y = _x; } }
function foo(_x) { for (let i = 0; i < _x; i++) {} }
function foo(_x) { while (_x > 0) { _x--; } }
function foo(_x) { for (const item of _x) {} }
function foo(_x) { if (_x) { return 1; } }
function foo(_x) { if (true) { _x } }
function foo(_x) { return _x ? 1 : 0; }
function foo(_x) { switch (_x) { case 1: return; } }
function outer(_x) { function inner() { return _x; } }
function outer(_x) { const fn = () => _x; }
function outer(_x) { function inner(_x) { } return _x; }
function outer(_x) { function inner(_x) { return _x; } return _x; }
```

### Pass

```ts
function foo(_x) {}
const foo = function(_x) {}
const foo = (_x) => {}
const foo = _x => {}
function foo(..._args) {}
function foo(_x = 5) {}
function outer(_x) { function inner(_x) {} }
function outer(_x) { function inner(x) { return x; } }
class Foo { bar(_x) { return this._x; } }
function foo({ _x }) { return _x; }
function foo(x) { return x; }
function foo(_x) { function inner() { const _x = 1; return _x; } }
```
<!-- prettier-ignore-end -->
