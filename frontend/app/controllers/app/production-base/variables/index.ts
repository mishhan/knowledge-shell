import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { Variable } from "knowledge-shell/models";
import sort from "knowledge-shell/utils/sort";

export default class AppProductionBaseVariablesIndexController extends Controller {
	queryParams = ["sortBy", "sortDirection"];

	@tracked filter = "";
	@tracked sortBy = "";
	@tracked sortDirection = "";

	get variables(): Variable[] {
		const { variables } = this.model;
		const sortedVariables = sort<Variable>(variables.toArray(), this.sortBy, this.sortDirection);
		return sortedVariables;
	}

	@action
	async deleteVariable(variable: Variable): Promise<void> {
		await variable.destroyRecord();
	}

	@action
	setSortParameters(sortBy: string, sortDirection: string): void {
		this.sortBy = sortBy;
		this.sortDirection = sortDirection;
	}
}
