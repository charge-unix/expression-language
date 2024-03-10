"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Token = exports.TokenStream = void 0;

var _SyntaxError = _interopRequireDefault(require("./SyntaxError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TokenStream {
  constructor(expression, tokens) {
    _defineProperty(this, "next", () => {
      this.position += 1;

      if (this.tokens[this.position] === undefined) {
        throw new _SyntaxError.default("Unexpected end of expression", this.last.cursor, this.expression);
      }
    });

    _defineProperty(this, "expect", (type, value, message) => {
      let token = this.current;

      if (!token.test(type, value)) {
        let compiledMessage = "";

        if (message) {
          compiledMessage = message + ". ";
        }

        let valueMessage = "";

        if (value) {
          valueMessage = ` with value "${value}"`;
        }

        compiledMessage += `Unexpected token "${token.type}" of value "${token.value}" ("${type}" expected${valueMessage})`;
        throw new _SyntaxError.default(compiledMessage, token.cursor, this.expression);
      }

      this.next();
    });

    _defineProperty(this, "isEOF", () => {
      return Token.EOF_TYPE === this.current.type;
    });

    _defineProperty(this, "isEqualTo", ts => {
      if (ts === null || ts === undefined || !ts instanceof TokenStream) {
        return false;
      }

      if (ts.tokens.length !== this.tokens.length) {
        return false;
      }

      let tsStartPosition = ts.position;
      ts.position = 0;
      let allTokensMatch = true;

      for (let token of this.tokens) {
        let match = ts.current.isEqualTo(token);

        if (!match) {
          allTokensMatch = false;
          break;
        }

        if (ts.position < ts.tokens.length - 1) {
          ts.next();
        }
      }

      ts.position = tsStartPosition;
      return allTokensMatch;
    });

    _defineProperty(this, "diff", ts => {
      let diff = [];

      if (!this.isEqualTo(ts)) {
        let index = 0;
        let tsStartPosition = ts.position;
        ts.position = 0;

        for (let token of this.tokens) {
          let tokenDiff = token.diff(ts.current);

          if (tokenDiff.length > 0) {
            diff.push({
              index: index,
              diff: tokenDiff
            });
          }

          if (ts.position < ts.tokens.length - 1) {
            ts.next();
          }
        }

        ts.position = tsStartPosition;
      }

      return diff;
    });

    this.expression = expression;
    this.position = 0;
    this.tokens = tokens;
  }

  get current() {
    return this.tokens[this.position];
  }

  get last() {
    return this.tokens[this.position - 1];
  }

  toString() {
    return this.tokens.join("\n");
  }

}

exports.TokenStream = TokenStream;

class Token {
  constructor(_type, _value, cursor) {
    _defineProperty(this, "test", (type, value = null) => {
      return this.type === type && (null === value || this.value === value);
    });

    _defineProperty(this, "isEqualTo", t => {
      if (t === null || t === undefined || !t instanceof Token) {
        return false;
      }

      return t.value == this.value && t.type === this.type && t.cursor === this.cursor;
    });

    _defineProperty(this, "diff", t => {
      let diff = [];

      if (!this.isEqualTo(t)) {
        if (t.value !== this.value) {
          diff.push(`Value: ${t.value} != ${this.value}`);
        }

        if (t.cursor !== this.cursor) {
          diff.push(`Cursor: ${t.cursor} != ${this.cursor}`);
        }

        if (t.type !== this.type) {
          diff.push(`Type: ${t.type} != ${this.type}`);
        }
      }

      return diff;
    });

    this.value = _value;
    this.type = _type;
    this.cursor = cursor;
  }

  toString() {
    return `${this.cursor} [${this.type}] ${this.value}`;
  }

}

exports.Token = Token;

_defineProperty(Token, "EOF_TYPE", 'end of expression');

_defineProperty(Token, "NAME_TYPE", 'name');

_defineProperty(Token, "NUMBER_TYPE", 'number');

_defineProperty(Token, "STRING_TYPE", 'string');

_defineProperty(Token, "OPERATOR_TYPE", 'operator');

_defineProperty(Token, "PUNCTUATION_TYPE", 'punctuation');