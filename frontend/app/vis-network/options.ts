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
  locales: locales,
  clickToUse: true,
  configure: configure,
  edges: edges,
  nodes: nodes,
  layout: layout,
  interaction: interaction,
  manipulation: {},
  physics: physics
};

export default options;
