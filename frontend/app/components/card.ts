import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

interface CardArgs {
	header: string;
}

export default class Card extends Component<CardArgs> {
	@tracked isOpen = true;

	@action
	toggleCard(): void {
		this.isOpen = !this.isOpen;
	}
}
