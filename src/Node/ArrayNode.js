"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node"));

var _ConstantNode = _interopRequireDefault(require("./ConstantNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ArrayNode extends _Node.default {
  constructor() {
    super();

    _defineProperty(this, "addElement", (value, key = null) => {
      if (null === key) {
        key = new _ConstantNode.default(++this.index);
      } else {
        if (this.type === 'Array') {
          this.type = 'Object';
        }
      }

      this.nodes[(++this.keyIndex).toString()] = key;
      this.nodes[(++this.keyIndex).toString()] = value;
    });

    _defineProperty(this, "compile", compiler => {
      if (this.type === 'Object') {
        compiler.raw('{');
      } else {
        compiler.raw('[');
      }

      this.compileArguments(compiler, this.type !== "Array");

      if (this.type === 'Object') {
        compiler.raw('}');
      } else {
        compiler.raw(']');
      }
    });

    _defineProperty(this, "evaluate", async (functions, values) => {
      let result;

      if (this.type === 'Array') {
        result = [];

        for (let pair of this.getKeyValuePairs()) {
          result.push(await pair.value.evaluate(functions, values));
        }
      } else {
        result = {};

        for (let pair of this.getKeyValuePairs()) {
          result[await pair.key.evaluate(functions, values)] = await pair.value.evaluate(functions, values);
        }
      }

      return result;
    });

    _defineProperty(this, "getKeyValuePairs", () => {
      let pairs = [];
      let nodes = Object.values(this.nodes);
      let i,
          j,
          pair,
          chunk = 2;

      for (i = 0, j = nodes.length; i < j; i += chunk) {
        pair = nodes.slice(i, i + chunk);
        pairs.push({
          key: pair[0],
          value: pair[1]
        });
      }

      return pairs;
    });

    _defineProperty(this, "compileArguments", (compiler, withKeys = true) => {
      let first = true;

      for (let pair of this.getKeyValuePairs()) {
        if (!first) {
          compiler.raw(', ');
        }

        first = false;

        if (withKeys) {
          compiler.compile(pair.key).raw(': ');
        }

        compiler.compile(pair.value);
      }
    });

    this.name = "ArrayNode";
    this.type = "Array";
    this.index = -1;
    this.keyIndex = -1;
  }

  toArray() {
    let value = {};

    for (let pair of this.getKeyValuePairs()) {
      value[pair.key.attributes.value] = pair.value;
    }

    let array = [];

    if (this.isHash(value)) {
      for (let k of Object.keys(value)) {
        array.push(', ');
        array.push(new _ConstantNode.default(k));
        array.push(': ');
        array.push(value[k]);
      }

      array[0] = '{';
      array.push('}');
    } else {
      for (let v of Object.values(value)) {
        array.push(', ');
        array.push(v);
      }

      array[0] = '[';
      array.push(']');
    }

    return array;
  }

}

exports.default = ArrayNode;