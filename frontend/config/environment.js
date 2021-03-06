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

    "ember-cli-uuid": {
      defaultUUID: true,
    },

    "ember-simple-auth": {
      authenticationRoute: "login",
      routeAfterAuthentication: "app.knowledge-bases",
      routeIfAlreadyAuthenticated: "app.knowledge-bases",
      authorizer: "authorizer:token",
      authenticator: "authenticator:oauth2"
    },

    APP: {
      host: "http://localhost:55836",
      namespace: "",
      defaultLocale: "en-us"
    }
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
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
