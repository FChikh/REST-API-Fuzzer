"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var jsyaml = require("../jsyaml/jsyaml2lowLevel");
var high = require("../highLevelImpl");
var universeHelpers = require("../tools/universeHelpers");
var textutil = require("../../util/textutil");
var expander = require("../ast.core/expanderLL");
var RamlWrapperImpl = require("../artifacts/raml10parser");
var RamlWrapper08Impl = require("../artifacts/raml08parser");
var hlimpl = require("../highLevelImpl");
var apiLoader = require("../../parser/apiLoader");
var pdir = path.resolve(__dirname, "../../../src/parser/test");
exports.universe = require("../definition-system/universeProvider")("RAML10");
exports.apiType = exports.universe.type("Api");
function showTypeProperties(defenition) {
    var type = defenition;
    console.log('Type: ' + type.nameId());
    var own = type.properties();
    var all = type.allProperties();
    var extra = [];
    all.forEach(function (p) {
        if (!_.contains(own, p))
            extra.push(p);
    });
    own.forEach(function (p) {
        console.log('  property: ' + p.nameId() + ': ' + p.range().nameId());
    });
    console.log('  -----------------');
    extra.forEach(function (p) {
        console.log('  property: ' + p.nameId() + ': ' + p.range().nameId());
    });
}
exports.showTypeProperties = showTypeProperties;
function showProperties(name) {
    console.log('Type ' + name + ':');
    var type = exports.universe.type(name);
    showTypeProperties(type);
}
exports.showProperties = showProperties;
function show(node, lev) {
    if (lev === void 0) { lev = 0; }
    var property = node.property();
    var namestr = property ? property.nameId() + ': ' : '';
    var elements = node.elements();
    //console.log(namestr + '.elements = ' + elements.length);
    if (elements.length > 0) {
        textutil.print(lev, namestr + node.definition().nameId() + ' {');
        elements.forEach(function (e) { return show(e, lev + 1); });
        textutil.print(lev, '}');
    }
    else {
        textutil.print(lev, namestr + node.definition().nameId() + ' {}');
    }
}
exports.show = show;
function dumpPath(apiPath) {
    var dir = path.dirname(apiPath);
    var fileName = path.basename(apiPath).replace(".raml", "-dump.json");
    var str = path.resolve(dir, fileName);
    return str;
}
exports.dumpPath = dumpPath;
function compareDump(actual, expectedPath, apiPath) {
    if (!fs.existsSync(expectedPath)) {
        fs.writeFileSync(expectedPath, JSON.stringify(actual, null, '\t'));
    }
    var expected = JSON.parse(fs.readFileSync(expectedPath).toString());
    var diff = compare(actual, expected);
    var diffArr = [];
    var success = true;
    if (diff.length !== 0) {
        success = false;
        diffArr = diff.map(function (x) {
            return {
                "path": x.path,
                "comment": x.comment,
                "actual": x.value0,
                "expected": x.value1
            };
        });
    }
    diffArr.forEach(function (difference) {
        assert.equal(difference.actual, difference.expected);
    });
}
exports.compareDump = compareDump;
function loadApi(name, neverExpand) {
    if (neverExpand === void 0) { neverExpand = false; }
    var unit = loadUnit(name, path.dirname(name));
    var api = high.fromUnit(unit);
    if (!neverExpand) {
        api = expandHighIfNeeded(api);
    }
    if (!api)
        throw new Error("couldn't load api from " + name);
    return api;
}
exports.loadApi = loadApi;
function loadUnit(unitPath, rootPath) {
    if (!fs.existsSync(unitPath))
        throw new Error("file not found: " + unitPath);
    var p = new jsyaml.Project(rootPath);
    return p.unit(unitPath, true);
}
function loadAndMergeApis(masterPath, extensions) {
    var rootPath = path.dirname(masterPath);
    var masterApi = loadUnit(masterPath, rootPath);
    var extesionApis = _.map(extensions, function (extension) { return loadUnit(extension, rootPath); });
    return expander.mergeAPIs(masterApi, extesionApis, high.OverlayMergeMode.MERGE);
}
exports.loadAndMergeApis = loadAndMergeApis;
function trimEnd(s) {
    if (!s)
        return s;
    var len = s.length;
    while (len > 0) {
        var ch = s[len - 1];
        if (ch != '\r' && ch != '\n' && ch != ' ' && ch != '\t')
            break;
        len--;
    }
    return s.substr(0, len);
}
function makeDiff(lines1, lines2, index, context) {
    var diff = '\n';
    var min = Math.max(0, index - context);
    var max = Math.min(index + context, lines1.length, lines2.length);
    var maxlen = 0;
    for (var i = min; i <= max; i++) {
        var line = lines1[i];
        if (line && line.length > maxlen)
            maxlen = line.length;
    }
    for (var i = min; i <= max; i++) {
        var line1 = trimEnd(lines1[i]);
        var line2 = trimEnd(lines2[i]);
        if (!line1)
            line1 = "<undefined>";
        if (!line2)
            line2 = "<undefined>";
        while (line1.length < maxlen)
            line1 = line1 + ' ';
        var sep = ' : ';
        if (i < index)
            sep = ' = ';
        else if (i == index)
            sep = ' ! ';
        diff += line1 + sep + line2 + '\n';
    }
    return diff;
}
function compareToFileObject(obj, filename, create) {
    if (create === void 0) { create = false; }
    if (create && !fs.existsSync(filename)) {
        fs.writeFileSync(filename, JSON.stringify(obj, null, '\t'));
    }
    var txt = fs.readFileSync(filename).toString();
    var obj1 = JSON.parse(txt);
    var diff = compare(obj, obj1);
    assert(diff.length == 0);
}
exports.compareToFileObject = compareToFileObject;
function compareToFile(text, filename, create) {
    if (create === void 0) { create = false; }
    if (create && !fs.existsSync(filename)) {
        fs.writeFileSync(filename, text);
    }
    var txt = fs.readFileSync(filename).toString();
    var lines1 = text.trim().split("\n");
    var lines2 = txt.trim().split("\n");
    var lines = Math.min(lines1.length, lines2.length);
    //console.log('TEXT:\n' + txt);
    for (var i = 0; i < lines; i++) {
        if (trimEnd(lines1[i]) != trimEnd(lines2[i])) {
            var diff = '\n' + 'File: ' + filename + '\n' + makeDiff(lines1, lines2, i, 3);
            assert(false, diff);
        }
        //assert.equal(trimEnd(lines1[i]), trimEnd(lines2[i]));
    }
    var bigger = lines1.length > lines2.length ? lines1 : lines2;
    var diff = '\n' + 'File: ' + filename + '\n';
    for (var i = lines; i < bigger.length; i++) {
        diff += 'Extra line: ' + bigger[i] + '\n';
    }
    if (lines1.length != lines2.length) {
        console.log(text);
        assert.ok(false, diff);
    }
    assert.equal(lines1.length, lines2.length, diff);
}
exports.compareToFile = compareToFile;
function xpath(node, path) {
    var parts = path.split('/');
    for (var i = 0; i < parts.length; i++) {
        var name = parts[i];
        var attr = (name[0] == '#');
        var index = -1;
        if (name.indexOf('[') >= 0) {
            var p1 = name.indexOf('[');
            var p2 = name.indexOf(']');
            index = parseInt(name.substring(p1 + 1, p2));
            name = name.substring(0, p1);
        }
        var p = node.definition().property(name);
        //var isval = p.isValue();
        if (attr) {
            name = name.substr(1, name.length - 1);
            var attrs = node.attributes(name);
            return index >= 0 ? attrs[index] : attrs;
        }
        else {
            var nodes = node.elementsOfKind(name);
            if (!node || nodes.length == 0) {
                return null;
            }
            if (index < 0)
                index = 0;
            node = nodes[index];
        }
    }
    return node;
}
exports.xpath = xpath;
function projectRoot() {
    var dir = path.resolve('.', '');
    while (!fs.existsSync(path.resolve(dir, 'package.json'))) {
        var parent = path.resolve(dir, '..');
        if (parent == dir)
            return null;
        dir = path.resolve(dir, '..');
    }
    return dir;
}
exports.projectRoot = projectRoot;
function data(filepath) {
    var datadir = path.resolve(projectRoot(), 'src/parser/test/data');
    return path.resolve(datadir, filepath);
}
exports.data = data;
function assertValue(a, value) {
    assert.equal(a.value(), value, 'value should be: ' + value + ' instead of: ' + a.value());
}
exports.assertValue = assertValue;
function assertValueText(a, value) {
    var node = a.lowLevel();
    var scalar = node.asMapping().value;
    var unittext = node.unit().contents();
    var text = unittext.substring(scalar.startPosition, scalar.endPosition);
    assert.equal(text, value, 'value text should be: <' + value + '> instead of: <' + text + '>');
}
exports.assertValueText = assertValueText;
function assertText(a, text) {
    var txt = a.lowLevel().text();
    assert.equal(txt, text, 'text \nshould be : ' + textutil.replaceNewlines(text) +
        '\ninstead of: ' + textutil.replaceNewlines(txt));
}
exports.assertText = assertText;
function compare(arg0, arg1, path) {
    if (path === void 0) { path = ''; }
    var diffs = [];
    if (arg0 == null) {
        if (arg1 != null) {
            diffs.push(new Diff(path, arg0, arg1, 'Defined/undefined mismatch'));
            return diffs;
        }
    }
    else if (arg1 == null) {
        diffs.push(new Diff(path, arg0, arg1, 'Defined/undefined mismatch'));
        return diffs;
    }
    else if (Array.isArray(arg0)) {
        if (!Array.isArray(arg1)) {
            diffs.push(new Diff(path, arg0, arg1, 'Array/' + typeof (arg1) + ' mismatch'));
            return diffs;
        }
        else {
            var l0 = arg0.length;
            var l1 = arg1.length;
            if (l1 != l0) {
                diffs.push(new Diff(path, arg0, arg1, 'Array lengths mismatch'));
                return diffs;
            }
            var l = Math.min(l0, l1);
            for (var i = 0; i < l; i++) {
                diffs = diffs.concat(compare(arg0[i], arg1[i], path + '[' + i + ']'));
            }
        }
    }
    else if (arg0 instanceof Object) {
        if (!(arg1 instanceof Object)) {
            diffs.push(new Diff(path, arg0, arg1, 'Object/' + typeof (arg1) + ' mismatch'));
            return diffs;
        }
        else {
            var keys0 = Object.keys(arg0);
            var keys1 = Object.keys(arg1);
            var map = {};
            for (var i = 0; i < keys0.length; i++) {
                var key = keys0[i];
                map[key] = true;
                var val0 = arg0[key];
                var val1 = arg1[key];
                diffs = diffs.concat(compare(val0, val1, path + '/' + key));
            }
            for (var i = 0; i < keys1.length; i++) {
                var key = keys1[i];
                if (map[key]) {
                    continue;
                }
                var val0 = arg0[key];
                var val1 = arg1[key];
                diffs = diffs.concat(compare(val0, val1, path + '/' + key));
            }
        }
    }
    else {
        if (arg0 !== arg1) {
            if (!(typeof arg0 == "number" && typeof arg1 == "number" && isNaN(arg0) && isNaN(arg1))) {
                diffs.push(new Diff(path, arg0, arg1, 'Inequal values'));
            }
        }
    }
    return diffs;
}
exports.compare = compare;
var Diff = /** @class */ (function () {
    function Diff(path, value0, value1, comment) {
        this.path = path;
        this.value0 = value0;
        this.value1 = value1;
        this.comment = comment;
        this.path = path;
        this.value0 = value0;
        this.value1 = value1;
        this.comment = comment;
    }
    Diff.prototype.message = function (label0, label1) {
        label0 = label0 || "value0";
        label1 = label1 || "value1";
        var strValue0 = "undefined";
        var strValue1 = "undefined";
        if (this.value0 != null) {
            try {
                strValue0 = JSON.stringify(this.value0, null, 2).trim();
            }
            catch (err) {
                strValue0 = this.value0.toString();
            }
        }
        if (this.value1 != null) {
            try {
                strValue1 = JSON.stringify(this.value1, null, 2).trim();
            }
            catch (err) {
                strValue1 = this.value1.toString();
            }
        }
        return "path: " + this.path + "\ncomment: " + this.comment + "\n" + label0 + ": " + strValue0 + "\n" + label1 + ": " + strValue1;
    };
    return Diff;
}());
exports.Diff = Diff;
function validateNode(api) {
    var errors = [];
    var q = hlimpl.createBasicValidationAcceptor(errors, api);
    api.validate(q);
    return errors;
}
exports.validateNode = validateNode;
;
function loadApiWrapper1(apiPath) {
    var absPath = data(apiPath);
    var hlNode = loadApi(absPath);
    var api = new RamlWrapperImpl.ApiImpl(hlNode);
    return api;
}
exports.loadApiWrapper1 = loadApiWrapper1;
function countErrors(api) {
    //var api=util.loadApi(p);
    var errors = validateNode(api);
    // console.log('Errors: ' + errors.length);
    return errors.length;
}
exports.countErrors = countErrors;
function showErrors(api) {
    //var api=util.loadApi(p);
    var errors = validateNode(api);
    console.log('Errors: ' + errors.length);
    if (errors.length > 0) {
        errors.forEach(function (error) {
            if (typeof error.message == 'string') {
                console.error(error.message);
            }
            else {
                console.error(error);
            }
            console.error("\n");
        });
    }
    return errors.length;
}
exports.showErrors = showErrors;
function loadApiWrapper08(apiPath) {
    var absPath = data(apiPath);
    var hlNode = loadApi(absPath);
    var api = new RamlWrapper08Impl.ApiImpl(hlNode);
    return api;
}
exports.loadApiWrapper08 = loadApiWrapper08;
function loadApiOptions1(apiPath, options) {
    var opt = apiLoader.loadApi(apiPath, options);
    return opt.getOrThrow();
}
exports.loadApiOptions1 = loadApiOptions1;
function loadApiOptions08(apiPath, options) {
    var opt = apiLoader.loadApi(apiPath, options);
    return opt.getOrThrow();
}
exports.loadApiOptions08 = loadApiOptions08;
function loadRAML(ramlPath) {
    var opt = apiLoader.loadRAML(ramlPath);
    return opt.getOrThrow();
}
exports.loadRAML = loadRAML;
function matchError(error, errorMessage) {
    return error.message.indexOf(errorMessage) != -1;
}
/**
 * Builds AST and compares it to a pre-serialized AST in a data folder file
 * @param masterPath - path to RAML master file
 * @param astPath - path to pre-serialized AST
 * @param extensions - extensuions and overlays paths
 * @param expectedErrors - expected error messages
 * @param mode - 1 == hlimpl.OverlayMergeMode.MERGE, 0 == hlimpl.OverlayMergeMode.AGGREGATE
 */
