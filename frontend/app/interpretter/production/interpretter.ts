import { Rule } from "knowledge-shell/models";
import { Interpretter, TokenType } from "../common";
import { NotNode, ValueNode, Node } from "../common/nodes";
import { VariableValueNode } from "./nodes";

export default class ProductionInterpretter extends Interpretter {
	private rule!: Rule;

	public evaluate(rule: Rule) {
		this.rule = rule;
		super.evaluate(rule);
	}

	protected factor(): Node {
		if (this.checkToken(TokenType.Not)) {
			this.getNextToken();
			this.expectToken(TokenType.LeftPair);
			const result = this.expression();
			this.expectToken(TokenType.RightPair);

			return new NotNode(result);
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
			return new VariableValueNode(this.rule, variableName);
		}
		throw new Error("Unreachable code...");
	}
}
