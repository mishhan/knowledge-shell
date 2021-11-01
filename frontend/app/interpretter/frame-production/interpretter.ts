import { Production } from "knowledge-shell/models";
import { Interpretter, TokenType, InterpretationError } from "../common";
import FrameKeyWord from "./constants";
import {
	EqualNode,
	LessEqualNode,
	LessNode,
	MoreEqualNode,
	MoreNode,
	NotEqualNode,
	NotNode,
	ValueNode,
	Node,
} from "../common/nodes";
import { IsNode, AsNode, FrameGetSlotNode, FrameValueNode } from "./nodes";

export default class FrameProductionInterpretter extends Interpretter {
	private production!: Production;

	public evaluate(context: Production): any {
		this.production = context;
		return super.evaluate(context);
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

	protected factor(): Node {
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
}
