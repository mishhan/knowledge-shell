import Component from "@glimmer/component";
import { action } from "@ember/object";
import { Slot, Domain, DomainValue } from "knowledge-shell/models";

interface SlotFormArgs {
	slot: Slot;
}

export default class SlotForm extends Component<SlotFormArgs> {
	get currentSlot(): Slot {
		return this.args.slot;
	}

	@action
	setDomain(selectedDomain: Domain): void {
		this.currentSlot.domain = selectedDomain;
	}

	@action
	setValue(selectedValue: DomainValue): void {
		this.currentSlot.value = selectedValue;
	}

	@action
	addProduction(): void {
		this.currentSlot.addProduction();
	}

	@action
	deleteProduction(): void {
		this.currentSlot.deleteProduction();
	}
}
