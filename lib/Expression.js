"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Expression {
  constructor(expression) {
    this.expression = expression;
  }
  /**
   * Gets the expression.
   * @returns {string} The expression
   */


  toString() {
    return this.expression;
  }

}

exports.default = Expression;