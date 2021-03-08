"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        "node_modules/bulma"
      ]
    },
    babel: {
      sourceMaps: "inline"
    }
  });
  app.import("node_modules/vis-network/dist/dist/vis-network.css");
  app.import("node_modules/microtip/microtip.css");
  return app.toTree();
};
