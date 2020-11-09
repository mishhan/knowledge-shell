import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Helper | format-date", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders date in presented format", async function(assert) {
    const date = new Date(2020, 0, 1);
    const dateFormat = "MM/dd/yyyy";
    this.set("date", date);
    this.set("dateFormat", dateFormat);
    await render(hbs`{{format-date date dateFormat}}`);
    assert.equal(this.element.textContent?.trim(), "01/01/2020");
  });
});
