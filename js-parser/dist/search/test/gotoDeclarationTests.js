"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var yll = require("../../parser/jsyaml/jsyaml2lowLevel");
var high = require("../../parser/highLevelImpl");
var search = require("../search-implementation");
var util = require("../../parser/test/test-utils");
describe('Goto declaration tests', function () {
    it("Goto decl1", function () {
        testErrors("data/gotoDeclaration/test1.raml");
    });
    it("Goto decl2", function () {
        testErrors("data/gotoDeclaration/test2.raml");
    });
    it("Goto decl3", function () {
        testErrors("data/gotoDeclaration/test3.raml");
    });
    it("Goto decl4", function () {
        testErrors("data/gotoDeclaration/test4.raml");
    });
    // it ("Goto decl5",function(){
    //     testErrors("data/gotoDeclaration/test5.raml")
    // });
    it("Goto decl6", function () {
        testErrors("data/gotoDeclaration/test6.raml");
    });
    it("Goto decl7", function () {
        testErrors("data/gotoDeclaration/test7.raml");
    });
    it("Goto decl8", function () {
        testErrors("data/gotoDeclaration/test8.raml");
    });
    it("Goto decl9", function () {
        testErrors("data/gotoDeclaration/test9.raml");
    });
    // it ("Goto decl10",function(){
    //     testErrors("data/gotoDeclaration/test10.raml")
    // });
    it("Goto decl11", function () {
        testErrors("data/gotoDeclaration/test11.raml");
    });
    it("Goto decl12", function () {
        testErrors("data/gotoDeclaration/blog-users3/blog-users.raml");
    });
    it("Goto decl13", function () {
        testErrors("data/gotoDeclaration/test12.raml");
    });
    it("Goto decl14", function () {
        testErrors("data/gotoDeclaration/test13.raml");
    });
    it("Goto decl15", function () {
        testErrors("data/gotoDeclaration/test14.raml");
    });
    it("Goto decl16", function () {
        testErrors("data/gotoDeclaration/test15.raml");
    });
});
function testErrors(p) {
    var apiData = loadApiAndFixReference(p);
    var node = search.findDeclaration(apiData.api.lowLevel().unit(), apiData.offset);
    assert.equal(node.name() == apiData.name || (node.name() + ":" == apiData.name) || (node.name() == apiData.name + ":") || (apiData.name.indexOf(node.name()) != -1), true);
    assert.equal(node != null, true);
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
//# sourceMappingURL=gotoDeclarationTests.js.map