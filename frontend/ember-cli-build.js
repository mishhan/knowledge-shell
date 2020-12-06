'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {});
  app.import("node_modules/vis-network/dist/dist/vis-network.css");
  app.import("node_modules/microtip/microtip.css");
  return app.toTree();
};
