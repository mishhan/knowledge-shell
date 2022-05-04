import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { Rule } from "knowledge-shell/models";

interface RuleListArgs {
	rules: Rule[];

	deleteRule: (rule: Rule) => void;
	reorderRules: (reorderedRules: Rule[]) => void;
}

export default class RuleList extends Component<RuleListArgs> {
	@tracked filter = "";

	get hasRules(): boolean {
		return this.args.rules.length > 0;
	}

	get canReorderRules(): boolean {
		return this.filter === "";
	}
}
