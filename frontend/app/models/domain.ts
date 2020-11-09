import Model, { attr, belongsTo, hasMany } from "@ember-data/model";
import { isEqual } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
import { computed } from "@ember/object";
import { DomainValue, DomainValueFrame, FrameBase } from ".";

export default class Domain extends Model {
  @attr("string") name!: string;
  @attr("boolean") isReadOnly!: boolean;

  @belongsTo("frame-base", { async: false })
  frameBase!: FrameBase;

  @hasMany("domain-value", { async: false, inverse: "domain", polymorphic: true })
  domainValues!: DomainValue[];

  @computed("domainValues.[]", function () {
    return this.domainValues.sortBy("order");
  })
  domainValuesOrdered!: Domain[];

  @tracked
  isEditing!: boolean;

  public getFrameDomainValue(frameName: string): DomainValueFrame | undefined {
    return this
    .domainValues
    .find((dv) => isEqual((dv as DomainValueFrame).valueStr, frameName)) as DomainValueFrame;
  }

  addValue(newValue: string): void {
    const newDomainValue = this.store.createRecord("domain-value-string", {
      value: newValue,
    });
    this.domainValues.pushObject(newDomainValue);
  }

  deleteValue(value: DomainValue) {
    this.domainValues.removeObject(value);
  }
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "domain": Domain;
  }
}
