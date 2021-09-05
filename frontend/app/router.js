import EmberRouter from "@ember/routing/router";
import config from "knowledge-shell/config/environment";

export default class Router extends EmberRouter {
	location = config.locationType;
	rootURL = config.rootURL;
}

Router.map(function () {
	this.route("sign-in");
	this.route("sign-up");
	this.route("app", { path: "" }, function () {
		this.route("knowledge-bases", function () {
			this.route("new");
			this.route("edit", { path: "edit/:base_id" });
		});
		this.route("frame-base", { path: "frame-base/:base_id" }, function () {
			this.route("domains");
			this.route("editor");
			this.route("play");
		});
		this.route("production-base", { path: "production-base/:base_id" }, function () {

		});
	});
});
