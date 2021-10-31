import TokenType from "./token-type";

export default class Token {
	private readonly tokenType: TokenType;
	private readonly text: string;

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

	public isTypeEquals(tokenType: TokenType): boolean {
		const isTypeEquals = this.tokenType === tokenType;
		return isTypeEquals;
	}
}
