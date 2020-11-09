import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | knowledge-bases", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    let route = this.owner.lookup("route:knowledge-bases");
    assert.ok(route);
  });
});
