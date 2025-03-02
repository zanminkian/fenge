<!-- prettier-ignore-start -->
# no-property-decorator

undefined

## Rule Details

### Fail

```ts
class A {
    @Inject()
    declare private readonly name: string;
  }
class A {
    @Inject()
    name: string;
  }
class A {
    @Inject()
    private readonly name: Map<string, string> = new Map<string, string>();
  }
```

### Pass

```ts
class A {
    @Get()
    get() {
    }
  } // filename: foo.ts
class A {
    @Inject()
    declare private readonly name: string;
  } // filename: foo.ts, options: [{"allowDeclaration":true}]
```
<!-- prettier-ignore-end -->
