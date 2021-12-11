import { Token, TokenType } from "..";

export default class InterpretationError extends Error {
	constructor(currentToken: Token, expectedTokenType: TokenType) {
		super(
			`Unexpected token ${TokenType[expectedTokenType]} after ${currentToken.Text} (${
				TokenType[currentToken.TokenType]
			})`,
		);
	}
}
