"use strict";

var _ExpressionLanguage = _interopRequireDefault(require("../../ExpressionLanguage"));

var _DateProvider = _interopRequireDefault(require("../DateProvider"));

var _date = _interopRequireDefault(require("locutus/php/datetime/date"));

var _strtotime = _interopRequireDefault(require("locutus/php/datetime/strtotime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('date evaluate', () => {
  let el = new _ExpressionLanguage.default(null, [new _DateProvider.default()]);
  let result = el.evaluate('date("Y-m-d")');
  expect(result).toBe((0, _date.default)("Y-m-d"));
});
test('strtotime evaluate', () => {
  let el = new _ExpressionLanguage.default(null, [new _DateProvider.default()]);
  let result = el.evaluate('strtotime("yesterday")');
  expect(result).toBe((0, _strtotime.default)("yesterday"));
});