import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { KnowledgeBase } from "knowledge-shell/models";

interface KbListArgs {
	knowledgeBases: KnowledgeBase[];
	setSortParameters: (sortBy: string, sortDirection: string) => void;
}

export default class KbList extends Component<KbListArgs> {
	@tracked filter = "";

	get hasKnowledgeBases(): boolean {
		return this.args.knowledgeBases.length > 0;
	}

	@action
	setSortParameters(event: Event): void {
		const selectedCell = event.target as HTMLTableCellElement;
		const { sortBy } = selectedCell.dataset;
		if (sortBy && this.hasKnowledgeBases) {
			let { sortDirection } = selectedCell.dataset;
			const rowElement = selectedCell.parentElement as HTMLTableRowElement;
			[...rowElement.children].forEach((cellElement: HTMLTableCellElement) => {
				cellElement.dataset.sortDirection = "";
			});

			// eslint-disable-next-line no-nested-ternary
			sortDirection = sortDirection === undefined ? "asc" : sortDirection === "asc" ? "desc" : "asc";
			selectedCell.dataset.sortDirection = sortDirection;
			this.args.setSortParameters(sortBy, sortDirection);
		}
	}
}
