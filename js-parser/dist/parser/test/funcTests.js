"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var util = require("./test-utils");
var funcUtil = require("./funcUtils");
var xmlutil = require("../../util/xmlutil");
var index = require("../../index");
var parserMod = require("../../parserMod");
var project = require("../../project");
var search = require("../../search/search-interface");
var schema = require("../../schema");
var fs = require("fs");
var universes = require("../tools/universe");
var factory10 = require("../artifacts/raml10factory");
var factory08 = require("../artifacts/raml08factory");
var highLevelImpl = require("../highLevelImpl");
describe('Parser index functions tests', function () {
    this.timeout(15000);
    it("loadRaml", function (done) {
        this.timeout(15000);
        index.loadRAML(util.data("../example-ramls/Instagram/api.raml"), []).then(function (api) {
            try {
                testWrapperDump(api, util.data('./functions/dumps/apiAsync.dump'));
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
    it("getLanguageElementByRuntimeType", function () {
        var api = util.loadApi(util.data('./functions/simple.raml'));
        var type = index.getLanguageElementByRuntimeType(api.wrapperNode().types()[0].runtimeType());
        assert.equal(type.name(), "SomeType");
    });
    it("isFragment", function () {
        var api = util.loadApi(util.data('./functions/simple.raml'));
        assert.equal(index.isFragment(api.wrapperNode()), true);
    });
    it("asFragment", function () {
        var api = util.loadApi(util.data('./functions/simple1.raml'));
        var asFragment = index.asFragment(api.wrapperNode());
        testWrapperDump(asFragment, util.data('./functions/dumps/asFragment.dump'));
    });
});
describe('Parser parserMod functions tests', function () {
    this.timeout(15000);
    it("createTypeDeclaration", function () {
        var typeDecl = parserMod.createTypeDeclaration('SomeType');
        testWrapperDump(typeDecl, util.data('./functions/dumps/createTypeDeclaration.dump'));
    });
    it("createObjectTypeDeclaration", function () {
        var typeDecl = parserMod.createObjectTypeDeclaration('SomeType');
        testWrapperDump(typeDecl, util.data('./functions/dumps/createObjectTypeDeclaration.dump'));
    });
});
describe('Parser project functions tests', function () {
    this.timeout(15000);
    it("createProject", function () {
        var prj = project.createProject(util.data('./functions'));
        var content = prj.unit('simple.raml').contents();
        var api = index.parseRAMLSync(content);
        testWrapperDump(api, util.data('./functions/dumps/createProject.dump'));
    });
});
describe('Parser searchProxy functions tests', function () {
    this.timeout(15000);
    it("determineCompletionKind1", function () {
        var prj = project.createProject(util.data('./functions'));
        var content = prj.unit('simple.raml').contents();
        assert.equal(search.determineCompletionKind(content, 166), search.LocationKind.VALUE_COMPLETION);
    });
    it("determineCompletionKind2", function () {
        var prj = project.createProject(util.data('./functions'));
        var content = prj.unit('simple.raml').contents();
        assert.equal(search.determineCompletionKind(content, 161), search.LocationKind.KEY_COMPLETION);
    });
    it("enumValues", function () {
        var api = util.loadApi(util.data('./functions/simple.raml'));
        var wrapper = api.wrapperNode();
        var resource = wrapper.resources()[0];
        var hl = wrapper.resources()[0].methods()[0].responses()[0].body()[0].highLevel();
        var prop = wrapper.resources()[0].methods()[0].responses()[0].body()[0].highLevel().children()[1].property();
        assert.equal(search.enumValues(prop, hl).length > 0, true);
    });
    it("globalDeclarations", function (done) {
        this.timeout(15000);
        index.loadRAML(util.data('./functions/simple.raml'), []).then(function (wrapper) {
            var expanded = wrapper.expand();
            var globals = search.globalDeclarations(expanded.highLevel());
            try {
                testNodeDump(globals[0], util.data('./functions/dumps/globalDeclarations0.dump'));
                testNodeDump(globals[1], util.data('./functions/dumps/globalDeclarations1.dump'));
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
    it("qName1", function () {
        var api = util.loadApi(util.data('./functions/simple.raml'));
        assert.equal(search.qName(api.wrapperNode().types()[0].highLevel(), api), 'SomeType');
    });
    it("qName2", function () {
        var api = util.loadApi(util.data('./functions/api.raml'));
        var lib = util.loadApi(util.data('./functions/lib.raml'));
        assert.equal(search.qName(lib.wrapperNode().types()[0].highLevel(), api), 'lib.TypeFromLibrary');
    });
    it("qName3", function () {
        var api = util.loadApi(util.data('./functions/simple08.raml'));
        assert.equal(search.qName(api.wrapperNode().traits()[0].highLevel(), api), 'secured');
    });
    it("subTypesWithLocals", function () {
        var api = util.loadApi(util.data('./functions/api.raml'));
        var highLevelNode = api.wrapperNode().types()[0].highLevel();
        var res = search.subTypesWithLocals(highLevelNode.definition(), api);
        assert.equal(JSON.stringify(res), JSON.stringify([]));
    });
    it("nodesDeclaringType", function (done) {
        this.timeout(15000);
        index.loadRAML(util.data('./functions/api.raml'), []).then(function (wrapper) {
            var highLevelNode = wrapper.types()[0].highLevel();
            var res = search.nodesDeclaringType(highLevelNode.definition(), wrapper.highLevel());
            try {
                testNodeDump(res[0], util.data('./functions/dumps/nodesDeclaringType.dump'));
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
    it("findExampleContentType", function () {
        this.timeout(15000);
        var api = util.loadApi(util.data('./functions/api1.raml'));
        var method = api.wrapperNode().resources()[0].methods()[0];
        var example0 = method.body()[0].example();
        var example1 = method.responses()[0].body()[0].example();
        var example2 = method.responses()[1].body()[0].example();
        var example3 = api.wrapperNode().types()[1].example();
        var res0 = search.findExampleContentType(example0.highLevel());
        var res1 = search.findExampleContentType(example1.highLevel());
        var res2 = search.findExampleContentType(example2.highLevel());
        var res3 = search.findExampleContentType(example3.highLevel());
        assert.notEqual(!res0, true);
        assert.notEqual(!res1, true);
        assert.notEqual(!res2, true);
        assert.notEqual(!res3, true);
    });
    it("parseStructuredExample", function () {
        this.timeout(15000);
        var api = util.loadApi(util.data('./functions/api1.raml'));
        var method = api.wrapperNode().resources()[0].methods()[0];
        var type0 = method.body()[0];
        var type1 = method.responses()[0].body()[0];
        var type2 = method.responses()[1].body()[0];
        var type3 = api.wrapperNode().types()[0];
        var example0 = type0.example().highLevel();
        var example1 = type1.example().highLevel();
        var example2 = type2.example().highLevel();
        var example3 = type3.example().highLevel();
        var res0 = search.parseStructuredExample(example0, type0.definition());
        var res1 = search.parseStructuredExample(example1, type1.definition());
        var res2 = search.parseStructuredExample(example2, type2.definition());
        var res3 = search.parseStructuredExample(example3, type3.definition());
        testNodeDump(res0, util.data('./functions/dumps/parseStructuredExample0.dump'));
        testNodeDump(res1, util.data('./functions/dumps/parseStructuredExample1.dump'));
        testNodeDump(res2, util.data('./functions/dumps/parseStructuredExample2.dump'));
        testNodeDump(res3, util.data('./functions/dumps/parseStructuredExample3.dump'));
    });
    it("isExampleNode", function () {
        this.timeout(15000);
        var api = util.loadApi(util.data('./functions/api1.raml'));
        var method = api.wrapperNode().resources()[0].methods()[0];
        var type0 = method.body()[0];
        var type1 = method.responses()[0].body()[0];
        var type2 = method.responses()[1].body()[0];
        var type3 = api.wrapperNode().types()[0];
        var example0 = type0.example().highLevel();
        var example1 = type1.example().highLevel();
        var example2 = type2.example().highLevel();
        var example3 = type3.example().highLevel();
        var res0 = search.isExampleNode(example0);
        var res1 = search.isExampleNode(example1);
        var res2 = search.isExampleNode(example2);
        var res3 = search.isExampleNode(example3);
        assert.equal(res0, true);
        assert.equal(res1, true);
        assert.equal(res2, true);
        assert.equal(res3, true);
    });
    it("referenceTargets", function (done) {
        this.timeout(15000);
        index.loadRAML(util.data('./functions/api1.raml'), []).then(function (wrapper) {
            var highLevelNode = wrapper.types()[0].highLevel();
            var res = search.nodesDeclaringType(highLevelNode.definition(), wrapper.highLevel());
            try {
                var method = wrapper.resources()[0].methods()[0];
                var type0 = method.body()[0].highLevel();
                var type1 = method.responses()[0].body()[0].highLevel();
                var type2 = method.responses()[1].body()[0].highLevel();
                var type3 = wrapper.types()[0].highLevel();
                var res0 = search.referenceTargets(type0.attr('type').property(), type0);
                var res1 = search.referenceTargets(type1.attr('type').property(), type1);
                var res2 = search.referenceTargets(type2.attr('type').property(), type2);
                var res3 = search.referenceTargets(type3.attr('type').property(), type3);
                assert.equal(res0.length > 0, true, "assert0 failed");
                assert.equal(res1.length > 0, true, "assert1 failed");
                assert.equal(res2.length > 0, true, "assert2 failed");
                assert.equal(res3.length > 0, true, "assert3 failed");
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
    it("findUsages", function () {
        this.timeout(15000);
        var api = util.loadApi(util.data('./functions/api1.raml'));
        var unit = api.lowLevel().unit();
        var content = unit.contents();
        var words = ['lib', 'SomeType', 'AnotherType', 'application/json', 'Trait1', 'Scheme1', 'someProp', 'ex1', 'ex2'];
        var res = [];
        words.forEach(function (word) {
            var index = content.indexOf(word) + 1;
            var usages = search.findUsages(unit, index);
            usages && usages.results && usages.results.length > 0 && res.push({ usages: usages, index: index });
        });
        assert.equal(res.length, 4);
    });
    it("findDeclaration", function (done) {
        this.timeout(15000);
        index.loadRAML(util.data('./functions/api1.raml'), []).then(function (wrapper) {
            var api = wrapper.highLevel();
            var unit = api.lowLevel().unit();
            var content = unit.contents();
            var words = ['lib', 'SomeType', 'AnotherType', 'application/json', 'Trait1', 'Scheme1', 'someProp', 'ex1', 'ex2'];
            var res = [];
            words.forEach(function (word) {
                var index = content.indexOf(word) + 1;
                var usages = search.findUsages(unit, index);
                if (usages && usages.results && usages.results.length > 0) {
                    res = res.concat(usages.results);
                }
            });
            var found = [];
            res.forEach(function (node) {
                var valueStart = node.lowLevel().valueStart() > 0 ? node.lowLevel().valueStart() : node.lowLevel()._node.startPosition;
                var offset = valueStart + 2;
                var declaration = search.findDeclaration(unit, offset);
                declaration && found.push(declaration);
            });
            found.push(search.findDeclaration(unit, content.lastIndexOf(('lib.TypeFromLibrary')) + 6));
            try {
                assert.equal(found[5].name(), 'TypeFromLibrary');
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
});
describe('Parser schema functions tests', function () {
    this.timeout(15000);
    it("createSchema xsd", function () {
        var api = util.loadApi(util.data('./functions/simple.raml'));
        var sch = schema.createSchema(getContent('./functions/schemas/xml/simpleSchema.xsd'), api.lowLevel().unit());
        assert(sch.getType(), 'text.xml');
    });
    it("createSchema json", function () {
        var api = util.loadApi(util.data('./functions/simple.raml'));
        var sch = schema.createSchema(getContent('./functions/schemas/json/simpleSchema.json'), api.lowLevel().unit());
        assert(sch.getType(), 'source.json');
    });
    it("getXMLSchema", function () {
        var api = util.loadApi(util.data('./functions/simple.raml'));
        var sch = schema.getXMLSchema(getContent('./functions/schemas/xml/simpleSchema.xsd'));
        assert(sch.getType(), 'text.xml');
    });
    it("getJSONSchema", function () {
        var api = util.loadApi(util.data('./functions/simple.raml'));
        var sch = schema.getJSONSchema(getContent('./functions/schemas/json/simpleSchema.json'), api.lowLevel().unit());
        assert(sch.getType(), 'source.json');
    });
    it("getIncludePath", function () {
        assert.equal(schema.getIncludePath('some/path.json#someRef'), 'some/path.json');
    });
    it("getIncludeReference", function () {
        assert.equal(schema.getIncludeReference('some/path.json#someRef').getIncludePath(), 'some/path.json');
    });
    it("completeReference", function () {
        var cr = schema.completeReference('some/path.json', schema.getIncludeReference('some/path.json#'), getContent('./functions/schemas/json/simpleSchema.json'));
        assert.equal(cr.join(', '), 'title, type, properties, required');
    });
    it("createSchemaModelGenerator", function () {
        var schemaContent = getContent('./functions/schemas/json/simpleSchema.json');
        var api = util.loadApi(util.data('./schema/api-empty.raml'));
        var smg = schema.createSchemaModelGenerator();
        smg.generateTo(api, schemaContent, 'GeneratedFromSchema');
        util.compareToFile(api.lowLevel().unit().contents(), util.data("./functions/createSchemaModelGenerator.raml"), true);
    });
    it("createModelToSchemaGenerator", function () {
        var schemaContent = getContent('./functions/schemas/json/simpleSchema.json');
        var api = util.loadApi(util.data('./functions/simple1.raml'));
        var msg = schema.createModelToSchemaGenerator();
        var sch = msg.generateSchema(api.wrapperNode().types()[0].highLevel());
        util.compareToFileObject(sch, util.data("./functions/dumps/createModelToSchemaGenerator.dump"), true);
    });
});
describe('Parser parser/artifacts factories functions tests', function () {
    this.timeout(15000);
    funcUtil.loadWrappersData();
    it("wrappers test 5", function (done) {
        this.timeout(60000);
        index.loadRAML(util.data('./functions/simple10_1.raml'), []).then(function (wrapper) {
            try {
                Object.keys(funcUtil.found10).forEach(function (key) {
                    if (universes.Universe10[key] && universes.Universe10[key].name) {
                        var name = universes.Universe10[key].name;
                        var nodeWithType = funcUtil.find(wrapper.highLevel(), name);
                        var newWrapper = factory10.buildWrapperNode(new highLevelImpl.ASTNodeImpl(nodeWithType.highLevel.lowLevel(), nodeWithType.highLevel.parent(), nodeWithType.super, nodeWithType.highLevel.property()), false);
                        funcUtil.callMethods(newWrapper, nodeWithType, name);
                    }
                });
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
    it("wrappers test 6", function (done) {
        this.timeout(60000);
        index.loadRAML(util.data('./functions/RAML08/Instagram/api.raml'), []).then(function (wrapper) {
            try {
                Object.keys(funcUtil.found08).forEach(function (key) {
                    if (universes.Universe08[key] && universes.Universe08[key].name) {
                        var name = universes.Universe08[key].name;
                        var nodeWithType = funcUtil.find(wrapper.highLevel(), name);
                        var newWrapper = factory08.buildWrapperNode(new highLevelImpl.ASTNodeImpl(nodeWithType.highLevel.lowLevel(), nodeWithType.highLevel.parent(), nodeWithType.super, nodeWithType.highLevel.property()), false);
                        funcUtil.callMethods(newWrapper, nodeWithType, name);
                    }
                });
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
});
describe('Unit kind tests', function () {
    it("Main RAML unit detection", function (done) {
        index.loadRAML(util.data('./functions/unitKindTests/apiraml'), []).then(function (wrapper) {
            try {
                var unit = wrapper.highLevel().lowLevel().unit();
                assert(unit.isRAMLUnit());
                assert(!xmlutil.isXmlScheme(unit.contents()));
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
    it("Auxiliary RAML unit detection", function (done) {
        index.loadRAML(util.data('./functions/unitKindTests/apiraml'), []).then(function (wrapper) {
            try {
                var mainUnit = wrapper.highLevel().lowLevel().unit();
                var unit = mainUnit.project().unit("./resourceraml");
                assert(unit.isRAMLUnit());
                assert(!xmlutil.isXmlScheme(unit.contents()));
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
    it("Single word text unit unit detection", function (done) {
        index.loadRAML(util.data('./functions/unitKindTests/apiraml'), []).then(function (wrapper) {
            try {
                var mainUnit = wrapper.highLevel().lowLevel().unit();
                var unit = mainUnit.project().unit("./text_1");
                assert(!unit.isRAMLUnit());
                assert(!xmlutil.isXmlScheme(unit.contents()));
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
    it("Multiple words text unit unit detection", function (done) {
        index.loadRAML(util.data('./functions/unitKindTests/apiraml'), []).then(function (wrapper) {
            try {
                var mainUnit = wrapper.highLevel().lowLevel().unit();
                var unit = mainUnit.project().unit("./text_1");
                assert(!unit.isRAMLUnit());
                assert(!xmlutil.isXmlScheme(unit.contents()));
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
    it("XML unit unit detection", function (done) {
        index.loadRAML(util.data('./functions/unitKindTests/apiraml'), []).then(function (wrapper) {
            try {
                var mainUnit = wrapper.highLevel().lowLevel().unit();
                var unit = mainUnit.project().unit("./xml");
                assert(!unit.isRAMLUnit());
                assert(xmlutil.isXmlScheme(unit.contents()));
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
    it("JSON unit unit detection", function (done) {
        index.loadRAML(util.data('./functions/unitKindTests/apiraml'), []).then(function (wrapper) {
            try {
                var mainUnit = wrapper.highLevel().lowLevel().unit();
                var unit = mainUnit.project().unit("./json");
                assert(!unit.isRAMLUnit());
                assert(!xmlutil.isXmlScheme(unit.contents()));
                done();
            }
            catch (exception) {
                done(exception);
            }
        });
    });
});
function createWrappers(highLevel) {
    if (!highLevel) {
        return;
    }
    var wrapper = highLevel.wrapperNode && highLevel.wrapperNode();
    var children1 = (highLevel.children && highLevel.children()) || [];
    var children2 = (highLevel.directChildren && highLevel.directChildren()) || [];
    var children = children1.concat(children2);
    children.forEach(function (child) { return createWrappers(child); });
}
function getContent(relativePath) {
    return fs.readFileSync(util.data(relativePath)).toString();
}
function testNodeDump(api, dumpPath) {
    util.compareDump(api.wrapperNode().toJSON({}), dumpPath, null);
}
function testWrapperDump(api, dumpPath) {
    util.compareDump(api.toJSON({}), dumpPath, null);
}
//# sourceMappingURL=funcTests.js.map