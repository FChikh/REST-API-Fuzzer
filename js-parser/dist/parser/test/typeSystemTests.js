"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var apiLoader = require("../apiLoader");
var _ = require("underscore");
var path = require("path");
var util = require("./test-utils");
var tools = require("./testTools");
var dir = path.resolve(__dirname, "../../../src/parser/test/");
describe('To Runtime Tests', function () {
    this.timeout(15000);
    it("Basic inheritance", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "AnotherType"; });
        var supers = mt.runtimeType().superTypes();
        assert.equal(supers.length, 1);
    });
    it("Inheritance 1", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "AnotherType2"; });
        var supers = mt.runtimeType().superTypes();
        assert.equal(supers.length, 1);
    });
    it("Runtime Prop", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "AnotherType2"; });
        var props = mt.runtimeType().properties();
        assert.equal(props.length, 1);
    });
    it("Runtime Prop type", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "AnotherType2"; });
        var props = mt.runtimeType().properties();
        assert.equal(props[0].range().hasValueTypeInHierarchy(), true);
    });
    it("Array type", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "Arr"; });
        var props = mt.runtimeType().properties();
        assert.equal(props.length, 0);
        assert.equal(mt.runtimeType().hasArrayInHierarchy(), true);
        assert.equal(mt.runtimeType().arrayInHierarchy().componentType().properties().length, 1);
    });
    it("Array type 2", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "Arr"; });
        var props = mt.runtimeType().properties();
        assert.equal(props.length, 0);
        assert.equal(mt.runtimeType().isArray(), true);
        assert.equal(mt.runtimeType().array().componentType().properties().length, 1);
    });
    //it ("Array type 3",function(){
    //    var rsm=util.loadApiWrapper1("typeSystem.raml");
    //    var resource = tools.collectionItem(rsm.resources(), 1);
    //    var method = tools.collectionItem(resource.methods(), 0);
    //    var body = tools.collectionItem(method.body(), 0);
    //
    //    var runtimeType = body.runtimeDefinition();
    //
    //    assert.equal(runtimeType.isArray(), false);
    //});
    it("Union Type", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "Un"; });
        var props = mt.runtimeType().properties();
        assert.equal(props.length, 0);
        assert.equal(mt.runtimeType().hasUnionInHierarchy(), true);
        assert.equal(mt.runtimeType().unionInHierarchy().leftType().arrayInHierarchy().componentType().properties().length, 1);
    });
    it("Union Type 2", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "Un"; });
        var props = mt.runtimeType().properties();
        assert.equal(props.length, 0);
        assert.equal(mt.runtimeDefinition().isUnion(), true);
        assert.equal(mt.runtimeDefinition().union().leftType().arrayInHierarchy().componentType().properties().length, 1);
    });
    //it ("Union Type 3",function(){
    //    var rsm=util.loadApiWrapper1("typeSystem.raml");
    //    var resource = tools.collectionItem(rsm.resources(), 0);
    //    var method = tools.collectionItem(resource.methods(), 0);
    //    var body = tools.collectionItem(method.body(), 0);
    //
    //    var runtimeType = body.runtimeDefinition();
    //
    //    assert.equal(runtimeType.isUnion(), false);
    //});
    //it ("Facet access",function(){
    //    var rsm=apiLoader.loadApi(path.resolve(dir,"data/typeSystem.raml"));
    //    var mt=_.find((<RamlWrapper.Api>util.expandWrapperIfNeeded(rsm.getOrElse(null))).types(),x=>x.name()=="Facet");
    //    var z=mt.runtimeType();
    //    var f=z.getAdapter(services.RAMLService).getRepresentationOf().getFixedFacets();
    //    assert.equal(Object.keys(f).length,3);
    //}); Not relevant any more
    it("Value type 1", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "Facet"; });
        var z = mt.runtimeType();
        assert.equal(z.hasValueTypeInHierarchy(), true);
    });
    it("Value type 2", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "Facet"; });
        var z = mt.runtimeType();
        assert.equal(z.isValueType(), true);
    });
    it("Value type 3", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml")).getOrElse(null);
        var resource = tools.collectionItem(rsm.resources(), 2);
        var method = tools.collectionItem(resource.methods(), 0);
        var body = tools.collectionItem(method.body(), 0);
        var runtimeType = body.runtimeDefinition();
        assert.equal(runtimeType.isUnion(), false);
    });
    it("Multiple inheritance", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "T4"; });
        var z = mt.runtimeType();
        var f = z.allProperties();
        assert.equal(f.length, 3);
    });
    it("Inheritance loop", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml"));
        var mt = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "T6"; });
        var z = mt.runtimeType();
        var f = z.allProperties();
        assert.equal(f.length, 3);
    });
    it('Node by runtime type', function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typeSystem.raml")).getOrElse(null);
        var typeNode1 = tools.collectionItem(api.types(), 0);
        var runtimeType = typeNode1.runtimeType();
        var nodeByType = apiLoader.getLanguageElementByRuntimeType(runtimeType);
        assert.equal(typeNode1.name(), nodeByType.name());
    });
});
describe('Nominal Hierarchy Genuine User Defined Tests', function () {
    this.timeout(15000);
    it("Genuine User Defined 1", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml"));
        var type = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "TestType1"; });
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), true);
    });
    it("Genuine User Defined 2", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml"));
        var type = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "TestType2"; });
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), true);
    });
    it("Genuine User Defined 3", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml"));
        var type = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "TestType3"; });
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), true);
    });
    it("Genuine User Defined 4", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml"));
        var type = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "TestType4"; });
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), true);
    });
    it("Genuine User Defined 5", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml"));
        var type = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "TestType5"; });
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), true);
    });
    it("Genuine User Defined 6", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml"));
        var type = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "TestType6"; });
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), true);
    });
    it("Genuine User Defined 7", function () {
        var rsm = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml"));
        var type = _.find(util.expandWrapperIfNeeded(rsm.getOrElse(null)).types(), function (x) { return x.name() == "TestType7"; });
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), true);
    });
    it("Genuine User Defined Method Response 1", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[0];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        console.log("----DEBUG: " + runtimeType.nameId() + "/" + runtimeType.isGenuineUserDefinedType());
        assert.equal(runtimeType.isGenuineUserDefinedType(), false);
    });
    it("Genuine User Defined Method Response 2", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[1];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), false);
    });
    it("Genuine User Defined Method Response 3", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[2];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), false);
    });
    it("Genuine User Defined Method Response 4", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[3];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), false);
    });
    it("Genuine User Defined Method Response 5", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[4];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), false);
    });
    it("Genuine User Defined Method Response 6", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[5];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), true);
    });
    it("Genuine User Defined Method Response 7", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[6];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), false);
    });
    it("Genuine User Defined Method Response 7", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[7];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.isGenuineUserDefinedType(), true);
    });
    it("Genuine User Defined Method Response In hierarchy 1", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[0];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.hasGenuineUserDefinedTypeInHierarchy(), true);
        var userDefinedType = runtimeType.genuineUserDefinedTypeInHierarchy();
        assert.notEqual(userDefinedType, null);
        assert.equal(userDefinedType.nameId(), "TestType1");
    });
    it("Genuine User Defined Method Response In hierarchy 2", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[1];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.hasGenuineUserDefinedTypeInHierarchy(), true);
        var userDefinedType = runtimeType.genuineUserDefinedTypeInHierarchy();
        assert.notEqual(userDefinedType, null);
        assert.equal(userDefinedType.nameId(), "TestType2");
    });
    it("Genuine User Defined Method Response In hierarchy 3", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[2];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.hasGenuineUserDefinedTypeInHierarchy(), true);
        var userDefinedType = runtimeType.genuineUserDefinedTypeInHierarchy();
        assert.notEqual(userDefinedType, null);
        assert.equal(userDefinedType.nameId(), "TestType3");
    });
    it("Genuine User Defined Method Response In hierarchy 4", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[3];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.hasGenuineUserDefinedTypeInHierarchy(), true);
        var userDefinedType = runtimeType.genuineUserDefinedTypeInHierarchy();
        assert.notEqual(userDefinedType, null);
        assert.equal(userDefinedType.nameId(), "TestType4");
    });
    it("Genuine User Defined Method Response In hierarchy 5", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[4];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.hasGenuineUserDefinedTypeInHierarchy(), true);
        var userDefinedType = runtimeType.genuineUserDefinedTypeInHierarchy();
        assert.notEqual(userDefinedType, null);
        assert.equal(userDefinedType.nameId(), "TestType5");
    });
    it("Genuine User Defined Method Response In hierarchy 6", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[5];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.hasGenuineUserDefinedTypeInHierarchy(), true);
        var userDefinedType = runtimeType.genuineUserDefinedTypeInHierarchy();
        assert.notEqual(userDefinedType, null);
        assert.equal(userDefinedType.nameId(), "application/xml");
    });
    it("Genuine User Defined Method Response In hierarchy 7", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[6];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.hasGenuineUserDefinedTypeInHierarchy(), true);
        var userDefinedType = runtimeType.genuineUserDefinedTypeInHierarchy();
        assert.notEqual(userDefinedType, null);
        assert.equal(userDefinedType.nameId(), "TestType7");
    });
    it("Genuine User Defined Method Response In hierarchy 8", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/genuine.raml")).getOrElse(null);
        var method = api.resources()[0].methods()[0];
        var response = method.responses()[7];
        var type = response.body()[0];
        var runtimeType = type.runtimeType();
        assert.equal(runtimeType.hasGenuineUserDefinedTypeInHierarchy(), true);
        var userDefinedType = runtimeType.genuineUserDefinedTypeInHierarchy();
        assert.notEqual(userDefinedType, null);
        assert.equal(userDefinedType.nameId(), "application/json");
    });
    it("Built-in facets for Object type", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/facets.raml")).getOrElse(null);
        var type = api.types()[0];
        var expected = {
            "displayName": "Test Object Type",
            "description": "test object type. type for testing object type built in facets.",
            "minProperties": 1,
            "maxProperties": 2,
            "discriminator": "kind",
            "discriminatorValue": "__MyObjectType__",
            "additionalProperties": false
        };
        var ignore = {
            properties: true,
            enum: true
        };
        testFacets(type, expected, ignore);
    });
    it("Pattern Property RegExp", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/facets.raml")).getOrElse(null);
        var type = api.types()[0];
        var prop = type.runtimeType().properties()[1];
        var regExp = prop.getKeyRegexp();
        assert(regExp == "/[a-z]+/");
    });
    it("Built-in facets for File type", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/facets.raml")).getOrElse(null);
        var type = api.types()[1];
        var expected = {
            "displayName": "Test File Type",
            "description": "test file type. type for testing file type built in facets.",
            "minLength": 1024,
            "maxLength": 8192,
            "fileTypes": ["text/txt", "text/doc"]
        };
        testFacets(type, expected);
    });
    it("Built-in facets for Array type", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/facets.raml")).getOrElse(null);
        var type = api.types()[2];
        var expected = {
            "displayName": "Test Array Type",
            "description": "test array type. type for testing array type built in facets.",
            "minItems": 1,
            "maxItems": 10,
            "uniqueItems": true
        };
        var ignore = {
            items: true
        };
        testFacets(type, expected, ignore);
    });
    it("Built-in facets for String type", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/facets.raml")).getOrElse(null);
        var type = api.types()[3];
        var expected = {
            "displayName": "Test String Type",
            "description": "test string type. type for testing string type built in facets.",
            "minLength": 3,
            "maxLength": 128,
            "enum": ["abcd", "12345"],
            "pattern": "[a-zA-Z0-9]{3,128}",
            "default": "abcd"
        };
        var ignore = {
            items: true
        };
        testFacets(type, expected, ignore);
    });
    it("Built-in facets for Number type", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/facets.raml")).getOrElse(null);
        var type = api.types()[4];
        var expected = {
            "displayName": "Test Number Type",
            "description": "test number type. type for testing number type built in facets.",
            "minimum": 1,
            "maximum": 1000,
            "multipleOf": 5,
            "enum": [15, 20, 25, 30],
            "format": "int8",
            "default": 15
        };
        testFacets(type, expected);
    });
    it("Built-in 'allowedTargets' facet", function () {
        var api = apiLoader.loadApi(path.resolve(dir, "data/typesystem/facets.raml")).getOrElse(null);
        var type = api.annotationTypes()[0];
        var expected = {
            "displayName": "Test Annotation Type",
            "description": "test Annotation type. type for testing annotation type built in 'allowedTarget' facet.",
            "allowedTargets": ["Method", "Resource"]
        };
        var ignore = {};
        api.highLevel().definition().universe().type("StringTypeDeclaration")
            .properties().forEach(function (x) { return ignore[x.nameId()] = true; });
        testFacets(type, expected, ignore, true);
    });
});
function testFacets(typeNode, expected, ignoredProperties, all) {
    if (ignoredProperties === void 0) { ignoredProperties = {}; }
    if (all === void 0) { all = false; }
    var runtimeType = typeNode.runtimeType();
    var fixedBuiltInFacets = all ? runtimeType.allFixedBuiltInFacets() : runtimeType.fixedBuiltInFacets();
    var props = ["displayName", "description"];
    typeNode.highLevel().definition().universe().type(typeNode.kind())
        .properties().filter(function (x) { return !ignoredProperties[x.nameId()]; }).forEach(function (x) {
        props.push(x.nameId());
    });
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var pName = props_1[_i];
        var eVal = expected[pName];
        var aVal = fixedBuiltInFacets[pName];
        assert.notEqual(eVal, null);
        if (Array.isArray(aVal) && Array.isArray(eVal)) {
            aVal = aVal.toString();
            eVal = eVal.toString();
        }
        assert.equal(aVal, eVal);
    }
}
//# sourceMappingURL=typeSystemTests.js.map