import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { validate, version as uuidVersion } from "uuid";
import Application from "knowledge-shell/adapters/application";

module("Unit | Adapter | application", (hooks) => {
	setupTest(hooks);

	test("it exists", function (assert) {
		const adapter: Application = this.owner.lookup("adapter:application");
		assert.ok(adapter);
	});

	test("generateIdForRecord()", function (assert) {
		const adapter: Application = this.owner.lookup("adapter:application");
		const idForRecord = adapter.generateIdForRecord();
		assert.equal(validate(idForRecord), true, "generateIdForRecord() returns valid uuid");
		assert.equal(uuidVersion(idForRecord), 4, "generateIdForRecord() returns v4 uuid");
	});
});
