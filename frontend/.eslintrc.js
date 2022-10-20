module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: [
    "ember",
    "@typescript-eslint",
		"import",
  ],
  extends: [
    "plugin:ember/recommended",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
		"plugin:import/recommended"
  ],
  env: {
    browser: true,
  },
  rules: {
    "class-methods-use-this": "off",
    "func-names": "off",
    "no-param-reassign": ["error", {"props": false}],
    "import/no-cycle": ["off", { ignoreExternal: true }],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
		"import/no-unresolved": "off",
		"import/named": "off",
    "prettier/prettier": ["error", { "endOfLine":"auto" }],
    "no-underscore-dangle": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "ember/no-controller-access-in-routes": "off",
		"no-continue": "off",
		"no-restricted-syntax": "off",
  }
};
