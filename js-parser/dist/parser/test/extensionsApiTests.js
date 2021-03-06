"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var RamlWrapperImpl = require("../artifacts/raml10parser");
var apiLoader = require("../apiLoader");
var hl = require("../../parser/highLevelAST");
var path = require("path");
describe('Extension API', function () {
    this.timeout(15000);
    it('Api', function (done) {
        var opt = apiLoader.loadApi(path.resolve(__dirname, "./data/extensions/librarybooks_spain.raml"));
        // var opt = apiLoader.loadApi1(path.resolve(__dirname,"./data/helperTestApi.raml"));
        assert(opt.isDefined());
        assert(RamlWrapperImpl.ApiImpl.isInstance(opt.getOrThrow()));
        var api = opt.getOrThrow();
        assert(api != null);
        assert(api.wrapperClassName() === "OverlayImpl");
        var overlay = api;
        assert(overlay.extends() === "librarybooks.raml");
        var pathToRes = overlay.highLevel().lowLevel().unit().absolutePath();
        var newPath = path.resolve(path.dirname(pathToRes), overlay.extends());
        var opt2 = apiLoader.loadApi(newPath);
        assert(opt2.isDefined());
        assert(RamlWrapperImpl.ApiImpl.isInstance(opt2.getOrThrow()));
        var api2 = opt2.getOrThrow();
        assert(api2 != null);
        assert(api2.wrapperClassName() === "ApiImpl");
        var hl2 = api2.highLevel();
        function goOn(node, lvl) {
            var spacing = new Array(lvl).join("\t");
            console.log(node.printDetails("\t"));
            console.log(spacing, hl.NodeKind[node.getKind()], "::", node.name(), "=>", node.value());
            node.attrs().forEach(function (att) {
                console.log(spacing + "--", hl.NodeKind[att.getKind()], "::", att.name(), "=>", att.value());
            });
            node.elements().forEach(function (el) {
                goOn(el, lvl + 1);
            });
        }
        goOn(hl2.copy(), 0);
        // overlay.highLevel().
        done();
    });
    //it('Api.allBaseUriParameters()', function () {
    //
    //    var baseUriParameters = api.allBaseUriParameters();
    //    assert(baseUriParameters.length==3);
    //});
});
//# sourceMappingURL=extensionsApiTests.js.map