"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fsutil = require("../util/fsutil");
var path = require("path");
var fs = require("fs");
var util = require("../util/index");
var rootPath = path.join(__dirname, "../../");
var destination = path.resolve(rootPath, "standalone-typings");
fsutil.removeDirSyncRecursive(destination);
var parserSource = rootPath;
var parserDestination = path.resolve(destination, "raml-1-parser");
var parserRelativeSourcePath = "dist";
var definitionSystemSource = path.resolve(rootPath, "../raml-definition-system");
var definitionSystemDestination = path.resolve(destination, "raml-definition-system");
var definitionSystemRelativeSourcePath = "dist";
var typeSystemSource = path.resolve(rootPath, "../raml-typesystem");
var typeSystemDestination = path.resolve(destination, "raml-typesystem");
var typeSystemRelativeSourcePath = "dist/src";
var yamlParserSource = path.resolve(rootPath, "../yaml-ast-parser");
var yamlParserDestination = path.resolve(destination, "yaml-ast-parser");
var yamlParserRelativeSourcePath = "dist/src";
function processModule(moduleSource, moduleDestination, relativeSourcePath) {
    var source = path.resolve(moduleSource, relativeSourcePath);
    var packageJsonPath = path.resolve(moduleSource, "package.json");
    var packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    var typingsRelPath = packageJsonContent.typings || packageJsonContent.types;
    var typingsAbsPath = path.resolve(moduleSource, typingsRelPath);
    var arr = [typingsAbsPath];
    var checked = {};
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var p = arr_1[_i];
        var relPath = path.relative(source, p);
        var absDstPath = path.resolve(moduleDestination, relPath);
        fsutil.copyFileSync(p, absDstPath);
        var content = fs.readFileSync(p, "utf-8").split("\n").map(function (x) {
            x = x.trim();
            var rPath;
            if (x.indexOf("require") >= 0) {
                var ind = x.indexOf("require");
                if (ind < 0) {
                    return null;
                }
                var lb = x.indexOf("(", ind);
                if (lb < 0) {
                    return null;
                }
                lb++;
                var rb = x.indexOf(")", lb);
                if (rb < 0) {
                    return null;
                }
                rPath = x.substring(lb, rb).trim();
            }
            else if (util.stringStartsWith(x, "export")) {
                var ind = x.indexOf("from");
                if (ind < 0) {
                    return null;
                }
                ind += "from".length;
                rPath = x.substring(ind).trim();
                if (util.stringEndsWith(rPath, ";")) {
                    rPath = rPath.substring(0, rPath.length - 1);
                }
            }
            if (rPath && ((util.stringStartsWith(rPath, "\"") && util.stringEndsWith(rPath, "\""))
                || (util.stringStartsWith(rPath, "'") && util.stringEndsWith(rPath, "'")))) {
                rPath = rPath.substring(1, rPath.length - 1).trim();
                return rPath;
            }
            return null;
        }).filter(function (x) { return x != null; });
        for (var _a = 0, content_1 = content; _a < content_1.length; _a++) {
            var rPath = content_1[_a];
            rPath += ".d.ts";
            var rAbsPath = path.resolve(path.dirname(p), rPath).replace(/\\/g, '/');
            if (checked[rAbsPath]) {
                continue;
            }
            checked[rAbsPath] = true;
            if (!fs.existsSync(rAbsPath) || fs.lstatSync(rAbsPath).isDirectory()) {
                continue;
            }
            arr.push(rAbsPath);
        }
    }
}
processModule(parserSource, parserDestination, parserRelativeSourcePath);
processModule(definitionSystemSource, definitionSystemDestination, definitionSystemRelativeSourcePath);
processModule(typeSystemSource, typeSystemDestination, typeSystemRelativeSourcePath);
processModule(yamlParserSource, yamlParserDestination, yamlParserRelativeSourcePath);
//# sourceMappingURL=extractTypings.js.map