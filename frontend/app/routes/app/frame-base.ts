import Route from "@ember/routing/route";
import FrameBase from "knowledge-shell/models/frame-base";

export default class extends Route {
	async model({ base_id }: { base_id: string }): Promise<FrameBase> {
		const frameBase = await this.store.findRecord("frame-base", base_id);
		await frameBase.loadData();
		return frameBase;
	}
}
