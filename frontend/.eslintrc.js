"use strict";

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: [
    "ember",
    "@typescript-eslint",
  ],
  extends: [
    "plugin:ember/recommended",
    "airbnb-typescript/base",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  env: {
    browser: true
  },
  rules: {},
  overrides: [
    // node files
    {
      files: [
        ".eslintrc.js",
        ".template-lintrc.js",
        "ember-cli-build.js",
        "testem.js",
        "blueprints/*/index.js",
        "config/**/*.js",
        "lib/*/index.js",
        "server/**/*.js"
      ],
      parserOptions: {
        sourceType: "script",
        project: "./tsconfig.json"
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ["node"],
      extends: ["plugin:node/recommended"],
      rules: {
        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        "node/no-unpublished-require": "off"
      }
    }
  ]
};
