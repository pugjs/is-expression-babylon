// Have to make sure the entire babylon is imported
import * as babylon from 'babylon';
import Parser from 'babylon/lib/parser';

const {tokTypes} = babylon;

const DEFAULT_OPTIONS = {
  lineComment: false,
  strict: false,
  throw: false
};

export default function isExpression(src, options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  class ExpressionParser extends Parser {
    constructor(options, input) {
      super(options, input);

      if (options.strict) {
        this.state.strict = true;
      }
    }

    skipLineComment(startSkip) {
      if (options.lineComment) {
        return super.skipLineComment(startSkip);
      }

      this.raise(this.state.pos, 'Line comments not allowed in an expression');
    }

    assertExpression() {
      this.nextToken();
      this.parseExpression();
      if (!this.match(tokTypes.eof)) {
        this.unexpected();
      }
    }
  }

  try {
    const parser = new ExpressionParser(options, src);
    parser.assertExpression();
    return true;
  } catch (err) {
    if (!options.throw) {
      return false;
    }

    throw err;
  }
}
