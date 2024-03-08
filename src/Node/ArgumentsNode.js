"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ArrayNode = _interopRequireDefault(require("./ArrayNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ArgumentsNode extends _ArrayNode.default {
  constructor() {
    super();

    _defineProperty(this, "compile", compiler => {
      this.compileArguments(compiler, false);
    });

    this.name = "ArgumentsNode";
  }

  toArray() {
    let array = [];

    for (let pair of this.getKeyValuePairs()) {
      array.push(pair.value);
      array.push(", ");
    }

    array.pop();
    return array;
  }

}

exports.default = ArgumentsNode;