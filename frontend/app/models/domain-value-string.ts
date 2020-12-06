import { attr } from "@ember-data/model";
import { computed } from "@ember/object";
import { DomainValue } from ".";

export default class DomainValueString extends DomainValue {
  @attr("string") value!: string;

  @computed.oneWay("value")
  valueStr!: string;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "domain-value-string": DomainValueString;
  }
}
