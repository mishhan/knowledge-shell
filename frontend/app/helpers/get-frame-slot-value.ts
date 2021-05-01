import { helper } from "@ember/component/helper";
import { DomainValueString, Frame } from "knowledge-shell/models";

export function getFrameSlotValue(params: [Frame, string]): string {
	const [frame, slotName] = params;
	const frameSlot = frame.getSlot(slotName);
	if (frameSlot) {
		return (frameSlot.value as DomainValueString).valueStr;
	}

	return "";
}

export default helper(getFrameSlotValue);
