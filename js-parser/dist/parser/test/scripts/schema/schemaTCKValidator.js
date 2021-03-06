"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testUtil = require("../../test-utils");
var assert = require("assert");
var schema = require("../../../../../tckJsonSchema/tckJsonSchema.json");
var fs = require("fs");
var def = require("raml-definition-system");
var projectClass = require("../../../jsyaml/jsyaml2lowLevel").Project;
var ContentProvider = require("../../../../util/contentprovider").ContentProvider;
var jsonSchemaFile = "./tckJsonSchema.json";
var project = new projectClass(testUtil.projectRoot() + "/tckJsonSchema");
var unit = project.unit(jsonSchemaFile);
var provider = new ContentProvider(unit);
var content = fs.readFileSync(testUtil.projectRoot() + "/tckJsonSchema/" + jsonSchemaFile).toString();
var schemaUtils = def.getSchemaUtils();
var jsonSchemaObject = new schemaUtils.JSONSchemaObject(content, provider);
validateDir(testUtil.data("TCK"));
function validateDir(path) {
    if (fs.statSync(path).isDirectory()) {
        fs.readdirSync(path).forEach(function (file) {
            validateDir(path + "/" + file);
        });
    }
    else if (fs.statSync(path).isFile()) {
        if (path.lastIndexOf("-tck.json") > -1) {
            validateJSON(path);
        }
    }
}
exports.validateDir = validateDir;
function validateJSON(path) {
    var jsonErrors = [];
    try {
        jsonSchemaObject.validate(fs.readFileSync(path).toString());
        console.log("ok: " + path);
    }
    catch (err) {
        jsonErrors = err.errors;
        console.error("errors: " + path + "\n" + JSON.stringify(jsonErrors, null, 4));
    }
    assert(jsonErrors.length === 0);
}
exports.validateJSON = validateJSON;
//# sourceMappingURL=schemaTCKValidator.js.map