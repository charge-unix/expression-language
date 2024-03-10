"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;

function range(start, end) {
  let result = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}