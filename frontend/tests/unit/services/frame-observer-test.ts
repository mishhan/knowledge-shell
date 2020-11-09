import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Service | frame-observer", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    let service = this.owner.lookup("service:frame-observer");
    assert.ok(service);
  });
});

