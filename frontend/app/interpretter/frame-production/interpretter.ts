import { Production } from "knowledge-shell/models";
import Lexer from "./lexer";
import TokenType from "./token-type";
import Token from "./token";
import FrameKeyWord from "./constants";
import { UndefinedFrameSlotException, InterpretationException } from "./exceptions";
import {
	AndNode,
	AsNode,
	AssignNode,
	EqualNode,
	FrameGetSlotNode,
	IfNode,
	IsNode,
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
} from "./nodes/index";

export default class Interpretter {
	private lexer!: Lexer;

	private currentToken!: Token;

	private production!: Production;

	constructor() {
		this.lexer = new Lexer();
	}

	public evaluate(production: Production) {
		this.production = production;
		this.lexer.Text = production.text;
		this.lexer.Position = 0;

		this.nextToken();
		const statement = this.statement();
		try {
			const result = statement.evaluateR();
			return result;
		} catch (error) {
			if (error instanceof UndefinedFrameSlotException) {
				return undefined;
			}
			if (error instanceof InterpretationException) {
				return undefined;
			}

			return undefined;
		}
	}

	public get Lexer(): Lexer {
		return this.lexer;
	}

	public nextToken(): Token {
		this.currentToken = this.lexer.nextToken();
		return this.currentToken;
	}

	private checkToken(tokenType: TokenType): boolean {
		return this.currentToken.TokenType === tokenType;
	}

	private expectToken(tokenType: TokenType): void {
		if (this.currentToken.TokenType !== tokenType) {
			throw new Error(`Unexpected token ${this.currentToken.TokenType} in sequence. Expected token ${tokenType}`);
		}
		this.nextToken();
	}

	private statement(): Node {
		if (this.checkToken(TokenType.If)) {
			return this.ifStatement();
		}

		const leftExpression: Node = this.expression();
		if (this.checkToken(TokenType.Assign)) {
			this.nextToken();
			const rightExpression: Node = this.expression();
			return new AssignNode(leftExpression, rightExpression, this.production);
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
			this.nextToken();
			falsePart = this.statement();
		}

		return new IfNode(question, truePart, falsePart, this.production);
	}

	private expression(): Node {
		const left = this.simpleExpression();
		const tokenType = this.currentToken.TokenType;
		if (this.isRelationToken(tokenType)) {
			this.nextToken();
			const right = this.simpleExpression();
			switch (tokenType) {
				case TokenType.Equal: {
					return new EqualNode(left, right, this.production);
				}
				case TokenType.NotEqual: {
					return new NotEqualNode(left, right, this.production);
				}

				case TokenType.Is: {
					return new IsNode(left, right, this.production);
				}
				case TokenType.As: {
					return new AsNode(left, right, this.production);
				}

				case TokenType.More: {
					return new MoreNode(left, right, this.production);
				}
				case TokenType.Less: {
					return new LessNode(left, right, this.production);
				}
				case TokenType.MoreEqual: {
					return new MoreEqualNode(left, right, this.production);
				}
				case TokenType.LessEqual: {
					return new LessEqualNode(left, right, this.production);
				}
				default: {
					throw new InterpretationException(this.constructor.name, "{expression} unknown token type");
				}
			}
		}

		return left;
	}

	private simpleExpression(): Node {
		let left = this.term();
		let tokenType = this.currentToken.TokenType;
		while (this.isAddToken(tokenType)) {
			this.nextToken();
			const right = this.term();
			switch (tokenType) {
				case TokenType.Plus: {
					left = new PlusNode(left, right, this.production);
					break;
				}
				case TokenType.Minus: {
					left = new MinusNode(left, right, this.production);
					break;
				}
				case TokenType.Or: {
					left = new OrNode(left, right, this.production);
					break;
				}
				default: {
					throw new InterpretationException(this.constructor.name, "{simpleExpression} unknown token type");
				}
			}

			tokenType = this.currentToken.TokenType;
		}

		return left;
	}

	private term(): Node {
		let left = this.factor();
		let tokenType = this.currentToken.TokenType;
		while (tokenType === TokenType.And) {
			this.nextToken();
			const right = this.factor();
			left = new AndNode(left, right, this.production);
			tokenType = this.currentToken.TokenType;
		}

		return left;
	}

	private factor(): Node {
		if (this.checkToken(TokenType.Not)) {
			this.nextToken();
			this.expectToken(TokenType.LeftPair);
			const result = this.expression();
			this.expectToken(TokenType.RightPair);

			return new NotNode(result, this.production);
		}

		let currentFrame;
		if (this.checkToken(TokenType.LeftPair)) {
			this.expectToken(TokenType.LeftPair);
			const result = this.expression();
			this.expectToken(TokenType.RightPair);
			if (!this.checkToken(TokenType.LeftBracket)) {
				return result;
			}
			currentFrame = new AsNode(result, new ValueNode(FrameKeyWord, this.production), this.production);
		}

		if (this.checkToken(TokenType.IntConst)) {
			const result = this.currentToken.Text;
			// eslint-disable-next-line radix
			const intResult = parseInt(result);
			this.nextToken();
			return new ValueNode(intResult, this.production);
		}

		if (this.checkToken(TokenType.StringConst)) {
			const result = this.currentToken.Text;
			this.nextToken();
			if (!this.checkToken(TokenType.LeftBracket)) {
				return new ValueNode(result, this.production);
			}
			currentFrame = new AsNode(
				new ValueNode(result, this.production),
				new ValueNode(FrameKeyWord, this.production),
				this.production,
			);
		}

		if (this.checkToken(TokenType.This)) {
			currentFrame = new ValueNode(this.production.slot.owner, this.production);
			this.nextToken();
		} else if (currentFrame === null) {
			return new ValueNode(null, this.production);
		}

		let currentSlot;
		let isSlot = false;
		while (this.checkToken(TokenType.LeftBracket)) {
			isSlot = true;
			if (currentSlot !== undefined) {
				currentFrame = new AsNode(currentSlot, new ValueNode(FrameKeyWord, this.production), this.production);
			}
			this.nextToken();
			const slotName = this.expression();
			this.expectToken(TokenType.RightBracket);

			if (currentFrame) {
				currentSlot = new FrameGetSlotNode(currentFrame, slotName, this.production);
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

	private isRelationToken(tokenType: TokenType): boolean {
		const relationTokens = [
			TokenType.More,
			TokenType.Less,
			TokenType.Equal,
			TokenType.NotEqual,
			TokenType.MoreEqual,
			TokenType.LessEqual,
			TokenType.Is,
			TokenType.As,
		];
		return relationTokens.indexOf(tokenType) !== -1;
	}

	private isAddToken(tokenType: TokenType): boolean {
		return tokenType === TokenType.Or || tokenType === TokenType.Plus || tokenType === TokenType.Minus;
	}
}
