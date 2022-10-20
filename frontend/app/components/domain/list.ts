import { action } from "@ember/object";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { Domain } from "knowledge-shell/models";

interface DomainListArgs {
	domains: Domain[];

	editDomain: (domain: Domain) => void;
	deleteDomain: (domain: Domain) => void;
	setSortParameters: (sortBy: string, sortDirection: string) => void;
}

export default class DomainList extends Component<DomainListArgs> {
	@tracked filter = "";

	get hasDomains(): boolean {
		return this.args.domains.length > 0;
	}

	@action
	setSortParameters(event: Event): void {
		const selectedCell = event.target as HTMLTableCellElement;
		const { sortBy } = selectedCell.dataset;
		if (sortBy && this.hasDomains) {
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
