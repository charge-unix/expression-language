"use strict";

var _ArgumentsNode = _interopRequireDefault(require("../ArgumentsNode"));

var _ConstantNode = _interopRequireDefault(require("../ConstantNode"));

var _Compiler = _interopRequireDefault(require("../../Compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCompileData() {
  return [['"a", "b"', getArrayNode()]];
}

function getDumpData() {
  return [['"a", "b"', getArrayNode()]];
}

function getArrayNode() {
  let arr = createArrayNode();
  arr.addElement(new _ConstantNode.default("a"));
  arr.addElement(new _ConstantNode.default("b"));
  return arr;
}

function createArrayNode() {
  return new _ArgumentsNode.default();
}

test('compile ArgumentsNode', () => {
  for (let compileParams of getCompileData()) {
    let compiler = new _Compiler.default({});
    compileParams[1].compile(compiler);
    expect(compiler.getSource()).toBe(compileParams[0]);
  }
});
test('dump ArgumentsNode', () => {
  for (let dumpParams of getDumpData()) {
    expect(dumpParams[1].dump()).toBe(dumpParams[0]);
  }
});