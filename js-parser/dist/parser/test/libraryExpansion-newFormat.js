"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ATTENTION !!! The file is generated. Manual changes will be overridden by the nearest build.
 */
var tckUtil = require("./scripts/tckUtil");
describe('Library Expansion Tests For NEW JSON Format', function () {
    describe('Annotations', function () {
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Annotations/test031/api.raml" });
        });
    });
    describe('Examples', function () {
        it("test070/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Examples/test070/api.raml" });
        });
    });
    describe('Examples/raml1/overlays&extensions', function () {
        it("extension/extension.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Examples/raml1/overlays&extensions/extension/extension.raml", "tckJsonPath": "LibraryExpansion-newFormat/Examples/raml1/overlays&extensions/extension/master-tck.json" });
        });
        it("overlay/slave.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Examples/raml1/overlays&extensions/overlay/slave.raml", "tckJsonPath": "LibraryExpansion-newFormat/Examples/raml1/overlays&extensions/overlay/master-tck.json" });
        });
    });
    describe('Extensions', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Extensions/test001/api.raml", "extensions": ["LibraryExpansion-newFormat/Extensions/test001/e1.raml", "LibraryExpansion-newFormat/Extensions/test001/e2.raml"] });
        });
    });
    describe('Libraries', function () {
        it("Fragments/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/Fragments/lib.raml" });
        });
    });
    describe('Libraries/Annotations', function () {
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/Annotations/test031/api.raml" });
        });
    });
    describe('Libraries/InvalidUsesPath', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/InvalidUsesPath/test001/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/Annotations', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/Annotations/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/Annotations/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/Annotations/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/Annotations/test004/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/Fragments', function () {
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/Fragments/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/Fragments/test004/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/Fragments/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/Fragments/test008/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/NilableTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/NilableTypes/test001/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/ResourceTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/ResourceTypes/test001/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/ResourceTypes/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/ResourceTypes/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/ResourceTypes/test005/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/ResourceTypes/optionalMethodBody', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/ResourceTypes/optionalMethodBody/test001/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/SecuritySchemes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/SecuritySchemes/test001/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/Traits', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/Traits/test001/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/Types', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/Types/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/ReferencesPatching/Types/test002/api.raml" });
        });
    });
    describe('Libraries/Specifications', function () {
        it("Instagram1.0/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Libraries/Specifications/Instagram1.0/api.raml" });
        });
    });
    describe('LibraryAnnotations', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/LibraryAnnotations/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/LibraryAnnotations/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/LibraryAnnotations/test003/api.raml" });
        });
    });
    describe('Overlays', function () {
        it("test025/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Overlays/test025/api.raml", "extensions": ["LibraryExpansion-newFormat/Overlays/test025/NewOverlay.raml", "LibraryExpansion-newFormat/Overlays/test025/NewOverlay2.raml"] });
        });
        it("test026/apigateway-aws-overlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Overlays/test026/apigateway-aws-overlay.raml", "tckJsonPath": "LibraryExpansion-newFormat/Overlays/test026/apigateway-tck.json" });
        });
        it("test029/overlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Overlays/test029/overlay.raml", "tckJsonPath": "LibraryExpansion-newFormat/Overlays/test029/api-tck.json" });
        });
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Overlays/test031/api.raml", "extensions": ["LibraryExpansion-newFormat/Overlays/test031/o1.raml", "LibraryExpansion-newFormat/Overlays/test031/o2.raml"] });
        });
    });
    describe('ReferencesPatching/Annotations', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Annotations/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Annotations/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Annotations/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Annotations/test004/api.raml" });
        });
    });
    describe('ReferencesPatching/Fragments', function () {
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Fragments/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Fragments/test004/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Fragments/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Fragments/test008/api.raml" });
        });
        it("test009/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Fragments/test009/lib.raml" });
        });
        it("test016/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Fragments/test016/api.raml" });
        });
    });
    describe('ReferencesPatching/NilableTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/NilableTypes/test001/api.raml" });
        });
    });
    describe('ReferencesPatching/ResourceTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/ResourceTypes/test001/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/ResourceTypes/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/ResourceTypes/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/ResourceTypes/test005/api.raml" });
        });
    });
    describe('ReferencesPatching/ResourceTypes/optionalMethodBody', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/ResourceTypes/optionalMethodBody/test001/api.raml" });
        });
    });
    describe('ReferencesPatching/SecuritySchemes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/SecuritySchemes/test001/api.raml" });
        });
    });
    describe('ReferencesPatching/Traits', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Traits/test001/api.raml" });
        });
    });
    describe('ReferencesPatching/Types', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Types/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/ReferencesPatching/Types/test002/api.raml" });
        });
    });
    describe('Specifications', function () {
        it("Instagram1.0/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Specifications/Instagram1.0/api.raml" });
        });
        it("QueryStringTest/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Specifications/QueryStringTest/api.raml" });
        });
        it("RAML_Sample/sample-api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Specifications/RAML_Sample/sample-api.raml" });
        });
        it("world-music-api/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Specifications/world-music-api/api.raml" });
        });
    });
    describe('TraceTests', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/TraceTests/test001/api.raml" });
        });
    });
    describe('Types/ObjectTypes', function () {
        it("test036/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Types/ObjectTypes/test036/api.raml" });
        });
        it("test037/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Types/ObjectTypes/test037/api.raml" });
        });
        it("test044/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Types/ObjectTypes/test044/api.raml" });
        });
        it("test_001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Types/ObjectTypes/test_001/api.raml" });
        });
    });
    describe('Types/ReferencesByDiscriminatorValue', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Types/ReferencesByDiscriminatorValue/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Types/ReferencesByDiscriminatorValue/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "newFormat": true, "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion-newFormat/Types/ReferencesByDiscriminatorValue/test003/api.raml" });
        });
    });
});
//# sourceMappingURL=libraryExpansion-newFormat.js.map