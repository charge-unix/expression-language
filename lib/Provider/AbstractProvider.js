"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AbstractProvider {
  getFunctions() {
    throw new Error("getFunctions must be implemented by " + this.name);
  }

}

exports.default = AbstractProvider;