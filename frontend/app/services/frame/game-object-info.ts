import { Frame } from "knowledge-shell/models";

export default class GameObjectInfo {
	private readonly gameObject: Frame;
	private attachedSituations!: Frame[];
	private chosenSituation!: Frame;

	constructor(gameObject: Frame) {
		this.gameObject = gameObject;
	}

	public get object(): Frame {
		return this.gameObject;
	}

	public get objectAttachedSituations(): Frame[] {
		return this.attachedSituations;
	}

	public get objectSituation(): Frame {
		return this.chosenSituation;
	}

	public set objectAttachedSituations(attachedSituations: Frame[]) {
		this.attachedSituations = attachedSituations;
	}

	public set objectSituation(chosenSituation: Frame) {
		this.chosenSituation = chosenSituation;
	}
}
