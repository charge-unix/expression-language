"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class ConditionalNode extends _Node.default {
  constructor(expr1, expr2, expr3) {
    super({
      expr1: expr1,
      expr2: expr2,
      expr3: expr3
    });

    _defineProperty(this, "compile", compiler => {
      compiler.raw('((').compile(this.nodes.expr1).raw(') ? (').compile(this.nodes.expr2).raw(') : (').compile(this.nodes.expr3).raw('))');
    });

    _defineProperty(this, "evaluate", async (functions, values) => {
      if (await this.nodes.expr1.evaluate(functions, values)) {
        return await this.nodes.expr2.evaluate(functions, values);
      }

      return await this.nodes.expr3.evaluate(functions, values);
    });

    this.name = 'ConditionalNode';
  }

  toArray() {
    return ['(', this.nodes.expr1, ' ? ', this.nodes.expr2, ' : ', this.nodes.expr3, ')'];
  }

}

exports.default = ConditionalNode;