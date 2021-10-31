export default class SyntaxError extends Error {
	constructor(currentSymbol: string, position: number) {
		super(`Unrecognized symbol ${currentSymbol} in position ${position}`);
	}
}
