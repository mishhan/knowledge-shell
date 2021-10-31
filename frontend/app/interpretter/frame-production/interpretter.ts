import { Production } from "knowledge-shell/models";
import { Lexer, Token, TokenType, InterpretationError, EvaluationError } from "../common";
import FrameKeyWord from "./constants";
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
	NotNode,
	OrNode,
	PlusNode,
	ValueNode,
	Node,
} from "../common/nodes";
import { IsNode, AsNode, FrameGetSlotNode, FrameValueNode } from "./nodes";

export default class Interpretter {
	private readonly lexer = new Lexer();
	private readonly relationTokens = [
		TokenType.More,
		TokenType.Less,
		TokenType.Equal,
		TokenType.NotEqual,
		TokenType.MoreEqual,
		TokenType.LessEqual,
		TokenType.Is,
		TokenType.As,
	];
	private readonly addTokens = [TokenType.Or, TokenType.Plus, TokenType.Minus];

	private currentToken!: Token;
	private production!: Production;

	public evaluate(production: Production) {
		this.production = production;
		this.lexer.Text = production.text;
		this.lexer.Position = 0;

		this.getNextToken();
		const statement = this.statement();
		try {
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

	private statement(): Node {
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

	private ifStatement(): IfNode {
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

	private expression(): Node {
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

				case TokenType.Is: {
					return new IsNode(left, right);
				}
				case TokenType.As: {
					return new AsNode(left, right, this.production);
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

	private simpleExpression(): Node {
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

	private term(): Node {
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

	private factor(): Node {
		if (this.checkToken(TokenType.Not)) {
			this.getNextToken();
			this.expectToken(TokenType.LeftPair);
			const result = this.expression();
			this.expectToken(TokenType.RightPair);

			return new NotNode(result);
		}

		let currentFrame;
		if (this.checkToken(TokenType.LeftPair)) {
			this.expectToken(TokenType.LeftPair);
			const result = this.expression();
			this.expectToken(TokenType.RightPair);
			if (!this.checkToken(TokenType.LeftBracket)) {
				return result;
			}
			currentFrame = new AsNode(result, new ValueNode(FrameKeyWord), this.production);
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
			currentFrame = new AsNode(new ValueNode(result), new ValueNode(FrameKeyWord), this.production);
		}

		if (this.checkToken(TokenType.This)) {
			currentFrame = new FrameValueNode(this.production.slot.owner);
			this.getNextToken();
		} else if (currentFrame === null) {
			return new FrameValueNode(null);
		}

		let currentSlot;
		let isSlot = false;
		while (this.checkToken(TokenType.LeftBracket)) {
			isSlot = true;
			if (currentSlot !== undefined) {
				currentFrame = new AsNode(currentSlot, new ValueNode(FrameKeyWord), this.production);
			}
			this.getNextToken();
			const slotName = this.expression();
			this.expectToken(TokenType.RightBracket);

			if (currentFrame) {
				currentSlot = new FrameGetSlotNode(currentFrame, slotName);
			}
		}

		if (!isSlot && currentFrame) {
			return currentFrame;
		}

		if (currentSlot) {
			return currentSlot;
		}

		throw new Error("Unreachable code...");
	}

	private getNextToken(): Token {
		this.currentToken = this.lexer.getNextToken();
		return this.currentToken;
	}

	private expectToken(tokenType: TokenType): void {
		const isExpectedToken = this.checkToken(tokenType);
		if (!isExpectedToken) {
			throw new Error(`Unexpected token ${this.currentToken.TokenType} in sequence. Expected token ${tokenType}`);
		}
		this.getNextToken();
	}

	private checkToken(tokenType: TokenType): boolean {
		const isSameToken = this.currentToken.isTypeEquals(tokenType);
		return isSameToken;
	}

	private isRelationToken(tokenType: TokenType): boolean {
		const isRelationToken = this.relationTokens.indexOf(tokenType) !== -1;
		return isRelationToken;
	}

	private isAddToken(tokenType: TokenType): boolean {
		const isAddToken = this.addTokens.indexOf(tokenType) !== -1;
		return isAddToken;
	}
}
