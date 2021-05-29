import Component from "@glimmer/component";

interface ProviderFilterArgs {
	model: any;
	field: string;
	query: string;
}

export default class ProviderFilter extends Component<ProviderFilterArgs> {
	get results() {
		const { model, field, query } = this.args;
		let filteredModel = model;
		if (query) {
			filteredModel = model.filter((modelItem: any) =>
				modelItem.get(field).toLowerCase().includes(query.toLowerCase()),
			);
		}
		return filteredModel;
	}
}
