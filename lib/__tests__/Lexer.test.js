"use strict";

var _Lexer = require("../Lexer");

var _TokenStream = require("../TokenStream");

function getTokenizeData() {
  return [[[new _TokenStream.Token(_TokenStream.Token.NAME_TYPE, 'a', 3)], '  a  '], [[new _TokenStream.Token(_TokenStream.Token.NAME_TYPE, 'a', 1)], 'a'], [[new _TokenStream.Token(_TokenStream.Token.STRING_TYPE, 'foo', 1)], '"foo"'], [[new _TokenStream.Token(_TokenStream.Token.NUMBER_TYPE, '3', 1)], '3'], [[new _TokenStream.Token(_TokenStream.Token.OPERATOR_TYPE, '+', 1)], '+'], [[new _TokenStream.Token(_TokenStream.Token.PUNCTUATION_TYPE, '.', 1)], '.'], [[new _TokenStream.Token(_TokenStream.Token.PUNCTUATION_TYPE, '(', 1), new _TokenStream.Token(_TokenStream.Token.NUMBER_TYPE, '3', 2), new _TokenStream.Token(_TokenStream.Token.OPERATOR_TYPE, '+', 4), new _TokenStream.Token(_TokenStream.Token.NUMBER_TYPE, '5', 6), new _TokenStream.Token(_TokenStream.Token.PUNCTUATION_TYPE, ')', 7), new _TokenStream.Token(_TokenStream.Token.OPERATOR_TYPE, '~', 9), new _TokenStream.Token(_TokenStream.Token.NAME_TYPE, 'foo', 11), new _TokenStream.Token(_TokenStream.Token.PUNCTUATION_TYPE, '(', 14), new _TokenStream.Token(_TokenStream.Token.STRING_TYPE, 'bar', 15), new _TokenStream.Token(_TokenStream.Token.PUNCTUATION_TYPE, ')', 20), new _TokenStream.Token(_TokenStream.Token.PUNCTUATION_TYPE, '.', 21), new _TokenStream.Token(_TokenStream.Token.NAME_TYPE, 'baz', 22), new _TokenStream.Token(_TokenStream.Token.PUNCTUATION_TYPE, '[', 25), new _TokenStream.Token(_TokenStream.Token.NUMBER_TYPE, '4', 26), new _TokenStream.Token(_TokenStream.Token.PUNCTUATION_TYPE, ']', 27)], '(3 + 5) ~ foo("bar").baz[4]'], [[new _TokenStream.Token(_TokenStream.Token.OPERATOR_TYPE, '..', 1)], '..'], [[new _TokenStream.Token(_TokenStream.Token.OPERATOR_TYPE, '!', 1)], '!'], [[new _TokenStream.Token(_TokenStream.Token.STRING_TYPE, '#foo', 1)], "'#foo'"], [[new _TokenStream.Token(_TokenStream.Token.STRING_TYPE, '#foo', 1)], '"#foo"'], [[new _TokenStream.Token(_TokenStream.Token.STRING_TYPE, 'foo["bar"]', 1)], "'foo[\"bar\"]'"]];
}

test('tokenize throws error with message', () => {
  let expression = "service(faulty.expression.example').dummyMethod()";

  try {
    (0, _Lexer.tokenize)(expression);
    expect(true).toBe(false).message("An error should have been thrown.");
  } catch (err) {
    expect(err.toString()).toContain('Unexpected character "\'"');
  }
});
test('tokenize throws error on unclosed brace', () => {
  let expression = "service(unclosed.expression.dummyMethod()";

  try {
    (0, _Lexer.tokenize)(expression);
    expect(true).toBe(false).message("An error should have been thrown.");
  } catch (err) {
    expect(err.toString()).toContain('Unclosed "("');
  }
});
test('tokenize', () => {
  let data = getTokenizeData();

  for (let tokenizeData of data) {
    let tokens = tokenizeData[0],
        expression = tokenizeData[1];
    tokens.push(new _TokenStream.Token(_TokenStream.Token.EOF_TYPE, null, expression.length + 1)); //console.log("Testing: ", expression);

    let generatedStream = (0, _Lexer.tokenize)(expression),
        expectedStream = new _TokenStream.TokenStream(expression, tokens); //console.log("Diff: " + JSON.stringify(generatedStream.diff(expectedStream)));

    expect(generatedStream.isEqualTo(expectedStream)).toBe(true);
  }
});