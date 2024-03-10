"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Expression = _interopRequireDefault(require("./Expression"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ParsedExpression extends _Expression.default {
  constructor(expression, nodes) {
    super(expression);

    _defineProperty(this, "getNodes", () => {
      return this.nodes;
    });

    this.nodes = nodes;
  }

}

exports.default = ParsedExpression;