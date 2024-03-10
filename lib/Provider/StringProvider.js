"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ExpressionFunction = _interopRequireDefault(require("../ExpressionFunction"));

var _AbstractProvider = _interopRequireDefault(require("./AbstractProvider"));

var _explode = _interopRequireDefault(require("locutus/php/strings/explode"));

var _strlen = _interopRequireDefault(require("locutus/php/strings/strlen"));

var _strtolower = _interopRequireDefault(require("locutus/php/strings/strtolower"));

var _strtoupper = _interopRequireDefault(require("locutus/php/strings/strtoupper"));

var _substr = _interopRequireDefault(require("locutus/php/strings/substr"));

var _strstr = _interopRequireDefault(require("locutus/php/strings/strstr"));

var _stristr = _interopRequireDefault(require("locutus/php/strings/stristr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StringProvider extends _AbstractProvider.default {
  getFunctions() {
    return [new _ExpressionFunction.default('strtolower', str => {
      return 'strtolower(' + str + ')';
    }, (args, str) => {
      return (0, _strtolower.default)(str);
    }), new _ExpressionFunction.default('strtoupper', str => {
      return 'strtoupper(' + str + ')';
    }, (args, str) => {
      return (0, _strtoupper.default)(str);
    }), new _ExpressionFunction.default('explode', (delimiter, string, limit = 'null') => {
      return `explode(${delimiter}, ${string}, ${limit})`;
    }, (values, delimiter, string, limit = null) => {
      return (0, _explode.default)(delimiter, string, limit);
    }), new _ExpressionFunction.default('strlen', function compiler(str) {
      return `strlen(${str});`;
    }, function evaluator(values, str) {
      return (0, _strlen.default)(str);
    }), new _ExpressionFunction.default('strstr', function compiler(haystack, needle, before_needle) {
      let remaining = '';

      if (before_needle) {
        remaining = `, ${before_needle}`;
      }

      return `strstr(${haystack}, ${needle}${remaining});`;
    }, function evaluator(values, haystack, needle, before_needle) {
      return (0, _strstr.default)(haystack, needle, before_needle);
    }), new _ExpressionFunction.default('stristr', function compiler(haystack, needle, before_needle) {
      let remaining = '';

      if (before_needle) {
        remaining = `, ${before_needle}`;
      }

      return `stristr(${haystack}, ${needle}${remaining});`;
    }, function evaluator(values, haystack, needle, before_needle) {
      return (0, _stristr.default)(haystack, needle, before_needle);
    }), new _ExpressionFunction.default('substr', function compiler(str, start, length) {
      let remaining = '';

      if (length) {
        remaining = `, ${length}`;
      }

      return `substr(${str}, ${start}${remaining});`;
    }, function evaluator(values, str, start, length) {
      return (0, _substr.default)(str, start, length);
    })];
  }

}

exports.default = StringProvider;