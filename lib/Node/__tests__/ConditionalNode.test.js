"use strict";

var _ConditionalNode = _interopRequireDefault(require("../ConditionalNode"));

var _ConstantNode = _interopRequireDefault(require("../ConstantNode"));

var _Compiler = _interopRequireDefault(require("../../Compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEvaluateData() {
  return [[1, new _ConditionalNode.default(new _ConstantNode.default(true), new _ConstantNode.default(1), new _ConstantNode.default(2))], [2, new _ConditionalNode.default(new _ConstantNode.default(false), new _ConstantNode.default(1), new _ConstantNode.default(2))]];
}

function getCompileData() {
  return [['((true) ? (1) : (2))', new _ConditionalNode.default(new _ConstantNode.default(true), new _ConstantNode.default(1), new _ConstantNode.default(2))], ['((false) ? (1) : (2))', new _ConditionalNode.default(new _ConstantNode.default(false), new _ConstantNode.default(1), new _ConstantNode.default(2))]];
}

function getDumpData() {
  return [['(true ? 1 : 2)', new _ConditionalNode.default(new _ConstantNode.default(true), new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(false ? 1 : 2)', new _ConditionalNode.default(new _ConstantNode.default(false), new _ConstantNode.default(1), new _ConstantNode.default(2))]];
}

test('evaluate ConditionalNode', () => {
  for (let evaluateParams of getEvaluateData()) {
    //console.log("Evaluating: ", evaluateParams);
    let evaluated = evaluateParams[1].evaluate({}, {}); //console.log("Evaluated: ", evaluated);

    if (evaluateParams[0] !== null && typeof evaluateParams[0] === "object") {
      expect(evaluated).toMatchObject(evaluateParams[0]);
    } else {
      expect(evaluated).toBe(evaluateParams[0]);
    }
  }
});
test('compile ConditionalNode', () => {
  for (let compileParams of getCompileData()) {
    let compiler = new _Compiler.default({});
    compileParams[1].compile(compiler);
    expect(compiler.getSource()).toBe(compileParams[0]);
  }
});
test('dump ConditionalNode', () => {
  for (let dumpParams of getDumpData()) {
    expect(dumpParams[1].dump()).toBe(dumpParams[0]);
  }
});