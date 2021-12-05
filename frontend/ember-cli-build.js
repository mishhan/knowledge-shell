"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        "node_modules/bulma",
				"node_modules/bulmaswatch",
        "node_modules/sweetalert2/src/"
      ]
    },
    babel: {
      sourceMaps: "inline"
    },
		outputPaths: {
			app: {
				css: {
					"app": "./assets/app.css",
					"themes/default": "./assets/default.css",
					"themes/materia": "./assets/materia.css",
					"themes/pulse": "./assets/pulse.css",
					"themes/spacelab": "./assets/spacelab.css"
				}
			}
		}
  });
  app.import("node_modules/vis-network/dist/dist/vis-network.css");
  app.import("node_modules/microtip/microtip.css");
  return app.toTree();
};
