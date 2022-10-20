import Application from "knowledge-shell/app";
import config from "knowledge-shell/config/environment";
import { forceModulesToBeLoaded, sendCoverage } from "ember-cli-code-coverage/test-support";
import QUnit from "qunit";
import { setApplication } from "@ember/test-helpers";
import { setup } from "qunit-dom";
import { start } from "ember-qunit";

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();

QUnit.done(async function() {
	forceModulesToBeLoaded();
	await sendCoverage();
});
