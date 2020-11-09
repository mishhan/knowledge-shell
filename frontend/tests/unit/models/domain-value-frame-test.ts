import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";
import DomainValueFrame from "knowledge-shell/models/domain-value-frame";
import Frame from "knowledge-shell/models/frame";

module("Unit | Model | domain value frame", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    const store = this.owner.lookup("service:store");
    const model = run(() => store.createRecord("domain-value-frame", {}));
    assert.ok(model);
  });

  test("it computes valueStr", function(assert) {
    const store = this.owner.lookup("service:store");
    const frameName = "simple frame name";
    const domainValueFrame: DomainValueFrame = run(() => store.createRecord("domain-value-frame", {}));
    const frame: Frame = run(() => store.createRecord("frame", { name: frameName }));
    domainValueFrame.value = frame;
    assert.equal(domainValueFrame.valueStr, frameName);
  });
});
