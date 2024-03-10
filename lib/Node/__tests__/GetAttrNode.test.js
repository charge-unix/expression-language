"use strict";

var _GetAttrNode = _interopRequireDefault(require("../GetAttrNode"));

var _ArrayNode = _interopRequireDefault(require("../ArrayNode"));

var _ConstantNode = _interopRequireDefault(require("../ConstantNode"));

var _NameNode = _interopRequireDefault(require("../NameNode"));

var _Compiler = _interopRequireDefault(require("../../Compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getArrayNode() {
  let arr = new _ArrayNode.default();
  arr.addElement(new _ConstantNode.default('a'), new _ConstantNode.default('b'));
  arr.addElement(new _ConstantNode.default('b'));
  return arr;
}

class Obj {
  constructor() {
    _defineProperty(this, "foo", 'bar');

    _defineProperty(this, "fooFn", () => {
      return 'baz';
    });
  }

}

function getEvaluateData() {
  return [['b', new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('0'), getArrayNode(), _GetAttrNode.default.ARRAY_CALL), {
    foo: {
      b: 'a',
      '0': 'b'
    }
  }], ['a', new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('b'), getArrayNode(), _GetAttrNode.default.ARRAY_CALL), {
    foo: {
      b: 'a',
      '0': 'b'
    }
  }], ['bar', new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('foo'), getArrayNode(), _GetAttrNode.default.PROPERTY_CALL), {
    foo: new Obj()
  }], ['baz', new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('fooFn'), getArrayNode(), _GetAttrNode.default.METHOD_CALL), {
    foo: new Obj()
  }], ['a', new _GetAttrNode.default(new _NameNode.default('foo'), new _NameNode.default('index'), getArrayNode(), _GetAttrNode.default.ARRAY_CALL), {
    foo: {
      b: 'a',
      '0': 'b'
    },
    index: 'b'
  }]];
}

function getCompileData() {
  return [['foo[0]', new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default(0), getArrayNode(), _GetAttrNode.default.ARRAY_CALL)], ['foo["b"]', new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('b'), getArrayNode(), _GetAttrNode.default.ARRAY_CALL)], ['foo.foo', new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('foo'), getArrayNode(), _GetAttrNode.default.PROPERTY_CALL), {
    foo: new Obj()
  }], ['foo.fooFn({"b": "a", 0: "b"})', new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('fooFn'), getArrayNode(), _GetAttrNode.default.METHOD_CALL), {
    foo: new Obj()
  }], ['foo[index]', new _GetAttrNode.default(new _NameNode.default('foo'), new _NameNode.default('index'), getArrayNode(), _GetAttrNode.default.ARRAY_CALL)]];
}

function getDumpData() {
  return [['foo[0]', new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default(0), getArrayNode(), _GetAttrNode.default.ARRAY_CALL)], ['foo["b"]', new _GetAttrNode.default(new _NameNode.default('foo'), new _ConstantNode.default('b'), getArrayNode(), _GetAttrNode.default.ARRAY_CALL)], ['foo.foo', new _GetAttrNode.default(new _NameNode.default('foo'), new _NameNode.default('foo'), getArrayNode(), _GetAttrNode.default.PROPERTY_CALL), {
    foo: new Obj()
  }], ['foo.fooFn({"0": "b", "b": "a"})', new _GetAttrNode.default(new _NameNode.default('foo'), new _NameNode.default('fooFn'), getArrayNode(), _GetAttrNode.default.METHOD_CALL), {
    foo: new Obj()
  }], ['foo[index]', new _GetAttrNode.default(new _NameNode.default('foo'), new _NameNode.default('index'), getArrayNode(), _GetAttrNode.default.ARRAY_CALL)]];
}

test('evaluate GetAttrNode', () => {
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
test('compile GetAttrNode', () => {
  for (let compileParams of getCompileData()) {
    let compiler = new _Compiler.default({});
    compileParams[1].compile(compiler);
    expect(compiler.getSource()).toBe(compileParams[0]);
  }
});
test('dump GetAttrNode', () => {
  for (let dumpParams of getDumpData()) {
    expect(dumpParams[1].dump()).toBe(dumpParams[0]);
  }
});