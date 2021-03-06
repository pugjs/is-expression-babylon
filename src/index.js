// Have to make sure the entire babylon is imported
import * as babylon from 'babylon';
import Parser from 'babylon/lib/parser';

const {tokTypes} = babylon;

const DEFAULT_OPTIONS = {
  lineComment: false,
  strict: false,
  throw: false
};

class ExpressionParser extends Parser {
  constructor(options, input) {
    super(options, input);

    if (options.strict) {
      this.state.strict = true;
    }

    this.expressionOptions = options;
  }

  skipLineComment(startSkip) {
    if (this.expressionOptions.lineComment) {
      return super.skipLineComment(startSkip);
    }

    this.raise(this.state.pos, 'Line comments not allowed in an expression');
  }

  assertExpression() {
    this.nextToken();
    const expr = this.parseExpression();
    if (!this.match(tokTypes.eof)) {
      this.unexpected();
    }
    return expr;
  }
}

export default function isExpression(src, options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

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

function getExpression(src, options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  const parser = new ExpressionParser(options, src);
  return parser.assertExpression();
}

isExpression.getExpression = getExpression;
