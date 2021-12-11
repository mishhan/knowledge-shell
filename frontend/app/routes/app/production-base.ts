import Route from "@ember/routing/route";
import { ProductionBase } from "knowledge-shell/models";

export default class extends Route {
	async model({ base_id }: { base_id: string }): Promise<ProductionBase> {
		const productionBase = await this.store.findRecord("production-base", base_id);
		await productionBase.loadData();
		return productionBase;
	}
}
