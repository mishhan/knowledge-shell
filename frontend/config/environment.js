"use strict";

module.exports = function (environment) {
  let ENV = {
    modulePrefix: "knowledge-shell",
    environment,
    rootURL: process.env.EMBER_CLI_ELECTRON ? '' : "/",
    locationType: process.env.EMBER_CLI_ELECTRON ? 'hash' : "auto",
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      },
    },
    "ember-simple-auth": {
      authenticationRoute: "sign-in",
      routeAfterAuthentication: "app.knowledge-bases",
      routeIfAlreadyAuthenticated: "app.knowledge-bases",
      authorizer: "authorizer:token",
      authenticator: "authenticator:oauth2"
    },

    APP: {
      host: "http://localhost:5000",
      namespace: "",
      defaultLocale: "en-us"
    }
  };

  if (environment === "development") {
    ENV['ember-cli-mirage'] = {
			enabled: false
		};
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    // here you can enable a production-specific feature
  }

  return ENV;
};
