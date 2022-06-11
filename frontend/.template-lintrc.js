"use strict";

module.exports = {
	plugins: ["ember-template-lint-plugin-prettier"],
	extends: ["recommended", "ember-template-lint-plugin-prettier:recommended"],
	rules: {
		"no-bare-strings": true,
		"no-capital-arguments": true,
		"no-nested-interactive": true,
		"link-href-attributes": "off",
		"require-input-label": "off",
	}
};
