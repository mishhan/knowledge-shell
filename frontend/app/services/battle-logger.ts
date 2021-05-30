import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class BattleLogger extends Service {
	@tracked fullLog!: any;

	clearLog(): void {
		this.fullLog = [];
	}

	addMessage(message: { name: string; children: any[] }): void {
		this.fullLog.pushObject(message);
	}
}

declare module "@ember/service" {
	interface Registry {
		"battle-logger": BattleLogger;
	}
}
