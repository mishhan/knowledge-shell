"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function (defaults) {
	let app = new EmberApp(defaults, {
		sassOptions: {
			includePaths: ["node_modules/bulma"]
		},
		babel: {
			plugins: [...require("ember-cli-code-coverage").buildBabelPlugin()],
			sourceMaps: "inline"
		},
		sourcemaps: {
			enabled: true,
			extensions: ["js"]
		},
		outputPaths: {
			app: {
				css: {
					"app": "./assets/app.css"
				}
			}
		}
	});

	/** themes */
	app.import("node_modules/bulmaswatch/default/bulmaswatch.min.css", { outputFile: "assets/theme/default.css" });
	app.import("node_modules/bulmaswatch/materia/bulmaswatch.min.css", { outputFile: "assets/theme/materia.css" });
	app.import("node_modules/bulmaswatch/pulse/bulmaswatch.min.css", { outputFile: "assets/theme/pulse.css" });
	app.import("node_modules/bulmaswatch/spacelab/bulmaswatch.min.css", { outputFile: "assets/theme/spacelab.css" });

	/** component styles */
	app.import("node_modules/vis-network/dist/dist/vis-network.css");
	app.import("node_modules/microtip/microtip.css");
	app.import("node_modules/sweetalert2/dist/sweetalert2.min.css");

	return app.toTree();
};
