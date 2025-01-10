<!-- prettier-ignore-start -->
# no-unnecessary-template-string

Disallow using template string when it's unnecessary. Use normal literal string expression instead.

## Rule Details

### Fail

```ts
outdent`foo`
``
`abc`
`abc\n`
`\nabc`
`a\nbc`
```

### Pass

```ts
'abc'
"def"
`ab${cd}ef`
`
`
`abc
`
`
abc`
`a
bc`
```
<!-- prettier-ignore-end -->
