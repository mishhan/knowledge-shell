import Application from "knowledge-shell/app";
import config from "knowledge-shell/config/environment";
import { setApplication } from "@ember/test-helpers";
import { start } from "ember-qunit";

setApplication(Application.create(config.APP));

start();
