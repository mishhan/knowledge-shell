import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";
import Frame from "knowledge-shell/models/frame";
import Slot from "knowledge-shell/models/slot";

module("Unit | Model | frame", (hooks) => {
	setupTest(hooks);

	test("it exists", function (assert) {
		const store = this.owner.lookup("service:store");
		const model = run(() => store.createRecord("frame", {}));
		assert.ok(model);
	});

	test("its computed properties are okay", function (assert) {
		const store = this.owner.lookup("service:store");
		const parent: Frame = run(() => store.createRecord("frame", { name: "Parent" }));
		const child: Frame = run(() => store.createRecord("frame", { name: "Child", parent }));
		assert.equal(parent.hasChildren, true, "hasChildren is okay");
		assert.equal(child.hasParent, true, "hasParent is okay");
	});

	test("its functions work", function (assert) {
		const store = this.owner.lookup("service:store");
		const slotName = "name";
		const parent: Frame = run(() => store.createRecord("frame", { name: "Parent" }));
		const child: Frame = run(() => store.createRecord("frame", { name: "Child", parent }));
		const grandChild: Frame = run(() => store.createRecord("frame", { name: "Grand Child", parent: child }));
		const slot: Slot = run(() => store.createRecord("slot", { name: slotName, owner: child }));
		assert.equal(parent.isParentOf(child), true, "isParentOf() is okay");
		assert.equal(parent.isParentOf(grandChild), true, "isParentOf() is okay");

		assert.equal(child.pathLengthTo(parent), 0, "pathLengthTo() is okay");
		assert.equal(grandChild.pathLengthTo(parent), 1, "pathLengthTo() is okay");

		assert.equal(child.getSlot(slotName), slot, "getSlot() is okay");
		assert.equal(
			parent.getSlot(slotName),
			undefined,
			"getSlot() returns undefined if there's not slot with given name",
		);
	});
});
