import locales from "./locales";
import configure from "./modules/configure";
import edges from "./modules/edges";
import nodes from "./modules/nodes";
import layout from "./modules/layout";
import interaction from "./modules/interaction";
import physics from "./modules/physics";

const options = {
	autoResize: true,
	height: "100%",
	width: "100%",
	locale: "en",
	locales,
	clickToUse: true,
	configure,
	edges,
	nodes,
	layout,
	interaction,
	manipulation: {},
	physics,
};

export default options;
