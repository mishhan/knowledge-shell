import { module, test } from "qunit";
import { visit, currentURL, fillIn, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
// @ts-ignore
import { setupMirage } from "ember-cli-mirage/test-support";

module("Acceptance | authentication", function (hooks) {
	setupApplicationTest(hooks);
	setupMirage(hooks);

	test("visiting /sign-in", async function (assert) {
		await visit("/sign-in");
		assert.equal(currentURL(), "/sign-in");
	});

	test("after successfully signing in it redirects to /knowledge-bases", async function (assert) {
		await visit("/sign-in");
		await fillIn("[data-test-login]", "login");
		await fillIn("[data-test-password]", "password");
		await click("[data-test-auth-button]");
		assert.equal(currentURL(), "/knowledge-bases");
	});

	test("after successfully signing in auth buttons dissappear", async function (assert) {
		await visit("/sign-in");
		assert.dom("[data-test-sign-out]").doesNotExist("sign-out button does not exist before signing in");
		assert.dom("[data-test-sign-in]").exists("sign-in button exists before signing in");
		assert.dom("[data-test-sign-up]").exists("sign-up button exists before signing in");
		await fillIn("[data-test-login]", "login");
		await fillIn("[data-test-password]", "password");
		await click("[data-test-auth-button]");
		assert.dom("[data-test-sign-out]").exists("sign-out button exists after signing in");
		assert.dom("[data-test-sign-in]").doesNotExist("sign-in button does not exist after signing in");
		assert.dom("[data-test-sign-up]").doesNotExist("sign-up button does not exist after signing in");
		await click("[data-test-sign-out]");
		assert.dom("[data-test-sign-out]").doesNotExist("sign-out button does not exist after signing out");
		assert.dom("[data-test-sign-in]").exists("sign-in button exists after signing out");
		assert.dom("[data-test-sign-up]").exists("sign-up button exists after signing out");
	});
});
