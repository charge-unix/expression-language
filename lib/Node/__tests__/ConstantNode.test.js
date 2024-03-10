"use strict";

var _ConstantNode = _interopRequireDefault(require("../ConstantNode"));

var _Compiler = _interopRequireDefault(require("../../Compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEvaluateData() {
  return [[false, new _ConstantNode.default(false)], [true, new _ConstantNode.default(true)], [null, new _ConstantNode.default(null)], [3, new _ConstantNode.default(3)], [3.3, new _ConstantNode.default(3.3)], ['foo', new _ConstantNode.default('foo')], [{
    one: 1,
    b: 'a'
  }, new _ConstantNode.default({
    one: 1,
    b: 'a'
  })]];
}

function getCompileData() {
  return [['false', new _ConstantNode.default(false)], ['true', new _ConstantNode.default(true)], ['null', new _ConstantNode.default(null)], ['3', new _ConstantNode.default(3)], ['3.3', new _ConstantNode.default(3.3)], ['"foo"', new _ConstantNode.default('foo')], ['{\"one\":1, \"b\":"a"}', new _ConstantNode.default({
    one: 1,
    b: 'a'
  })]];
}

function getDumpData() {
  return [['false', new _ConstantNode.default(false)], ['true', new _ConstantNode.default(true)], ['null', new _ConstantNode.default(null)], ['3', new _ConstantNode.default(3)], ['3.3', new _ConstantNode.default(3.3)], ['"foo"', new _ConstantNode.default('foo')], ['foo', new _ConstantNode.default('foo', true)], ['{"one": 1}', new _ConstantNode.default({
    one: 1
  })], ['{\"one\": 1, "c": true, \"b\": "a"}', new _ConstantNode.default({
    one: 1,
    c: true,
    b: 'a'
  })], ['["c","d"]', new _ConstantNode.default(["c", "d"])], ['{"a": ["b"]}', new _ConstantNode.default({
    a: ["b"]
  })]];
}

test('evaluate ConstantNode', () => {
  for (let evaluateParams of getEvaluateData()) {
    if (evaluateParams[0] !== null && typeof evaluateParams[0] === "object") {
      expect(evaluateParams[1].evaluate({}, {})).toMatchObject(evaluateParams[0]);
    } else {
      expect(evaluateParams[1].evaluate({}, {})).toBe(evaluateParams[0]);
    }
  }
});
test('compile ConstantNode', () => {
  for (let compileParams of getCompileData()) {
    let compiler = new _Compiler.default({});
    compileParams[1].compile(compiler);
    expect(compiler.getSource()).toBe(compileParams[0]);
  }
});
test('dump ConstantNode', () => {
  for (let dumpParams of getDumpData()) {
    expect(dumpParams[1].dump()).toBe(dumpParams[0]);
  }
});