import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { Variable } from "knowledge-shell/models";

export default class AppProductionBaseVariablesIndex extends Controller {
	@tracked filter = "";

	get variables(): Variable[] {
		return this.model.variables;
	}

	@action
	async deleteVariables(variable: Variable): Promise<void> {
		await variable.destroyRecord();
	}
}

declare module "@ember/controller" {
	interface Registry {
		"app/production-base/variables/index": AppProductionBaseVariablesIndex;
	}
}
