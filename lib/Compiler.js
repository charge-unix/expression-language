"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addcslashes = require("./lib/addcslashes");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Compiler {
  constructor(functions) {
    _defineProperty(this, "getFunction", name => {
      return this.functions[name];
    });

    _defineProperty(this, "getSource", () => {
      return this.source;
    });

    _defineProperty(this, "reset", () => {
      this.source = '';
      return this;
    });

    _defineProperty(this, "compile", node => {
      node.compile(this);
      return this;
    });

    _defineProperty(this, "subcompile", node => {
      let current = this.source;
      this.source = '';
      node.compile(this);
      let source = this.source;
      this.source = current;
      return source;
    });

    _defineProperty(this, "raw", str => {
      this.source += str;
      return this;
    });

    _defineProperty(this, "string", value => {
      this.source += '"' + (0, _addcslashes.addcslashes)(value, "\0\t\"\$\\") + '"';
      return this;
    });

    _defineProperty(this, "repr", (value, isIdentifier = false) => {
      // Integer or Float
      if (isIdentifier) {
        this.raw(value);
      } else if (Number.isInteger(value) || +value === value && (!isFinite(value) || !!(value % 1))) {
        this.raw(value);
      } else if (null === value) {
        this.raw('null');
      } else if (typeof value === 'boolean') {
        this.raw(value ? 'true' : 'false');
      } else if (typeof value === 'object') {
        this.raw('{');
        let first = true;

        for (let oneKey of Object.keys(value)) {
          if (!first) {
            this.raw(', ');
          }

          first = false;
          this.repr(oneKey);
          this.raw(':');
          this.repr(value[oneKey]);
        }

        this.raw('}');
      } else if (Array.isArray(value)) {
        this.raw('[');
        let first = true;

        for (let oneValue of value) {
          if (!first) {
            this.raw(', ');
          }

          first = false;
          this.repr(oneValue);
        }

        this.raw(']');
      } else {
        this.string(value);
      }

      return this;
    });

    this.source = '';
    this.functions = functions;
  }

}

exports.default = Compiler;