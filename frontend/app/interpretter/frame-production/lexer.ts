import Token from "./token";
import TokenType from "./token-type";

export default class Lexer {
  private text!: string;
  private position!: number;

  constructor() {
    this.text = "";
    this.position = 0;
  }

  public nextToken(): Token {
    return this.getToken();
  }

  public set Text(value: string) {
    this.text = value;
  }

  public set Position(value: number) {
    this.position = value;
  }

  private getNextChar(): string {
    this.position += 1;
    if (this.position === this.text.length) {
      return "\0";
    }
    return this.text[this.position];
  }

  private getToken(): Token {
    if (this.position == this.text.length) {
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

    if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch == "#") {
      while (
        (ch >= "a" && ch <= "z") ||
        (ch >= "A" && ch <= "Z") ||
        ch == "#"
      ) {
        if (ch == "\0") {
          break;
        }
        token += ch;
        ch = this.getNextChar();
      }
      if (token.toLowerCase() == "if") {
        return new Token(TokenType.If, token);
      }
      if (token.toLowerCase() == "then") {
        return new Token(TokenType.Then, token);
      }
      if (token.toLowerCase() == "else") {
        return new Token(TokenType.Else, token);
      }
      if (token.toLowerCase() == "this") {
        return new Token(TokenType.This, token);
      }
      if (token.toLowerCase() == "and") {
        return new Token(TokenType.And, token);
      }
      if (token.toLowerCase() == "or") {
        return new Token(TokenType.Or, token);
      }
      if (token.toLowerCase() == "not") {
        return new Token(TokenType.Not, token);
      }
      if (token.toLowerCase() == "is") {
        return new Token(TokenType.Is, token);
      }
      if (token.toLowerCase() == "as") {
        return new Token(TokenType.As, token);
      }
      if (token.toLowerCase() == "frame") {
        return new Token(TokenType.Frame, token);
      }
    }

    //TODO: double const
    if (ch >= "0" && ch <= "9") {
      while (ch >= "0" && ch <= "9") {
        if (ch == "\0") {
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
        if (ch == "=") {
          this.getNextChar();
          return new Token(TokenType.MoreEqual, ">=");
        } else {
          return new Token(TokenType.More, ">");
        }
      }
      case "<": {
        ch = this.getNextChar();
        if (ch == "=") {
          this.getNextChar();
          return new Token(TokenType.LessEqual, "<=");
        } else {
          return new Token(TokenType.Less, "<");
        }
      }
      case "=": {
        ch = this.getNextChar();
        if (ch == "=") {
          this.getNextChar();
          return new Token(TokenType.Equal, "==");
        } else {
          return new Token(TokenType.Assign, "=");
        }
      }
      case "!": {
        ch = this.getNextChar();
        if (ch == "=") {
          this.getNextChar();
          return new Token(TokenType.NotEqual, "!=");
        } else {
          return new Token(TokenType.Not, "!");
        }
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
        while (ch != "'") {
          token += ch;
          ch = this.getNextChar();
        }
        this.getNextChar();
        return new Token(TokenType.StringConst, token);
      }
      default: {
        throw new Error(`Unrecognized symbol in position ${this.position}`);
      }
    }
  }
}
