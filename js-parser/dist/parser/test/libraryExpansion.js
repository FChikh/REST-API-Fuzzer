"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ATTENTION !!! The file is generated. Manual changes will be overridden by the nearest build.
 */
var tckUtil = require("./scripts/tckUtil");
describe('Library Expansion Tests', function () {
    describe('Annotations', function () {
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Annotations/test031/api.raml" });
        });
    });
    describe('Examples', function () {
        it("test070/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Examples/test070/api.raml" });
        });
    });
    describe('Examples/raml1/overlays&extensions', function () {
        it("extension/extension.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Examples/raml1/overlays&extensions/extension/extension.raml", "tckJsonPath": "LibraryExpansion/Examples/raml1/overlays&extensions/extension/master-tck.json" });
        });
        it("overlay/slave.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Examples/raml1/overlays&extensions/overlay/slave.raml", "tckJsonPath": "LibraryExpansion/Examples/raml1/overlays&extensions/overlay/master-tck.json" });
        });
    });
    describe('Extensions', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Extensions/test001/api.raml", "extensions": ["LibraryExpansion/Extensions/test001/e1.raml", "LibraryExpansion/Extensions/test001/e2.raml"] });
        });
    });
    describe('Libraries', function () {
        it("Fragments/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/Fragments/lib.raml" });
        });
    });
    describe('Libraries/Annotations', function () {
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/Annotations/test031/api.raml" });
        });
    });
    describe('Libraries/InvalidUsesPath', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/InvalidUsesPath/test001/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/Annotations', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/Annotations/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/Annotations/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/Annotations/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/Annotations/test004/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/Fragments', function () {
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/Fragments/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/Fragments/test004/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/Fragments/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/Fragments/test008/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/NilableTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/NilableTypes/test001/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/ResourceTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/ResourceTypes/test001/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/ResourceTypes/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/ResourceTypes/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/ResourceTypes/test005/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/ResourceTypes/optionalMethodBody', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/ResourceTypes/optionalMethodBody/test001/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/SecuritySchemes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/SecuritySchemes/test001/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/Traits', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/Traits/test001/api.raml" });
        });
    });
    describe('Libraries/ReferencesPatching/Types', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/Types/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/ReferencesPatching/Types/test002/api.raml" });
        });
    });
    describe('Libraries/Specifications', function () {
        it("Instagram1.0/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Libraries/Specifications/Instagram1.0/api.raml" });
        });
    });
    describe('Overlays', function () {
        it("test025/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Overlays/test025/api.raml", "extensions": ["LibraryExpansion/Overlays/test025/NewOverlay.raml", "LibraryExpansion/Overlays/test025/NewOverlay2.raml"] });
        });
        it("test026/apigateway-aws-overlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Overlays/test026/apigateway-aws-overlay.raml", "tckJsonPath": "LibraryExpansion/Overlays/test026/apigateway-tck.json" });
        });
        it("test029/overlay.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Overlays/test029/overlay.raml", "tckJsonPath": "LibraryExpansion/Overlays/test029/api-tck.json" });
        });
        it("test031/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Overlays/test031/api.raml", "extensions": ["LibraryExpansion/Overlays/test031/o1.raml", "LibraryExpansion/Overlays/test031/o2.raml"] });
        });
    });
    describe('ReferencesPatching/Annotations', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Annotations/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Annotations/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Annotations/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Annotations/test004/api.raml" });
        });
    });
    describe('ReferencesPatching/Fragments', function () {
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Fragments/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Fragments/test004/api.raml" });
        });
        it("test007/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Fragments/test007/api.raml" });
        });
        it("test008/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Fragments/test008/api.raml" });
        });
        it("test009/lib.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Fragments/test009/lib.raml" });
        });
        it("test016/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Fragments/test016/api.raml" });
        });
    });
    describe('ReferencesPatching/NilableTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/NilableTypes/test001/api.raml" });
        });
    });
    describe('ReferencesPatching/ResourceTypes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/ResourceTypes/test001/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/ResourceTypes/test003/api.raml" });
        });
        it("test004/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/ResourceTypes/test004/api.raml" });
        });
        it("test005/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/ResourceTypes/test005/api.raml" });
        });
    });
    describe('ReferencesPatching/ResourceTypes/optionalMethodBody', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/ResourceTypes/optionalMethodBody/test001/api.raml" });
        });
    });
    describe('ReferencesPatching/SecuritySchemes', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/SecuritySchemes/test001/api.raml" });
        });
    });
    describe('ReferencesPatching/Traits', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Traits/test001/api.raml" });
        });
    });
    describe('ReferencesPatching/Types', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Types/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/ReferencesPatching/Types/test002/api.raml" });
        });
    });
    describe('Specifications', function () {
        it("Instagram1.0/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Specifications/Instagram1.0/api.raml" });
        });
        it("RAML_Sample/sample-api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Specifications/RAML_Sample/sample-api.raml" });
        });
        it("world-music-api/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Specifications/world-music-api/api.raml" });
        });
    });
    describe('TraceTests', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/TraceTests/test001/api.raml" });
        });
    });
    describe('Types/ObjectTypes', function () {
        it("test036/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Types/ObjectTypes/test036/api.raml" });
        });
        it("test037/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Types/ObjectTypes/test037/api.raml" });
        });
        it("test044/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Types/ObjectTypes/test044/api.raml" });
        });
        it("test_001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Types/ObjectTypes/test_001/api.raml" });
        });
    });
    describe('Types/ReferencesByDiscriminatorValue', function () {
        it("test001/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Types/ReferencesByDiscriminatorValue/test001/api.raml" });
        });
        it("test002/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Types/ReferencesByDiscriminatorValue/test002/api.raml" });
        });
        it("test003/api.raml", function () {
            this.timeout(20000);
            tckUtil.testAPIScript({ "expandLib": true, "serializeMetadata": true, "apiPath": "LibraryExpansion/Types/ReferencesByDiscriminatorValue/test003/api.raml" });
        });
    });
});
//# sourceMappingURL=libraryExpansion.js.map