<!-- prettier-ignore-start -->
# no-misuse-spreading-parameter

undefined

## Rule Details

### Fail

```ts
function f(x: string): void {}; f(...["a"])
class A { constructor(x: string) {} }; new A(...["a"])
const f = (x: string): void => {}; f(...["a"])
const x = ['ab','cd'];const set = new Set(...x);
function foo(args: string[]) {};const x = ['ab','cd'];foo(...x);
declare function optional(a?: number): void;const nums = [1, 2, 3];optional(...nums);
const foo: any = (...e: any[]) => e; foo(...[1, 2, 3]);
const foo: any = (...e: any[]) => e; foo(...Object.values({}));
```

### Pass

```ts
function f(...args: string[]): void {}; f(...["a", "b"])
function f(x: string): void {}; f("a")
function f(x: string, ...rest: string[]): void {}; f("a", ...["b", "c"])
class A { constructor(...args: string[]) {} }; new A(...["a", "b"])
const f = (...args: string[]): void => {}; f(...["a"])
```
<!-- prettier-ignore-end -->
