"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.issetFn = exports.default = void 0;

var _ExpressionFunction = _interopRequireDefault(require("../ExpressionFunction"));

var _AbstractProvider = _interopRequireDefault(require("./AbstractProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ArrayProvider extends _AbstractProvider.default {
  getFunctions() {
    return [issetFn];
  }

}

exports.default = ArrayProvider;
const issetFn = new _ExpressionFunction.default('isset', function compiler(variable) {
  return `isset(${variable})`;
}, function evaluator(values, variable) {
  let baseName = "",
      parts = [],
      gathering = "",
      gathered = "";

  for (let i = 0; i < variable.length; i++) {
    let char = variable[i];

    if (char === "]") {
      gathering = "";
      parts.push({
        type: 'array',
        index: gathered.replace(/"/g, "").replace(/'/g, "")
      });
      gathered = "";
      continue;
    }

    if (char === "[") {
      gathering = "array";
      gathered = "";
      continue;
    }

    if (gathering === "object" && (!/[A-z0-9_]/.test(char) || i === variable.length - 1)) {
      let lastChar = false;

      if (i === variable.length - 1) {
        gathered += char;
        lastChar = true;
      }

      gathering = "";
      parts.push({
        type: 'object',
        attribute: gathered
      });
      gathered = "";

      if (lastChar) {
        continue;
      }
    }

    if (char === ".") {
      gathering = "object";
      gathered = "";
      continue;
    }

    if (gathering) {
      gathered += char;
    } else {
      baseName += char;
    }
  }

  if (parts.length > 0) {
    //console.log("Parts: ", parts);
    if (values[baseName] !== undefined) {
      let baseVar = values[baseName];

      for (let part of parts) {
        if (part.type === "array") {
          if (baseVar[part.index] === undefined) {
            return false;
          }

          baseVar = baseVar[part.index];
        }

        if (part.type === "object") {
          if (baseVar[part.attribute] === undefined) {
            return false;
          }

          baseVar = baseVar[part.attribute];
        }
      }

      return true;
    }

    return false;
  } else {
    return values[baseName] !== undefined;
  }
});
exports.issetFn = issetFn;