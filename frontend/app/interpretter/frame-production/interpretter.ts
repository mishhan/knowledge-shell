import Lexer from "./lexer";
import TokenType from "./token-type";
import Token from "./token";
import FrameKeyWord from "./constants";
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
  Node
} from "./nodes/index";

import Production from "knowledge-shell/models/production";

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
    return statement.evaluateR();
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
    if (this.currentToken.TokenType != tokenType) {
      throw new Error(`Unexpected token ${this.currentToken.TokenType} in sequence. Expected token ${tokenType}`);
    }
    this.nextToken();
  }

  private statement(): Node {
    if (this.checkToken(TokenType.If)) {
      return this.ifStatement();
    }

    let leftExpression: Node = this.expression();
    if (this.checkToken(TokenType.Assign)) {
      this.nextToken();
      let rightExpression: Node = this.expression();
      return new AssignNode(leftExpression, rightExpression, this.production);
    } else {
      return leftExpression;
    }
  }

  private ifStatement(): IfNode {
    this.expectToken(TokenType.If);
    const question = this.expression();
    this.expectToken(TokenType.Then);
    const truePart = this.statement();

    let falsePart = undefined;
    if (this.checkToken(TokenType.Else)){
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
      }
    }

    return left;
  }

  private simpleExpression(): Node {
    let left = this.term();
    let tokenType = this.currentToken.TokenType;
    while(this.isAddToken(tokenType)) {
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
      let right = this.factor();
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

    let currentFrame = undefined;
    if (this.checkToken(TokenType.LeftPair)) {
      this.expectToken(TokenType.LeftPair);
      const result = this.expression();
      this.expectToken(TokenType.RightPair);
      if (!this.checkToken(TokenType.LeftBracket)) {
        return result;
      } else {
        currentFrame = new AsNode(result, new ValueNode(FrameKeyWord, this.production), this.production);
      }
    }

    if (this.checkToken(TokenType.IntConst)) {
      const result = this.currentToken.Text;
      this.nextToken();
      return new ValueNode(result, this.production);
    }

    if (this.checkToken(TokenType.StringConst)) {
      const result = this.currentToken.Text;
      this.nextToken();
      if (!this.checkToken(TokenType.LeftBracket)) {
        return new ValueNode(result, this.production);
      } else {
        currentFrame = new AsNode(new ValueNode(result, this.production), new ValueNode(FrameKeyWord, this.production), this.production);
      }
    }

    if (this.checkToken(TokenType.This)) {
      /* IMPORTANT: Since Ember Data is used and models which are interpreted aren't saved
       * we must use model.get('value') instead of model.value
       * But it would be great if this code will be independent from data layer
       */
      currentFrame = new ValueNode(this.production.slot.owner, this.production);
      this.nextToken();
    } else if (currentFrame === null) {
      return new ValueNode(null, this.production);
    }

    let currentSlot = undefined;
    let isSlot = false;
    while (this.checkToken(TokenType.LeftBracket)) {
      isSlot = true;
      if (currentSlot != undefined) {
        currentFrame = new AsNode(currentSlot, new ValueNode(FrameKeyWord, this.production), this.production);
      }
      this.nextToken();
      let slotName = this.expression();
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
    return relationTokens.indexOf(tokenType) != -1;
  }

  private isAddToken(tokenType: TokenType): boolean {
    return (
      tokenType === TokenType.Or ||
      tokenType === TokenType.Plus ||
      tokenType === TokenType.Minus
    );
  }
}
