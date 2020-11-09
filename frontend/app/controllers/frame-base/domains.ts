import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action, computed } from "@ember/object";
import { Domain, DomainValue, FrameBase } from "knowledge-shell/models";

export default class FrameBaseDomains extends Controller {
  @tracked search = "";

  @computed.oneWay("model")
  frameBase!: FrameBase;

  get orderedDomains(): Domain[] {
    return this.model.domains.sortBy("name");
  }

  @action
  addDomain() {
    this.store.createRecord("domain", { name: "New Domain", frameBase: this.frameBase }).save();
  }

  @action
  saveDomain(domain: Domain): void {
    domain.save();
    domain.domainValues.forEach((value: DomainValue) => {
      if (value.get("hasDirtyAttributes")) {
        value.save();
      }
    });
  }

  @action
  cancelDomainChanges(domain: Domain): void {
    domain.domainValues.forEach((value: DomainValue) => {
      value.rollbackAttributes();
    });

    domain.rollbackAttributes();
  }

  @action
  deleteDomain(domain: Domain): void {
    domain.domainValues.forEach((domainValue: DomainValue) => {
      domainValue.destroyRecord();
    });
    domain.destroyRecord();
  }

}

declare module "@ember/controller" {
  interface Registry {
    "frame-base/domains": FrameBaseDomains;
  }
}