function testAST(masterPath, astPath, extensions, expectedErrors, mode) {
    var api = null;
    if (!extensions || extensions.length == 0) {
        api = loadApi(data(masterPath));
        if (global.isExpanded & api.wrapperNode) {
            api = api.wrapperNode().expand(global.isLibExpanded).highLevel();
        }
        if (mode != null) {
            api.setMergeMode(mode ? hlimpl.OverlayMergeMode.MERGE : hlimpl.OverlayMergeMode.AGGREGATE);
        }
    }
    else {
        var absoluteExtensionPaths = extensions.map(function (extension) { return data(extension); });
        api = loadAndMergeApis(data(masterPath), absoluteExtensionPaths);
    }
    //Validating first. It is supposed that there should be no errors in AST we are testing
    var errors = [];
    var q = hlimpl.createBasicValidationAcceptor(errors, api);
    api.validate(q);
    if (errors.length != 0 && (!expectedErrors || expectedErrors.length == 0)) {
        assert(false, "Unexpected parser errors found:" + errors.map(function (unmatchedError) { return unmatchedError.message; }));
    }
    if (errors.length == 0 && expectedErrors && expectedErrors.length != 0) {
        assert(false, "Expected parser errors not found:" + expectedErrors);
    }
    else if (errors.length != 0 && expectedErrors && expectedErrors.length != 0) {
        var unmatchedErrors = [];
        errors.forEach(function (error) {
            var matchFound = false;
            expectedErrors.forEach(function (expectedError) { if (matchError(error, expectedError))
                matchFound = true; });
            if (!matchFound) {
                unmatchedErrors.push(error);
            }
        });
        if (unmatchedErrors.length > 0) {
            assert(false, "Unexpected parser errors found:" + unmatchedErrors.map(function (unmatchedError) { return unmatchedError.message; }));
        }
        var unmatchedExpectedErrors = [];
        expectedErrors.forEach(function (expectedError) {
            var matchFound = false;
            errors.forEach(function (error) { if (matchError(error, expectedError))
                matchFound = true; });
            if (!matchFound) {
                unmatchedExpectedErrors.push(expectedError);
            }
        });
        if (unmatchedExpectedErrors.length > 0) {
            assert(false, "Expected parser errors not found:" + unmatchedExpectedErrors);
        }
    }
    //now loading AST text from a saved file, serializing AST we parsed and comparing
    var serializedAST = api.testSerialize();
    try {
        compareToFile(serializedAST, data(astPath));
    }
    catch (error) {
        console.log("Serialized AST of " + data(masterPath));
        console.log(serializedAST);
        throw error;
    }
}
exports.testAST = testAST;
function expandHighIfNeeded(original) {
    if (!global.isExpanded)
        return original;
    if (universeHelpers.isLibraryType(original.definition()) && !global.isLibExpanded) {
        return original;
    }
    if (!original)
        return original;
    if (original.wrapperNode == null)
        return original;
    var wrapper = original.wrapperNode();
    if (wrapper == null)
        return original;
    if (wrapper.expand == null)
        return original;
    return (wrapper.expand(global.isLibExpanded)).highLevel();
}
exports.expandHighIfNeeded = expandHighIfNeeded;
function expandWrapperIfNeeded(original) {
    if (!global.isExpanded)
        return original;
    return original.expand(global.isLibExpanded);
}
exports.expandWrapperIfNeeded = expandWrapperIfNeeded;
//# sourceMappingURL=test-utils.js.map