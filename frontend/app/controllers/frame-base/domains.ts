import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action, computed } from "@ember/object";
import { Domain, DomainValue, FrameBase } from "knowledge-shell/models";

export default class FrameBaseDomains extends Controller {
  @tracked search = "";

  @computed.oneWay("model") 
  frameBase!: FrameBase;

  @computed("model.domains.[]")
  get orderedDomains(): Domain[] {
    const frameDomain = this.frameBase.frameDomain;
    const domains = this.frameBase.domains.filter((domain: Domain) => !domain.isReadOnly);
    const sortedDomains = domains.sortBy("name");
    return [frameDomain].concat(sortedDomains);
  };

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
    this.frameBase.domains.removeObject(domain);
    domain.destroyRecord();
  }

}

declare module "@ember/controller" {
  interface Registry {
    "frame-base/domains": FrameBaseDomains;
  }
}
