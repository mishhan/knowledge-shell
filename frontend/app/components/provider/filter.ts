import Component from "@glimmer/component";

interface ProviderFilterArgs {
  model: any,
  field: string,
  query: string
}

export default class ProviderFilter extends Component<ProviderFilterArgs> {
  get results() {
    let { model, field, query } = this.args;
    if (query) {
      model = model.filter((model: any) =>
        model.get(field).toLowerCase().includes(query.toLowerCase())
      );
    }
    return model;
  }
}

