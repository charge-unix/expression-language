"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SerializedParsedExpression {
  constructor(expression, nodes) {
    _defineProperty(this, "getNodes", () => {
      return JSON.parse(this.nodes);
    });

    this.expression = expression;
    this.nodes = nodes;
  }

}

exports.default = SerializedParsedExpression;