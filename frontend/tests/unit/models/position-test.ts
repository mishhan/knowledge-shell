import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";
import Position from "knowledge-shell/models/position";

module("Unit | Model | position", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    const store = this.owner.lookup("service:store");
    const model = run(() => store.createRecord("position", {}));
    assert.ok(model);
  });

  test("it computes coordinates", function(assert) {
    const store = this.owner.lookup("service:store");
    const coordinates = { x: 2, y: 3 };
    const position: Position = run(() => store.createRecord("position", {
      x: coordinates.x,
      y: coordinates.y
    }));
    assert.deepEqual(position.coordinates, coordinates);
  });
});
