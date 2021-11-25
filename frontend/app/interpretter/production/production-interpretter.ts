import { Rule } from "knowledge-shell/models";
import { Interpretter, Token, TokenType } from "../common";
import { NotNode, ValueNode, Node } from "../common/nodes";
import { VariableValueNode } from "./nodes";

export default class ProductionInterpretter extends Interpretter {
	private rule!: Rule;

	public extractIdentifiers(rulePart: string): string[] {
		this.setText(rulePart);
		const tokenSequence = this.lexer.getTokens();
		const tokenIdentifiers = tokenSequence.filter((token: Token) => token.TokenType === TokenType.Ident);
		const identifiers = tokenIdentifiers.map((token: Token) => token.Text);
		return identifiers;
	}

	public isSyntaxCorrect(rulePart: string): { pass: true } | { pass: false; message: string } {
		return this.lexer.isTokenSequenceCorrect(rulePart);
	}

	public isLanguageCorrect(context: Rule, rulePart: string): { pass: true } | { pass: false; message: string } {
		this.setContext(context, rulePart);
		return super.isStatementCorrect();
	}

	public evaluate(context: Rule, rulePart: string) {
		this.rule = context;
		this.setText(rulePart);
		return super.evaluate(context);
	}

	public setContext(context: Rule, rulePart: string): void {
		this.rule = context;
		this.setText(rulePart);
	}

	protected factor(): Node {
		if (this.checkToken(TokenType.Not)) {
			this.getNextToken();
			this.expectToken(TokenType.LeftPair);
			const result = this.expression();
			this.expectToken(TokenType.RightPair);

			return new NotNode(result);
		}

		if (this.checkToken(TokenType.LeftPair)) {
			this.expectToken(TokenType.LeftPair);
			const result = this.expression();
			this.expectToken(TokenType.RightPair);
			return result;
		}

		if (this.checkToken(TokenType.IntConst)) {
			const result = this.currentToken.Text;
			// eslint-disable-next-line radix
			const intResult = parseInt(result);
			this.getNextToken();
			return new ValueNode(intResult);
		}

		if (this.checkToken(TokenType.StringConst)) {
			const result = this.currentToken.Text;
			this.getNextToken();
			if (!this.checkToken(TokenType.LeftBracket)) {
				return new ValueNode(result);
			}
		}

		if (this.checkToken(TokenType.Ident)) {
			const variableName = this.currentToken.Text;
			this.getNextToken();
			return new VariableValueNode(this.rule, variableName);
		}
		throw new Error("Unreachable code...");
	}
}
