"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ConstantNode extends _Node.default {
  constructor(_value, isIdentifier = false) {
    super({}, {
      value: _value
    });

    _defineProperty(this, "compile", compiler => {
      compiler.repr(this.attributes.value, this.isIdentifier);
    });

    _defineProperty(this, "evaluate", (functions, values) => {
      return this.attributes.value;
    });

    _defineProperty(this, "toArray", () => {
      let array = [],
          value = this.attributes.value;

      if (this.isIdentifier) {
        array.push(value);
      } else if (true === value) {
        array.push('true');
      } else if (false === value) {
        array.push('false');
      } else if (null === value) {
        array.push('null');
      } else if (typeof value === "number") {
        array.push(value);
      } else if (typeof value === "string") {
        array.push(this.dumpString(value));
      } else if (Array.isArray(value)) {
        for (let v of value) {
          array.push(',');
          array.push(new ConstantNode(v));
        }

        array[0] = '[';
        array.push(']');
      } else if (this.isHash(value)) {
        for (let k of Object.keys(value)) {
          array.push(', ');
          array.push(new ConstantNode(k));
          array.push(': ');
          array.push(new ConstantNode(value[k]));
        }

        array[0] = '{';
        array.push('}');
      }

      return array;
    });

    this.isIdentifier = isIdentifier;
    this.name = 'ConstantNode';
  }

}

exports.default = ConstantNode;