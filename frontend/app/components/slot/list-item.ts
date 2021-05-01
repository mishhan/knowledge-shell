import Component from "@glimmer/component";
import { action } from "@ember/object";
import { Slot } from "knowledge-shell/models";

interface SlotListItemArgs {
	slot: Slot;
	onSave: (slot: Slot) => void;
	onCancelChanges: (slot: Slot) => void;
}

export default class SlotListItem extends Component<SlotListItemArgs> {
	get currentSlot(): Slot {
		return this.args.slot;
	}

	@action
	editSlot(): void {
		this.currentSlot.isEditing = !this.currentSlot.isEditing;
	}

	@action
	onSaveSlot(): void {
		this.currentSlot.isEditing = false;
		this.args.onSave(this.currentSlot);
	}

	@action
	onCancelSlotChanges(): void {
		this.currentSlot.isEditing = false;
		this.args.onCancelChanges(this.currentSlot);
	}
}
