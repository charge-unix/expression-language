"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UnaryNode extends _Node.default {
  constructor(operator, node) {
    super({
      node: node
    }, {
      operator: operator
    });

    _defineProperty(this, "compile", compiler => {
      compiler.raw('(').raw(UnaryNode.operators[this.attributes.operator]).compile(this.nodes.node).raw(')');
    });

    _defineProperty(this, "evaluate", (functions, values) => {
      let value = this.nodes.node.evaluate(functions, values);

      switch (this.attributes.operator) {
        case 'not':
        case '!':
          return !value;

        case '-':
          return -value;
      }

      return value;
    });

    this.name = 'UnaryNode';
  }

  toArray() {
    return ['(', this.attributes.operator + " ", this.nodes.node, ')'];
  }

}

exports.default = UnaryNode;

_defineProperty(UnaryNode, "operators", {
  '!': '!',
  'not': '!',
  '+': '+',
  '-': '-'
});