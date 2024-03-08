"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Lexer = require("./Lexer");

var _Parser = _interopRequireDefault(require("./Parser"));

var _Compiler = _interopRequireDefault(require("./Compiler"));

var _ParsedExpression = _interopRequireDefault(require("./ParsedExpression"));

var _ArrayAdapter = _interopRequireDefault(require("./Cache/ArrayAdapter"));

var _LogicException = _interopRequireDefault(require("./LogicException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ExpressionLanguage {
  constructor(cache = null, providers = []) {
    _defineProperty(this, "compile", (expression, names = []) => {
      return this.getCompiler().compile(this.parse(expression, names).getNodes()).getSource();
    });

    _defineProperty(this, "evaluate", async (expression, values = {}) => {
      console.log(this.parse(expression, Object.keys(values)).getNodes());
      return await this.parse(expression, Object.keys(values)).getNodes().evaluate(this.functions, values);
    });

    _defineProperty(this, "parse", (expression, names) => {
      if (expression instanceof _ParsedExpression.default) {
        return expression;
      }

      names.sort((a, b) => {
        let a_value = a,
            b_value = b;

        if (typeof a === "object") {
          a_value = Object.values(a)[0];
        }

        if (typeof b === "object") {
          b_value = Object.values(b)[0];
        }

        return a_value.localeCompare(b_value);
      });
      let cacheKeyItems = [];

      for (let name of names) {
        let value = name;

        if (typeof name === "object") {
          let tmpName = Object.keys(name)[0],
              tmpValue = Object.values(name)[0];
          value = tmpName + ":" + tmpValue;
        }

        cacheKeyItems.push(value);
      }

      let cacheItem = this.cache.getItem(this.fixedEncodeURIComponent(expression + "//" + cacheKeyItems.join("|"))),
          parsedExpression = cacheItem.get();

      if (null === parsedExpression) {
        let nodes = this.getParser().parse((0, _Lexer.tokenize)(expression), names);
        parsedExpression = new _ParsedExpression.default(expression, nodes);
        cacheItem.set(parsedExpression);
        this.cache.save(cacheItem);
      }

      return parsedExpression;
    });

    _defineProperty(this, "fixedEncodeURIComponent", str => {
      return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
      });
    });

    _defineProperty(this, "register", (name, compiler, evaluator) => {
      if (null !== this.parser) {
        throw new _LogicException.default("Registering functions after calling evaluate(), compile(), or parse() is not supported.");
      }

      this.functions[name] = {
        compiler: compiler,
        evaluator: evaluator
      };
    });

    _defineProperty(this, "addFunction", expressionFunction => {
      this.register(expressionFunction.getName(), expressionFunction.getCompiler(), expressionFunction.getEvaluator());
    });

    _defineProperty(this, "registerProvider", provider => {
      for (let fn of provider.getFunctions()) {
        this.addFunction(fn);
      }
    });

    _defineProperty(this, "getParser", () => {
      if (null === this.parser) {
        this.parser = new _Parser.default(this.functions);
      }

      return this.parser;
    });

    _defineProperty(this, "getCompiler", () => {
      if (null === this.compiler) {
        this.compiler = new _Compiler.default(this.functions);
      }

      return this.compiler.reset();
    });

    this.functions = [];
    this.parser = null;
    this.compiler = null;
    this.cache = cache || new _ArrayAdapter.default();

    for (let provider of providers) {
      this.registerProvider(provider);
    }
  }
  /**
   * Compiles an expression source code.
   *
   * @param {Expression|string} expression The expression to compile
   * @param {Array} names An array of valid names
   *
   * @returns {string} The compiled javascript source code
   */


  _registerFunctions() {// TODO figure out a way to replicate "constant" function from PHP
  }

}

exports.default = ExpressionLanguage;