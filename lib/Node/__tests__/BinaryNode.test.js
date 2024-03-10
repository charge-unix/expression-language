"use strict";

var _ConstantNode = _interopRequireDefault(require("../ConstantNode"));

var _ArrayNode = _interopRequireDefault(require("../ArrayNode"));

var _BinaryNode = _interopRequireDefault(require("../BinaryNode"));

var _Compiler = _interopRequireDefault(require("../../Compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEvaluateData() {
  let arr = new _ArrayNode.default();
  arr.addElement(new _ConstantNode.default('a'));
  arr.addElement(new _ConstantNode.default('b'));
  return [[true, new _BinaryNode.default('or', new _ConstantNode.default(true), new _ConstantNode.default(false))], [true, new _BinaryNode.default('||', new _ConstantNode.default(true), new _ConstantNode.default(false))], [false, new _BinaryNode.default('and', new _ConstantNode.default(true), new _ConstantNode.default(false))], [false, new _BinaryNode.default('&&', new _ConstantNode.default(true), new _ConstantNode.default(false))], [0, new _BinaryNode.default('&', new _ConstantNode.default(2), new _ConstantNode.default(4))], [6, new _BinaryNode.default('|', new _ConstantNode.default(2), new _ConstantNode.default(4))], [6, new _BinaryNode.default('^', new _ConstantNode.default(2), new _ConstantNode.default(4))], [true, new _BinaryNode.default('<', new _ConstantNode.default(1), new _ConstantNode.default(2))], [true, new _BinaryNode.default('<=', new _ConstantNode.default(1), new _ConstantNode.default(2))], [true, new _BinaryNode.default('<=', new _ConstantNode.default(1), new _ConstantNode.default(1))], [false, new _BinaryNode.default('>', new _ConstantNode.default(1), new _ConstantNode.default(2))], [false, new _BinaryNode.default('>=', new _ConstantNode.default(1), new _ConstantNode.default(2))], [true, new _BinaryNode.default('>=', new _ConstantNode.default(1), new _ConstantNode.default(1))], [true, new _BinaryNode.default('===', new _ConstantNode.default(true), new _ConstantNode.default(true))], [false, new _BinaryNode.default('!==', new _ConstantNode.default(true), new _ConstantNode.default(true))], [false, new _BinaryNode.default('==', new _ConstantNode.default(2), new _ConstantNode.default(1))], [true, new _BinaryNode.default('!=', new _ConstantNode.default(2), new _ConstantNode.default(1))], [-1, new _BinaryNode.default('-', new _ConstantNode.default(1), new _ConstantNode.default(2))], [3, new _BinaryNode.default('+', new _ConstantNode.default(1), new _ConstantNode.default(2))], [4, new _BinaryNode.default('*', new _ConstantNode.default(2), new _ConstantNode.default(2))], [1, new _BinaryNode.default('/', new _ConstantNode.default(2), new _ConstantNode.default(2))], [1, new _BinaryNode.default('%', new _ConstantNode.default(5), new _ConstantNode.default(2))], [25, new _BinaryNode.default('**', new _ConstantNode.default(5), new _ConstantNode.default(2))], ['ab', new _BinaryNode.default('~', new _ConstantNode.default('a'), new _ConstantNode.default('b'))], [true, new _BinaryNode.default('in', new _ConstantNode.default('a'), arr)], [false, new _BinaryNode.default('in', new _ConstantNode.default('c'), arr)], [true, new _BinaryNode.default('not in', new _ConstantNode.default('c'), arr)], [false, new _BinaryNode.default('not in', new _ConstantNode.default('a'), arr)], [[1, 2, 3], new _BinaryNode.default('..', new _ConstantNode.default(1), new _ConstantNode.default(3))], [true, new _BinaryNode.default('matches', new _ConstantNode.default('abc'), new _ConstantNode.default('/^[a-z]+$/'))]];
}

function getCompileData() {
  let arr = new _ArrayNode.default();
  arr.addElement(new _ConstantNode.default('a'));
  arr.addElement(new _ConstantNode.default('b'));
  return [['(true || false)', new _BinaryNode.default('or', new _ConstantNode.default(true), new _ConstantNode.default(false))], ['(true || false)', new _BinaryNode.default('||', new _ConstantNode.default(true), new _ConstantNode.default(false))], ['(true && false)', new _BinaryNode.default('and', new _ConstantNode.default(true), new _ConstantNode.default(false))], ['(true && false)', new _BinaryNode.default('&&', new _ConstantNode.default(true), new _ConstantNode.default(false))], ['(2 & 4)', new _BinaryNode.default('&', new _ConstantNode.default(2), new _ConstantNode.default(4))], ['(2 | 4)', new _BinaryNode.default('|', new _ConstantNode.default(2), new _ConstantNode.default(4))], ['(2 ^ 4)', new _BinaryNode.default('^', new _ConstantNode.default(2), new _ConstantNode.default(4))], ['(1 < 2)', new _BinaryNode.default('<', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(1 <= 2)', new _BinaryNode.default('<=', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(1 <= 1)', new _BinaryNode.default('<=', new _ConstantNode.default(1), new _ConstantNode.default(1))], ['(1 > 2)', new _BinaryNode.default('>', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(1 >= 2)', new _BinaryNode.default('>=', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(1 >= 1)', new _BinaryNode.default('>=', new _ConstantNode.default(1), new _ConstantNode.default(1))], ['(true === true)', new _BinaryNode.default('===', new _ConstantNode.default(true), new _ConstantNode.default(true))], ['(true !== true)', new _BinaryNode.default('!==', new _ConstantNode.default(true), new _ConstantNode.default(true))], ['(2 == 1)', new _BinaryNode.default('==', new _ConstantNode.default(2), new _ConstantNode.default(1))], ['(2 != 1)', new _BinaryNode.default('!=', new _ConstantNode.default(2), new _ConstantNode.default(1))], ['(1 - 2)', new _BinaryNode.default('-', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(1 + 2)', new _BinaryNode.default('+', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(2 * 2)', new _BinaryNode.default('*', new _ConstantNode.default(2), new _ConstantNode.default(2))], ['(2 / 2)', new _BinaryNode.default('/', new _ConstantNode.default(2), new _ConstantNode.default(2))], ['(5 % 2)', new _BinaryNode.default('%', new _ConstantNode.default(5), new _ConstantNode.default(2))], ['Math.pow(5, 2)', new _BinaryNode.default('**', new _ConstantNode.default(5), new _ConstantNode.default(2))], ['("a" . "b")', new _BinaryNode.default('~', new _ConstantNode.default('a'), new _ConstantNode.default('b'))], ['includes("a", ["a", "b"])', new _BinaryNode.default('in', new _ConstantNode.default('a'), arr)], ['includes("c", ["a", "b"])', new _BinaryNode.default('in', new _ConstantNode.default('c'), arr)], ['!includes("c", ["a", "b"])', new _BinaryNode.default('not in', new _ConstantNode.default('c'), arr)], ['!includes("a", ["a", "b"])', new _BinaryNode.default('not in', new _ConstantNode.default('a'), arr)], ['range(1, 3)', new _BinaryNode.default('..', new _ConstantNode.default(1), new _ConstantNode.default(3))], ['/^[a-z]+\$/i.test("abc")', new _BinaryNode.default('matches', new _ConstantNode.default('abc'), new _ConstantNode.default('/^[a-z]+$/i', true))]];
}

function getDumpData() {
  let arr = new _ArrayNode.default();
  arr.addElement(new _ConstantNode.default('a'));
  arr.addElement(new _ConstantNode.default('b'));
  return [['(true or false)', new _BinaryNode.default('or', new _ConstantNode.default(true), new _ConstantNode.default(false))], ['(true || false)', new _BinaryNode.default('||', new _ConstantNode.default(true), new _ConstantNode.default(false))], ['(true and false)', new _BinaryNode.default('and', new _ConstantNode.default(true), new _ConstantNode.default(false))], ['(true && false)', new _BinaryNode.default('&&', new _ConstantNode.default(true), new _ConstantNode.default(false))], ['(2 & 4)', new _BinaryNode.default('&', new _ConstantNode.default(2), new _ConstantNode.default(4))], ['(2 | 4)', new _BinaryNode.default('|', new _ConstantNode.default(2), new _ConstantNode.default(4))], ['(2 ^ 4)', new _BinaryNode.default('^', new _ConstantNode.default(2), new _ConstantNode.default(4))], ['(1 < 2)', new _BinaryNode.default('<', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(1 <= 2)', new _BinaryNode.default('<=', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(1 <= 1)', new _BinaryNode.default('<=', new _ConstantNode.default(1), new _ConstantNode.default(1))], ['(1 > 2)', new _BinaryNode.default('>', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(1 >= 2)', new _BinaryNode.default('>=', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(1 >= 1)', new _BinaryNode.default('>=', new _ConstantNode.default(1), new _ConstantNode.default(1))], ['(true === true)', new _BinaryNode.default('===', new _ConstantNode.default(true), new _ConstantNode.default(true))], ['(true !== true)', new _BinaryNode.default('!==', new _ConstantNode.default(true), new _ConstantNode.default(true))], ['(2 == 1)', new _BinaryNode.default('==', new _ConstantNode.default(2), new _ConstantNode.default(1))], ['(2 != 1)', new _BinaryNode.default('!=', new _ConstantNode.default(2), new _ConstantNode.default(1))], ['(1 - 2)', new _BinaryNode.default('-', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(1 + 2)', new _BinaryNode.default('+', new _ConstantNode.default(1), new _ConstantNode.default(2))], ['(2 * 2)', new _BinaryNode.default('*', new _ConstantNode.default(2), new _ConstantNode.default(2))], ['(2 / 2)', new _BinaryNode.default('/', new _ConstantNode.default(2), new _ConstantNode.default(2))], ['(5 % 2)', new _BinaryNode.default('%', new _ConstantNode.default(5), new _ConstantNode.default(2))], ['(5 ** 2)', new _BinaryNode.default('**', new _ConstantNode.default(5), new _ConstantNode.default(2))], ['("a" ~ "b")', new _BinaryNode.default('~', new _ConstantNode.default('a'), new _ConstantNode.default('b'))], ['("a" in ["a", "b"])', new _BinaryNode.default('in', new _ConstantNode.default('a'), arr)], ['("c" in ["a", "b"])', new _BinaryNode.default('in', new _ConstantNode.default('c'), arr)], ['("c" not in ["a", "b"])', new _BinaryNode.default('not in', new _ConstantNode.default('c'), arr)], ['("a" not in ["a", "b"])', new _BinaryNode.default('not in', new _ConstantNode.default('a'), arr)], ['(1 .. 3)', new _BinaryNode.default('..', new _ConstantNode.default(1), new _ConstantNode.default(3))], ['("abc" matches "/^[a-z]+/i$/")', new _BinaryNode.default('matches', new _ConstantNode.default('abc'), new _ConstantNode.default('/^[a-z]+/i$/'))]];
}

test('evaluate BinaryNode', () => {
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
test('compile BinaryNode', () => {
  for (let compileParams of getCompileData()) {
    let compiler = new _Compiler.default({});
    compileParams[1].compile(compiler);
    expect(compiler.getSource()).toBe(compileParams[0]);
  }
});
test('dump BinaryNode', () => {
  for (let dumpParams of getDumpData()) {
    expect(dumpParams[1].dump()).toBe(dumpParams[0]);
  }
});