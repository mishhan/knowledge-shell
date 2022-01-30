import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { Variable } from "knowledge-shell/models";

interface VariableListArgs {
	variables: Variable[];

	deleteVariable: () => void;
	setSortParameters: (sortBy: string, sortDirection: string) => void;
}

export default class VariableList extends Component<VariableListArgs> {
	@tracked filter = "";

	get hasVariables(): boolean {
		return this.args.variables.length > 0;
	}

	@action
	setSortParameters(event: Event): void {
		const selectedCell = event.target as HTMLTableCellElement;
		const { sortBy } = selectedCell.dataset;
		if (sortBy && this.hasVariables) {
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
