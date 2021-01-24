import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { click, find, render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | domain/list-item", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const defaultDomain = {
      name: "domain",
      domainValues: [1, 2, 3],
      isReadOnly: false,
      isEditing: false
    };
    const actions = {
      delete(domain: any): void {
        assert.ok(true, "delete action is called");
        assert.deepEqual(domain, defaultDomain, "domain is passed in delete action");
      }
    };
    this.set("domain", defaultDomain);
    this.set("actions", actions);
    await render(
      hbs`<Domain::ListItem
        @domain={{this.domain}}
        @deleteDomain={{fn this.actions.delete this.domain}} />`);

    assert.equal(find("[data-test-domain-name]")?.textContent, defaultDomain.name, "name is shown");
    assert.equal(find("[data-test-domain-values-length]")?.textContent?.trim(), defaultDomain.domainValues.length.toString(), "domain values count is shown");

    const viewBtn = find("[data-test-domain-edit]");
    if (viewBtn) await click(viewBtn);
  });
});
