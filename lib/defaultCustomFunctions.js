"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.int = exports.string = exports.date = exports.year = exports.dateFormat = exports.now = exports.isCurrency = exports.isNull = exports.isPhone = exports.isEmail = exports.strLen = exports.isString = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isString = s => {
  return typeof s === "string";
};

exports.isString = isString;

const strLen = s => {
  if (isString(s)) {
    return s.length;
  }

  return 0;
};

exports.strLen = strLen;

const isEmail = s => {
  if (isString(s)) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }

  return false;
};

exports.isEmail = isEmail;

const isPhone = s => {
  if (isString(s)) {
    if (s.substring(0, 2) === "+1") {
      s = s.substring(2);
    }

    return /^\d{10}$/.test(s.replace(/\D/g, ""));
  }

  return false;
};

exports.isPhone = isPhone;

const isNull = s => {
  return s === null;
};

exports.isNull = isNull;

const isCurrency = s => {
  return /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(s);
};

exports.isCurrency = isCurrency;

const now = () => {
  return (0, _moment.default)();
};

exports.now = now;

const dateFormat = (m, format) => {
  return m.format(format);
};

exports.dateFormat = dateFormat;

const year = m => {
  return dateFormat(m, "YYYY");
};

exports.year = year;

const date = m => {
  return dateFormat(m, "YYYY-MM-DD");
};

exports.date = date;

const string = s => {
  if (s.toString !== undefined) {
    return s.toString();
  }

  return "";
};

exports.string = string;

const int = s => {
  return parseInt(s);
};

exports.int = int;
let defaultCustomFunctions = {
  isString,
  strLen,
  isEmail,
  isPhone,
  isNull,
  isCurrency,
  now,
  dateFormat,
  year,
  date,
  string,
  int
};
var _default = defaultCustomFunctions;
exports.default = _default;