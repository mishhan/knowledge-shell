import Route from "@ember/routing/route";
import { FrameBase } from "knowledge-shell/models";

export default class KnowledgeBases extends Route {
	async model(): Promise<FrameBase[]> {
		const frameBases = await this.store.findAll("frame-base");
		// @ts-ignore
		return frameBases;
	}
}
