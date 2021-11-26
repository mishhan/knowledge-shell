import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { Variable } from "knowledge-shell/models";

export default class AppProductionBaseVariablesIndexController extends Controller {
	@tracked filter = "";

	get variables(): Variable[] {
		return this.model.variables;
	}

	@action
	async deleteVariable(variable: Variable): Promise<void> {
		await variable.destroyRecord();
	}
}
