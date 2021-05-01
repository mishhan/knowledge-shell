import Interpretter from "knowledge-shell/interpretter/frame-production/interpretter";
import TokenType from "knowledge-shell/interpretter/frame-production/token-type";
import { module, test } from "qunit";

module("Unit | Utility | interpretter", () => {
	function getInterpretter(sequence: string): Interpretter {
		const interpretter = new Interpretter();
		interpretter.Lexer.Text = sequence;
		interpretter.Lexer.Position = 0;
		return interpretter;
	}

	test("it determines each token in sequence", (assert) => {
		const sequence = "if then else this and or not is as frame . > >= < <= = == ! != + - ( ) [ ] 'asd' '12345' 12345";
		const interpretter = getInterpretter(sequence);
		assert.equal(interpretter.nextToken().TokenType, TokenType.If, "if");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Then, "then");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Else, "else");
		assert.equal(interpretter.nextToken().TokenType, TokenType.This, "this");
		assert.equal(interpretter.nextToken().TokenType, TokenType.And, "and");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Or, "or");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Not, "not");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Is, "is");
		assert.equal(interpretter.nextToken().TokenType, TokenType.As, "as");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Frame, "frame");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Point, ".");
		assert.equal(interpretter.nextToken().TokenType, TokenType.More, ">");
		assert.equal(interpretter.nextToken().TokenType, TokenType.MoreEqual, ">=");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Less, "<");
		assert.equal(interpretter.nextToken().TokenType, TokenType.LessEqual, "<=");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Assign, "=");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Equal, "==");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Not, "!");
		assert.equal(interpretter.nextToken().TokenType, TokenType.NotEqual, "!=");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Plus, "+");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Minus, "-");
		assert.equal(interpretter.nextToken().TokenType, TokenType.LeftPair, "(");
		assert.equal(interpretter.nextToken().TokenType, TokenType.RightPair, ")");
		assert.equal(interpretter.nextToken().TokenType, TokenType.LeftBracket, "[");
		assert.equal(interpretter.nextToken().TokenType, TokenType.RightBracket, "]");
		assert.equal(interpretter.nextToken().TokenType, TokenType.StringConst, "string constant");
		assert.equal(interpretter.nextToken().TokenType, TokenType.StringConst, "string constant");
		assert.equal(interpretter.nextToken().TokenType, TokenType.IntConst, "int constant");
		assert.equal(interpretter.nextToken().TokenType, TokenType.End, "end token");
	});

	test("it is not casesensitive", (assert) => {
		const sequence = "iF thEn ELse thIs aND";
		const interpretter = getInterpretter(sequence);
		assert.equal(interpretter.nextToken().TokenType, TokenType.If, "if");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Then, "then");
		assert.equal(interpretter.nextToken().TokenType, TokenType.Else, "else");
		assert.equal(interpretter.nextToken().TokenType, TokenType.This, "this");
		assert.equal(interpretter.nextToken().TokenType, TokenType.And, "and");
		assert.equal(interpretter.nextToken().TokenType, TokenType.End, "end token");
	});

	test("it throws an error if there's unrecognized symbol in sequence", (assert) => {
		const failedSequence = "123ab";
		const interpretter = getInterpretter(failedSequence);
		interpretter.nextToken();
		assert.throws(() => interpretter.nextToken(), undefined);
	});
});
