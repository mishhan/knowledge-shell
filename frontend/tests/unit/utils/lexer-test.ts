import { Token, TokenType, Lexer } from "knowledge-shell/interpretter/common";
import { module, test } from "qunit";

module("Unit | Utility | lexer", () => {
	function getLexer(sequence: string): Lexer {
		const lexer = new Lexer();
		lexer.Text = sequence;
		lexer.Position = 0;
		return lexer;
	}

	test("it determines each token in sequence", (assert) => {
		const sequence = "if then else this and or not is as frame . > >= < <= = == ! != + - ( ) [ ] 'asd' '12345' 12345 A";
		const lexer = getLexer(sequence);
		assert.equal(lexer.getNextToken().TokenType, TokenType.If, "if");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Then, "then");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Else, "else");
		assert.equal(lexer.getNextToken().TokenType, TokenType.This, "this");
		assert.equal(lexer.getNextToken().TokenType, TokenType.And, "and");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Or, "or");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Not, "not");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Is, "is");
		assert.equal(lexer.getNextToken().TokenType, TokenType.As, "as");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Frame, "frame");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Point, ".");
		assert.equal(lexer.getNextToken().TokenType, TokenType.More, ">");
		assert.equal(lexer.getNextToken().TokenType, TokenType.MoreEqual, ">=");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Less, "<");
		assert.equal(lexer.getNextToken().TokenType, TokenType.LessEqual, "<=");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Assign, "=");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Equal, "==");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Not, "!");
		assert.equal(lexer.getNextToken().TokenType, TokenType.NotEqual, "!=");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Plus, "+");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Minus, "-");
		assert.equal(lexer.getNextToken().TokenType, TokenType.LeftPair, "(");
		assert.equal(lexer.getNextToken().TokenType, TokenType.RightPair, ")");
		assert.equal(lexer.getNextToken().TokenType, TokenType.LeftBracket, "[");
		assert.equal(lexer.getNextToken().TokenType, TokenType.RightBracket, "]");
		assert.equal(lexer.getNextToken().TokenType, TokenType.StringConst, "string constant");
		assert.equal(lexer.getNextToken().TokenType, TokenType.StringConst, "string constant");
		assert.equal(lexer.getNextToken().TokenType, TokenType.IntConst, "int constant");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Ident, "identifier");
		assert.equal(lexer.getNextToken().TokenType, TokenType.End, "end token");
	});

	test("it is not casesensitive", (assert) => {
		const sequence = "iF thEn ELse thIs aND";
		const lexer = getLexer(sequence);
		assert.equal(lexer.getNextToken().TokenType, TokenType.If, "if");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Then, "then");
		assert.equal(lexer.getNextToken().TokenType, TokenType.Else, "else");
		assert.equal(lexer.getNextToken().TokenType, TokenType.This, "this");
		assert.equal(lexer.getNextToken().TokenType, TokenType.And, "and");
		assert.equal(lexer.getNextToken().TokenType, TokenType.End, "end token");
	});

	test("it throws an error if there's unrecognized symbol in sequence", (assert) => {
		const failedSequence = "123ab";
		const lexer = getLexer(failedSequence);
		lexer.getNextToken();
		assert.throws(() => lexer.getNextToken(), undefined);
	});

	test("it correctly determines all identifiers", (assert) => {
		const sequence = "if A > 5 then B = 6";
		const lexer = getLexer(sequence);
		const tokenSequence = lexer.getTokens();
		const tokenIdentifiers = tokenSequence.filter((token: Token) => token.TokenType === TokenType.Ident);
		assert.equal(tokenIdentifiers.length, 2, "found all identifiers");
		assert.equal(tokenIdentifiers[0].Text, "A", "first identifier is correct");
		assert.equal(tokenIdentifiers[1].Text, "B", "second identifier is correct");
	});
});
