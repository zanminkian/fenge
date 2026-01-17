<!-- prettier-ignore-start -->
# no-empty-condition

Disallow empty or falsy condition expression in for loops.

## Rule Details

### Fail

```ts
for(let i = 0; ; i++) {}
for(; ; ) {}
for(let i = 0; ; ) {}
for(; ; i++) {}
for(let i = 0; ''; i++) {}
for(let i = 0; 0; i++) {}
for(let i = 0; false; i++) {}
for(let i = 0; null; i++) {}
for(let i = 0; undefined; i++) {}
```

### Pass

```ts
for(let i = 0; i < 10; i++) {}
for(let i = 0; i < arr.length; i++) {}
for(; condition; ) {}
for(let i = 0; someCondition(); i++) {}
while(condition) {}
for(const item of items) {}
for(let i = 0; true; i++) {}
for(let i = 0; 1; i++) {}
for(let i = 0; 'string'; i++) {}
```
<!-- prettier-ignore-end -->
