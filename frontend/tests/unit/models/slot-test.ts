import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";
import Slot from "knowledge-shell/models/slot";

module("Unit | Model | slot", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    const store = this.owner.lookup("service:store");
    const model = run(() => store.createRecord("slot", {}));
    assert.ok(model);
  });

  test("its computed properties are okay", function(assert) {
    const store = this.owner.lookup("service:store");
    const parent: Slot = run(() => store.createRecord("slot"));
    const child: Slot = run(() => store.createRecord("slot", {
      parent: parent,
      isInherited: true
    }));
    assert.equal(child.hasProduction, false, "hasProduction computes");
    assert.equal(child.canEditName, false, "if slot is inherited then name can not be changed");
    assert.equal(child.canEditDomain, false, "if slot is inherited then domain not can be changed");
    child.isInherited = false;
    assert.equal(parent.canEditName, true, "if slot is not inherited then name can be changed");
    assert.equal(parent.canEditDomain, true,"if slot is not inherited then domain can be changed");

  });
});
