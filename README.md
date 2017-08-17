# PostCSS Simple Trig [![Build Status][ci-img]][ci]

[![Join the chat at https://gitter.im/Rplus/postcss-simple-trig](https://badges.gitter.im/Rplus/postcss-simple-trig.svg)](https://gitter.im/Rplus/postcss-simple-trig?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[PostCSS] plugin to calculate trigonometric functions: `sin`/`cos`/`tan`.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/Rplus/postcss-simple-trig.svg
[ci]:      https://travis-ci.org/Rplus/postcss-simple-trig

```css
/* Input */
.foo {
  boo: sin(60deg);
  padding: calc(cos(60deg) * 1em);
}
```

```css
/* Output */
.foo {
  boo: 0.86603;
  padding: calc(0.5 * 1em);
}
```

## Usage

```js
postcss([ require('postcss-simple-trig') ]);
postcss([ require('postcss-simple-trig')({ precision: 2 }) ]);
```

See [PostCSS] docs for examples for your environment.

## Options

### precision
* type: `Integer`
* default: `5`
* allow: `0` ~ `20`

Used to determine how many digits after the decimal will be allowed.  
ref: [number.toFixed @ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)

```css
/* Input */
.foo {
  margin-left: sin(60deg);
}
```

```css
/* Output with { precision: 2 } */
.foo {
  margin-left: 0.87;
}
```
