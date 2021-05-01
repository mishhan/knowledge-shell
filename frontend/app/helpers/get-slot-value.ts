import { helper } from "@ember/component/helper";
import { DomainValueFrame, DomainValueString, Slot } from "knowledge-shell/models";

export function getSlotValue(params: [Slot, string]) {
	let result = "";
	const [slot, slotName] = params;
	const slotValue = slot.value;
	if (slotValue instanceof DomainValueFrame) {
		const slotValueFrame = slotValue.value;
		const frameSlot = slotValueFrame.getSlot(slotName);
		if (frameSlot?.value) {
			result = (frameSlot.value as DomainValueString).valueStr;
		}
	}
	return result;
}

export default helper(getSlotValue);
