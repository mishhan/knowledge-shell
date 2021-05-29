import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | tree-node", (hooks) => {
	setupRenderingTest(hooks);

	test("it shows node title", async function (assert) {
		const node = { name: "Node" };
		this.set("node", node);
		await render(hbs`<TreeNode @node={{this.node}} @isRootNode={{true}} @isLastNode={{false}} />`);

		assert.equal(
			this.element.querySelector("div.tree__node-content > div.tree__node-text")?.textContent?.trim(),
			node.name,
		);
	});
});
