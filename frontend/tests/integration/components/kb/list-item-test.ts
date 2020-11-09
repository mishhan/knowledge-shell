import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { find, render, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | kb/list-item", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const knowledgeBase = {
      name: "knowledgeBase",
      description: "knowledgeBase description",
      createdAt: new Date(2020, 10, 30),
      updatedAt: new Date(2020, 11, 31),
      createdAtFormatted: "11/30/2020",
      updatedAtFormatted: "12/31/2020"
    };

    const actions = {
      view(kb: any): void {
        assert.ok(true, "view action is called");
        assert.deepEqual(kb, knowledgeBase, "kb is passed in view action");
      },
      play(kb: any): void {
        assert.ok(true, "play action is called");
        assert.deepEqual(kb, knowledgeBase, "kb is passed in play action");
      },
      edit(kb: any): void {
        assert.ok(true, "edit action is called");
        assert.deepEqual(kb, knowledgeBase, "kb is passed in edit action");
      },
      delete(kb: any): void {
        assert.ok(true, "delete action is called");
        assert.deepEqual(kb, knowledgeBase, "kb is passed in delete action");
      }
    };

    this.set("kb", knowledgeBase);
    this.set("actions", actions);

    await render(
      hbs`<Kb::ListItem
        @kb={{this.kb}}
        @view={{fn this.actions.view this.kb}}
        @play={{fn this.actions.play this.kb}}
        @edit={{fn this.actions.edit this.kb}}
        @delete={{fn this.actions.delete this.kb}} />`);

    assert.equal(find("[data-test-kb-name]")?.textContent, knowledgeBase.name, "name is shown");
    assert.equal(find("[data-test-kb-description]")?.textContent, knowledgeBase.description, "description is shown");
    assert.equal(find("[data-test-kb-createdAt]")?.textContent, knowledgeBase.createdAtFormatted, "createdAt is shown");
    assert.equal(find("[data-test-kb-updatedAt]")?.textContent, knowledgeBase.updatedAtFormatted, "updatedAt is shown");

    const viewBtn = find("[data-test-kb-view]");
    if (viewBtn) await click(viewBtn);

    const palyBtn = find("[data-test-kb-play]");
    if (palyBtn) await click(palyBtn);

    const editBtn = find("[data-test-kb-edit]");
    if (editBtn) await click(editBtn);

    const deleteBtn = find("[data-test-kb-delete]");
    if (deleteBtn) await click(deleteBtn);
  });
});
