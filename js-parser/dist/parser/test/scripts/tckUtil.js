"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var index = require("../../../index");
var util = require("../../../util/index");
var testUtil = require("../test-utils");
var hlImpl = require("../../highLevelImpl");
var mappings = require("./messageMappings");
var _ = require("underscore");
var assert = require("assert");
var universeHelpers = require("../../tools/universeHelpers");
var MessageMapping = /** @class */ (function () {
    function MessageMapping(patterns) {
        this.regExps = patterns.map(function (x) { return new RegExp(x); });
    }
    MessageMapping.prototype.match = function (a, b) {
        var aMatch = this.getValues(a);
        if (aMatch == null) {
            return null;
        }
        var bMatch = this.getValues(b);
        if (bMatch == null) {
            return null;
        }
        if (aMatch.length != bMatch.length) {
            return false;
        }
        for (var i = 1; i < aMatch.length; i++) {
            if (aMatch[i] != bMatch[i]) {
                return false;
            }
        }
        return true;
    };
    MessageMapping.prototype.getValues = function (str) {
        for (var _i = 0, _a = this.regExps; _i < _a.length; _i++) {
            var re = _a[_i];
            var match = str.match(re);
            if (match != null) {
                return match;
            }
        }
        return null;
    };
    return MessageMapping;
}());
var TestResult = /** @class */ (function () {
    function TestResult(apiPath, json, success, tckJsonPath, diff) {
        this.apiPath = apiPath;
        this.json = json;
        this.success = success;
        this.tckJsonPath = tckJsonPath;
        this.diff = diff;
    }
    return TestResult;
}());
exports.TestResult = TestResult;
var messageMappings = mappings.map(function (x) {
    return new MessageMapping(x.messagePatterns.map(function (x) { return x.pattern; }));
});
function launchTests(folderAbsPath, reportPath, regenerateJSON, callTests) {
    var count = 0;
    var passed = 0;
    var report = [];
    var dirs = iterateFolder(folderAbsPath);
    for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var dir = dirs_1[_i];
        var tests = getTests(dir);
        for (var _a = 0, tests_1 = tests; _a < tests_1.length; _a++) {
            var test = tests_1[_a];
            count++;
            var result = testAPI(test.masterPath(), test.extensionsAndOverlays(), test.jsonPath(), regenerateJSON, callTests, false);
            if (!result) {
                continue;
            }
            if (result.success) {
                passed++;
                console.log('js parser passed: ' + result.apiPath);
            }
            else {
                console.warn('js parser failed: ' + result.apiPath);
            }
            var reportItem = {
                apiPath: result.apiPath,
                errors: result.diff,
                tckJsonPath: result.tckJsonPath,
                passed: result.success
            };
            report.push(reportItem);
        }
    }
    if (callTests) {
        console.log("total tests count: " + count);
        console.log("tests passed: " + passed);
        if (reportPath) {
            console.log("report file: " + reportPath);
            fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        }
    }
}
exports.launchTests = launchTests;
function iterateFolder(folderAbsPath, result) {
    if (result === void 0) { result = []; }
    if (!fs.lstatSync(folderAbsPath).isDirectory()) {
        return;
    }
    var dirContent = extractContent(folderAbsPath);
    if (dirContent != null) {
        result.push(dirContent);
        return result;
    }
    for (var _i = 0, _a = fs.readdirSync(folderAbsPath); _i < _a.length; _i++) {
        var ch = _a[_i];
        var childAbsPath = path.resolve(folderAbsPath, ch);
        if (fs.lstatSync(childAbsPath).isDirectory()) {
            iterateFolder(childAbsPath, result);
        }
    }
    return result;
}
exports.iterateFolder = iterateFolder;
function extractContent(folderAbsPath) {
    if (!fs.lstatSync(folderAbsPath).isDirectory()) {
        return null;
    }
    var ramlFileNames = fs.readdirSync(folderAbsPath).filter(function (x) { return path.extname(x).toLowerCase() == ".raml"; });
    if (ramlFileNames.length == 0) {
        return null;
    }
    var ramlFilesAbsPaths = ramlFileNames.map(function (x) { return path.resolve(folderAbsPath, x); });
    var ramlFiles = [];
    for (var _i = 0, ramlFilesAbsPaths_1 = ramlFilesAbsPaths; _i < ramlFilesAbsPaths_1.length; _i++) {
        var f = ramlFilesAbsPaths_1[_i];
        var content = fs.readFileSync(f).toString();
        var ramlFirstLine = hlImpl.ramlFirstLine(content);
        if (!ramlFirstLine || ramlFirstLine.length < 2) {
            continue;
        }
        var verStr = ramlFirstLine[1];
        var version = (verStr == "0.8") ? "RAML08" : "RAML10";
        var ramlFileType = "API";
        if (ramlFirstLine.length > 2 && ramlFirstLine[2].trim().length > 0) {
            ramlFileType = ramlFirstLine[2].toUpperCase();
        }
        var kind = RamlFileKind[ramlFileType];
        if (kind == null) {
            kind = RamlFileKind.FRAGMENT;
        }
        var extendsPath = null;
        if (kind == RamlFileKind.EXTENSION || kind == RamlFileKind.OVERLAY) {
            extendsPath = extractMasterRef(f);
        }
        var ramlFile = new RamlFile(f, kind, version, extendsPath);
        ramlFiles.push(ramlFile);
    }
    if (ramlFiles.length == 0) {
        return null;
    }
    return new DirectoryContent(folderAbsPath, ramlFiles);
}
exports.extractContent = extractContent;
function extractMasterRef(filePath) {
    var raml = index.loadRAMLSync(filePath, null);
    var extendsStr = raml.highLevel().attrValue("extends");
    if (!extendsStr) {
        return null;
    }
    var result = path.resolve(path.dirname(filePath), extendsStr);
    return result;
}
function getTests(dirContent) {
    var result = [];
    if (dirContent.hasCleanAPIsOnly()) {
        result = dirContent.masterAPIs().map(function (x) { return new Test(x.absolutePath()); });
    }
    else if (dirContent.hasSingleExtensionOrOverlay()) {
        result = dirContent.extensionsAndOverlays().map(function (x) {
            var jsonPath = defaultJSONPath(x.extends());
            return new Test(x.absolutePath(), null, jsonPath);
        });
    }
    else if (dirContent.hasLibraries() && dirContent.masterAPIs().length == 0) {
        result = dirContent.libraries().map(function (x) { return new Test(x.absolutePath()); });
    }
    else if (dirContent.hasFragmentsOnly()) {
        result = dirContent.fragments().map(function (x) { return new Test(x.absolutePath()); });
    }
    else if (dirContent.hasExtensionsOrOverlaysAppliedToSingleAPI()) {
        var ordered = orderExtensionsAndOverlaysByIndex(dirContent.extensionsAndOverlays());
        if (ordered) {
            var apiPath = ordered[0].extends();
            var extensionsAndOverlays = ordered.map(function (x) { return x.absolutePath(); });
            result = [new Test(apiPath, extensionsAndOverlays)];
        }
        else {
            var topExt = dirContent.topExtensionOrOverlay();
            if (topExt != null) {
                result = [new Test(topExt.absolutePath())];
            }
        }
    }
    return result;
}
exports.getTests = getTests;
var Test = /** @class */ (function () {
    function Test(_masterPath, _extensionsAndOverlays, _jsonPath) {
        this._masterPath = _masterPath;
        this._extensionsAndOverlays = _extensionsAndOverlays;
        this._jsonPath = _jsonPath;
    }
    Test.prototype.masterPath = function () { return this._masterPath; };
    Test.prototype.extensionsAndOverlays = function () { return this._extensionsAndOverlays; };
    Test.prototype.jsonPath = function () { return this._jsonPath; };
    return Test;
}());
exports.Test = Test;
var RamlFileKind;
(function (RamlFileKind) {
    RamlFileKind[RamlFileKind["API"] = 0] = "API";
    RamlFileKind[RamlFileKind["LIBRARY"] = 1] = "LIBRARY";
    RamlFileKind[RamlFileKind["EXTENSION"] = 2] = "EXTENSION";
    RamlFileKind[RamlFileKind["OVERLAY"] = 3] = "OVERLAY";
    RamlFileKind[RamlFileKind["FRAGMENT"] = 4] = "FRAGMENT";
})(RamlFileKind = exports.RamlFileKind || (exports.RamlFileKind = {}));
var RamlFile = /** @class */ (function () {
    function RamlFile(_absPath, _kind, _ver, _extends) {
        this._absPath = _absPath;
        this._kind = _kind;
        this._ver = _ver;
        this._extends = _extends;
    }
    RamlFile.prototype.absolutePath = function () {
        return this._absPath.replace(/\\/g, '/');
    };
    RamlFile.prototype.kind = function () {
        return this._kind;
    };
    RamlFile.prototype.version = function () {
        return this._ver;
    };
    RamlFile.prototype.extends = function () {
        return this._extends.replace(/\\/g, '/');
    };
    return RamlFile;
}());
exports.RamlFile = RamlFile;
var DirectoryContent = /** @class */ (function () {
    function DirectoryContent(dirAbsPath, files) {
        this.dirAbsPath = dirAbsPath;
        this.files = files;
    }
    DirectoryContent.prototype.absolutePath = function () {
        return this.dirAbsPath.replace(/\\/g, '/');
    };
    DirectoryContent.prototype.allRamlFiles = function () {
        return this.files;
    };
    DirectoryContent.prototype.extensionsAndOverlays = function () {
        return this.files.filter(function (x) { return x.kind() == RamlFileKind.EXTENSION || x.kind() == RamlFileKind.OVERLAY; });
    };
    DirectoryContent.prototype.masterAPIs = function () {
        return this.files.filter(function (x) { return x.kind() == RamlFileKind.API; });
    };
    DirectoryContent.prototype.fragments = function () {
        return this.files.filter(function (x) { return x.kind() == RamlFileKind.FRAGMENT; });
    };
    DirectoryContent.prototype.libraries = function () {
        return this.files.filter(function (x) { return x.kind() == RamlFileKind.LIBRARY; });
    };
    DirectoryContent.prototype.hasCleanAPIsOnly = function () {
        return this.extensionsAndOverlays().length == 0 && this.masterAPIs().length > 0;
    };
    DirectoryContent.prototype.hasSingleExtensionOrOverlay = function () {
        return this.extensionsAndOverlays().length == 1 && this.masterAPIs().length > 0;
    };
    DirectoryContent.prototype.hasExtensionsOrOverlaysAppliedToSingleAPI = function () {
        return this.extensionsAndOverlays().length > 0 && this.masterAPIs().length == 1;
    };
    DirectoryContent.prototype.hasFragmentsOnly = function () {
        return this.fragments().length == this.files.length;
    };
    DirectoryContent.prototype.hasLibraries = function () {
        return this.libraries().length > 0;
    };
    DirectoryContent.prototype.topExtensionOrOverlay = function () {
        var arr = this.extensionsAndOverlays();
        var map = {};
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var x = arr_1[_i];
            map[x.absolutePath()] = x;
        }
        for (var _a = 0, arr_2 = arr; _a < arr_2.length; _a++) {
            var x = arr_2[_a];
            var ext = x.extends();
            delete map[ext];
        }
        var keys = Object.keys(map);
        if (keys.length != 1) {
            return null;
        }
        return map[keys[0]];
    };
    return DirectoryContent;
}());
exports.DirectoryContent = DirectoryContent;
function defaultJSONPath(apiPath) {
    var dir = path.dirname(apiPath);
    var fileName = path.basename(apiPath).replace(".raml", "-tck.json");
    var str = path.resolve(dir, fileName);
    return str;
}
exports.defaultJSONPath = defaultJSONPath;
;
function orderExtensionsAndOverlaysByIndex(ramlFiles) {
    var indToFileMap = {};
    var pathToIndMap = {};
    for (var _i = 0, ramlFiles_1 = ramlFiles; _i < ramlFiles_1.length; _i++) {
        var rf = ramlFiles_1[_i];
        var fPath = rf.absolutePath();
        var fName = path.basename(fPath);
        var indStr = fName.replace(/([a-zA-Z]*)(\d*)(\.raml)/, "$2");
        indStr = indStr == "" ? "0" : "" + parseInt(indStr);
        var ind = parseInt(indStr);
        if (indToFileMap[indStr]) {
            return null;
        }
        indToFileMap[indStr] = rf;
        pathToIndMap[rf.absolutePath()] = ind;
    }
    var sorted = _.sortBy(ramlFiles, function (x) {
        return pathToIndMap[x.absolutePath()];
    });
    return sorted;
}
function testAPILibExpandNewFormat(apiPath, extensions, tckJsonPath) {
    return doTestAPI({
        apiPath: apiPath,
        extensions: extensions,
        tckJsonPath: tckJsonPath,
        newFormat: true,
        expandLib: true,
    }, true, true);
}
exports.testAPILibExpandNewFormat = testAPILibExpandNewFormat;
function testAPILibExpand(apiPath, extensions, tckJsonPath, regenerteJSON, callTests, doAssert) {
    if (regenerteJSON === void 0) { regenerteJSON = false; }
    if (callTests === void 0) { callTests = true; }
    if (doAssert === void 0) { doAssert = true; }
    testAPI(apiPath, extensions, tckJsonPath, regenerteJSON, callTests, doAssert, true);
}
exports.testAPILibExpand = testAPILibExpand;
var pathReplacer = function (str1, str2) {
    var l = str1.length;
    return function (key, value) {
        if (value) {
            if (typeof (value) == "object") {
                for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
                    var k = _a[_i];
                    if (k.substring(0, l) == str1) {
                        var newKey = str2 + k.substring(l);
                        var val = value[k];
                        delete value[k];
                        value[newKey] = val;
                    }
                }
            }
            else if (typeof (value) == "string") {
                value = value.split(str1).join(str2);
            }
        }
        return value;
    };
};
var serializeTestJSON = function (tckJsonPath, json) {
    var copy = JSON.parse(JSON.stringify(json));
    var rootPath = "file://" + testUtil.data("").replace(/\\/g, "/");
    var replacer = pathReplacer(rootPath, "__$$ROOT_PATH__");
    fs.writeFileSync(tckJsonPath, JSON.stringify(copy, replacer, 2));
};
var readTestJSON = function (tckJsonPath) {
    var rootPath = "file://" + testUtil.data("").replace(/\\/g, "/");
    var replacer = pathReplacer("__$$ROOT_PATH__", rootPath);
    return JSON.parse(fs.readFileSync(tckJsonPath).toString(), replacer);
};
var printTime = function (message) {
    var d = new Date();
    console.log(message + ": " + d.toLocaleString() + "/" + d.getMilliseconds());
};
function testAPIScript(o) {
    return doTestAPI(o, true, true);
}
exports.testAPIScript = testAPIScript;
function testAPINewFormat(apiPath, extensions, tckJsonPath, regenerteJSON, callTests, doAssert, expandLib) {
    if (regenerteJSON === void 0) { regenerteJSON = false; }
    if (callTests === void 0) { callTests = true; }
    if (doAssert === void 0) { doAssert = true; }
    if (expandLib === void 0) { expandLib = false; }
    return doTestAPI({
        apiPath: apiPath,
        extensions: extensions,
        tckJsonPath: tckJsonPath,
        newFormat: true
    }, true, true);
}
exports.testAPINewFormat = testAPINewFormat;
function testAPI(apiPath, extensions, tckJsonPath, regenerteJSON, callTests, doAssert, expandLib) {
    if (regenerteJSON === void 0) { regenerteJSON = false; }
    if (callTests === void 0) { callTests = true; }
    if (doAssert === void 0) { doAssert = true; }
    if (expandLib === void 0) { expandLib = false; }
    return doTestAPI({
        apiPath: apiPath,
        extensions: extensions,
        tckJsonPath: tckJsonPath,
        newFormat: false,
        regenerteJSON: regenerteJSON,
        expandLib: expandLib
    }, callTests, doAssert);
}
exports.testAPI = testAPI;
function doTestAPI(o, callTests, doAssert) {
    o = o || {};
    var apiPath = o.apiPath;
    if (apiPath) {
        apiPath = testUtil.data(apiPath);
    }
    var extensions = o.extensions;
    if (extensions) {
        extensions = extensions.map(function (x) { return testUtil.data(x); });
    }
    var tckJsonPath = o.tckJsonPath;
    if (!tckJsonPath) {
        tckJsonPath = defaultJSONPath(apiPath);
    }
    else {
        tckJsonPath = testUtil.data(tckJsonPath);
    }
    var json;
    if (o.newFormat || o.expandExpressions) {
        if (extensions && extensions.length > 0) {
            apiPath = extensions[extensions.length - 1];
        }
        json = index.loadSync(apiPath, {
            expandLibraries: o.expandLib,
            serializeMetadata: o.serializeMetadata,
            expandTypes: o.expandTypes,
            expandExpressions: o.expandExpressions,
            typeReferences: o.typeReferences,
            typeExpansionRecursionDepth: o.recursionDepth,
            sourceMap: true
        });
    }
    else {
        var api = index.loadRAMLSync(apiPath, extensions);
        var expanded = void 0;
        if (universeHelpers.isApiSibling(api.definition())) {
            expanded = api["expand"](o.expandLib);
        }
        else if (o.expandLib) {
            expanded = api["expand"]();
            ;
        }
        else {
            expanded = api;
        }
        expanded.setAttributeDefaults(true);
        json = expanded.toJSON({
            rootNodeDetails: true,
            serializeMetadata: o.serializeMetadata,
            sourceMap: true
        });
    }
    if (!tckJsonPath) {
        tckJsonPath = defaultJSONPath(apiPath);
    }
    if (o.regenerteJSON) {
        serializeTestJSON(tckJsonPath, json);
    }
    if (!fs.existsSync(tckJsonPath)) {
        serializeTestJSON(tckJsonPath, json);
        if (!callTests) {
            console.log("TCK JSON GENERATED: " + tckJsonPath);
            return;
        }
        console.warn("FAILED TO FIND TCK JSON: " + tckJsonPath);
    }
    if (!callTests) {
        return;
    }
    var tckJson = readTestJSON(tckJsonPath);
    var pathRegExp = new RegExp('/errors\\[\\d+\\]/path');
    var messageRegExp = new RegExp('/errors\\[\\d+\\]/message');
    json = JSON.parse(JSON.stringify(json));
    var diff = testUtil.compare(json, tckJson).filter(function (x) {
        if (x.path.match(pathRegExp)) {
            return false;
        }
        if (x.path.match(messageRegExp)) {
            for (var _i = 0, messageMappings_1 = messageMappings; _i < messageMappings_1.length; _i++) {
                var mm = messageMappings_1[_i];
                if (mm.match(x.value0, x.value1)) {
                    return false;
                }
            }
        }
        return true;
    });
    var success = false;
    var diffArr = [];
    if (diff.length == 0) {
        success = true;
    }
    else {
        //serializeTestJSON(tckJsonPath, json);
        console.warn("DIFFERENCE DETECTED FOR " + tckJsonPath);
        console.warn(diff.map(function (x) { return x.message("actual", "expected"); }).join("\n\n"));
        if (doAssert) {
            assert(false);
        }
        diffArr = diff.map(function (x) {
            return {
                "path": x.path,
                "comment": x.comment,
                "actual": x.value0,
                "expected": x.value1
            };
        });
    }
    return new TestResult(apiPath, tckJson, success, tckJsonPath, diffArr);
}
function printErrors(errors, level) {
    if (level === void 0) { level = 0; }
    var result = "";
    errors.forEach(function (error) {
        for (var i = 0; i < level; i++) {
            result += '\t';
        }
        result += error.message + ': ' + error.path + '\n';
        if (error.inner) {
            result += printErrors(error.inner, level + 1);
        }
    });
    return result;
}
function generateMochaSuite(folderAbsPath, dstPath, dataRoot, mochaSuiteTitle, o) {
    var dirs = iterateFolder(folderAbsPath);
    var map = {};
    for (var _i = 0, dirs_2 = dirs; _i < dirs_2.length; _i++) {
        var dir = dirs_2[_i];
        var tests = getTests(dir);
        if (tests.length > 0) {
            var suiteFolder = path.resolve(dir.absolutePath(), "../").replace(/\\/g, '/');
            var arr = map[suiteFolder];
            if (!arr) {
                arr = [];
                map[suiteFolder] = arr;
            }
            for (var _a = 0, tests_2 = tests; _a < tests_2.length; _a++) {
                var t = tests_2[_a];
                arr.push(t);
            }
        }
    }
    var suitePaths = Object.keys(map).sort();
    var suiteStrings = [];
    for (var _b = 0, suitePaths_1 = suitePaths; _b < suitePaths_1.length; _b++) {
        var suitePath = suitePaths_1[_b];
        var title = suiteTitle(suitePath, folderAbsPath);
        if (title == null) {
            continue;
        }
        var suiteStr = dumpSuite(title, dataRoot, map[suitePath], o);
        suiteStrings.push(suiteStr);
    }
    var content = fileContent(suiteStrings, dstPath, mochaSuiteTitle);
    fs.writeFileSync(dstPath, content);
}
exports.generateMochaSuite = generateMochaSuite;
function suiteTitle(absPath, dataRoot) {
    var title = absPath.substring(dataRoot.length);
    if (title.length > 0 && title.charAt(0) == "/") {
        title = title.substring(1);
    }
    return title;
}
function dumpSuite(title, dataRoot, tests, o) {
    var dumpedTests = tests.map(function (x) { return dumpTest(x, dataRoot, o); });
    var testsStr = dumpedTests.join("\n\n");
    return "describe('" + title + "',function(){\n    \n" + testsStr + "\n    \n});";
}
function dumpTest(test, dataRoot, o) {
    var relMasterPath = path.relative(dataRoot, test.masterPath()).replace(/\\/g, '/');
    ;
    var options = o ? util.deepCopy(o) : {};
    options.apiPath = relMasterPath;
    if (test.extensionsAndOverlays()) {
        var relArr = test.extensionsAndOverlays().map(function (x) { return path.relative(dataRoot, x).replace(/\\/g, '/'); });
        options.extensions = relArr;
    }
    var jsonPath = test.jsonPath() ? path.relative(dataRoot, test.jsonPath()).replace(/\\/g, '/') : null;
    if (jsonPath != null) {
        options.tckJsonPath = jsonPath;
    }
    var testMethod = 'testAPIScript';
    return "    it(\"" + path.basename(path.dirname(test.masterPath())) + "/" + path.basename(test.masterPath()) + "\", function () {\n        this.timeout(20000);\n        tckUtil." + testMethod + "(" + JSON.stringify(options) + ");\n    });";
}
var toIncludePath = function (workingFolder, absPath) {
    var relPath = path.relative(workingFolder, absPath).replace(/\\/g, "/");
    if (!relPath || relPath.charAt(0) != ".") {
        relPath = "./" + relPath;
    }
    return relPath;
};
function projectFolder() {
    var folder = __dirname;
    while (!fs.existsSync(path.resolve(folder, "package.json"))) {
        folder = path.resolve(folder, "../");
    }
    return folder;
}
exports.projectFolder = projectFolder;
;
function fileContent(suiteStrings, filePath, title) {
    var folder = projectFolder();
    var dstFolder = path.dirname(filePath);
    var tckUtilPath = path.resolve(folder, "./src/parser/test/scripts/tckUtil");
    var typingsPath = path.resolve(folder, "typings/main.d.ts");
    var relTckUtilPath = toIncludePath(dstFolder, tckUtilPath);
    var relTypingsPath = toIncludePath(dstFolder, typingsPath);
    return "/**\n * ATTENTION !!! The file is generated. Manual changes will be overridden by the nearest build.\n */\nimport tckUtil = require(\"" + relTckUtilPath + "\")\n\ndescribe('" + title + "',function(){\n\n" + suiteStrings.join("\n\n") + "\n\n});\n\n";
}
;
//# sourceMappingURL=tckUtil.js.map