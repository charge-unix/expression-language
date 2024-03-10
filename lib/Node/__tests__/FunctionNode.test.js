"use strict";

var _ConstantNode = _interopRequireDefault(require("../ConstantNode"));

var _FunctionNode = _interopRequireDefault(require("../FunctionNode"));

var _Node = _interopRequireDefault(require("../Node"));

var _Compiler = _interopRequireDefault(require("../../Compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEvaluateData() {
  return [['bar', new _FunctionNode.default('foo', new _Node.default([new _ConstantNode.default('bar')])), [], {
    foo: getCallables()
  }]];
}

function getCompileData() {
  return [['foo("bar")', new _FunctionNode.default('foo', new _Node.default([new _ConstantNode.default('bar')])), {
    foo: getCallables()
  }]];
}

function getDumpData() {
  return [['foo("bar")', new _FunctionNode.default('foo', new _Node.default([new _ConstantNode.default('bar')])), {
    foo: getCallables()
  }]];
}

function getCallables() {
  return {
    'compiler': arg => {
      return `foo(${arg})`;
    },
    'evaluator': (variables, arg) => {
      return arg;
    }
  };
}

test('evaluate FunctionNode', () => {
  for (let evaluateParams of getEvaluateData()) {
    //console.log("Evaluating: ", evaluateParams);
    let evaluated = evaluateParams[1].evaluate(evaluateParams[3], evaluateParams[2]); //console.log("Evaluated: ", evaluated);

    if (evaluateParams[0] !== null && typeof evaluateParams[0] === "object") {
      expect(evaluated).toMatchObject(evaluateParams[0]);
    } else {
      expect(evaluated).toBe(evaluateParams[0]);
    }
  }
});
test('compile FunctionNode', () => {
  for (let compileParams of getCompileData()) {
    let compiler = new _Compiler.default(compileParams[2]);
    compileParams[1].compile(compiler);
    expect(compiler.getSource()).toBe(compileParams[0]);
  }
});
test('dump FunctionNode', () => {
  for (let dumpParams of getDumpData()) {
    expect(dumpParams[1].dump()).toBe(dumpParams[0]);
  }
});