"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node"));

var _range = require("../lib/range");

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

class BinaryNode extends _Node.default {
  constructor(_operator, _left, _right) {
    super({
      left: _left,
      right: _right
    }, {
      operator: _operator
    });

    _defineProperty(this, "compile", compiler => {
      let operator = this.attributes.operator;

      if ('matches' === operator) {
        compiler.compile(this.nodes.right).raw(".test(").compile(this.nodes.left).raw(")");
        return;
      }

      if (BinaryNode.functions[operator] !== undefined) {
        compiler.raw(`${BinaryNode.functions[operator]}(`).compile(this.nodes.left).raw(", ").compile(this.nodes.right).raw(")");
        return;
      }

      if (BinaryNode.operators[operator] !== undefined) {
        operator = BinaryNode.operators[operator];
      }

      compiler.raw("(").compile(this.nodes.left).raw(' ').raw(operator).raw(' ').compile(this.nodes.right).raw(")");
    });

    _defineProperty(this, "evaluate", async (functions, values) => {
      let operator = this.attributes.operator,
          left = await this.nodes.left.evaluate(functions, values); //console.log("Evaluating: ", left, operator, right);

      if (BinaryNode.functions[operator] !== undefined) {
        let right = await this.nodes.right.evaluate(functions, values);

        switch (operator) {
          case 'not in':
            return right.indexOf(left) === -1;

          case 'in':
            return right.indexOf(left) >= 0;

          case '..':
            return (0, _range.range)(left, right);

          case '**':
            return Math.pow(left, right);
        }
      }

      let right = null;

      switch (operator) {
        case 'or':
        case '||':
          if (!left) {
            right = await this.nodes.right.evaluate(functions, values);
          }

          return left || right;

        case 'and':
        case '&&':
          if (left) {
            right = await this.nodes.right.evaluate(functions, values);
          }

          return left && right;
      }

      right = await this.nodes.right.evaluate(functions, values);

      switch (operator) {
        case '|':
          return left | right;

        case '^':
          return left ^ right;

        case '&':
          return left & right;

        case '==':
          return left == right;

        case '===':
          return left === right;

        case '!=':
          return left != right;

        case '!==':
          return left !== right;

        case '<':
          return left < right;

        case '>':
          return left > right;

        case '>=':
          return left >= right;

        case '<=':
          return left <= right;

        case 'not in':
          return right.indexOf(left) === -1;

        case 'in':
          return right.indexOf(left) >= 0;

        case '+':
          return left + right;

        case '-':
          return left - right;

        case '~':
          return left.toString() + right.toString();

        case '*':
          return left * right;

        case '/':
          return left / right;

        case '%':
          return left % right;

        case 'matches':
          let res = right.match(BinaryNode.regex_expression);
          let regexp = new RegExp(res[1], res[2]);
          return regexp.test(left);
      }
    });

    this.name = "BinaryNode";
  }

  toArray() {
    return ["(", this.nodes.left, ' ' + this.attributes.operator + ' ', this.nodes.right, ")"];
  }

}

exports.default = BinaryNode;

_defineProperty(BinaryNode, "regex_expression", /\/(.+)\/(.*)/);

_defineProperty(BinaryNode, "operators", {
  '~': '.',
  'and': '&&',
  'or': '||'
});

_defineProperty(BinaryNode, "functions", {
  '**': 'Math.pow',
  '..': 'range',
  'in': 'includes',
  'not in': '!includes'
});