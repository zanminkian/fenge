<!-- prettier-ignore-start -->
# no-declares

undefined

## Rule Details

### Fail

```ts
declare class A {} // options: [{"allowClassProperty":true}]
declare var A: number // options: [{"allowClassProperty":true}]
declare let A: number // options: [{"allowClassProperty":true}]
declare const A: number // options: [{"allowClassProperty":true}]
declare function A(a: string): number // options: [{"allowClassProperty":true}]
declare enum A{A1,A2} // options: [{"allowClassProperty":true}]
declare namespace A{} // options: [{"allowClassProperty":true}]
declare type A = {} // options: [{"allowClassProperty":true}]
declare interface A{} // options: [{"allowClassProperty":true}]
declare global { var a: string } // options: [{"allowClassProperty":true}]
declare module 'moment' { export function foo(): string } // options: [{"allowClassProperty":true}]
class A { declare name: string } // options: [{"allowClassProperty":false}]
class A { declare getName: () => string } // options: [{"allowClassProperty":false}]
class A { private declare name: string } // options: [{"allowClassProperty":false}]
class A { declare private name: string } // options: [{"allowClassProperty":false}]
```

### Pass

```ts
class A { declare name: string } // options: [{"allowClassProperty":true}]
class A { declare getName: () => string } // options: [{"allowClassProperty":true}]
class A { private declare name: string } // options: [{"allowClassProperty":true}]
class A { declare private name: string } // options: [{"allowClassProperty":true}]
```
<!-- prettier-ignore-end -->
