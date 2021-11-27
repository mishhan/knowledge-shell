import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { Domain } from "knowledge-shell/models";

interface DomainListArgs {
	domains: Domain[];

	editDomain: (domain: Domain) => void;
	deleteDomain: (domain: Domain) => void;
}

export default class DomainList extends Component<DomainListArgs> {
	@tracked filter = "";
}
