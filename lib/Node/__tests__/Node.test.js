"use strict";

var _Node = _interopRequireDefault(require("../Node"));

var _ConstantNode = _interopRequireDefault(require("../ConstantNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("toString", () => {
  let node = new _Node.default([new _ConstantNode.default('foo')]);
  expect(node.toString()).toBe("Node(\n    ConstantNode(value: 'foo')\n)");
});