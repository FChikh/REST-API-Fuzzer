"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var yll = require("../../parser/jsyaml/jsyaml2lowLevel");
var high = require("../../parser/highLevelImpl");
var search = require("../search-implementation");
var util = require("../../parser/test/test-utils");
describe('Find usages tests', function () {
    it("inheritance", function () {
        testErrors("data/findUsages/test1.raml", 1);
    });
    it("arrays", function () {
        testErrors("data/findUsages/test2.raml", 1);
    });
    it("unions", function () {
        testErrors("data/findUsages/test3.raml", 1);
    });
    it("field with type", function () {
        testErrors("data/findUsages/test4.raml", 1);
    });
    it("field with type 2", function () {
        testErrors("data/findUsages/test5.raml", 1);
    });
    it("annotations", function () {
        testErrors("data/findUsages/test6.raml", 1);
    });
    it("annotations1", function () {
        testErrors("data/findUsages/test7.raml", 1);
    });
    it("annotations2", function () {
        testErrors("data/findUsages/test8.raml", 1);
    });
    it("runtime struct", function () {
        testErrors("data/findUsages/test9.raml", 1);
    });
    it("runtime struct2", function () {
        testErrors("data/findUsages/test10.raml", 1);
    });
    it("resource types", function () {
        testErrors("data/findUsages/test11.raml", 1);
    });
    it("traits", function () {
        testErrors("data/findUsages/test12.raml", 1);
    });
    it("schemas", function () {
        testErrors("data/findUsages/test13.raml", 1);
    });
    it("types and body", function () {
        testErrors("data/findUsages/test14.raml", 1);
    });
    it("refs in examples", function () {
        testErrors("data/findUsages/test15.raml", 1);
    });
    it("facets", function () {
        testErrors("data/findUsages/test16.raml", 1);
    });
    //it ("signatures 1",function(){
    //    testErrors("data/findUsages/test17.raml",1)
    //});
    //it ("signatures 2",function(){
    //    testErrors("data/findUsages/test18.raml",1)
    //});
});
function testErrors(p, count) {
    var apiData = loadApiAndFixReference(p);
    var nodes = search.findUsages(apiData.api.lowLevel().unit(), apiData.offset);
    assert.equal(nodes.results.length, count);
}
var dir = path.resolve(__dirname, "../../../src/parser/test/");
var pdir = path.resolve(dir, ".");
function loadApiAndFixReference(name) {
    name = path.resolve(dir, name);
    if (!fs.existsSync(name))
        throw new Error("file not found: " + name);
    var content = fs.readFileSync(name).toString();
    var offset = content.indexOf("^");
    var cleaned = content.substr(0, offset) + content.substring(offset + 1);
    var txt = search.extractName(cleaned, offset);
    var p = new yll.Project(pdir);
    var unit = p.unit(name, true);
    unit.updateContent(cleaned);
    var api = high.fromUnit(unit);
    api = util.expandHighIfNeeded(api);
    if (!api)
        throw new Error("couldn't load api from " + name);
    return { api: api, offset: offset, name: txt };
}
exports.loadApiAndFixReference = loadApiAndFixReference;
//testErrors("data/findUsages/test1.raml",1)
//# sourceMappingURL=findUsagesTests.js.map