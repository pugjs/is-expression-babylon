<h1 align=center>!!!DEPRECATED!!!</h1>

This module has stopped working since
[babylon@6.13.1](https://github.com/babel/babylon/commit/beb8db62646081a88b8db31fe95d4b37aa28d98f).
Please use Babylon's `babylon.parseExpression()` instead.

----

# is-expression-babylon

Validates a string as a JavaScript expression using Babylon

An alternative version of this module using [Acorn] instead of Babylon is
available at [is-expression]. While this module aims to support all ECMAScript
features, even spec proposals in Stage 0, is-expression is more conservative on
the features it implements. Pick your poison.

[Acorn]: https://github.com/ternjs/acorn
[Babylon]: https://github.com/babel/babylon
[is-expression]: https://github.com/pugjs/is-expression

[![Build Status](https://img.shields.io/travis/pugjs/is-expression-babylon/master.svg)](https://travis-ci.org/pugjs/is-expression-babylon)
[![Dependency Status](https://img.shields.io/david/pugjs/is-expression-babylon.svg)](https://david-dm.org/pugjs/is-expression-babylon)
[![npm version](https://img.shields.io/npm/v/is-expression-babylon.svg)](https://www.npmjs.org/package/is-expression-babylon)

## Installation

    npm install is-expression-babylon

## Usage

```js
const isExpression = require('is-expression-babylon');
```

### `isExpression(src[, options])`

Validates a string as a JavaScript expression.

`src` contains the source.

`options` can contain any Babylon options, or any of the following:

- `throw`: Throw an error if the string is not an expression. The error can
  be an Acorn error, with location information in `err.loc` and `err.pos`.
  Defaults to `false`.
- `strict`: Use strict mode when trying to parse the string. Defaults to
  `false`. Even if this option is `false`, if you have provided
  `options.sourceType === 'module'` which imples strict mode under ES2015,
  strict mode will be used.
- `lineComment`: When `true`, allows line comments in the expression.
  Defaults to `false` for safety.

See the examples below for usage.

### `isExpression.getExpression(src[, options])`

Get the Babylon Expression AST node of a string.

`src` contains the source.

`options` can contain any Babylon options, or any of the following:

- `strict`: Use strict mode when trying to parse the string. Defaults to
  `false`. Even if this option is `false`, if you have provided
  `options.sourceType === 'module'` which imples strict mode under ES2015,
  strict mode will be used.
- `lineComment`: When `true`, allows line comments in the expression.
  Defaults to `false` for safety.

If the string is not an expression, an error is thrown.

## Examples

```js
const isExpression = require('is-expression-babylon');

isExpression('myVar');
//=> true
isExpression('var');
//=> false
isExpression('["an", "array", "\'s"].indexOf("index")');
//=> true

isExpression('var', {throw: true});
// SyntaxError: Unexpected token (1:0)
//     at Parser.pp.raise (acorn/dist/acorn.js:940:13)
//     at ...

isExpression('public');
//=> true
isExpression('public', {strict: true});
//=> false

isExpression('abc // my comment');
//=> false
isExpression('abc // my comment', {lineComment: true});
//=> true

const expression = isExpression.getExpression('abc');
//=> Node { type: 'Identifier', ... }
```

## License

MIT
