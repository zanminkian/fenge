<!-- prettier-ignore-start -->
# no-jsx-in-non-jsx-file

Only allow JSX syntax in `.jsx` and `.tsx` file.

## Rule Details

### Fail

```ts
const Foo = () => <div></div> // filename: foo.js
const Foo = () => <></> // filename: foo.js
function Foo(){const x = <div>foo</div>} // filename: foo.js
function Foo(){const x = <>foo</>} // filename: foo.js
const Foo = () => <div></div> // filename: foo.cjs
const Foo = () => <></> // filename: foo.cjs
function Foo(){const x = <div>foo</div>} // filename: foo.cjs
function Foo(){const x = <>foo</>} // filename: foo.cjs
const Foo = () => <div></div> // filename: foo.mjs
const Foo = () => <></> // filename: foo.mjs
function Foo(){const x = <div>foo</div>} // filename: foo.mjs
function Foo(){const x = <>foo</>} // filename: foo.mjs
```

### Pass

```ts
const Foo = () => <div></div> // filename: foo.jsx
const Foo = () => <></> // filename: foo.jsx
function Foo(){const x = <div>foo</div>} // filename: foo.jsx
function Foo(){const x = <>foo</>} // filename: foo.jsx
const Foo = () => <div></div> // filename: foo.tsx
const Foo = () => <></> // filename: foo.tsx
function Foo(){const x = <div>foo</div>} // filename: foo.tsx
function Foo(){const x = <>foo</>} // filename: foo.tsx
```
<!-- prettier-ignore-end -->
