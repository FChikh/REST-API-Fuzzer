"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testUtil = require("../../test-utils");
var assert = require("assert");
var schema = require("../../../../../tckJSONSchema-newFormat/tckJsonSchema.json");
var fs = require("fs");
var def = require("raml-definition-system");
var projectClass = require("../../../jsyaml/jsyaml2lowLevel").Project;
var ContentProvider = require("../../../../util/contentprovider").ContentProvider;
var jsonSchemaFile = "./tckJsonSchema.json";
var project = new projectClass(testUtil.projectRoot() + "/tckJSONSchema-newFormat");
var unit = project.unit(jsonSchemaFile);
var provider = new ContentProvider(unit);
var content = fs.readFileSync(testUtil.projectRoot() + "/tckJSONSchema-newFormat/" + jsonSchemaFile).toString();
var schemaUtils = def.getSchemaUtils();
var jsonSchemaObject = new schemaUtils.JSONSchemaObject(content, provider);
validateDir(testUtil.data("TCK-newFormat"));
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
        var jsonString = fs.readFileSync(path, "utf-8");
        var jsonObject = JSON.parse(jsonString);
        if (jsonObject.errors && jsonObject.errors.length > 0) {
            return;
        }
        jsonSchemaObject.validate(jsonString);
        console.log("ok: " + path);
    }
    catch (err) {
        console.error("errors: " + path + "\n" + JSON.stringify(err, null, 2));
    }
    assert(jsonErrors.length === 0);
}
exports.validateJSON = validateJSON;
//# sourceMappingURL=schemaTCKValidatorNF.js.map