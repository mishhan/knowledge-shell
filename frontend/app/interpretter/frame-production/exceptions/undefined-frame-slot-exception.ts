export default class UndefinedFrameSlotException extends Error {
	public frameName!: string;

	public slotName!: string;

	constructor(frameName: string, slotName: string) {
		const errorMessage = `UndefinedFrameSlotException! [${frameName}]: ${slotName}`;
		super(errorMessage);
		this.frameName = frameName;
		this.slotName = slotName;
	}
}
