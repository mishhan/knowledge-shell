import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { click, find, render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | slot/form", function(hooks) {
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
      hasProduction: true,
      production: {
        text: "Production"
      }
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
    };

    this.set("slot", defaultSlot);
    this.set("domains", domains);
    this.set("actions", actions);

    await render(
      hbs`<Slot::Form
        @slot={{this.slot}}
        @domains={{this.domains}}
        @onSave={{fn this.actions.onSave this.slot}}
        @onCancelChanges={{fn this.actions.onCancelChanges this.slot}} />`);

    assert.equal((find("[data-test-slot-name]") as HTMLInputElement).value, defaultSlot.name, "name is shown");
    assert.equal((find("[data-test-slot-production]") as HTMLInputElement).value, defaultSlot.production.text, "production is shown");
    const saveBtn = find("[data-test-slot-save]");
    if (saveBtn) await click(saveBtn);

    const cancelChangesBtn = find("[data-test-slot-cancelchanges]");
    if (cancelChangesBtn) await click(cancelChangesBtn);
  });
});
