"use strict";

var _NameNode = _interopRequireDefault(require("../NameNode"));

var _Compiler = _interopRequireDefault(require("../../Compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEvaluateData() {
  return [['bar', new _NameNode.default('foo'), {
    foo: 'bar'
  }]];
}

function getCompileData() {
  return [['foo', new _NameNode.default('foo')]];
}

function getDumpData() {
  return [['foo', new _NameNode.default('foo')]];
}

test('evaluate NameNode', () => {
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
test('compile NameNode', () => {
  for (let compileParams of getCompileData()) {
    let compiler = new _Compiler.default({});
    compileParams[1].compile(compiler);
    expect(compiler.getSource()).toBe(compileParams[0]);
  }
});
test('dump NameNode', () => {
  for (let dumpParams of getDumpData()) {
    expect(dumpParams[1].dump()).toBe(dumpParams[0]);
  }
});