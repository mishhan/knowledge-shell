import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";

module("Unit | Model | domain", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    const store = this.owner.lookup("service:store");
    const model = run(() => store.createRecord("domain", {}));
    assert.ok(model);
  });
});
