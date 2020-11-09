import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | frame-base/editor", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    let route = this.owner.lookup("route:frame-base/editor");
    assert.ok(route);
  });
});
