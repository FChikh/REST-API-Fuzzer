"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index = require("../../index");
var testUtil = require("./test-utils");
var assert = require("assert");
describe('RAML Toolbelt Expansion Tests', function () {
    describe('RAML Toolbelt Expansion Tests', function () {
        it("Test 001", function () {
            this.timeout(20000);
            testRAMLToolbeltExample("TypeExpansionTests/RAML-toolbelt-test/ramls/type_collections.raml", "TypeExpansionTests/RAML-toolbelt-test/canonical_forms.js");
        });
    });
});
function testRAMLToolbeltExample(apiPath, dataPath) {
    apiPath = testUtil.data(apiPath);
    dataPath = testUtil.data(dataPath);
    var dataObj = require(dataPath);
    var toCompare = {};
    var apiJSON = index.loadSync(apiPath, { expandTypes: true });
    var apiTypes = apiJSON["specification"]["types"];
    var apiTypesObj = {};
    for (var _i = 0, apiTypes_1 = apiTypes; _i < apiTypes_1.length; _i++) {
        var t = apiTypes_1[_i];
        var t1 = dataObj[t.name];
        if (t1) {
            apiTypesObj[t.name] = t;
            toCompare[t.name] = transformRamlToolbeltTypeObject(t1, t.name);
            transformParserTypeObject(t);
        }
    }
    var diff = testUtil.compare(toCompare, apiTypesObj);
    var filteredDiff = diff.filter(function (x) {
        var p = x.path;
        if (p.match(/\/items\[\d+\]\/name/) || p.match(/^.+anyOf\[\d+\]\/name$/)) {
            return false;
        }
        if (p.match(/displayName$/)) {
            return false;
        }
        if (p.indexOf("typePropertyKind") >= 0) {
            return false;
        }
        return true;
    });
    if (filteredDiff.length != 0) {
        filteredDiff.forEach(function (x) { console.log(x.message("expected", "actual")); });
        assert(false);
    }
}
function transformRamlToolbeltTypeObject(t, name) {
    if (name) {
        t.name = name;
    }
    if (t.displayName == null && t.name != null) {
        t.displayName = t.name;
    }
    var typePropertyValue = t.type;
    if (!Array.isArray(typePropertyValue)) {
        t.type = [typePropertyValue];
    }
    var propsObject = t.properties;
    if (propsObject) {
        for (var _i = 0, _a = Object.keys(propsObject); _i < _a.length; _i++) {
            var pName = _a[_i];
            transformRamlToolbeltTypeObject(propsObject[pName], pName);
        }
    }
    var items = t.items;
    if (Array.isArray(items)) {
        items.forEach(function (x) { return transformRamlToolbeltTypeObject(x, null); });
    }
    else if (items) {
        transformRamlToolbeltTypeObject(items, null);
        t.items = [t.items];
    }
    var anyOf = t.anyOf;
    if (anyOf) {
        anyOf.forEach(function (x) {
            transformRamlToolbeltTypeObject(x, null);
            if (x.displayName == null && t.displayName != null) {
                x.displayName = t.displayName;
            }
        });
    }
    delete t.additionalProperties;
    return t;
}
function transformParserTypeObject(t) {
    var propArr = t.properties;
    if (propArr != null && Array.isArray(propArr)) {
        var propObj = {};
        for (var _i = 0, propArr_1 = propArr; _i < propArr_1.length; _i++) {
            var p = propArr_1[_i];
            propObj[p.name] = p;
        }
        t.properties = propObj;
        for (var _a = 0, propArr_2 = propArr; _a < propArr_2.length; _a++) {
            var p = propArr_2[_a];
            transformParserTypeObject(p);
        }
    }
    var items = t.items;
    if (Array.isArray(items)) {
        items.forEach(function (x) { return transformParserTypeObject(x); });
    }
    else if (items) {
        transformParserTypeObject(items);
    }
    var anyOf = t.anyOf;
    if (Array.isArray(anyOf)) {
        anyOf.forEach(function (x) { return transformParserTypeObject(x); });
    }
    if (t.examples) {
        var examplesObj = {};
        var singleExample = void 0;
        for (var _b = 0, _c = t.examples; _b < _c.length; _b++) {
            var e = _c[_b];
            if (e.name != null) {
                examplesObj[e.name] = e.value;
            }
            else {
                singleExample = e.value;
                break;
            }
        }
        delete t.examples;
        delete t.simplifiedExamples;
        if (Object.keys(examplesObj).length > 0) {
            t.examples = examplesObj;
        }
        else {
            t.example = singleExample;
        }
    }
    delete t.sourceMap;
    delete t.__METADATA__;
    return t;
}
//# sourceMappingURL=ramlToolBeltTypeExpansionTests.js.map