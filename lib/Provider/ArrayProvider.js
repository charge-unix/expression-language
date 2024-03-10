"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayIntersectFn = exports.countFn = exports.implodeFn = exports.default = void 0;

var _ExpressionFunction = _interopRequireDefault(require("../ExpressionFunction"));

var _AbstractProvider = _interopRequireDefault(require("./AbstractProvider"));

var _array_intersect = _interopRequireDefault(require("locutus/php/array/array_intersect"));

var _count = _interopRequireDefault(require("locutus/php/array/count"));

var _implode = _interopRequireDefault(require("locutus/php/strings/implode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ArrayProvider extends _AbstractProvider.default {
  getFunctions() {
    return [implodeFn, countFn, arrayIntersectFn];
  }

}

exports.default = ArrayProvider;
const implodeFn = new _ExpressionFunction.default('implode', function compiler(glue, pieces) {
  //console.log("compile implode: ", pieces, glue, typeof pieces);
  return `implode(${glue}, ${pieces})`;
}, function evaluator(values, glue, pieces) {
  return (0, _implode.default)(glue, pieces);
});
exports.implodeFn = implodeFn;
const countFn = new _ExpressionFunction.default('count', function compiler(mixedVar, mode) {
  let remaining = '';

  if (mode) {
    remaining = `, ${mode}`;
  }

  return `count(${mixedVar}${remaining})`;
}, function evaluator(values, mixedVar, mode) {
  return (0, _count.default)(mixedVar, mode);
});
exports.countFn = countFn;
const arrayIntersectFn = new _ExpressionFunction.default('array_intersect', function compiler(arr1, ...rest) {
  let remaining = '';

  if (rest.length > 0) {
    remaining = ", " + rest.join(", ");
  }

  return `array_intersect(${arr1}${remaining})`;
}, function evaluator(values) {
  let newArgs = [],
      allArrays = true;

  for (let i = 1; i < arguments.length; i++) {
    newArgs.push(arguments[i]);

    if (!Array.isArray(arguments[i])) {
      allArrays = false;
    }
  }

  let res = _array_intersect.default.apply(null, newArgs);

  if (allArrays) {
    return Object.values(res);
  }

  return res;
});
exports.arrayIntersectFn = arrayIntersectFn;