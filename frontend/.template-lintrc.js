"use strict";

module.exports = {
  plugins: ["ember-template-lint-plugin-prettier"],
  extends: ["octane", "ember-template-lint-plugin-prettier:recommended"],
  rules: {
    "no-bare-strings": true,
    "no-capital-arguments": true,
    "link-href-attributes": "off",
    "require-input-label": "off"
  }
};
