"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NameNode extends _Node.default {
  constructor(name) {
    super({}, {
      name: name
    });

    _defineProperty(this, "compile", compiler => {
      compiler.raw(this.attributes.name);
    });

    _defineProperty(this, "evaluate", (functions, values) => {
      //console.log(`Checking for value of "${this.attributes.name}"`);
      let value = values[this.attributes.name]; //console.log(`Value: ${value}`);

      return value;
    });

    this.name = 'NameNode';
  }

  toArray() {
    return [this.attributes.name];
  }

}

exports.default = NameNode;