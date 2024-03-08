"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GetAttrNode extends _Node.default {
  constructor(node, attribute, _arguments, type) {
    super({
      node: node,
      attribute: attribute,
      arguments: _arguments
    }, {
      type: type
    });

    _defineProperty(this, "compile", compiler => {
      switch (this.attributes.type) {
        case GetAttrNode.PROPERTY_CALL:
          compiler.compile(this.nodes.node).raw('.').raw(this.nodes.attribute.attributes.value);
          break;

        case GetAttrNode.METHOD_CALL:
          compiler.compile(this.nodes.node).raw('.').raw(this.nodes.attribute.attributes.value).raw('(').compile(this.nodes.arguments).raw(')');
          break;

        case GetAttrNode.ARRAY_CALL:
          compiler.compile(this.nodes.node).raw('[').compile(this.nodes.attribute).raw(']');
          break;
      }
    });

    _defineProperty(this, "evaluate", async (functions, values) => {
      
      switch (this.attributes.type) {
        case GetAttrNode.PROPERTY_CALL:
          let obj = this.nodes.node.evaluate(functions, values),
              property = this.nodes.attribute.attributes.value;

          if (typeof obj !== "object") {
            throw new Error(`Unable to get property "${property}" on a non-object: ` + typeof obj);
          }

          return obj[property];

        case GetAttrNode.METHOD_CALL:
          let obj2 = await this.nodes.node.evaluate(functions, values),
              method = this.nodes.attribute.attributes.value;


          if (typeof obj2 !== 'object') {
            throw new Error(`Unable to call method "${method}" on a non-object: ` + typeof obj2);
          }

          if (obj2[method] === undefined) {
            throw new Error(`Method "${method}" is undefined on object.`);
          }

          if (typeof obj2[method] != 'function') {
            throw new Error(`Method "${method}" is not a function on object.`);
          }

          let evaluatedArgs = await this.nodes.arguments.evaluate(functions, values);

          return await obj2[method].apply(null, evaluatedArgs);

        case GetAttrNode.ARRAY_CALL:
          let array = await this.nodes.node.evaluate(functions, values);

          if (!Array.isArray(array) && typeof array !== 'object') {
            throw new Error(`Unable to get an item on a non-array: ` + typeof array);
          }

          return array[await this.nodes.attribute.evaluate(functions, values)];
      }
    });

    this.name = 'GetAttrNode';
  }

  toArray() {
    switch (this.attributes.type) {
      case GetAttrNode.PROPERTY_CALL:
        return [this.nodes.node, '.', this.nodes.attribute];

      case GetAttrNode.METHOD_CALL:
        return [this.nodes.node, '.', this.nodes.attribute, '(', this.nodes.arguments, ')'];

      case GetAttrNode.ARRAY_CALL:
        return [this.nodes.node, '[', this.nodes.attribute, ']'];
    }
  }

}

exports.default = GetAttrNode;

_defineProperty(GetAttrNode, "PROPERTY_CALL", 1);

_defineProperty(GetAttrNode, "METHOD_CALL", 2);

_defineProperty(GetAttrNode, "ARRAY_CALL", 3);