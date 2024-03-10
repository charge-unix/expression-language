"use strict";

var _ExpressionLanguage = _interopRequireDefault(require("../../ExpressionLanguage"));

var _StringProvider = _interopRequireDefault(require("../StringProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('strtolower evaluate', () => {
  let el = new _ExpressionLanguage.default(null, [new _StringProvider.default()]);
  let result = el.evaluate('strtolower("TESTING")');
  expect(result).toBe("testing");
});
test('strtolower compile', () => {
  let el = new _ExpressionLanguage.default(null, [new _StringProvider.default()]);
  let result = el.compile('strtolower("TESTING")');
  expect(result).toBe('strtolower("TESTING")');
});
test('strtoupper evaluate', () => {
  let el = new _ExpressionLanguage.default(null, [new _StringProvider.default()]);
  let result = el.evaluate('strtoupper("testing")');
  expect(result).toBe("TESTING");
});
test('explode evaluate', () => {
  let el = new _ExpressionLanguage.default(null, [new _StringProvider.default()]);
  let result = el.evaluate('explode(" ", "check this out")');
  expect(result).toMatchObject(["check", "this", "out"]);
});
test('explode evaluate with complex string', () => {
  let el = new _ExpressionLanguage.default(null, [new _StringProvider.default()]);
  let result = el.evaluate('explode(" .*&3 ", "check .*&3 this .*&3 out")');
  expect(result).toMatchObject(["check", "this", "out"]);
  let result2 = el.evaluate('explode(" .*&3 ", "check  .*&3  this  .*&3  out")');
  expect(result2).toMatchObject(["check ", " this ", " out"]);
});
test('explode compile', () => {
  let el = new _ExpressionLanguage.default(null, [new _StringProvider.default()]);
  let result = el.compile('explode(". ", "check this out")');
  expect(result).toBe('explode(". ", "check this out", null)');
});
test('strlen evaluate', () => {
  let el = new _ExpressionLanguage.default(null, [new _StringProvider.default()]);
  let result = el.evaluate('strlen("Hats are cool")');
  expect(result).toBe(13);
});
test('substr evaluate', () => {
  let el = new _ExpressionLanguage.default(null, [new _StringProvider.default()]);
  let result = el.evaluate('substr("Hats are cool", 0, 3)');
  expect(result).toBe('Hat');
});
test('stristr evaluate', () => {
  let el = new _ExpressionLanguage.default(null, [new _StringProvider.default()]);
  let result = el.evaluate('stristr("Hats are cool", "Are")');
  expect(result).toBe('are cool');
});
test('strstr evaluate', () => {
  let el = new _ExpressionLanguage.default(null, [new _StringProvider.default()]);
  let result = el.evaluate('strstr("Hats are cool", "are")');
  expect(result).toBe('are cool');
  let result2 = el.evaluate('strstr("Hats are cool", "Are")');
  expect(result2).toBe(false);
});