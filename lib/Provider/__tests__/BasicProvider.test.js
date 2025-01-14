"use strict";

var _ExpressionLanguage = _interopRequireDefault(require("../../ExpressionLanguage"));

var _BasicProvider = _interopRequireDefault(require("../BasicProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('isset evaluate', () => {
  let el = new _ExpressionLanguage.default(null, [new _BasicProvider.default()]);
  let result = el.evaluate("isset(\"foo['bar']\")", {
    foo: {
      bar: 'yep'
    }
  });
  expect(result).toBe(true);
  let result2 = el.evaluate('isset(\'foo["bar"]\')', {
    foo: {
      bar: 'yep'
    }
  });
  expect(result2).toBe(true);
});
test('isset short circuit', () => {
  let el = new _ExpressionLanguage.default(null, [new _BasicProvider.default()]);
  let result = el.evaluate("isset(\"foo['bar']\") or foo['baz'] == 'yep'", {
    foo: {
      bar: 'yep'
    }
  });
  expect(result).toBe(true);
  let result2 = el.evaluate("isset(\"foo['bar']\") and foo['bar'] == 'yep'", {
    foo: {
      baz: 'yep'
    }
  });
  expect(result2).toBe(false);
});
test('isset deep resolution', () => {
  let el = new _ExpressionLanguage.default(null, [new _BasicProvider.default()]);
  let result = el.evaluate("isset(\"foo['bar']['buzz']\") and foo['bar']['buzz'] == 'yep'", {
    foo: {
      bar: {
        buzz: 'yep'
      }
    }
  });
  expect(result).toBe(true);
  let result2 = el.evaluate("isset(\"foo['bar']['buzz']\") and foo['bar']['buzz'] == 'yeppers'", {
    foo: {
      bar: {
        buzz: 'yep'
      }
    }
  });
  expect(result2).toBe(false);
});
test('isset array resolution', () => {
  let el = new _ExpressionLanguage.default(null, [new _BasicProvider.default()]);
  let result = el.evaluate("isset(\"foo[0]['buzz']\") and foo[0]['buzz'] == 'yep'", {
    foo: [{
      buzz: 'yep'
    }]
  });
  expect(result).toBe(true);
});
test('isset with dot notation', () => {
  let el = new _ExpressionLanguage.default(null, [new _BasicProvider.default()]);
  let result = el.evaluate("isset(\"foo.bar\") and foo.bar == 'yep'", {
    foo: {
      bar: 'yep'
    }
  });
  expect(result).toBe(true);
  let result2 = el.evaluate("isset(\"foo.bar.buzz\") and foo.bar.buzz == 'yep'", {
    foo: {
      bar: {
        buzz: 'yep'
      }
    }
  });
  expect(result2).toBe(true);
});
test('isset with ! operator', () => {
  let el = new _ExpressionLanguage.default(null, [new _BasicProvider.default()]);
  let result = el.evaluate("!isset(\"foo.baz\") and foo.bar == 'yep'", {
    foo: {
      bar: 'yep'
    }
  });
  expect(result).toBe(true);
});
test('isset with not operator', () => {
  let el = new _ExpressionLanguage.default(null, [new _BasicProvider.default()]);
  let result = el.evaluate("not isset(\"foo.baz\") and foo.bar == 'yep'", {
    foo: {
      bar: 'yep'
    }
  });
  expect(result).toBe(true);
});