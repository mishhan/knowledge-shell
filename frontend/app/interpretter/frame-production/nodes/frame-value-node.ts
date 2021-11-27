import { Frame } from "knowledge-shell/models";
import { Node } from "../../common/nodes";

export default class FrameValueNode extends Node {
	protected readonly value: Frame | null;

	constructor(value: Frame | null) {
		super("FrameValueNode");
		this.value = value;
	}

	public evaluate(): Frame | null {
		return this.value;
	}
}
