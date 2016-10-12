import assert from 'assert';
import testit from 'testit';
import isExpression from '../src';

function passes(src, options) {
  testit(`${JSON.stringify(src)} ${JSON.stringify(options || {})}`, () => {
    assert(isExpression(src, options));
  });
}

testit('passes', () => {
  passes('myVar');
  passes('["an", "array", "\'s"].indexOf("index")');
  passes('() => a');
  passes('\npublic');
  passes('abc // my comment', {lineComment: true});
});

function error(src, line, col, options = {}) {
  testit(`${JSON.stringify(src)} ${JSON.stringify(options)}`, () => {
    assert(!isExpression(src, options));
    options.throw = true;
    assert.throws(() => {
      isExpression(src, options);
    }, err => {
      assert.equal(err.loc.line, line);
      assert.equal(err.loc.column, col);
      assert(err.message);
      return true;
    });
  });
}

testit('fails', () => {
  error('', 1, 0);
  error('var', 1, 0);
  error('weird error', 1, 6);
  error('asdf\n  }', 2, 2);
  error('function (a = "default") {"use strict";}', 1, 10);
  error('\npublic', 2, 0, {strict: true});
  error('abc // my comment', 1, 4);
});
