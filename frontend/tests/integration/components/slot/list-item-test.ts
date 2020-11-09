import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { click, find, render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | slot/list-item", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const defaultSlot = {
      name: "slot",
      domain: {
        name: "Frame"
      },
      value: {
        valueStr: "Value"
      },
      isInherited: false,
      hasProduction: false
    };
    const domains: any[] = [];

    const actions = {
      onSave(slot: any): void {
        assert.ok(true, "onSave action is called");
        assert.deepEqual(slot, defaultSlot, "slot is passed in onSave action");
      },
      onCancelChanges(slot: any): void {
        assert.ok(true, "onCancelChanges action is called");
        assert.deepEqual(slot, defaultSlot, "slot is passed in onCancelChanges action");
      },
      delete(slot: any): void {
        assert.ok(true, "delete action is called");
        assert.deepEqual(slot, defaultSlot, "slot is passed in delete action");
      }
    };

    this.set("slot", defaultSlot);
    this.set("domains", domains);
    this.set("actions", actions);
    await render(
      hbs`<Slot::ListItem
        @slot={{this.slot}}
        @domains={{this.domains}}
        @onSave={{this.actions.saveSlot}}
        @onCancelChanges={{this.actions.cancelSlotChanges}}
        @deleteSlot={{this.actions.delete}} />`);

    assert.equal(find("[data-test-slot-name]")?.textContent, defaultSlot.name, "name is shown");
    assert.equal(find("[data-test-slot-domain]")?.textContent, defaultSlot.domain.name, "domain name is shown");
    assert.equal(find("[data-test-slot-value]")?.textContent, defaultSlot.value.valueStr, "default value is shown");

    const viewBtn = find("[data-test-slot-edit]");
    if (viewBtn) await click(viewBtn);

    const deleteBtn = find("[data-test-slot-delete]");
    if (deleteBtn) await click(deleteBtn);
  });
});
