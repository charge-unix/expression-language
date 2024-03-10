"use strict";

var _ConstantNode = _interopRequireDefault(require("../ConstantNode"));

var _UnaryNode = _interopRequireDefault(require("../UnaryNode"));

var _Compiler = _interopRequireDefault(require("../../Compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEvaluateData() {
  return [[-1, new _UnaryNode.default('-', new _ConstantNode.default(1))], [3, new _UnaryNode.default('+', new _ConstantNode.default(3))], [false, new _UnaryNode.default('!', new _ConstantNode.default(true))], [false, new _UnaryNode.default('not', new _ConstantNode.default(true))]];
}

function getCompileData() {
  return [['(-1)', new _UnaryNode.default('-', new _ConstantNode.default(1))], ['(+3)', new _UnaryNode.default('+', new _ConstantNode.default(3))], ['(!true)', new _UnaryNode.default('!', new _ConstantNode.default(true))], ['(!true)', new _UnaryNode.default('not', new _ConstantNode.default(true))]];
}

function getDumpData() {
  return [['(- 1)', new _UnaryNode.default('-', new _ConstantNode.default(1))], ['(+ 3)', new _UnaryNode.default('+', new _ConstantNode.default(3))], ['(! true)', new _UnaryNode.default('!', new _ConstantNode.default(true))], ['(not true)', new _UnaryNode.default('not', new _ConstantNode.default(true))]];
}

test('evaluate UnaryNode', () => {
  for (let evaluateParams of getEvaluateData()) {
    //console.log("Evaluating: ", evaluateParams);
    let evaluated = evaluateParams[1].evaluate(evaluateParams[3] || {}, evaluateParams[2]); //console.log("Evaluated: ", evaluated);

    if (evaluateParams[0] !== null && typeof evaluateParams[0] === "object") {
      expect(evaluated).toMatchObject(evaluateParams[0]);
    } else {
      expect(evaluated).toBe(evaluateParams[0]);
    }
  }
});
test('compile UnaryNode', () => {
  for (let compileParams of getCompileData()) {
    let compiler = new _Compiler.default({});
    compileParams[1].compile(compiler);
    expect(compiler.getSource()).toBe(compileParams[0]);
  }
});
test('dump UnaryNode', () => {
  for (let dumpParams of getDumpData()) {
    expect(dumpParams[1].dump()).toBe(dumpParams[0]);
  }
});