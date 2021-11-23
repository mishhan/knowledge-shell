import Lexer from "./lexer";
import Token from "./token";
import TokenType from "./token-type";
import { InterpretationError, EvaluationError } from "./errors";
import {
	AndNode,
	AssignNode,
	EqualNode,
	IfNode,
	LessEqualNode,
	LessNode,
	MinusNode,
	MoreEqualNode,
	MoreNode,
	NotEqualNode,
	OrNode,
	PlusNode,
	Node,
} from "./nodes";

export default abstract class Interpretter {
	protected readonly lexer = new Lexer();
	protected readonly relationTokens = [
		TokenType.More,
		TokenType.Less,
		TokenType.Equal,
		TokenType.NotEqual,
		TokenType.MoreEqual,
		TokenType.LessEqual,
		TokenType.Is,
		TokenType.As,
	];
	protected readonly addTokens = [TokenType.Or, TokenType.Plus, TokenType.Minus];

	protected currentToken!: Token;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public evaluate(..._args: any[]): any {
		try {
			const statement = this.buildStatement();
			const result = statement.evaluateValue();
			return result;
		} catch (error) {
			if (error instanceof EvaluationError) {
				return undefined;
			}
			if (error instanceof InterpretationError) {
				return undefined;
			}

			return undefined;
		}
	}

	public buildStatement(): Node {
		this.getNextToken();
		const statement = this.statement();
		return statement;
	}

	public setText(text: string): void {
		this.lexer.Text = text;
		this.lexer.Position = 0;
	}

	protected statement(): Node {
		if (this.checkToken(TokenType.If)) {
			return this.ifStatement();
		}

		const leftExpression = this.expression();
		if (this.checkToken(TokenType.Assign)) {
			this.getNextToken();
			const rightExpression = this.expression();
			return new AssignNode(leftExpression, rightExpression);
		}
		return leftExpression;
	}

	protected ifStatement(): IfNode {
		this.expectToken(TokenType.If);
		const question = this.expression();
		this.expectToken(TokenType.Then);
		const truePart = this.statement();

		let falsePart;
		if (this.checkToken(TokenType.Else)) {
			this.getNextToken();
			falsePart = this.statement();
		}

		return new IfNode(question, truePart, falsePart);
	}

	protected expression(): Node {
		const left = this.simpleExpression();

		const tokenType = this.currentToken.TokenType;
		const isRelationToken = this.isRelationToken(tokenType);
		if (isRelationToken) {
			this.getNextToken();
			const right = this.simpleExpression();
			switch (tokenType) {
				case TokenType.Equal: {
					return new EqualNode(left, right);
				}
				case TokenType.NotEqual: {
					return new NotEqualNode(left, right);
				}

				case TokenType.More: {
					return new MoreNode(left, right);
				}
				case TokenType.Less: {
					return new LessNode(left, right);
				}
				case TokenType.MoreEqual: {
					return new MoreEqualNode(left, right);
				}
				case TokenType.LessEqual: {
					return new LessEqualNode(left, right);
				}
				default: {
					throw new InterpretationError(this.currentToken, TokenType.Equal);
				}
			}
		}

		return left;
	}

	protected simpleExpression(): Node {
		let left = this.term();

		let tokenType = this.currentToken.TokenType;
		let isAddToken = this.isAddToken(tokenType);
		while (isAddToken) {
			this.getNextToken();
			const right = this.term();
			switch (tokenType) {
				case TokenType.Plus: {
					left = new PlusNode(left, right);
					break;
				}
				case TokenType.Minus: {
					left = new MinusNode(left, right);
					break;
				}
				case TokenType.Or: {
					left = new OrNode(left, right);
					break;
				}
				default: {
					throw new InterpretationError(this.currentToken, TokenType.Plus);
				}
			}

			tokenType = this.currentToken.TokenType;
			isAddToken = this.isAddToken(tokenType);
		}

		return left;
	}

	protected term(): Node {
		let left = this.factor();
		let tokenType = this.currentToken.TokenType;
		while (tokenType === TokenType.And) {
			this.getNextToken();
			const right = this.factor();
			left = new AndNode(left, right);
			tokenType = this.currentToken.TokenType;
		}

		return left;
	}

	protected factor(): Node {
		// only child classes
		throw new InterpretationError(this.currentToken, TokenType.IntConst);
	}

	protected getNextToken(): Token {
		this.currentToken = this.lexer.getNextToken();
		return this.currentToken;
	}

	protected expectToken(tokenType: TokenType): void {
		const isExpectedToken = this.checkToken(tokenType);
		if (!isExpectedToken) {
			throw new Error(`Unexpected token ${this.currentToken.TokenType} in sequence. Expected token ${tokenType}`);
		}
		this.getNextToken();
	}

	protected checkToken(tokenType: TokenType): boolean {
		const isSameToken = this.currentToken.isTypeEquals(tokenType);
		return isSameToken;
	}

	protected isRelationToken(tokenType: TokenType): boolean {
		const isRelationToken = this.relationTokens.indexOf(tokenType) !== -1;
		return isRelationToken;
	}

	protected isAddToken(tokenType: TokenType): boolean {
		const isAddToken = this.addTokens.indexOf(tokenType) !== -1;
		return isAddToken;
	}
}
