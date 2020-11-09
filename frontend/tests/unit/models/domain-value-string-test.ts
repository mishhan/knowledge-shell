import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";
import DomainValueString from "knowledge-shell/models/domain-value-string";

module("Unit | Model | domain value string", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    const store = this.owner.lookup("service:store");
    const model = run(() => store.createRecord("domain-value-string", {}));
    assert.ok(model);
  });

  test("it computes valueStr", function(assert) {
    const store = this.owner.lookup("service:store");
    const value: string = "red";
    const domainValueString: DomainValueString = run(() => store.createRecord("domain-value-string", {
      value: value
    }));
    assert.equal(domainValueString.valueStr, value.toString());
  });
});
