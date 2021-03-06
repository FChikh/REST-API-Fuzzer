"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var path = require("path");
var _ = require("underscore");
var wrapperHelper = require("../wrapped-ast/wrapperHelper");
var services = require("../definition-system/ramlServices");
//
//import t3 = require("../artifacts/raml10parser")
//
var util = require("./test-utils");
var dir = path.resolve(__dirname, "../../../src/parser/test/");
function createExampleObject(w, generateFakeExamples) {
    if (generateFakeExamples === void 0) { generateFakeExamples = false; }
    var tp = wrapperHelper.resolveType(w);
    return createExampleObjectFromTypeDefinition(tp, generateFakeExamples);
}
function createExampleObjectFromTypeDefinition(tp, generateFakeExamples) {
    if (generateFakeExamples === void 0) { generateFakeExamples = false; }
    var node = tp.getAdapter(services.RAMLService).getDeclaringNode();
    if (node) {
        return node.parsedType().exampleObject();
    }
}
describe('Example test', function () {
    this.timeout(15000);
    it("Programmers", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "Programmers"; });
        var example = createExampleObject(tp);
        assert.deepEqual(example, [{ "name": "Pavel", "lastname": "Petrochenko", "age": 33, "knowsLanguages": ["Java", "C++"] }]);
    });
    it("Programmer", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "Programmer"; });
        var example = createExampleObject(tp);
        assert.deepEqual(example, { "name": "Pavel", "lastname": "Petrochenko", "age": 33, "knowsLanguages": ["Java", "C++"] });
    });
    it("Dog", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "Dog"; });
        var example = createExampleObject(tp);
        assert.deepEqual(example, { "name": "Dog", "age": "33" });
    });
    it("Dog2", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "Dog2"; });
        var example = createExampleObject(tp);
        assert.deepEqual(example, { "name": "Dog", "age": 33 });
    });
    it("ManWithDog", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "ManWithDog"; });
        var example = createExampleObject(tp);
        assert.deepEqual(example, { "name": "Pavel", "d": { "name": "Dog", "age": 33 } });
    });
    it("ManWithDog2", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "ManWithDog2"; });
        var example = createExampleObject(tp);
        assert.deepEqual(example, { "name": "Pavel", "d": { "name": "Dog", "age": 33 } });
    });
    it("Amount", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "Amount"; });
        var example = createExampleObject(tp);
        assert.deepEqual(example, 30);
    });
    it("Amounts", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "Amounts"; });
        var example = createExampleObject(tp);
        assert.deepEqual(example, [30]);
    });
    it("ManWithExamples", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "ManWithExamples"; });
        var example = createExampleObject(tp);
        assert.deepEqual(example, { "mmm": "2" });
    });
    it("IAmUnion", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "IAmUnion"; });
        var example = createExampleObject(tp);
        assert.deepEqual(example, 30);
    });
    it("IAmNumber", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "RecordId"; });
        var example = createExampleObject(tp, true);
        assert.deepEqual(example, 1);
    });
    it("IAmBool", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e1.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "MYBool"; });
        var example = createExampleObject(tp, true);
        assert.deepEqual(example, true);
    });
    it("User", function () {
        var api = wrapperHelper.load(path.resolve(dir, "data/exampleGen/e7.raml"));
        api = util.expandWrapperIfNeeded(api);
        var tp = _.find(api.types(), function (x) { return x.name() == "User"; });
        var example = createExampleObject(tp);
        assert.deepEqual(example, {
            "firstname": "Juan",
            "lastname": "Coen",
            "age": "31",
            "id": 12345678,
            "department": {
                "name": "Engineering"
            }
        });
    });
});
//# sourceMappingURL=exampleGenTests.js.map