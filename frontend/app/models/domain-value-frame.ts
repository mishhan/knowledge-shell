import { belongsTo } from "@ember-data/model";
import { computed } from "@ember/object";
import { DomainValue, Frame } from ".";

export default class DomainValueFrame extends DomainValue {
  @belongsTo("frame", { async: false })
  value!: Frame

  @computed.oneWay("value.name")
  valueStr!: string;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "domain-value-frame": DomainValueFrame;
  }
}
