"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isScalar = require("../lib/is-scalar");

var _addcslashes = require("../lib/addcslashes");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Node {
  constructor(nodes = {}, attributes = {}) {
    _defineProperty(this, "compile", compiler => {
      for (let node of Object.values(this.nodes)) {
        node.compile(compiler);
      }
    });

    _defineProperty(this, "evaluate", async (functions, values) => {
      let results = [];

      for (let node of Object.values(this.nodes)) {
        results.push(await node.evaluate(functions, values));
      }

      return results;
    });

    _defineProperty(this, "dump", () => {
      let dump = "";

      for (let v of this.toArray()) {
        dump += (0, _isScalar.is_scalar)(v) ? v : v.dump();
      }

      return dump;
    });

    _defineProperty(this, "dumpString", value => {
      return `"${(0, _addcslashes.addcslashes)(value, "\0\t\"\\")}"`;
    });

    _defineProperty(this, "isHash", value => {
      let expectedKey = 0;

      for (let key of Object.keys(value)) {
        key = parseInt(key);

        if (key !== expectedKey++) {
          return true;
        }
      }

      return false;
    });

    this.name = 'Node';
    this.nodes = nodes;
    this.attributes = attributes;
  }

  toString() {
    let attributes = [];

    for (let name of Object.keys(this.attributes)) {
      let oneAttribute = 'null';

      if (this.attributes[name]) {
        oneAttribute = this.attributes[name].toString();
      }

      attributes.push(`${name}: '${oneAttribute}'`);
    }

    let repr = [this.name + "(" + attributes.join(", ")];

    if (this.nodes.length > 0) {
      for (let node of Object.values(this.nodes)) {
        let lines = node.toString().split("\n");

        for (let line of lines) {
          repr.push("    " + line);
        }
      }

      repr.push(")");
    } else {
      repr[0] += ")";
    }

    return repr.join("\n");
  }

  toArray() {
    throw new Error(`Dumping a "${this.name}" instance is not supported yet.`);
  }

}

exports.default = Node;