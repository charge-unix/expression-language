"use strict";

var _ArrayNode = _interopRequireDefault(require("../ArrayNode"));

var _ConstantNode = _interopRequireDefault(require("../ConstantNode"));

var _Compiler = _interopRequireDefault(require("../../Compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEvaluateData() {
  return [[{
    b: 'a',
    "0": "b"
  }, getArrayNode()]];
}

function getCompileData() {
  return [['{"b": "a", "0": "b"}', getArrayNode()]];
}

function getDumpData() {
  let arrOne = createArrayNode();
  arrOne.addElement(new _ConstantNode.default("c"), new _ConstantNode.default('a"b'));
  arrOne.addElement(new _ConstantNode.default("d"), new _ConstantNode.default('a\\b'));
  let arrTwo = createArrayNode();
  arrTwo.addElement(new _ConstantNode.default('c'));
  arrTwo.addElement(new _ConstantNode.default('d'));
  return [['{"0": "b", "b": "a"}', getArrayNode()], ['{"a\\"b": "c", "a\\\\b": "d"}', arrOne], ['["c", "d"]', arrTwo]];
}

function getArrayNode() {
  let arr = createArrayNode();
  arr.addElement(new _ConstantNode.default("a"), new _ConstantNode.default("b"));
  arr.addElement(new _ConstantNode.default("b"), new _ConstantNode.default("0"));
  return arr;
}

function createArrayNode() {
  return new _ArrayNode.default();
}

test('evaluate ArrayNode', () => {
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
test('compile ArrayNode', () => {
  for (let compileParams of getCompileData()) {
    let compiler = new _Compiler.default({});
    compileParams[1].compile(compiler);
    expect(compiler.getSource()).toBe(compileParams[0]);
  }
});
test('dump ArrayNode', () => {
  for (let dumpParams of getDumpData()) {
    expect(dumpParams[1].dump()).toBe(dumpParams[0]);
  }
});