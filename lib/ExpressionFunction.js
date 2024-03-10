"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ExpressionFunction {
  constructor(name, compiler, evaluator) {
    _defineProperty(this, "getName", () => {
      return this.name;
    });

    _defineProperty(this, "getCompiler", () => {
      return this.compiler;
    });

    _defineProperty(this, "getEvaluator", () => {
      return this.evaluator;
    });

    this.name = name;
    this.compiler = compiler;
    this.evaluator = evaluator;
  } // TODO not sure how to check if function exists in javascript
  // fromJavascript(javascriptFunctionName, expressionFunctionName = null) {}


}

exports.default = ExpressionFunction;