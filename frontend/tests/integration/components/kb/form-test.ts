import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, find, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | kb/form", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const knowledgeBase = {
      name: "name",
      description: "description",
    };

    const actions = {
      onSave(kb: any): void {
        assert.ok(true, "save action is called");
        assert.deepEqual(kb, knowledgeBase, "kb is passed in save action");
      },
      onCancelChanges(kb: any): void {
        assert.ok(true, "cancelChanges action is called");
        assert.deepEqual(kb, knowledgeBase, "kb is passed in cancelChanges action");
      },
    };

    this.set("kb", knowledgeBase);
    this.set("actions", actions);
    await render(
      hbs`<Kb::Form
        @kb={{this.kb}}
        @onSave={{fn this.actions.onSave this.kb}}
        @onCancelChanges={{fn this.actions.onCancelChanges this.kb}} />`);

    assert.equal((find("[data-test-kb-name]") as HTMLInputElement).value, knowledgeBase.name, "name is shown");
    assert.equal((find("[data-test-kb-description]") as HTMLInputElement).value, knowledgeBase.description, "description is shown");
    const saveBtn = find("[data-test-kb-save]");
    if (saveBtn) await click(saveBtn);

    const cancelChangesBtn = find("[data-test-kb-cancelchanges]");
    if (cancelChangesBtn) await click(cancelChangesBtn);
  });
});
