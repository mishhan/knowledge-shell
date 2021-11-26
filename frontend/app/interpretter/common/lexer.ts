import Token from "./token";
import TokenType from "./token-type";
import SyntaxError from "./errors/syntax-error";

export default class Lexer {
	private text = "";
	private position = 0;

	public get Text(): string {
		return this.text;
	}

	public set Text(value: string) {
		this.text = value;
		this.position = 0;
	}

	public get Position(): number {
		return this.position;
	}

	public set Position(value: number) {
		this.position = value;
	}

	/**
	 * Determines where given string is correct
	 * @param {string} value string
	 * @returns {{ pass: true } | { pass: false; message: string }}
	 */
	public isTokenSequenceCorrect(value: string): { pass: true } | { pass: false; message: string } {
		this.Text = value;
		try {
			this.getTokens();
			return {
				pass: true,
			};
		} catch (error) {
			return {
				pass: false,
				message: error.message,
			};
		}
	}

	/**
	 * Determines next token in sequence
	 * @returns {Token} Next token in sequence
	 * @throws Will throw an error if there's unrecognized token in sequence
	 */
	public getNextToken(): Token {
		const nextToken = this.getToken();
		return nextToken;
	}

	/**
	 * Determinse all tokens in sequence
	 * @returns {Token[]} Token sequence
	 * @throws Will throw an error if there's unrecognized token in sequence
	 */
	public getTokens(): Token[] {
		const tokens = [];
		let currentToken = this.getToken();
		while (currentToken.TokenType !== TokenType.End) {
			tokens.push(currentToken);
			currentToken = this.getToken();
		}

		return tokens;
	}

	private getToken(): Token {
		if (this.position === this.text.length) {
			return new Token(TokenType.End, "");
		}

		let token: string = "";
		let ch = this.text[this.position];
		while (ch === " " || ch === "\n" || ch === "\r" || ch === "\t") {
			ch = this.getNextChar();
		}

		if (this.position === this.text.length) {
			return new Token(TokenType.End, "");
		}

		if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "#") {
			while ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "#") {
				if (ch === "\0") {
					break;
				}
				token += ch;
				ch = this.getNextChar();
			}
			if (token.toLowerCase() === "if") {
				return new Token(TokenType.If, token);
			}
			if (token.toLowerCase() === "then") {
				return new Token(TokenType.Then, token);
			}
			if (token.toLowerCase() === "else") {
				return new Token(TokenType.Else, token);
			}
			if (token.toLowerCase() === "this") {
				return new Token(TokenType.This, token);
			}
			if (token.toLowerCase() === "and") {
				return new Token(TokenType.And, token);
			}
			if (token.toLowerCase() === "or") {
				return new Token(TokenType.Or, token);
			}
			if (token.toLowerCase() === "not") {
				return new Token(TokenType.Not, token);
			}
			if (token.toLowerCase() === "is") {
				return new Token(TokenType.Is, token);
			}
			if (token.toLowerCase() === "as") {
				return new Token(TokenType.As, token);
			}
			if (token.toLowerCase() === "frame") {
				return new Token(TokenType.Frame, token);
			}
			// TODO can't be used for frames..
			return new Token(TokenType.Ident, token);
		}

		// TODO: double const and if there's char like 123a throws an error
		if (ch >= "0" && ch <= "9") {
			while (ch >= "0" && ch <= "9") {
				if (ch === "\0") {
					break;
				}
				token += ch;
				ch = this.getNextChar();
			}
			return new Token(TokenType.IntConst, token);
		}

		switch (ch) {
			case ".": {
				ch = this.getNextChar();
				return new Token(TokenType.Point, ".");
			}
			case ">": {
				ch = this.getNextChar();
				if (ch === "=") {
					this.getNextChar();
					return new Token(TokenType.MoreEqual, ">=");
				}
				return new Token(TokenType.More, ">");
			}
			case "<": {
				ch = this.getNextChar();
				if (ch === "=") {
					this.getNextChar();
					return new Token(TokenType.LessEqual, "<=");
				}
				return new Token(TokenType.Less, "<");
			}
			case "=": {
				ch = this.getNextChar();
				if (ch === "=") {
					this.getNextChar();
					return new Token(TokenType.Equal, "==");
				}
				return new Token(TokenType.Assign, "=");
			}
			case "!": {
				ch = this.getNextChar();
				if (ch === "=") {
					this.getNextChar();
					return new Token(TokenType.NotEqual, "!=");
				}
				return new Token(TokenType.Not, "!");
			}
			case "+": {
				this.getNextChar();
				return new Token(TokenType.Plus, "+");
			}
			case "-": {
				this.getNextChar();
				return new Token(TokenType.Minus, "-");
			}
			case "(": {
				this.getNextChar();
				return new Token(TokenType.LeftPair, "(");
			}
			case ")": {
				this.getNextChar();
				return new Token(TokenType.RightPair, ")");
			}
			case "[": {
				this.getNextChar();
				return new Token(TokenType.LeftBracket, "[");
			}
			case "]": {
				this.getNextChar();
				return new Token(TokenType.RightBracket, "]");
			}
			case "'": {
				ch = this.getNextChar();
				while (ch !== "'") {
					token += ch;
					ch = this.getNextChar();
				}
				this.getNextChar();
				return new Token(TokenType.StringConst, token);
			}
			default: {
				throw new SyntaxError(this.text[this.position], this.position);
			}
		}
	}

	private getNextChar(): string {
		this.position += 1;
		if (this.position === this.text.length) {
			return "\0";
		}

		if (this.position > this.text.length) {
			throw new SyntaxError("Reached end of the string", this.position);
		}
		return this.text[this.position];
	}
}
