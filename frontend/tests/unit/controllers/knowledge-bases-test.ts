import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Controller | knowledge-bases", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    let controller = this.owner.lookup("controller:knowledge-bases");
    assert.ok(controller);
  });
});
