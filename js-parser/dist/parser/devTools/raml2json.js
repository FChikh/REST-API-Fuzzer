"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ramlToJsonFile = require("../../util/ramlToJsonFile");
var messageRegistry = require("../../../resources/errorMessages");
var outputFolder;
var apiPath;
var extensionsAndOverlays = [];
var ignoreMeta = false;
var attributeDefaults = true;
var postfix = null;
var args = process.argv;
for (var i = 0; i < args.length; i++) {
    if (args[i] == '-outputFolder' && i < args.length - 1) {
        outputFolder = args[i + 1];
        i++;
    }
    else if (args[i] == '-apiPath' && i < args.length - 1) {
        apiPath = args[i + 1];
        i++;
    }
    else if (args[i] == '-ext' && i < args.length - 1) {
        extensionsAndOverlays = args[i + 1].split(path.delimiter);
        i++;
    }
    else if (args[i] == '-postfix' && i < args.length - 1) {
        postfix = args[i + 1];
        i++;
    }
    else if (args[i] == '-ignoreMeta') {
        ignoreMeta = true;
    }
}
if (!apiPath) {
    throw new Error(messageRegistry.SPECIFY_APIPATH.message);
}
var options = {
    ignoreMeta: ignoreMeta,
    outputJsonFolder: outputFolder,
    attributeDefaults: true,
    postfix: postfix
};
ramlToJsonFile.saveToJson(apiPath, extensionsAndOverlays, options);
//# sourceMappingURL=raml2json.js.map