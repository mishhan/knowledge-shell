import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { Variable } from "knowledge-shell/models";

interface VariableListArgs {
	variables: Variable[];

	deleteVariable: () => void;
}

export default class VariableList extends Component<VariableListArgs> {
	@tracked filter = "";
}
