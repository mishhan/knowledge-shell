import { attr } from "@ember-data/model";
import { computed } from "@ember/object";
import { DomainValue } from ".";

export default class DomainValueNumber extends DomainValue {
  @attr("number") value!: number;

  @computed.oneWay("value")
  valueStr!: string;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "domain-value-number": DomainValueNumber;
  }
}
