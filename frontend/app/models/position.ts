import Model, { attr } from "@ember-data/model";
import { computed } from "@ember/object";

export default class Position extends Model {
  @attr("number") x!: number;
  @attr("number") y!: number;

  @computed("x", "y")
  get coordinates(): { x: number, y: number } {
    return { x: this.x, y: this.y };
  }
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "position": Position;
  }
}
