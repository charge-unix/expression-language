"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Levenshtein = require("./lib/Levenshtein");

class SyntaxError extends Error {
  constructor(message, cursor, expression, subject, proposals) {
    super(message);
    this.name = "SyntaxError";
    this.cursor = cursor;
    this.expression = expression;
    this.subject = subject;
    this.proposals = proposals;
  }

  toString() {
    let message = `${this.name}: ${this.message} around position ${this.cursor}`;

    if (this.expression) {
      message = message + ` for expression \`${this.expression}\``;
    }

    message += ".";

    if (this.subject && this.proposals) {
      let minScore = Number.MAX_SAFE_INTEGER,
          guess = null;

      for (let proposal of this.proposals) {
        let distance = (0, _Levenshtein.getEditDistance)(this.subject, proposal);

        if (distance < minScore) {
          guess = proposal;
          minScore = distance;
        }
      }

      if (guess !== null && minScore < 3) {
        message += ` Did you mean "${guess}"?`;
      }
    }

    return message;
  }

}

exports.default = SyntaxError;