import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Controller | frame-base/editor", function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test("it exists", function(assert) {
    let controller = this.owner.lookup("controller:frame-base/editor");
    assert.ok(controller);
  });
});
