export default class SyntaxError extends Error {
	private readonly symbol: string;
	private readonly position: number;

	constructor(currentSymbol: string, position: number) {
		super(`Unrecognized symbol ${currentSymbol} in position ${position}`);
		this.symbol = currentSymbol;
		this.position = position;
	}

	public get Symbol(): string {
		return this.symbol;
	}

	public get Position(): number {
		return this.position;
	}
}
