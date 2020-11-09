import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { isEmpty } from "@ember/utils";
import { Domain, DomainValue, DomainValueString } from "knowledge-shell/models";

interface DomainFormArgs {
  domain: Domain;
}

export default class DomainForm extends Component<DomainFormArgs> {
  get currentDomain(): Domain {
    return this.args.domain;
  }

  @tracked newValue!: string;

  get isNewValueValid(): boolean {
    return this.currentDomain
      .domainValues.filter((dv: DomainValueString) => dv.valueStr === this.newValue)
      .length === 0 && isEmpty(this.newValue);
  }

  @action
  addValue() {
    this.currentDomain.addValue(this.newValue);
    this.newValue = "";
  }

  @action
  deleteValue(value: DomainValue) {
    this.currentDomain.deleteValue(value);
  }

  @action
  reorderValues(reorderedValues: DomainValue[]) {
    reorderedValues.forEach((dv, index) => (dv.order = index));
  }
}
