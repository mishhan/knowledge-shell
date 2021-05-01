import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";
import DomainValueNumber from "knowledge-shell/models/domain-value-number";

module("Unit | Model | domain value number", (hooks) => {
	setupTest(hooks);

	test("it exists", function (assert) {
		const store = this.owner.lookup("service:store");
		const model = run(() => store.createRecord("domain-value-number", {}));
		assert.ok(model);
	});

	test("it computes valueStr", function (assert) {
		const store = this.owner.lookup("service:store");
		const value: number = 13;
		const domainValueNumber: DomainValueNumber = run(() =>
			store.createRecord("domain-value-number", {
				value,
			}),
		);
		assert.equal(domainValueNumber.valueStr, value.toString());
	});
});
