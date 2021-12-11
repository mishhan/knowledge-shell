import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { Frame, Slot } from "knowledge-shell/models";

interface SlotListArgs {
	frame: Frame;
	slots: Slot[];
	addSlot: () => void;
	selectSlot: (slot: Slot) => void;
	deleteSlot: (slot: Slot) => void;
	reorderSlots: (reorderedSlot: Slot[]) => void;
}

export default class SlotList extends Component<SlotListArgs> {
	@tracked filter = "";

	get canReorderSlots(): boolean {
		const selectedFrameHasParent = this.args.frame.hasParent;
		const emptyFilter = this.filter === "";
		const canReorderSlots = !selectedFrameHasParent && emptyFilter;
		return canReorderSlots;
	}
}
