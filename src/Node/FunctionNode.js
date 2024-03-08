"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FunctionNode extends _Node.default {
  constructor(name, _arguments2) {
    //console.log("Creating function node: ", name, _arguments);
    super({
      arguments: _arguments2
    }, {
      name: name
    });

    _defineProperty(this, "compile", compiler => {
      let _arguments = [];

      for (let node of Object.values(this.nodes.arguments.nodes)) {
        _arguments.push(compiler.subcompile(node));
      }

      let fn = compiler.getFunction(this.attributes.name);
      compiler.raw(fn.compiler.apply(null, _arguments));
    });

    _defineProperty(this, "evaluate", (functions, values) => {
      let _arguments = [values];

      for (let node of Object.values(this.nodes.arguments.nodes)) {
        //console.log("Testing: ", node, functions, values);
        _arguments.push(node.evaluate(functions, values));
      }

      return functions[this.attributes.name]['evaluator'].apply(null, _arguments);
    });

    this.name = 'FunctionNode';
  }

  toArray() {
    let array = [];
    array.push(this.attributes.name);

    for (let node of Object.values(this.nodes.arguments.nodes)) {
      array.push(', ');
      array.push(node);
    }

    array[1] = '(';
    array.push(')');
    return array;
  }

}

exports.default = FunctionNode;