import Route from "@ember/routing/route";
import { FrameBase } from "knowledge-shell/models";

export default class KnowledgeBases extends Route {
	model(): FrameBase[] {
		const frameBases = this.store.findAll("frame-base");
		// @ts-ignore
		return frameBases;
	}
}
