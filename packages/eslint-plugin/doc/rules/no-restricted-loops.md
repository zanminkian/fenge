<!-- prettier-ignore-start -->
# no-restricted-loops

Only allow `while`, `for` and `for-of` loops. `for-in`, `do-while` and `for-await-of` loops are disallowed.

## Rule Details

### Fail

```ts
for(const bar in foo) {}
do{}while(condition)
for await (const bar of foo()) {}
```

### Pass

```ts
for(const bar of foo) {}
while(condition){}
for(let i = 0; i < foo.length; i++) {}
```
<!-- prettier-ignore-end -->
