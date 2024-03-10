"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class LogicException extends Error {
  constructor(message) {
    super(message);
    this.name = "LogicException";
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }

}

exports.default = LogicException;