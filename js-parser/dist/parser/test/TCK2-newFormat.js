"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ATTENTION !!! The file is generated. Manual changes will be overridden by the nearest build.
 */
var tckUtil = require("./scripts/tckUtil");
describe('Complete TCK Test Set For New JSON Format', function () {
    describe('node-sources', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/node-sources/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/node-sources/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/node-sources/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/node-sources/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/node-sources/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/node-sources/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/node-sources/test007/api.raml" });
        });
    });
    describe('parametrs-inheritance/headers', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/parametrs-inheritance/headers/test001/api.raml" });
        });
    });
    describe('parametrs-inheritance/query-parameters', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/parametrs-inheritance/query-parameters/test001/api.raml" });
        });
    });
    describe('parametrs-inheritance/responses', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/parametrs-inheritance/responses/test001/api.raml" });
        });
    });
    describe('parametrs-inheritance/uri-parameters', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/parametrs-inheritance/uri-parameters/test001/api.raml" });
        });
    });
    describe('raml-0.8', function () {
        it("Instagram/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Instagram/api.raml" });
        });
    });
    describe('raml-0.8/Api', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Api/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Api/test002/api.raml" });
        });
    });
    describe('raml-0.8/Bodies', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Bodies/test001/api.raml" });
        });
    });
    describe('raml-0.8/Documentation', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Documentation/test001/api.raml" });
        });
    });
    describe('raml-0.8/Examples', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Examples/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Examples/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Examples/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Examples/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Examples/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Examples/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Examples/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Examples/test008/api.raml" });
        });
    });
    describe('raml-0.8/Form Parameters', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Form Parameters/test001/api.raml" });
        });
    });
    describe('raml-0.8/ImplicitDefaultMediaTypeUsage', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ImplicitDefaultMediaTypeUsage/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ImplicitDefaultMediaTypeUsage/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ImplicitDefaultMediaTypeUsage/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ImplicitDefaultMediaTypeUsage/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ImplicitDefaultMediaTypeUsage/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ImplicitDefaultMediaTypeUsage/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ImplicitDefaultMediaTypeUsage/test007/api.raml" });
        });
    });
    describe('raml-0.8/MediaTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/MediaTypes/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/MediaTypes/test002/api.raml" });
        });
    });
    describe('raml-0.8/MethodResponses', function () {
        it("test001/methResp06.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/MethodResponses/test001/methResp06.raml" });
        });
    });
    describe('raml-0.8/Parameters', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Parameters/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Parameters/test002/api.raml" });
        });
    });
    describe('raml-0.8/ResourceTypes', function () {
        it("test001/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test001/apiInvalid.raml" });
        });
        it("test001/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test001/apiValid.raml" });
        });
        it("test002/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test002/apiInvalid.raml" });
        });
        it("test002/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test002/apiValid.raml" });
        });
        it("test003/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test003/apiInvalid.raml" });
        });
        it("test003/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test003/apiValid.raml" });
        });
        it("test004/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test004/apiInvalid.raml" });
        });
        it("test004/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test004/apiValid.raml" });
        });
        it("test005/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test005/apiInvalid.raml" });
        });
        it("test005/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test005/apiValid.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/ResourceTypes/test008/api.raml" });
        });
    });
    describe('raml-0.8/Schemas', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/test006/api.raml" });
        });
    });
    describe('raml-0.8/Schemas/scalarTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/scalarTypes/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/scalarTypes/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/scalarTypes/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/scalarTypes/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/scalarTypes/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/scalarTypes/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/scalarTypes/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Schemas/scalarTypes/test008/api.raml" });
        });
    });
    describe('raml-0.8/SecuritySchemes', function () {
        it("test001/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/SecuritySchemes/test001/apiInvalid.raml" });
        });
        it("test001/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/SecuritySchemes/test001/apiValid.raml" });
        });
        it("test002/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/SecuritySchemes/test002/apiInvalid.raml" });
        });
        it("test002/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/SecuritySchemes/test002/apiValid.raml" });
        });
        it("test003/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/SecuritySchemes/test003/apiInvalid.raml" });
        });
        it("test003/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/SecuritySchemes/test003/apiValid.raml" });
        });
        it("test004/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/SecuritySchemes/test004/apiInvalid.raml" });
        });
        it("test004/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/SecuritySchemes/test004/apiValid.raml" });
        });
    });
    describe('raml-0.8/Traits', function () {
        it("test001/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Traits/test001/apiInvalid.raml" });
        });
        it("test001/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Traits/test001/apiValid.raml" });
        });
        it("test002/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Traits/test002/apiInvalid.raml" });
        });
        it("test002/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Traits/test002/apiValid.raml" });
        });
        it("test003/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Traits/test003/apiInvalid.raml" });
        });
        it("test003/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Traits/test003/apiValid.raml" });
        });
        it("test004/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Traits/test004/apiInvalid.raml" });
        });
        it("test004/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/Traits/test004/apiValid.raml" });
        });
    });
    describe('raml-0.8/https', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-0.8/https/test001/api.raml" });
        });
    });
    describe('raml-1.0/Annotations', function () {
        it("test001/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test001/apiInvalid.raml" });
        });
        it("test001/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test001/apiValid.raml" });
        });
        it("test002/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test002/apiInvalid.raml" });
        });
        it("test002/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test002/apiValid.raml" });
        });
        it("test003/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test003/apiInvalid.raml" });
        });
        it("test003/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test003/apiValid.raml" });
        });
        it("test004/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test004/apiInvalid.raml" });
        });
        it("test004/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test004/apiValid.raml" });
        });
        it("test005/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test005/apiInvalid.raml" });
        });
        it("test005/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test005/apiValid.raml" });
        });
        it("test006/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test006/apiInvalid.raml" });
        });
        it("test006/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test006/apiValid.raml" });
        });
        it("test006/apiValid1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test006/apiValid1.raml" });
        });
        it("test007/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test007/apiInvalid.raml" });
        });
        it("test007/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test007/apiValid.raml" });
        });
        it("test008/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test008/apiInvalid.raml" });
        });
        it("test008/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test008/apiValid.raml" });
        });
        it("test009/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test009/apiInvalid.raml" });
        });
        it("test009/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test009/apiValid.raml" });
        });
        it("test010/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test010/apiInvalid.raml" });
        });
        it("test010/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test010/apiValid.raml" });
        });
        it("test011/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test011/apiInvalid.raml" });
        });
        it("test011/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test011/apiValid.raml" });
        });
        it("test012/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test012/apiInvalid.raml" });
        });
        it("test012/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test012/apiValid.raml" });
        });
        it("test013/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test013/apiInvalid.raml" });
        });
        it("test013/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test013/apiValid.raml" });
        });
        it("test014/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test014/apiInvalid.raml" });
        });
        it("test014/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test014/apiValid.raml" });
        });
        it("test015/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test015/apiInvalid.raml" });
        });
        it("test015/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test015/apiValid.raml" });
        });
        it("test016/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test016/apiInvalid.raml" });
        });
        it("test016/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test016/apiValid.raml" });
        });
        it("test017/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test017/apiInvalid.raml" });
        });
        it("test017/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test017/apiValid.raml" });
        });
        it("test018/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test018/apiInvalid.raml" });
        });
        it("test018/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test018/apiValid.raml" });
        });
        it("test019/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test019/apiInvalid.raml" });
        });
        it("test019/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test019/apiValid.raml" });
        });
        it("test020/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test020/apiInvalid.raml" });
        });
        it("test020/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test020/apiValid.raml" });
        });
        it("test021/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test021/apiInvalid.raml" });
        });
        it("test021/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test021/apiValid.raml" });
        });
        it("test022/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test022/apiInvalid.raml" });
        });
        it("test022/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test022/apiValid.raml" });
        });
        it("test023/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test023/apiInvalid.raml" });
        });
        it("test023/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test023/apiValid.raml" });
        });
        it("test024/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test024/apiInvalid.raml" });
        });
        it("test024/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test024/apiValid.raml" });
        });
        it("test025/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test025/apiInvalid.raml" });
        });
        it("test025/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test025/apiValid.raml" });
        });
        it("test026/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test026/apiInvalid.raml" });
        });
        it("test026/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test026/apiValid.raml" });
        });
        it("test027/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test027/api.raml" });
        });
        it("test028/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test028/api.raml" });
        });
        it("test029/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test029/api.raml" });
        });
        it("test030/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test030/api.raml" });
        });
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test031/api.raml" });
        });
        it("test032/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test032/api.raml" });
        });
        it("test033/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test033/api.raml" });
        });
        it("test034/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test034/api.raml" });
        });
        it("test035/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test035/api.raml" });
        });
        it("test036/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test036/api.raml" });
        });
        it("test037/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test037/api.raml" });
        });
        it("test039/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test039/api.raml" });
        });
        it("test040/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test040/api.raml" });
        });
        it("test041/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test041/api.raml" });
        });
        it("test042/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test042/api.raml" });
        });
        it("test043/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test043/api.raml" });
        });
        it("test044/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test044/api.raml" });
        });
        it("test045/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test045/api.raml" });
        });
        it("test046/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/test046/api.raml" });
        });
    });
    describe('raml-1.0/Annotations/scalars', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test008/api.raml" });
        });
        it("test009/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test009/api.raml" });
        });
        it("test010/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test010/api.raml" });
        });
        it("test011/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test011/api.raml" });
        });
        it("test012/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test012/api.raml" });
        });
        it("test013/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test013/api.raml" });
        });
        it("test014/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test014/api.raml" });
        });
        it("test015/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test015/api.raml" });
        });
        it("test016/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test016/api.raml" });
        });
        it("test017/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test017/api.raml" });
        });
        it("test018/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test018/api.raml" });
        });
        it("test019/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test019/api.raml" });
        });
        it("test020/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test020/api.raml" });
        });
        it("test021/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test021/api.raml" });
        });
        it("test022/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test022/api.raml" });
        });
        it("test023/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test023/api.raml" });
        });
        it("test024/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test024/api.raml" });
        });
        it("test025/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test025/api.raml" });
        });
        it("test026/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test026/api.raml" });
        });
        it("test027/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test027/api.raml" });
        });
        it("test028/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test028/api.raml" });
        });
        it("test029/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test029/api.raml" });
        });
        it("test030/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test030/api.raml" });
        });
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test031/api.raml" });
        });
        it("test032/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test032/api.raml" });
        });
        it("test033/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test033/api.raml" });
        });
        it("test034/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test034/api.raml" });
        });
        it("test035/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test035/api.raml" });
        });
        it("test036/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test036/api.raml" });
        });
        it("test037/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test037/api.raml" });
        });
        it("test038/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test038/api.raml" });
        });
        it("test039/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test039/api.raml" });
        });
        it("test040/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test040/api.raml" });
        });
        it("test041/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test041/api.raml" });
        });
        it("test042/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test042/api.raml" });
        });
        it("test043/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test043/api.raml" });
        });
        it("test044/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test044/api.raml" });
        });
        it("test045/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test045/api.raml" });
        });
        it("test046/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test046/api.raml" });
        });
        it("test047/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test047/api.raml" });
        });
        it("test048/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test048/api.raml" });
        });
        it("test049/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test049/api.raml" });
        });
        it("test050/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test050/api.raml" });
        });
        it("test051/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test051/api.raml" });
        });
        it("test052/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test052/api.raml" });
        });
        it("test053/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test053/api.raml" });
        });
        it("test054/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test054/api.raml" });
        });
        it("test055/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test055/api.raml" });
        });
        it("test056/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Annotations/scalars/test056/api.raml" });
        });
    });
    describe('raml-1.0/Api', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test008/api.raml" });
        });
        it("test009/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test009/api.raml" });
        });
        it("test010/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test010/api.raml" });
        });
        it("test011/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test011/api.raml" });
        });
        it("test012/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test012/api.raml" });
        });
        it("test013/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test013/api.raml" });
        });
        it("test014/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test014/api.raml" });
        });
        it("test015/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test015/api.raml" });
        });
        it("test016/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test016/api.raml" });
        });
        it("test017/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test017/api.raml" });
        });
        it("test018/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test018/api.raml" });
        });
        it("test019/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test019/api.raml" });
        });
        it("test020/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test020/api.raml" });
        });
        it("test021/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test021/api.raml" });
        });
        it("test022/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test022/api.raml" });
        });
        it("test023/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test023/api.raml" });
        });
        it("test024/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test024/api.raml" });
        });
        it("test025/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test025/api.raml" });
        });
        it("test026/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test026/api.raml" });
        });
        it("test027/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test027/api.raml" });
        });
        it("test028/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test028/api.raml" });
        });
        it("test029/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test029/api.raml" });
        });
        it("test030/emptyApi.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test030/emptyApi.raml" });
        });
        it("test031/emptyApiNewLine.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test031/emptyApiNewLine.raml" });
        });
        it("test032/emptyApi2NewLine.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test032/emptyApi2NewLine.raml" });
        });
        it("test033/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test033/api.raml" });
        });
        it("test034/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test034/api.raml" });
        });
        it("test035/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test035/api.raml" });
        });
        it("test036/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test036/apiInvalid.raml" });
        });
        it("test036/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test036/apiValid.raml" });
        });
        it("test037/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test037/api.raml" });
        });
        it("test038/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test038/api.raml" });
        });
        it("test039/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Api/test039/api.raml" });
        });
    });
    describe('raml-1.0/Examples', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test008/api.raml" });
        });
        it("test009/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test009/api.raml" });
        });
        it("test010/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test010/api.raml" });
        });
        it("test011/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test011/api.raml" });
        });
        it("test012/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test012/api.raml" });
        });
        it("test013/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test013/api.raml" });
        });
        it("test014/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test014/api.raml" });
        });
        it("test015/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test015/api.raml" });
        });
        it("test016/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test016/api.raml" });
        });
        it("test017/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test017/api.raml" });
        });
        it("test018/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test018/api.raml" });
        });
        it("test019/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test019/api.raml" });
        });
        it("test020/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test020/api.raml" });
        });
        it("test021/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test021/api.raml" });
        });
        it("test022/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test022/api.raml" });
        });
        it("test023/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test023/api.raml" });
        });
        it("test024/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test024/api.raml" });
        });
        it("test025/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test025/api.raml" });
        });
        it("test026/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test026/api.raml" });
        });
        it("test027/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test027/api.raml" });
        });
        it("test028/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test028/api.raml" });
        });
        it("test029/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test029/api.raml" });
        });
        it("test030/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test030/api.raml" });
        });
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test031/api.raml" });
        });
        it("test032/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test032/api.raml" });
        });
        it("test033/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test033/api.raml" });
        });
        it("test034/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test034/api.raml" });
        });
        it("test035/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test035/api.raml" });
        });
        it("test036/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test036/api.raml" });
        });
        it("test037/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test037/api.raml" });
        });
        it("test038/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test038/api.raml" });
        });
        it("test039/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test039/api.raml" });
        });
        it("test040/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test040/api.raml" });
        });
        it("test041/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test041/api.raml" });
        });
        it("test042/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test042/api.raml" });
        });
        it("test043/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test043/api.raml" });
        });
        it("test044/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test044/api.raml" });
        });
        it("test045/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test045/api.raml" });
        });
        it("test046/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test046/api.raml" });
        });
        it("test047/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test047/api.raml" });
        });
        it("test048/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test048/api.raml" });
        });
        it("test049/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test049/api.raml" });
        });
        it("test050/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test050/api.raml" });
        });
        it("test051/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test051/api.raml" });
        });
        it("test052/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test052/api.raml" });
        });
        it("test053/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test053/lib.raml" });
        });
        it("test054/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test054/lib.raml" });
        });
        it("test055/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test055/lib.raml" });
        });
        it("test056/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test056/lib.raml" });
        });
        it("test057/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test057/lib.raml" });
        });
        it("test058/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test058/api.raml" });
        });
        it("test059/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test059/api.raml" });
        });
        it("test060/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test060/api.raml" });
        });
        it("test061/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test061/api.raml" });
        });
        it("test062/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test062/lib.raml" });
        });
        it("test063/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test063/lib.raml" });
        });
        it("test064/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test064/api.raml" });
        });
        it("test065/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test065/api.raml" });
        });
        it("test066/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test066/api.raml" });
        });
        it("test067/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test067/api.raml" });
        });
        it("test068/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test068/api.raml" });
        });
        it("test069/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test069/api.raml" });
        });
        it("test070/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test070/api.raml" });
        });
        it("test071/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test071/api.raml" });
        });
        it("test072/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test072/api.raml" });
        });
        it("test073/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test073/api.raml" });
        });
        it("test074/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test074/api.raml" });
        });
        it("test075/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test075/api.raml" });
        });
        it("test076/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test076/api.raml" });
        });
        it("test077/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test077/api.raml" });
        });
        it("test078/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test078/api.raml" });
        });
        it("test079/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test079/api.raml" });
        });
        it("test080/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test080/api.raml" });
        });
        it("test081/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Examples/test081/api.raml" });
        });
    });
    describe('raml-1.0/Extensions', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Extensions/test001/api.raml", "extensions": ["TCK-newFormat/raml-1.0/Extensions/test001/e1.raml", "TCK-newFormat/raml-1.0/Extensions/test001/e2.raml"] });
        });
    });
    describe('raml-1.0/Fragments', function () {
        it("test001/fragment.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test001/fragment.raml" });
        });
        it("test002/securitySchemeFragment.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test002/securitySchemeFragment.raml" });
        });
        it("test004/DataType.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test004/DataType.raml" });
        });
        it("test005/Trait.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test005/Trait.raml" });
        });
        it("test006/Example1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test006/Example1.raml" });
        });
        it("test006/Example2.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test006/Example2.raml" });
        });
        it("test006/Example3.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test006/Example3.raml" });
        });
        it("test007/annotation1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test007/annotation1.raml" });
        });
        it("test007/annotation2.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test007/annotation2.raml" });
        });
        it("test010/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test010/api.raml" });
        });
        it("test011/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test011/api.raml" });
        });
        it("test012/type.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test012/type.raml" });
        });
        it("test013/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test013/api.raml" });
        });
        it("test014/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test014/api.raml" });
        });
        it("test015/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test015/api.raml" });
        });
        it("test016/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Fragments/test016/api.raml" });
        });
    });
    describe('raml-1.0/HTTPS', function () {
        it("api001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/HTTPS/api001/api.raml" });
        });
    });
    describe('raml-1.0/ImplicitDefaultMediaTypeUsage', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ImplicitDefaultMediaTypeUsage/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ImplicitDefaultMediaTypeUsage/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ImplicitDefaultMediaTypeUsage/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ImplicitDefaultMediaTypeUsage/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ImplicitDefaultMediaTypeUsage/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ImplicitDefaultMediaTypeUsage/test006/api.raml" });
        });
    });
    describe('raml-1.0/Libraries', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Libraries/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Libraries/test002/api.raml" });
        });
        it("test003/index.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Libraries/test003/index.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Libraries/test004/api.raml" });
        });
        it("test005/lib1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Libraries/test005/lib1.raml" });
        });
        it("test005/lib2.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Libraries/test005/lib2.raml" });
        });
        it("test006/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Libraries/test006/lib.raml" });
        });
        it("test007/lib1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Libraries/test007/lib1.raml" });
        });
        it("test007/lib2.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Libraries/test007/lib2.raml" });
        });
    });
    describe('raml-1.0/MediaTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/MediaTypes/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/MediaTypes/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/MediaTypes/test003/api.raml" });
        });
    });
    describe('raml-1.0/MethodResponses', function () {
        it("test001/methResp01.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/MethodResponses/test001/methResp01.raml" });
        });
        it("test002/methResp02.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/MethodResponses/test002/methResp02.raml" });
        });
        it("test003/methResp03.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/MethodResponses/test003/methResp03.raml" });
        });
        it("test004/methResp04.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/MethodResponses/test004/methResp04.raml" });
        });
        it("test005/methResp05.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/MethodResponses/test005/methResp05.raml" });
        });
        it("test006/methResp06.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/MethodResponses/test006/methResp06.raml" });
        });
    });
    describe('raml-1.0/Methods', function () {
        it("test001/meth01.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test001/meth01.raml" });
        });
        it("test002/meth02.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test002/meth02.raml" });
        });
        it("test003/meth03.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test003/meth03.raml" });
        });
        it("test004/meth04.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test004/meth04.raml" });
        });
        it("test005/meth05.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test005/meth05.raml" });
        });
        it("test006/meth06.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test006/meth06.raml" });
        });
        it("test007/meth07.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test007/meth07.raml" });
        });
        it("test008/meth08.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test008/meth08.raml" });
        });
        it("test009/meth09.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test009/meth09.raml" });
        });
        it("test010/meth10.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test010/meth10.raml" });
        });
        it("test011/meth11.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test011/meth11.raml" });
        });
        it("test012/meth12.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test012/meth12.raml" });
        });
        it("test013/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test013/api.raml" });
        });
        it("test014/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Methods/test014/api.raml" });
        });
    });
    describe('raml-1.0/Others', function () {
        it("baseuri/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Others/baseuri/api.raml" });
        });
        it("Instagram1.0/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Others/Instagram1.0/api.raml" });
        });
        it("world-music-api/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Others/world-music-api/api.raml" });
        });
    });
    describe('raml-1.0/Others/overlays&extensions', function () {
        it("extension/extension.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Others/overlays&extensions/extension/extension.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Others/overlays&extensions/extension/master-tck.json" });
        });
        it("overlay/slave.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Others/overlays&extensions/overlay/slave.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Others/overlays&extensions/overlay/master-tck.json" });
        });
    });
    describe('raml-1.0/Overlays', function () {
        it("test001/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test001/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test001/api-tck.json" });
        });
        it("test002/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test002/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test002/api-tck.json" });
        });
        it("test003/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test003/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test003/api-tck.json" });
        });
        it("test004/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test004/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test004/api-tck.json" });
        });
        it("test005/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test005/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test005/api-tck.json" });
        });
        it("test006/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test006/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test006/api-tck.json" });
        });
        it("test007/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test007/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test007/api-tck.json" });
        });
        it("test008/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test008/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test008/api-tck.json" });
        });
        it("test009/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test009/api.raml", "extensions": ["TCK-newFormat/raml-1.0/Overlays/test009/NewOverlay.raml", "TCK-newFormat/raml-1.0/Overlays/test009/NewOverlay2.raml"] });
        });
        it("test010/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test010/api.raml", "extensions": ["TCK-newFormat/raml-1.0/Overlays/test010/NewOverlay.raml", "TCK-newFormat/raml-1.0/Overlays/test010/NewExtension2.raml"] });
        });
        it("test011/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test011/api.raml", "extensions": ["TCK-newFormat/raml-1.0/Overlays/test011/NewOverlay.raml", "TCK-newFormat/raml-1.0/Overlays/test011/NewExtension2.raml", "TCK-newFormat/raml-1.0/Overlays/test011/NewExtension3.raml"] });
        });
        it("test012/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test012/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test012/api-tck.json" });
        });
        it("test013/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test013/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test013/api-tck.json" });
        });
        it("test014/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test014/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test014/api-tck.json" });
        });
        it("test015/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test015/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test015/api-tck.json" });
        });
        it("test016/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test016/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test016/api-tck.json" });
        });
        it("test017/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test017/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test017/api-tck.json" });
        });
        it("test018/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test018/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test018/api-tck.json" });
        });
        it("test019/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test019/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test019/api-tck.json" });
        });
        it("test020/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test020/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test020/api-tck.json" });
        });
        it("test021/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test021/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test021/api-tck.json" });
        });
        it("test022/NewOverlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test022/NewOverlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test022/api-tck.json" });
        });
        it("test023/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test023/api.raml", "extensions": ["TCK-newFormat/raml-1.0/Overlays/test023/NewOverlay.raml", "TCK-newFormat/raml-1.0/Overlays/test023/NewOverlay2.raml"] });
        });
        it("test024/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test024/api.raml", "extensions": ["TCK-newFormat/raml-1.0/Overlays/test024/NewOverlay.raml", "TCK-newFormat/raml-1.0/Overlays/test024/NewOverlay2.raml"] });
        });
        it("test025/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test025/api.raml", "extensions": ["TCK-newFormat/raml-1.0/Overlays/test025/NewOverlay.raml", "TCK-newFormat/raml-1.0/Overlays/test025/NewOverlay2.raml"] });
        });
        it("test026/apigateway-aws-overlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test026/apigateway-aws-overlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test026/apigateway-tck.json" });
        });
        it("test027/overlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test027/overlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test027/api-tck.json" });
        });
        it("test028/overlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test028/overlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test028/api-tck.json" });
        });
        it("test029/overlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test029/overlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test029/api-tck.json" });
        });
        it("test030/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test030/api.raml", "extensions": ["TCK-newFormat/raml-1.0/Overlays/test030/o1.raml", "TCK-newFormat/raml-1.0/Overlays/test030/o2.raml"] });
        });
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test031/api.raml", "extensions": ["TCK-newFormat/raml-1.0/Overlays/test031/o1.raml", "TCK-newFormat/raml-1.0/Overlays/test031/o2.raml"] });
        });
        it("test032/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test032/api.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test032/base-tck.json" });
        });
        it("test034/overlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Overlays/test034/overlay.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/Overlays/test034/master-tck.json" });
        });
    });
    describe('raml-1.0/ReferencesPatching/Annotations', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Annotations/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Annotations/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Annotations/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Annotations/test004/api.raml" });
        });
    });
    describe('raml-1.0/ReferencesPatching/Fragments', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Fragments/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Fragments/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Fragments/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Fragments/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Fragments/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Fragments/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Fragments/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Fragments/test008/api.raml" });
        });
        it("test009/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Fragments/test009/lib.raml" });
        });
    });
    describe('raml-1.0/ReferencesPatching/ResourceTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/ResourceTypes/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/ResourceTypes/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/ResourceTypes/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/ResourceTypes/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/ResourceTypes/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/ResourceTypes/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/ResourceTypes/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/ResourceTypes/test008/api.raml" });
        });
    });
    describe('raml-1.0/ReferencesPatching/SecuritySchemes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/SecuritySchemes/test001/api.raml" });
        });
    });
    describe('raml-1.0/ReferencesPatching/Traits', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Traits/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Traits/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Traits/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ReferencesPatching/Traits/test004/api.raml" });
        });
    });
    describe('raml-1.0/ResourceTypes', function () {
        it("test001/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test001/apiValid.raml" });
        });
        it("test002/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test002/apiValid.raml" });
        });
        it("test003/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test003/apiInvalid.raml" });
        });
        it("test003/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test003/apiValid.raml" });
        });
        it("test004/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test004/apiInvalid.raml" });
        });
        it("test004/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test004/apiValid.raml" });
        });
        it("test005/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test005/apiInvalid.raml" });
        });
        it("test005/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test005/apiValid.raml" });
        });
        it("test006/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test006/apiInvalid.raml" });
        });
        it("test006/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test006/apiValid.raml" });
        });
        it("test007/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test007/apiInvalid.raml" });
        });
        it("test007/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test007/apiValid.raml" });
        });
        it("test008/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test008/apiInvalid.raml" });
        });
        it("test008/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test008/apiValid.raml" });
        });
        it("test009/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test009/apiInvalid.raml" });
        });
        it("test009/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test009/apiValid.raml" });
        });
        it("test010/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test010/apiInvalid.raml" });
        });
        it("test010/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test010/apiValid.raml" });
        });
        it("test011/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test011/apiInvalid.raml" });
        });
        it("test011/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test011/apiValid.raml" });
        });
        it("test012/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test012/api.raml" });
        });
        it("test013/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test013/api.raml" });
        });
        it("test014/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test014/api.raml" });
        });
        it("test015/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test015/api.raml" });
        });
        it("test016/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test016/api.raml" });
        });
        it("test017/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test017/api.raml" });
        });
        it("test018/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test018/api.raml" });
        });
        it("test019/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test019/api.raml" });
        });
        it("test020/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test020/api.raml" });
        });
        it("test021/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test021/api.raml" });
        });
        it("test022/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test022/api.raml" });
        });
        it("test023/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test023/api.raml" });
        });
        it("test024/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test024/api.raml" });
        });
        it("test025/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test025/api.raml" });
        });
        it("test026/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test026/api.raml" });
        });
        it("test027/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test027/api.raml" });
        });
        it("test028/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test028/api.raml" });
        });
        it("test029/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test029/api.raml" });
        });
        it("test030/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test030/api.raml" });
        });
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test031/api.raml" });
        });
        it("test032/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test032/api.raml" });
        });
        it("test033/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test033/api.raml" });
        });
        it("test034/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test034/api.raml" });
        });
        it("test035/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test035/api.raml" });
        });
        it("test036/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test036/api.raml" });
        });
        it("test037/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test037/api.raml" });
        });
        it("test038/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test038/api.raml" });
        });
        it("test039/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test039/api.raml" });
        });
        it("test040/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/ResourceTypes/test040/api.raml" });
        });
    });
    describe('raml-1.0/Resources', function () {
        it("test001/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test001/apiInvalid.raml" });
        });
        it("test001/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test001/apiValid.raml" });
        });
        it("test002/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test002/apiInvalid.raml" });
        });
        it("test002/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test002/apiValid.raml" });
        });
        it("test003/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test003/apiInvalid.raml" });
        });
        it("test003/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test003/apiValid.raml" });
        });
        it("test004/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test004/apiInvalid.raml" });
        });
        it("test004/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test004/apiValid.raml" });
        });
        it("test005/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test005/apiInvalid.raml" });
        });
        it("test005/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test005/apiValid.raml" });
        });
        it("test006/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test006/apiInvalid.raml" });
        });
        it("test006/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test006/apiValid.raml" });
        });
        it("test007/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test007/apiInvalid.raml" });
        });
        it("test007/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test007/apiValid.raml" });
        });
        it("test008/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test008/apiInvalid.raml" });
        });
        it("test008/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test008/apiValid.raml" });
        });
        it("test009/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test009/apiInvalid.raml" });
        });
        it("test009/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test009/apiValid.raml" });
        });
        it("test010/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test010/apiInvalid.raml" });
        });
        it("test010/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test010/apiValid.raml" });
        });
        it("test011/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test011/apiInvalid.raml" });
        });
        it("test011/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test011/apiValid.raml" });
        });
        it("test012/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test012/apiInvalid.raml" });
        });
        it("test012/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test012/apiValid.raml" });
        });
        it("test013/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test013/apiInvalid.raml" });
        });
        it("test013/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test013/apiValid.raml" });
        });
        it("test014/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test014/apiInvalid.raml" });
        });
        it("test014/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test014/apiValid.raml" });
        });
        it("test015/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test015/apiInvalid.raml" });
        });
        it("test015/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test015/apiValid.raml" });
        });
        it("test016/apiInValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test016/apiInValid.raml" });
        });
        it("test017/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test017/api.raml" });
        });
        it("test018/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Resources/test018/api.raml" });
        });
    });
    describe('raml-1.0/Responses', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Responses/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Responses/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Responses/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Responses/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Responses/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Responses/test006/api.raml" });
        });
    });
    describe('raml-1.0/SecuritySchemes', function () {
        it("test001/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/SecuritySchemes/test001/apiInvalid.raml" });
        });
        it("test001/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/SecuritySchemes/test001/apiValid.raml" });
        });
        it("test002/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/SecuritySchemes/test002/apiInvalid.raml" });
        });
        it("test002/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/SecuritySchemes/test002/apiValid.raml" });
        });
        it("test003/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/SecuritySchemes/test003/apiInvalid.raml" });
        });
        it("test003/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/SecuritySchemes/test003/apiValid.raml" });
        });
        it("test004/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/SecuritySchemes/test004/apiInvalid.raml" });
        });
        it("test004/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/SecuritySchemes/test004/apiValid.raml" });
        });
        it("test005/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/SecuritySchemes/test005/apiInvalid.raml" });
        });
        it("test005/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/SecuritySchemes/test005/apiValid.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/SecuritySchemes/test006/api.raml" });
        });
    });
    describe('raml-1.0/TemplateFunctions', function () {
        it("test001/t1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/TemplateFunctions/test001/t1.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/TemplateFunctions/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/TemplateFunctions/test003/api.raml" });
        });
    });
    describe('raml-1.0/Traits', function () {
        it("test001/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test001/apiInvalid.raml" });
        });
        it("test001/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test001/apiValid.raml" });
        });
        it("test002/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test002/apiInvalid.raml" });
        });
        it("test002/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test002/apiValid.raml" });
        });
        it("test003/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test003/apiInvalid.raml" });
        });
        it("test003/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test003/apiValid.raml" });
        });
        it("test004/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test004/apiInvalid.raml" });
        });
        it("test004/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test004/apiValid.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test008/api.raml" });
        });
        it("test009/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Traits/test009/api.raml" });
        });
    });
    describe('raml-1.0/Types', function () {
        it("test001/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test001/apiValid.raml" });
        });
        it("test002/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test002/apiInvalid.raml" });
        });
        it("test002/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test002/apiValid.raml" });
        });
        it("test003/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test003/apiInvalid.raml" });
        });
        it("test003/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test003/apiValid.raml" });
        });
        it("test004/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test004/apiInvalid.raml" });
        });
        it("test004/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test004/apiValid.raml" });
        });
        it("test005/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test005/apiInvalid.raml" });
        });
        it("test005/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test005/apiValid.raml" });
        });
        it("test006/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test006/apiInvalid.raml" });
        });
        it("test006/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test006/apiValid.raml" });
        });
        it("test007/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test007/apiInvalid.raml" });
        });
        it("test007/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test007/apiValid.raml" });
        });
        it("test008/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test008/apiInvalid.raml" });
        });
        it("test008/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test008/apiValid.raml" });
        });
        it("test009/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test009/apiInvalid.raml" });
        });
        it("test009/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test009/apiValid.raml" });
        });
        it("test010/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test010/apiValid.raml" });
        });
        it("test011/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test011/apiValid.raml" });
        });
        it("test012/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test012/apiInvalid.raml" });
        });
        it("test012/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test012/apiValid.raml" });
        });
        it("test013/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test013/apiInvalid.raml" });
        });
        it("test013/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test013/apiValid.raml" });
        });
        it("test014/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test014/apiInvalid.raml" });
        });
        it("test015/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test015/apiInvalid.raml" });
        });
        it("test016/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test016/apiInvalid.raml" });
        });
        it("test017/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test017/apiInvalid.raml" });
        });
        it("test018/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test018/api.raml" });
        });
        it("test019/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test019/api.raml" });
        });
        it("test020/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test020/api.raml" });
        });
        it("test021/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test021/api.raml" });
        });
        it("test022/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test022/api.raml" });
        });
        it("test023/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test023/api.raml" });
        });
        it("test024/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test024/api.raml" });
        });
        it("test025/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test025/api.raml" });
        });
        it("test026/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test026/api.raml" });
        });
        it("test027/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test027/lib.raml" });
        });
        it("test028/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test028/lib.raml" });
        });
        it("test029/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test029/lib.raml" });
        });
        it("test030/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test030/lib.raml" });
        });
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test031/api.raml" });
        });
        it("test032/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test032/api.raml" });
        });
        it("test033/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test033/apiValid.raml" });
        });
        it("test034/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test034/apiValid.raml" });
        });
        it("test035/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test035/api.raml" });
        });
        it("test036/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test036/api.raml" });
        });
        it("test037/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test037/api.raml" });
        });
        it("test038/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test038/api.raml" });
        });
        it("test039/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test039/api.raml" });
        });
        it("test040/dataType.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test040/dataType.raml" });
        });
        it("test041/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test041/api.raml" });
        });
        it("test042/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test042/api.raml" });
        });
        it("test043/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/test043/api.raml" });
        });
    });
    describe('raml-1.0/Types/ArrayTypes', function () {
        it("defaultValue/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ArrayTypes/defaultValue/api.raml" });
        });
        it("externalAsComponent/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ArrayTypes/externalAsComponent/api.raml" });
        });
        it("itemsInvalidTypeTest/input.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ArrayTypes/itemsInvalidTypeTest/input.raml" });
        });
    });
    describe('raml-1.0/Types/ArrayTypes/itemsForNonArray', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ArrayTypes/itemsForNonArray/test001/api.raml" });
        });
        it("test002/dataType.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ArrayTypes/itemsForNonArray/test002/dataType.raml" });
        });
    });
    describe('raml-1.0/Types/External Types', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/External Types/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/External Types/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/External Types/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/External Types/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/External Types/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/External Types/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/External Types/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/External Types/test008/api.raml" });
        });
        it("test009/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/External Types/test009/api.raml" });
        });
        it("test010/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/External Types/test010/api.raml" });
        });
        it("test011/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/External Types/test011/api.raml" });
        });
    });
    describe('raml-1.0/Types/Facets', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Facets/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Facets/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Facets/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Facets/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Facets/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Facets/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Facets/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Facets/test008/api.raml" });
        });
    });
    describe('raml-1.0/Types/LibraryChainingMessages', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/test008/api.raml" });
        });
        it("test009/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/test009/api.raml" });
        });
        it("test010/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/test010/api.raml" });
        });
    });
    describe('raml-1.0/Types/LibraryChainingMessages/Annotations', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/Annotations/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/Annotations/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/Annotations/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/Annotations/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/Annotations/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/LibraryChainingMessages/Annotations/test006/api.raml" });
        });
    });
    describe('raml-1.0/Types/ObjectTypes', function () {
        it("additionPropertiesInvalidTest/input.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/additionPropertiesInvalidTest/input.raml" });
        });
        it("test001/oType01.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test001/oType01.raml" });
        });
        it("test002/oType02.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test002/oType02.raml" });
        });
        it("test003/oType03.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test003/oType03.raml" });
        });
        it("test004/oType04.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test004/oType04.raml" });
        });
        it("test005/oType05.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test005/oType05.raml" });
        });
        it("test006/oType06.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test006/oType06.raml" });
        });
        it("test007/oType07.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test007/oType07.raml" });
        });
        it("test008/oType08.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test008/oType08.raml" });
        });
        it("test009/oType09.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test009/oType09.raml" });
        });
        it("test010/oType10.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test010/oType10.raml" });
        });
        it("test011/oType11.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test011/oType11.raml" });
        });
        it("test012/oType12.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test012/oType12.raml" });
        });
        it("test013/oType13.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test013/oType13.raml" });
        });
        it("test014/oType14.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test014/oType14.raml" });
        });
        it("test015/oType15.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test015/oType15.raml" });
        });
        it("test016/oType16.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test016/oType16.raml" });
        });
        it("test017/oType17.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test017/oType17.raml" });
        });
        it("test018/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test018/api.raml" });
        });
        it("test019/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test019/api.raml" });
        });
        it("test020/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test020/api.raml" });
        });
        it("test021/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test021/api.raml" });
        });
        it("test022/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test022/api.raml" });
        });
        it("test023/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test023/api.raml" });
        });
        it("test024/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test024/api.raml" });
        });
        it("test025/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test025/api.raml" });
        });
        it("test026/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test026/api.raml" });
        });
        it("test027/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test027/api.raml" });
        });
        it("test028/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test028/api.raml" });
        });
        it("test029/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test029/api.raml" });
        });
        it("test030/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test030/api.raml" });
        });
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test031/api.raml" });
        });
        it("test032/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test032/api.raml" });
        });
        it("test033/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test033/api.raml" });
        });
        it("test034/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test034/api.raml" });
        });
        it("test035/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test035/api.raml" });
        });
        it("test036/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test036/api.raml" });
        });
        it("test037/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test037/api.raml" });
        });
        it("test038/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test038/api.raml" });
        });
        it("test039/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test039/api.raml" });
        });
        it("test040/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test040/api.raml" });
        });
        it("test041/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test041/api.raml" });
        });
        it("test042/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test042/api.raml" });
        });
        it("test043/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test043/api.raml" });
        });
        it("test044/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/test044/api.raml" });
        });
        it("typeKind/oType01.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/typeKind/oType01.raml" });
        });
        it("typeKind2/oType01.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/ObjectTypes/typeKind2/oType01.raml" });
        });
    });
    describe('raml-1.0/Types/PropertyOverride', function () {
        it("test001/test1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/PropertyOverride/test001/test1.raml" });
        });
        it("test002/test2.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/PropertyOverride/test002/test2.raml" });
        });
        it("test003/test3.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/PropertyOverride/test003/test3.raml" });
        });
        it("test004/test4.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/PropertyOverride/test004/test4.raml" });
        });
        it("test005/test5.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/PropertyOverride/test005/test5.raml" });
        });
        it("test006/test6.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/PropertyOverride/test006/test6.raml" });
        });
        it("test007/test7.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/PropertyOverride/test007/test7.raml" });
        });
        it("test008/test8.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/PropertyOverride/test008/test8.raml" });
        });
        it("test009/test9.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/PropertyOverride/test009/test9.raml" });
        });
        it("test010/test10.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/PropertyOverride/test010/test10.raml" });
        });
        it("test011/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/PropertyOverride/test011/api.raml" });
        });
    });
    describe('raml-1.0/Types/Type Expressions', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Type Expressions/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Type Expressions/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Type Expressions/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Type Expressions/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Type Expressions/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Type Expressions/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Type Expressions/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Type Expressions/test008/api.raml" });
        });
        it("test009/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Type Expressions/test009/api.raml" });
        });
        it("test010/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/Type Expressions/test010/api.raml" });
        });
    });
    describe('raml-1.0/Types/xsdscheme', function () {
        it("test001/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test001/apiInvalid.raml" });
        });
        it("test001/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test001/apiValid.raml" });
        });
        it("test002/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test002/apiInvalid.raml" });
        });
        it("test002/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test002/apiValid.raml" });
        });
        it("test003/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test003/apiInvalid.raml" });
        });
        it("test003/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test003/apiValid.raml" });
        });
        it("test004/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test004/apiInvalid.raml" });
        });
        it("test004/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test004/apiValid.raml" });
        });
        it("test005/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test005/apiInvalid.raml" });
        });
        it("test005/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test005/apiValid.raml" });
        });
        it("test006/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test006/apiInvalid.raml" });
        });
        it("test006/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test006/apiValid.raml" });
        });
        it("test007/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test007/apiInvalid.raml" });
        });
        it("test007/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test007/apiValid.raml" });
        });
        it("test008/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test008/apiInvalid.raml" });
        });
        it("test008/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test008/apiValid.raml" });
        });
        it("test009/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test009/apiInvalid.raml" });
        });
        it("test009/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test009/apiValid.raml" });
        });
        it("test010/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test010/apiValid.raml" });
        });
        it("test011/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test011/api.raml" });
        });
        it("test012/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test012/api.raml" });
        });
        it("test013/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test013/api.raml" });
        });
        it("test014/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/test014/api.raml" });
        });
        it("typeKind/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/Types/xsdscheme/typeKind/apiValid.raml" });
        });
    });
    describe('raml-1.0/jsonscheme', function () {
        it("test1/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test1/apiInvalid.raml" });
        });
        it("test1/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test1/apiValid.raml" });
        });
        it("test10/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test10/apiInvalid.raml" });
        });
        it("test10/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test10/apiValid.raml" });
        });
        it("test11/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test11/apiInvalid.raml" });
        });
        it("test11/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test11/apiValid.raml" });
        });
        it("test12/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test12/api.raml" });
        });
        it("test13/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test13/api.raml" });
        });
        it("test14/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test14/api.raml" });
        });
        it("test15/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test15/api.raml" });
        });
        it("test16/api_local.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test16/api_local.raml" });
        });
        it("test16/api_remote.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test16/api_remote.raml" });
        });
        it("test17/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test17/api.raml" });
        });
        it("test18/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test18/api.raml" });
        });
        it("test19/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test19/api.raml" });
        });
        it("test2/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test2/apiInvalid.raml" });
        });
        it("test2/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test2/apiValid.raml" });
        });
        it("test3/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test3/apiInvalid.raml" });
        });
        it("test3/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test3/apiValid.raml" });
        });
        it("test4/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test4/apiInvalid.raml" });
        });
        it("test4/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test4/apiValid.raml" });
        });
        it("test5/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test5/apiInvalid.raml" });
        });
        it("test5/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test5/apiValid.raml" });
        });
        it("test6/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test6/apiInvalid.raml" });
        });
        it("test6/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test6/apiValid.raml" });
        });
        it("test7/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test7/apiInvalid.raml" });
        });
        it("test7/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test7/apiValid.raml" });
        });
        it("test8/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test8/apiInvalid.raml" });
        });
        it("test8/apiInvalid0.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test8/apiInvalid0.raml" });
        });
        it("test8/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test8/apiValid.raml" });
        });
        it("test8/apiValid0.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test8/apiValid0.raml" });
        });
        it("test9/apiInvalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test9/apiInvalid.raml" });
        });
        it("test9/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/test9/apiValid.raml" });
        });
        it("typeKind/apiValid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/typeKind/apiValid.raml" });
        });
    });
    describe('raml-1.0/jsonscheme/scalarTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/scalarTypes/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/scalarTypes/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/scalarTypes/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/scalarTypes/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/scalarTypes/test005/api.raml" });
        });
        it("test006/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/scalarTypes/test006/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/scalarTypes/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/jsonscheme/scalarTypes/test008/api.raml" });
        });
    });
    describe('raml-1.0/patterns', function () {
        it("parameter/parameter-as-key-rt-mediatype.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/patterns/parameter/parameter-as-key-rt-mediatype.raml" });
        });
        it("parameter/parameter-as-key-traits.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/patterns/parameter/parameter-as-key-traits.raml" });
        });
    });
    describe('raml-1.0/spec-examples', function () {
        it("APIs/additional-facets-single-example.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/additional-facets-single-example.raml" });
        });
        it("APIs/additional-properties.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/additional-properties.raml" });
        });
        it("APIs/annotating-scalar-nodes.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/annotating-scalar-nodes.raml" });
        });
        it("APIs/annotations-targets.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/annotations-targets.raml" });
        });
        it("APIs/annotations.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/annotations.raml" });
        });
        it("APIs/apply-annotations-1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/apply-annotations-1.raml" });
        });
        it("APIs/apply-annotations-2.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/apply-annotations-2.raml" });
        });
        it("APIs/apply-default-media-type.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/apply-default-media-type.raml" });
        });
        it("APIs/apply-resourcetypes-traits.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/apply-resourcetypes-traits.raml" });
        });
        it("APIs/apply-security-scheme-null.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/apply-security-scheme-null.raml" });
        });
        it("APIs/apply-security-schemes.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/apply-security-schemes.raml" });
        });
        it("APIs/apply-securityscheme-parameter.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/apply-securityscheme-parameter.raml" });
        });
        it("APIs/array-type-expanded.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/array-type-expanded.raml" });
        });
        it("APIs/array-type.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/array-type.raml" });
        });
        it("APIs/array-uri-parameter.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/array-uri-parameter.raml" });
        });
        it("APIs/base-uri-parameter.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/base-uri-parameter.raml" });
        });
        it("APIs/base-uri-template.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/base-uri-template.raml" });
        });
        it("APIs/bodies.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/bodies.raml" });
        });
        it("APIs/boolean-type.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/boolean-type.raml" });
        });
        it("APIs/complex-examples.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/complex-examples.raml" });
        });
        it("APIs/complex-headers.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/complex-headers.raml" });
        });
        it("APIs/date-types.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/date-types.raml" });
        });
        it("APIs/default-media-types-multiple.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-media-types-multiple.raml" });
        });
        it("APIs/default-media-types-single.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-media-types-single.raml" });
        });
        it("APIs/default-security.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-security.raml" });
        });
        it("APIs/default-type-5.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-type-5.raml" });
        });
        it("APIs/default-type-any-2.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-type-any-2.raml" });
        });
        it("APIs/default-type-any.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-type-any.raml" });
        });
        it("APIs/default-type-object.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-type-object.raml" });
        });
        it("APIs/default-type-string.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-type-string.raml" });
        });
        it("APIs/default-types-1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-types-1.raml" });
        });
        it("APIs/default-types-2.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-types-2.raml" });
        });
        it("APIs/default-types-3.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-types-3.raml" });
        });
        it("APIs/default-types-4.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/default-types-4.raml" });
        });
        it("APIs/define-uri-parameters.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/define-uri-parameters.raml" });
        });
        it("APIs/documentation.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/documentation.raml" });
        });
        it("APIs/duplicated-uris-invalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/duplicated-uris-invalid.raml" });
        });
        it("APIs/external-type-extend-invalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/external-type-extend-invalid.raml" });
        });
        it("APIs/external-types-invalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/external-types-invalid.raml" });
        });
        it("APIs/external-types.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/external-types.raml" });
        });
        it("APIs/file-type.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/file-type.raml" });
        });
        it("APIs/fragments-simple.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/fragments-simple.raml" });
        });
        it("APIs/includes.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/includes.raml" });
        });
        it("APIs/inline-type-declaration.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/inline-type-declaration.raml" });
        });
        it("APIs/integer-type.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/integer-type.raml" });
        });
        it("APIs/introduction-types-complex.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/introduction-types-complex.raml" });
        });
        it("APIs/introduction-types.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/introduction-types.raml" });
        });
        it("APIs/invalid-discriminator-usage.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/invalid-discriminator-usage.raml" });
        });
        it("APIs/librarybooks.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/librarybooks.raml" });
        });
        it("APIs/markup-language.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/markup-language.raml" });
        });
        it("APIs/multiple-examples.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/multiple-examples.raml" });
        });
        it("APIs/multiple-inheritance-1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/multiple-inheritance-1.raml" });
        });
        it("APIs/multiple-inheritance-2.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/multiple-inheritance-2.raml" });
        });
        it("APIs/multiple-inheritance-3-invalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/multiple-inheritance-3-invalid.raml" });
        });
        it("APIs/nested-resources.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/nested-resources.raml" });
        });
        it("APIs/null-type-invalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/null-type-invalid.raml" });
        });
        it("APIs/null-type-union.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/null-type-union.raml" });
        });
        it("APIs/null-type.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/null-type.raml" });
        });
        it("APIs/number-type.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/number-type.raml" });
        });
        it("APIs/object-type-long.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/object-type-long.raml" });
        });
        it("APIs/object-type-short.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/object-type-short.raml" });
        });
        it("APIs/protocols.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/protocols.raml" });
        });
        it("APIs/query-parameter.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/query-parameter.raml" });
        });
        it("APIs/query-string.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/query-string.raml" });
        });
        it("APIs/resolve-includes.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/resolve-includes.raml" });
        });
        it("APIs/resourcetypes-optionalmethods.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/resourcetypes-optionalmethods.raml" });
        });
        it("APIs/resourcetypes-traits-no-subresources.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/resourcetypes-traits-no-subresources.raml" });
        });
        it("APIs/resourcetypes-traits-parameter.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/resourcetypes-traits-parameter.raml" });
        });
        it("APIs/resourcetypes-traits-parameterfunctions.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/resourcetypes-traits-parameterfunctions.raml" });
        });
        it("APIs/resourcetypes-traits.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/resourcetypes-traits.raml" });
        });
        it("APIs/responses.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/responses.raml" });
        });
        it("APIs/resurcetypes-traits-external.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/resurcetypes-traits-external.raml" });
        });
        it("APIs/root.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/root.raml" });
        });
        it("APIs/security-schemes-basic.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/security-schemes-basic.raml" });
        });
        it("APIs/security-schemes-digest.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/security-schemes-digest.raml" });
        });
        it("APIs/security-schemes-oauth1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/security-schemes-oauth1.raml" });
        });
        it("APIs/security-schemes-oauth2.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/security-schemes-oauth2.raml" });
        });
        it("APIs/security-schemes-pass.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/security-schemes-pass.raml" });
        });
        it("APIs/security-schemes-xother.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/security-schemes-xother.raml" });
        });
        it("APIs/security-schemes.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/security-schemes.raml" });
        });
        it("APIs/simple-header.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/simple-header.raml" });
        });
        it("APIs/single-example.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/single-example.raml" });
        });
        it("APIs/string-type.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/string-type.raml" });
        });
        it("APIs/template-uri-1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/template-uri-1.raml" });
        });
        it("APIs/trailing-slashes.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/trailing-slashes.raml" });
        });
        it("APIs/traits-merge-enumlist.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/traits-merge-enumlist.raml" });
        });
        it("APIs/type-expression-extends.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/type-expression-extends.raml" });
        });
        it("APIs/type-expression.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/type-expression.raml" });
        });
        it("APIs/type-names-question-mark.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/type-names-question-mark.raml" });
        });
        it("APIs/type-schema-invalid.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/type-schema-invalid.raml" });
        });
        it("APIs/types-pattern-properties.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/types-pattern-properties.raml" });
        });
        it("APIs/union-type-multiple-inheritance.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/union-type-multiple-inheritance.raml" });
        });
        it("APIs/union-type.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/union-type.raml" });
        });
        it("APIs/uri-parameters-1.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/uri-parameters-1.raml" });
        });
        it("APIs/uri-parameters-ext.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/uri-parameters-ext.raml" });
        });
        it("APIs/uri-templates-allowed.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/uri-templates-allowed.raml" });
        });
        it("APIs/user-defined-facets.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/user-defined-facets.raml" });
        });
        it("APIs/using-discriminator.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/using-discriminator.raml" });
        });
        it("APIs/using-discriminatorvalue.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/using-discriminatorvalue.raml" });
        });
        it("APIs/xml-facet.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/APIs/xml-facet.raml" });
        });
        it("Fragments/libraries-invalid-chaining.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/Fragments/libraries-invalid-chaining.raml" });
        });
        it("Fragments/libraries-resourcetype.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/Fragments/libraries-resourcetype.raml" });
        });
        it("Libraries/libraries.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/Libraries/libraries.raml" });
        });
    });
    describe('raml-1.0/spec-examples/ExtensionsAndOverlays', function () {
        it("Extension 001/extension-post.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/ExtensionsAndOverlays/Extension 001/extension-post.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/spec-examples/ExtensionsAndOverlays/Extension 001/librarybooks-tck.json" });
        });
        it("Overlay 001/overlay-monitoring.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/ExtensionsAndOverlays/Overlay 001/overlay-monitoring.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/spec-examples/ExtensionsAndOverlays/Overlay 001/librarybooks-tck.json" });
        });
        it("Overlay 002/overlay-spanish.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "serializeMetadata": true, "apiPath": "TCK-newFormat/raml-1.0/spec-examples/ExtensionsAndOverlays/Overlay 002/overlay-spanish.raml", "tckJsonPath": "TCK-newFormat/raml-1.0/spec-examples/ExtensionsAndOverlays/Overlay 002/librarybooks-tck.json" });
        });
    });
});
//# sourceMappingURL=TCK2-newFormat.js.map