import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { Domain, DomainValue, DomainType } from "knowledge-shell/models";

interface DomainFormArgs {
  domain: Domain;
}

export default class DomainForm extends Component<DomainFormArgs> {
  get currentDomain(): Domain {
    return this.args.domain;
  }

  get domainHasValues(): boolean {
    return this.currentDomain.length > 0;
  }

  get domainTypes(): { key: number, value: string }[] {
    return [
      { key: DomainType.String, value: DomainType[DomainType.String] },
      { key: DomainType.Number, value: DomainType[DomainType.Number] },
      { key: DomainType.Unknown, value: DomainType[DomainType.Unknown] }
    ];
  }

  get selectedDomainType(): { key: number, value: string } {
    return { key: this.currentDomain.domainType, value: DomainType[this.currentDomain.domainType] };
  }

  @tracked
  newValue!: string;

  @tracked
  minValue!: number;

  @tracked
  maxValue!: number;

  @action
  addValue(): void {
    this.currentDomain.addValue(this.newValue);
    this.newValue = "";
  }

  @action
  setDomainType(domainType: { key: number, value: string}): void {
    this.currentDomain.domainType = domainType.key;
  }

  @action
  deleteValue(domainValue: DomainValue): void {
    this.currentDomain.deleteValue(domainValue);
  }

  @action
  reorderValues(reorderedValues: DomainValue[]) {
    reorderedValues.forEach((dv, index) => (dv.order = index));
  }
}
