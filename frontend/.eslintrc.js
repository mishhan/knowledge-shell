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
  ],
  extends: [
    "plugin:ember/recommended",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
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
    "prettier/prettier": ["error", { "endOfLine":"auto" }]
  }
};
