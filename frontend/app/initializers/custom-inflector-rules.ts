import Inflector from "ember-inflector";

export function initialize(): void {
	const { inflector } = Inflector;
	inflector.irregular("frame-base", "frame-bases");
}

export default {
	initialize,
};
