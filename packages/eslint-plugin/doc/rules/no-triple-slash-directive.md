<!-- prettier-ignore-start -->
# no-triple-slash-directive

Disallow triple slash directives (/// <...>) in code.

## Rule Details

### Fail

```ts
/// <reference path='...' />
///  <reference path='...' />
///<reference path='...' />
/// <reference types='...' />
/// <amd-dependency />
/// <amd-module />
/// <reference no-default-lib='true'/>
function example() {
  /// <reference path='...' />
}
class Example {
  constructor() {
    /// <reference path='...' />
  }
}
const obj = {
  key: "value",
  /// <reference path='...' />
};
for (let i = 0; i < 10; i++) {
  /// <reference path='...' />
}
```

### Pass

```ts
// Normal single-line comment
/* Normal multi-line comment */
/// Normal comment starting with ///
/* <reference path='...' /> */
```
<!-- prettier-ignore-end -->
