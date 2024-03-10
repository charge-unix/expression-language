"use strict";

var _Lexer = require("../Lexer");

var _Parser = _interopRequireDefault(require("../Parser"));

var _ArgumentsNode = _interopRequireDefault(require("../Node/ArgumentsNode"));

var _ConstantNode = _interopRequireDefault(require("../Node/ConstantNode"));

var _NameNode = _interopRequireDefault(require("../Node/NameNode"));

var _UnaryNode = _interopRequireDefault(require("../Node/UnaryNode"));

var _BinaryNode = _interopRequireDefault(require("../Node/BinaryNode"));

var _GetAttrNode = _interopRequireDefault(require("../Node/GetAttrNode"));

var _ConditionalNode = _interopRequireDefault(require("../Node/ConditionalNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParseData() {
  let args = new _ArgumentsNode.default();
  args.addElement(new _ConstantNode.default('arg1'));
  args.addElement(new _ConstantNode.default(2));
  args.addElement(new _ConstantNode.default(true));
  return [[new _NameNode.default('a'), 'a', ['a']], [new _ConstantNode.default('a'), '"a"'], [new _ConstantNode.default(3), '3'], [new _ConstantNode.default(false), 'false'], [new _ConstantNode.default(true), 'true'], [new _ConstantNode.default(null), 'null'], [new _UnaryNode.default('-', new _ConstantNode.default(3)), '-3'], [new _BinaryNode.default('-', new _ConstantNode.default(3), new _ConstantNode.default(3)), '3 - 3'], [new _BinaryNode.default('*', new _BinaryNode.default('-', new _ConstantNode.default(3), new _ConstantNode.default(3)), new _ConstantNode.default(2)), '(3 - 3) * 2'], [new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('bar', true), new _ArgumentsNode.default(), _GetAttrNode.default.PROPERTY_CALL), 'foo.bar', ['foo']], [new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('bar', true), new _ArgumentsNode.default(), _GetAttrNode.default.METHOD_CALL), 'foo.bar()', ['foo']], [new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('not', true), new _ArgumentsNode.default(), _GetAttrNode.default.METHOD_CALL), 'foo.not()', ['foo']], [new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('bar', true), args, _GetAttrNode.default.METHOD_CALL), 'foo.bar("arg1", 2, true)', ['foo']], [new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default(3), new _ArgumentsNode.default(), _GetAttrNode.default.ARRAY_CALL), 'foo[3]', ['foo']], [new _ConditionalNode.default(new _ConstantNode.default(true), new _ConstantNode.default(true), new _ConstantNode.default(false)), 'true ? true ? false'], [new _BinaryNode.default('matches', new _ConstantNode.default('foo'), new _ConstantNode.default('/foo/')), '"foo" matches "/foo/"'], // chained calls
  [createGetAttrNode(createGetAttrNode(createGetAttrNode(createGetAttrNode(new _NameNode.default('foo'), 'bar', _GetAttrNode.default.METHOD_CALL), 'foo', _GetAttrNode.default.METHOD_CALL), 'baz', _GetAttrNode.default.PROPERTY_CALL), '3', _GetAttrNode.default.ARRAY_CALL), 'foo.bar().foo().baz[3]', ['foo']], [new _NameNode.default('foo'), 'bar', [{
    foo: 'bar'
  }]]];
}

function createGetAttrNode(node, item, type) {
  return new _GetAttrNode.default(node, new _ConstantNode.default(item, _GetAttrNode.default.ARRAY_CALL !== type), new _ArgumentsNode.default(), type);
}

function getInvalidPostfixData() {
  return [['foo."#"', ['foo']], ['foo."bar"', ['foo']], ['foo.**', ['foo']], ['foo.123', ['foo']]];
}

test("parse with invalid name", () => {
  try {
    let parser = new _Parser.default();
    parser.parse((0, _Lexer.tokenize)("foo"));
    console.log("The parser should throw an error.");
    expect(true).toBe(false); // This should fail
  } catch (err) {
    expect(err.toString()).toContain('Variable "foo" is not valid around position 1');
  }
});
test("parse with zero in names", () => {
  try {
    let parser = new _Parser.default();
    parser.parse((0, _Lexer.tokenize)("foo"), [0]);
    console.log("The parser should throw an error.");
    expect(true).toBe(false); // This should fail
  } catch (err) {
    expect(err.toString()).toContain('Variable "foo" is not valid around position 1');
  }
});
test('parse with invalid postfix data', () => {
  let invalidPostfixData = getInvalidPostfixData();

  for (let oneTest of invalidPostfixData) {
    try {
      let parser = new _Parser.default();
      parser.parse((0, _Lexer.tokenize)(oneTest[0]), oneTest[1]);
      console.log("The parser should throw an error.");
      expect(true).toBe(false); // This should fail
    } catch (err) {
      expect(err.name).toBe('SyntaxError');
    }
  }
});
test('name proposal', () => {
  try {
    let parser = new _Parser.default();
    parser.parse((0, _Lexer.tokenize)('foo > bar'), ['foo', 'baz']);
    console.log("The parser should throw an error.");
    expect(true).toBe(false); // This should fail
  } catch (err) {
    expect(err.toString()).toContain('Did you mean "baz"?');
  }
});
test('parse', () => {
  let parseData = getParseData();

  for (let parseDatum of parseData) {
    //console.log("Testing ", parseDatum[1], parseDatum[2]);
    let parser = new _Parser.default();
    let generated = parser.parse((0, _Lexer.tokenize)(parseDatum[1]), parseDatum[2]);
    expect(generated.toString()).toBe(parseDatum[0].toString());
  }
});