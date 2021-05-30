import TokenType from "./token-type";

export default class Token {
	private tokenType!: TokenType;

	private text!: string;

	constructor(tokenType: TokenType, text: string) {
		this.tokenType = tokenType;
		this.text = text;
	}

	public get TokenType(): TokenType {
		return this.tokenType;
	}

	public get Text(): string {
		return this.text;
	}
}
