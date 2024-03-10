"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractProvider = _interopRequireDefault(require("./AbstractProvider"));

var _ExpressionFunction = _interopRequireDefault(require("../ExpressionFunction"));

var _date = _interopRequireDefault(require("locutus/php/datetime/date"));

var _strtotime = _interopRequireDefault(require("locutus/php/datetime/strtotime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DateProvider extends _AbstractProvider.default {
  getFunctions() {
    return [new _ExpressionFunction.default('date', function (format, timestamp) {
      let remaining = "";

      if (timestamp) {
        remaining = `, ${timestamp}`;
      }

      return `date(${format}${remaining})`;
    }, function (values, format, timestamp) {
      return (0, _date.default)(format, timestamp);
    }), new _ExpressionFunction.default('strtotime', function (str, now) {
      let remaining = "";

      if (now) {
        remaining = `, ${now}`;
      }

      return `strtotime(${str}${remaining})`;
    }, function (values, str, now) {
      return (0, _strtotime.default)(str, now);
    })];
  }

}

exports.default = DateProvider;