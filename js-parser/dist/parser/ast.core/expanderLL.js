"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jsyaml = require("../jsyaml/jsyaml2lowLevel");
var hlimpl = require("../highLevelImpl");
var yaml = require("yaml-ast-parser");
var util = require("../../util/index");
var proxy = require("./LowLevelASTProxy");
var pluralize = require("pluralize");
var _ = require("underscore");
var core = require("../wrapped-ast/parserCore");
var referencePatcher = require("./referencePatcherLL");
var referencePatcherHL = require("./referencePatcher");
var namespaceResolver = require("./namespaceResolver");
var def = require("raml-definition-system");
var universeHelpers = require("../tools/universeHelpers");
var messageRegistry = require("../../../resources/errorMessages");
var mediaTypeParser = require("media-typer");
var changeCase = require('change-case');
function expandTraitsAndResourceTypes(api, merge) {
    if (merge === void 0) { merge = false; }
    if (!core.BasicNodeImpl.isInstance(api)) {
        // if(!((<any>api).kind
        //     && ((<any>api).kind() == "Api" || (<any>api).kind() == "Overlay" || (<any>api).kind() == "Extension"))){
        return null;
    }
    var apiNode = api;
    var hlNode = expandTraitsAndResourceTypesHL(apiNode.highLevel(), merge);
    if (!hlNode) {
        return null;
    }
    var result = hlNode.wrapperNode();
    result.setAttributeDefaults(apiNode.getDefaultsCalculator().isEnabled());
    return result;
}
exports.expandTraitsAndResourceTypes = expandTraitsAndResourceTypes;
function expandTraitsAndResourceTypesHL(api, merge) {
    if (merge === void 0) { merge = false; }
    if (api == null) {
        return null;
    }
    var definition = api.definition();
    if (!(definition && universeHelpers.isApiSibling(definition))) {
        return null;
    }
    var result = new TraitsAndResourceTypesExpander().expandTraitsAndResourceTypes(api, null, false, merge);
    return result;
}
exports.expandTraitsAndResourceTypesHL = expandTraitsAndResourceTypesHL;
function expandLibraries(api) {
    if (!api) {
        return null;
    }
    var hlNode = expandLibrariesHL(api.highLevel());
    if (!hlNode) {
        return null;
    }
    var result = hlNode.wrapperNode();
    result.setAttributeDefaults(api.getDefaultsCalculator().isEnabled());
    return result;
}
exports.expandLibraries = expandLibraries;
function expandLibrary(lib) {
    if (!lib) {
        return null;
    }
    var hlNode = expandLibraryHL(lib.highLevel());
    if (!hlNode) {
        return null;
    }
    var result = hlNode.wrapperNode();
    result.setAttributeDefaults(lib.getDefaultsCalculator().isEnabled());
    return result;
}
exports.expandLibrary = expandLibrary;
function expandLibrariesHL(api) {
    return new LibraryExpander().expandLibraries(api);
}
exports.expandLibrariesHL = expandLibrariesHL;
function expandLibraryHL(lib) {
    return new LibraryExpander().expandLibrary(lib);
}
exports.expandLibraryHL = expandLibraryHL;
function mergeAPIs(masterUnit, extensionsAndOverlays, mergeMode) {
    var masterApi = hlimpl.fromUnit(masterUnit);
    if (!masterApi)
        throw new Error("couldn't load api from " + masterUnit.absolutePath());
    if (!extensionsAndOverlays || extensionsAndOverlays.length == 0) {
        return masterApi.asElement();
    }
    var highLevelNodes = [];
    for (var i = 0; i < extensionsAndOverlays.length; i++) {
        var unit = extensionsAndOverlays[i];
        var hlNode = hlimpl.fromUnit(unit);
        if (!hlNode) {
            throw new Error("couldn't load api from " + unit.absolutePath());
        }
        highLevelNodes.push(hlNode);
    }
    var lastExtensionOrOverlay = mergeHighLevelNodes(masterApi.asElement(), highLevelNodes, mergeMode);
    return lastExtensionOrOverlay;
}
exports.mergeAPIs = mergeAPIs;
function mergeHighLevelNodes(masterApi, highLevelNodes, mergeMode, rp, expand) {
    if (rp === void 0) { rp = null; }
    if (expand === void 0) { expand = false; }
    var expander;
    var currentMaster = masterApi;
    for (var _i = 0, highLevelNodes_1 = highLevelNodes; _i < highLevelNodes_1.length; _i++) {
        var currentApi = highLevelNodes_1[_i];
        if (expand && (proxy.LowLevelProxyNode.isInstance(currentMaster.lowLevel()))) {
            if (!expander) {
                expander = new TraitsAndResourceTypesExpander();
            }
            expander.expandHighLevelNode(currentMaster, rp, masterApi, expand);
        }
        currentApi.overrideMaster(currentMaster);
        currentApi.setMergeMode(mergeMode);
        currentMaster = currentApi;
    }
    return currentMaster;
}
;
var TraitsAndResourceTypesExpander = /** @class */ (function () {
    function TraitsAndResourceTypesExpander() {
    }
    TraitsAndResourceTypesExpander.prototype.expandTraitsAndResourceTypes = function (api, rp, forceProxy, merge) {
        if (rp === void 0) { rp = null; }
        if (forceProxy === void 0) { forceProxy = false; }
        if (merge === void 0) { merge = false; }
        this.init(api);
        var llNode = api.lowLevel();
        if (!llNode) {
            return api;
        }
        if (llNode.actual().libExpanded) {
            return api;
        }
        var hlNode = this.createHighLevelNode(api, merge, rp);
        if (api.definition().key() == def.universesInfo.Universe10.Overlay) {
            return hlNode;
        }
        var unit = api.lowLevel().unit();
        var hasFragments = unit.project().namespaceResolver().hasFragments(unit);
        var result = this.expandHighLevelNode(hlNode, rp, api, hasFragments);
        if (!result) {
            return api;
        }
        return result;
    };
    TraitsAndResourceTypesExpander.prototype.init = function (api) {
        var llNode = api.lowLevel();
        var firstLine = hlimpl.ramlFirstLine(llNode.unit().contents());
        if (firstLine && firstLine.length >= 2 && firstLine[1] == "0.8") {
            this.ramlVersion = "RAML08";
        }
        else {
            this.ramlVersion = "RAML10";
        }
        var mediaTypeNodes = llNode.children().filter(function (x) {
            return x.key() == def.universesInfo.Universe10.Api.properties.mediaType.name;
        });
        if (mediaTypeNodes.length > 0) {
            this.defaultMediaType = mediaTypeNodes[0].value();
        }
        var unit = api.lowLevel().unit();
        var project = unit.project();
        project.setMainUnitPath(unit.absolutePath());
        this.namespaceResolver = project.namespaceResolver();
    };
    TraitsAndResourceTypesExpander.prototype.expandHighLevelNode = function (hlNode, rp, api, forceExpand) {
        var _this = this;
        if (forceExpand === void 0) { forceExpand = false; }
        this.init(hlNode);
        hlNode.setMergeMode(api.getMergeMode());
        var templateApplied = false;
        var llNode = hlNode.lowLevel();
        if (proxy.LowLevelCompositeNode.isInstance(llNode)) {
            var resources = extractResources(llNode);
            resources.forEach(function (x) { return templateApplied = _this.processResource(x) || templateApplied; });
        }
        if (!(templateApplied || forceExpand || hlNode.getMaster() != null)) {
            return null;
        }
        if (hlimpl.ASTNodeImpl.isInstance(hlNode)) {
            var hnode = hlNode;
            if (hnode.reusedNode() != null) {
                hnode.setReuseMode(true);
            }
        }
        if (this.ramlVersion == "RAML10") {
            rp = rp || new referencePatcher.ReferencePatcher();
            rp.process(llNode);
            llNode.actual().referencePatcher = rp;
        }
        return hlNode;
    };
    // private getTemplate<T extends core.BasicNode>(
    //     name:string,
    //     context:hl.IHighLevelNode,
    //     cache:{[key:string]:{[key:string]:T}},
    //     globalList:T[]):T{
    //
    //     var unitPath = context.lowLevel().unit().path();
    //     var unitCache = cache[unitPath];
    //     if(!unitCache){
    //         unitCache = {};
    //         cache[unitPath] = unitCache;
    //     }
    //     var val = unitCache[name];
    //
    //     if(val!==undefined){
    //         return val;
    //     }
    //     val = null;
    //     val = _.find(globalList,x=>hlimpl.qName(x.highLevel(),context)==name);
    //     if(!val){
    //         val = null;
    //     }
    //     unitCache[name] = val;
    //     return val;
    // }
    TraitsAndResourceTypesExpander.prototype.createHighLevelNode = function (_api, merge, rp, forceProxy, doInit) {
        if (merge === void 0) { merge = true; }
        if (rp === void 0) { rp = null; }
        if (forceProxy === void 0) { forceProxy = false; }
        if (doInit === void 0) { doInit = true; }
        if (doInit) {
            this.init(_api);
        }
        var api = _api;
        var highLevelNodes = [];
        var node = api;
        while (node) {
            var llNode = node.lowLevel();
            var topComposite;
            var fLine = hlimpl.ramlFirstLine(llNode.unit().contents());
            if ((fLine && (fLine.length < 3 || fLine[2] != def.universesInfo.Universe10.Overlay.name)) || forceProxy) {
                if (proxy.LowLevelCompositeNode.isInstance(llNode)) {
                    llNode = llNode.originalNode().originalNode();
                }
                topComposite = new proxy.LowLevelCompositeNode(llNode, null, null, this.ramlVersion);
            }
            else {
                topComposite = llNode;
            }
            var nodeType = node.definition();
            var newNode = new hlimpl.ASTNodeImpl(topComposite, null, nodeType, null);
            newNode.setUniverse(node.universe());
            highLevelNodes.push(newNode);
            if (!merge) {
                break;
            }
            var extNode = _.find(llNode.children(), function (x) { return x.key() == def.universesInfo.Universe10.Overlay.properties.extends.name; });
            if (extNode) { }
            node = node.getMaster();
        }
        var masterApi = highLevelNodes.pop();
        highLevelNodes = highLevelNodes.reverse();
        var mergeMode = api.getMergeMode();
        var result = mergeHighLevelNodes(masterApi, highLevelNodes, mergeMode, rp, forceProxy);
        result.setReusedNode(api.reusedNode());
        return result;
    };
    TraitsAndResourceTypesExpander.prototype.processResource = function (resource, _nodes) {
        var _this = this;
        if (_nodes === void 0) { _nodes = []; }
        var result = false;
        var nodes = _nodes.concat(resource);
        var resourceData = this.collectResourceData(resource, resource, undefined, undefined, nodes);
        if (!proxy.LowLevelProxyNode.isInstance(resource)) {
            return result;
        }
        resource.preserveAnnotations();
        resource.takeOnlyOriginalChildrenWithKey(def.universesInfo.Universe10.ResourceBase.properties.type.name);
        resource.takeOnlyOriginalChildrenWithKey(def.universesInfo.Universe10.FragmentDeclaration.properties.uses.name);
        resourceData.filter(function (x) { return x.resourceType != null; }).forEach(function (x) {
            var resourceTypeLowLevel = x.resourceType.node;
            var resourceTypeTransformer = x.resourceType.transformer;
            resourceTypeTransformer.owner = resource;
            resource.adopt(resourceTypeLowLevel, resourceTypeTransformer);
            result = true;
        });
        var methods = resource.children().filter(function (x) { return isPossibleMethodName(x.key()); });
        var _loop_1 = function () {
            var name_1 = m.key();
            m.takeOnlyOriginalChildrenWithKey(def.universesInfo.Universe10.FragmentDeclaration.properties.uses.name);
            allTraits = [];
            resourceData.forEach(function (x) {
                var methodTraits = x.methodTraits[name_1];
                if (methodTraits) {
                    allTraits = allTraits.concat(methodTraits);
                    methodTraits.forEach(function (x) {
                        var traitLowLevel = x.node;
                        var traitTransformer = x.transformer;
                        traitTransformer.owner = m;
                        m.adopt(traitLowLevel, traitTransformer);
                        result = true;
                    });
                }
                else {
                }
                var resourceTraits = x.traits;
                if (resourceTraits) {
                    allTraits = allTraits.concat(resourceTraits);
                    resourceTraits.forEach(function (x) {
                        var traitLowLevel = x.node;
                        var traitTransformer = x.transformer;
                        traitTransformer.owner = m;
                        m.adopt(traitLowLevel, traitTransformer);
                        result = true;
                    });
                }
            });
        };
        var allTraits;
        for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
            var m = methods_1[_i];
            _loop_1();
        }
        ;
        var resources = extractResources(resource);
        resources.forEach(function (x) { return result = _this.processResource(x, nodes) || result; });
        methods.forEach(function (x) { return _this.mergeBodiesForMethod(x); });
        return result;
    };
    TraitsAndResourceTypesExpander.prototype.mergeBodiesForMethod = function (method) {
        var llNode = method;
        if (!proxy.LowLevelCompositeNode.isInstance(llNode)) {
            return;
        }
        if (this.defaultMediaType == null) {
            return;
        }
        var bodyNode;
        var bodyNodesArray = [];
        var llChildren = llNode.children();
        for (var _i = 0, llChildren_1 = llChildren; _i < llChildren_1.length; _i++) {
            var ch = llChildren_1[_i];
            if (ch.key() == def.universesInfo.Universe10.Method.properties.body.name) {
                bodyNode = ch;
            }
            else if (ch.key() == def.universesInfo.Universe10.Method.properties.responses.name) {
                var responses = ch.children();
                for (var _a = 0, responses_1 = responses; _a < responses_1.length; _a++) {
                    var response = responses_1[_a];
                    var responseChildren = response.children();
                    for (var _b = 0, responseChildren_1 = responseChildren; _b < responseChildren_1.length; _b++) {
                        var respCh = responseChildren_1[_b];
                        if (respCh.key() == def.universesInfo.Universe10.Response.properties.body.name) {
                            bodyNodesArray.push(respCh);
                        }
                    }
                }
            }
        }
        if (bodyNode) {
            bodyNodesArray.push(bodyNode);
        }
        for (var _c = 0, bodyNodesArray_1 = bodyNodesArray; _c < bodyNodesArray_1.length; _c++) {
            var n = bodyNodesArray_1[_c];
            this.mergeBodies(n);
        }
    };
    TraitsAndResourceTypesExpander.prototype.mergeBodies = function (bodyNode) {
        var explicitCh;
        var implicitPart = [], otherMediaTypes = [];
        var newAdopted = [];
        var map = [];
        var gotImplicitPart = false;
        for (var _i = 0, _a = bodyNode.children(); _i < _a.length; _i++) {
            var ch = _a[_i];
            var key = ch.key();
            if (key == this.defaultMediaType) {
                explicitCh = ch;
                newAdopted.push({ node: referencePatcher.toOriginal(ch), transformer: ch.transformer() });
            }
            else {
                try {
                    parseMediaType(key);
                    otherMediaTypes.push(ch);
                }
                catch (e) {
                    var oParent = referencePatcher.toOriginal(ch).parent();
                    if (map.indexOf(oParent) < 0) {
                        newAdopted.push({ node: oParent, transformer: ch.transformer() });
                        map.push(oParent);
                    }
                    if (sufficientTypeAttributes[ch.key()]) {
                        gotImplicitPart = true;
                    }
                    implicitPart.push(ch);
                }
            }
        }
        if (implicitPart.length == 0 || (explicitCh == null && otherMediaTypes.length == 0)) {
            return false;
        }
        if (!gotImplicitPart) {
            return;
        }
        for (var _b = 0, implicitPart_1 = implicitPart; _b < implicitPart_1.length; _b++) {
            var ch = implicitPart_1[_b];
            bodyNode.removeChild(ch);
        }
        if (explicitCh == null) {
            var oNode = referencePatcher.toOriginal(bodyNode);
            var mapping = yaml.newMapping(yaml.newScalar(this.defaultMediaType), yaml.newMap([]));
            var newNode = new jsyaml.ASTNode(mapping, oNode.unit(), oNode, null, null);
            explicitCh = bodyNode.replaceChild(null, newNode);
        }
        explicitCh.patchAdoptedNodes(newAdopted);
        return true;
    };
    TraitsAndResourceTypesExpander.prototype.collectResourceData = function (original, obj, arr, transformer, nodesChain, occuredResourceTypes) {
        if (arr === void 0) { arr = []; }
        if (nodesChain === void 0) { nodesChain = []; }
        if (occuredResourceTypes === void 0) { occuredResourceTypes = {}; }
        nodesChain = nodesChain.concat([obj]);
        var ownTraits = this.extractTraits(obj, transformer, nodesChain);
        var methodTraitsMap = {};
        for (var _i = 0, _a = obj.children(); _i < _a.length; _i++) {
            var ch = _a[_i];
            var mName = ch.key();
            if (!isPossibleMethodName(mName)) {
                continue;
            }
            var methodTraits = this.extractTraits(ch, transformer, nodesChain);
            if (methodTraits && methodTraits.length > 0) {
                methodTraitsMap[mName] = methodTraits;
            }
        }
        var rtData;
        var rtRef = _.find(obj.children(), function (x) { return x.key() == def.universesInfo.Universe10.ResourceBase.properties.type.name; });
        if (rtRef != null) {
            var units = toUnits1(nodesChain);
            if (rtRef.valueKind() == yaml.Kind.SCALAR) {
                rtRef = jsyaml.createScalar(rtRef.value());
            }
            rtData = this.readGenerictData(original, rtRef, obj, 'resource type', transformer, units);
        }
        var result = {
            resourceType: rtData,
            traits: ownTraits,
            methodTraits: methodTraitsMap
        };
        arr.push(result);
        if (rtData) {
            var rt = rtData.node;
            var qName = rt.key() + "/" + rt.unit().absolutePath();
            if (!occuredResourceTypes[qName]) {
                occuredResourceTypes[qName] = true;
                this.collectResourceData(original, rt, arr, rtData.transformer, nodesChain, occuredResourceTypes);
            }
            else {
                result.resourceType = null;
            }
        }
        return arr;
    };
    TraitsAndResourceTypesExpander.prototype.extractTraits = function (obj, _transformer, nodesChain, occuredTraits) {
        if (occuredTraits === void 0) { occuredTraits = {}; }
        nodesChain = nodesChain.concat([obj]);
        var arr = [];
        for (var i = -1; i < arr.length; i++) {
            var gd = i < 0 ? null : arr[i];
            var _obj = gd ? gd.node : obj;
            var units = gd ? gd.unitsChain : toUnits1(nodesChain);
            var transformer = gd ? gd.transformer : _transformer;
            for (var _i = 0, _a = _obj.children().filter(function (x) { return x.key() == def.universesInfo.Universe10.MethodBase.properties.is.name; }); _i < _a.length; _i++) {
                var x = _a[_i];
                for (var _b = 0, _c = x.children(); _b < _c.length; _b++) {
                    var y = _c[_b];
                    var unitsChain = toUnits2(units, y);
                    var traitData = this.readGenerictData(obj, y, _obj, 'trait', transformer, unitsChain);
                    if (traitData) {
                        var name = traitData.name;
                        //if (!occuredTraits[name]) {
                        occuredTraits[name] = true;
                        arr.push(traitData);
                        //}
                    }
                }
            }
            ;
        }
        return arr;
    };
    TraitsAndResourceTypesExpander.prototype.readGenerictData = function (r, obj, context, template, transformer, unitsChain) {
        if (unitsChain === void 0) { unitsChain = []; }
        var value = obj.value();
        if (!value) {
            return;
        }
        var name;
        var propName = pluralize.plural(changeCase.camelCase(template));
        var hasParams = false;
        if (typeof (value) == 'string') {
            name = value;
        }
        else if (jsyaml.ASTNode.isInstance(value) || proxy.LowLevelProxyNode.isInstance(value)) {
            hasParams = true;
            name = value.key();
        }
        else {
            return null;
        }
        if (!name) {
            return null;
        }
        if (transformer) {
            name = transformer.transform(name).value;
        }
        var scalarParamValues = {};
        var scalarParams = {};
        var structuredParams = {};
        var node = getDeclaration(name, propName, this.namespaceResolver, unitsChain);
        if (node) {
            var ds_1 = new DefaultTransformer(r, null, unitsChain);
            if (hasParams) {
                if (this.ramlVersion == 'RAML08') {
                    value.children().forEach(function (x) { return scalarParamValues[x.key()] = x.value(); });
                }
                else {
                    for (var _i = 0, _a = value.children(); _i < _a.length; _i++) {
                        var x = _a[_i];
                        var llNode = referencePatcher.toOriginal(x);
                        var resolvedValueKind = x.resolvedValueKind();
                        if (resolvedValueKind == yaml.Kind.SCALAR || resolvedValueKind) {
                            scalarParamValues[x.key()] = llNode.value();
                            scalarParams[x.key()] = llNode;
                        }
                        else {
                            structuredParams[x.key()] = llNode;
                        }
                    }
                    ;
                }
                Object.keys(scalarParamValues).forEach(function (x) {
                    var q = ds_1.transform(scalarParamValues[x]);
                    //if (q.value){
                    if (q) {
                        if (typeof q !== "object") {
                            scalarParamValues[x] = q;
                        }
                    }
                    //}
                });
            }
            var valTransformer = new ValueTransformer(template, name, unitsChain, scalarParamValues, scalarParams, structuredParams, transformer);
            var resourceTypeTransformer = new DefaultTransformer(null, valTransformer, unitsChain);
            return {
                name: name,
                transformer: resourceTypeTransformer,
                parentTransformer: transformer,
                node: node,
                ref: obj,
                unitsChain: unitsChain
            };
        }
        return null;
    };
    return TraitsAndResourceTypesExpander;
}());
exports.TraitsAndResourceTypesExpander = TraitsAndResourceTypesExpander;
var LibraryExpander = /** @class */ (function () {
    function LibraryExpander() {
    }
    LibraryExpander.prototype.expandLibraries = function (_api) {
        var api = _api;
        if (api == null) {
            return null;
        }
        if (!universeHelpers.isApiSibling(_api.definition())) {
            return null;
        }
        if (proxy.LowLevelCompositeNode.isInstance(api.lowLevel())) {
            api = api.lowLevel().unit().highLevel().asElement();
        }
        var expander = new TraitsAndResourceTypesExpander();
        var rp = new referencePatcher.ReferencePatcher();
        var hlNode = expander.createHighLevelNode(api, true, rp, true);
        var result = expander.expandHighLevelNode(hlNode, rp, api, true);
        this.processNode(rp, result);
        return result;
    };
    LibraryExpander.prototype.expandLibrary = function (_lib) {
        var lib = _lib;
        if (lib == null) {
            return null;
        }
        // if(proxy.LowLevelCompositeNode.isInstance(lib.lowLevel())){
        //     lib = lib.lowLevel().unit().highLevel().asElement();
        // }
        var expander = new TraitsAndResourceTypesExpander();
        var rp = new referencePatcher.ReferencePatcher();
        var hlNode = expander.createHighLevelNode(lib, true, rp, true);
        var llNode = hlNode.lowLevel();
        rp.process(llNode);
        rp.expandLibraries(llNode, true);
        return hlNode;
    };
    LibraryExpander.prototype.processNode = function (rp, hlNode) {
        if (hlNode == null) {
            return;
        }
        var master = hlNode.getMaster();
        this.processNode(rp, master);
        var llNode = hlNode.lowLevel();
        var fLine = hlimpl.ramlFirstLine(llNode.unit().contents());
        if (fLine.length == 3 && fLine[2] == "Overlay") {
            rp.process(llNode);
        }
        rp.expandLibraries(llNode);
    };
    return LibraryExpander;
}());
exports.LibraryExpander = LibraryExpander;
function toUnits1(nodes) {
    var result = [];
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var n = nodes_1[_i];
        toUnits2(result, n, true);
    }
    return result;
}
function toUnits2(chainStart, node, append) {
    if (append === void 0) { append = false; }
    var result = append ? chainStart : chainStart.concat([]);
    var unit = node.unit();
    if (unit == null) {
        return result;
    }
    if (result.length == 0) {
        result.push(unit);
    }
    else {
        var prevPath = result[result.length - 1].absolutePath();
        if (unit.absolutePath() != prevPath) {
            result.push(unit);
        }
    }
    return result;
}
function toUnits(node) {
    var nodes = [];
    while (node) {
        nodes.push(node);
        node = node.parent();
    }
    return toUnits1(nodes);
}
exports.toUnits = toUnits;
var TransformMatches = /** @class */ (function () {
    function TransformMatches(name, transformer) {
        this.name = name;
        this.regexp = new RegExp(TransformMatches.leftTransformRegexp.source + name + TransformMatches.rightTransformRegexp.source);
        this.transformer = transformer;
    }
    TransformMatches.leftTransformRegexp = /\s*!\s*/;
    TransformMatches.rightTransformRegexp = /\s*$/;
    return TransformMatches;
}());
var transformers = [
    new TransformMatches("singularize", function (arg) { return pluralize.singular(arg); }),
    new TransformMatches("pluralize", function (arg) { return pluralize.plural(arg); }),
    new TransformMatches("uppercase", function (arg) { return arg ? arg.toUpperCase() : arg; }),
    new TransformMatches("lowercase", function (arg) { return arg ? arg.toLowerCase() : arg; }),
    new TransformMatches("lowercamelcase", function (arg) {
        if (!arg) {
            return arg;
        }
        return changeCase.camelCase(arg);
    }),
    new TransformMatches("uppercamelcase", function (arg) {
        if (!arg) {
            return arg;
        }
        var lowerCamelCase = changeCase.camelCase(arg);
        return lowerCamelCase[0].toUpperCase() + lowerCamelCase.substring(1, lowerCamelCase.length);
    }),
    new TransformMatches("lowerunderscorecase", function (arg) {
        if (!arg) {
            return arg;
        }
        var snakeCase = changeCase.snake(arg);
        return snakeCase.toLowerCase();
    }),
    new TransformMatches("upperunderscorecase", function (arg) {
        if (!arg) {
            return arg;
        }
        var snakeCase = changeCase.snake(arg);
        return snakeCase.toUpperCase();
    }),
    new TransformMatches("lowerhyphencase", function (arg) {
        if (!arg) {
            return arg;
        }
        var paramCase = changeCase.param(arg);
        return paramCase.toLowerCase();
    }),
    new TransformMatches("upperhyphencase", function (arg) {
        if (!arg) {
            return arg;
        }
        var paramCase = changeCase.param(arg);
        return paramCase.toUpperCase();
    }),
    new TransformMatches("sentencecase", function (arg) {
        if (!arg) {
            return arg;
        }
        var result = changeCase.sentenceCase(arg);
        return result[0].toUpperCase() + result.substring(1);
    })
];
function getTransformNames() {
    return transformers.map(function (transformer) { return transformer.name; });
}
exports.getTransformNames = getTransformNames;
function getTransformersForOccurence(occurence) {
    var result = [];
    var functions = occurence.split("|").slice(1);
    for (var _i = 0, functions_1 = functions; _i < functions_1.length; _i++) {
        var f = functions_1[_i];
        for (var i = 0; i < transformers.length; i++) {
            if (f.match(transformers[i].regexp)) {
                result.push(transformers[i].transformer);
                break;
            }
        }
    }
    return result;
}
exports.getTransformersForOccurence = getTransformersForOccurence;
var TransformationBuffer = /** @class */ (function () {
    function TransformationBuffer() {
        this.buf = null;
    }
    TransformationBuffer.prototype.append = function (value) {
        if (value !== "") {
            if (this.buf != null) {
                if (value != null) {
                    if (typeof (this.buf) != "string") {
                        this.buf = "" + this.buf;
                    }
                    this.buf += value;
                }
            }
            else if (value !== "") {
                this.buf = value;
            }
        }
    };
    TransformationBuffer.prototype.value = function () {
        return this.buf != null ? this.buf : "";
    };
    return TransformationBuffer;
}());
var ValueTransformer = /** @class */ (function () {
    function ValueTransformer(templateKind, templateName, unitsChain, scalarParamValues, scalarParams, structuredParams, vDelegate) {
        this.templateKind = templateKind;
        this.templateName = templateName;
        this.unitsChain = unitsChain;
        this.scalarParamValues = scalarParamValues;
        this.scalarParams = scalarParams;
        this.structuredParams = structuredParams;
        this.vDelegate = vDelegate;
    }
    ValueTransformer.prototype.transform = function (obj, toString, doBreak, callback) {
        var undefParams = {};
        var errors = [];
        if (typeof (obj) === 'string') {
            if (this.structuredParams && util.stringStartsWith(obj, "<<") && util.stringEndsWith(obj, ">>")) {
                var paramName = obj.substring(2, obj.length - 2);
                var structuredValue = this.structuredParams[paramName];
                if (structuredValue != null) {
                    return { value: structuredValue, errors: errors };
                }
            }
            var str = obj;
            var buf = new TransformationBuffer();
            var prev = 0;
            for (var i = str.indexOf('<<'); i >= 0; i = str.indexOf('<<', prev)) {
                buf.append(str.substring(prev, i));
                var i0 = i;
                i += '<<'.length;
                prev = this.paramUpperBound(str, i);
                if (prev == -1) {
                    break;
                }
                var paramOccurence = str.substring(i, prev);
                prev += '>>'.length;
                var originalString = str.substring(i0, prev);
                var val;
                var paramName = void 0;
                var transformers = getTransformersForOccurence(paramOccurence);
                if (transformers.length > 0) {
                    var ind = paramOccurence.indexOf('|');
                    paramName = paramOccurence.substring(0, ind).trim();
                    val = this.scalarParamValues[paramName];
                    if (val && typeof (val) == "string" && val.indexOf("<<") >= 0 && this.vDelegate) {
                        val = this.vDelegate.transform(val, toString, doBreak, callback).value;
                    }
                    if (val) {
                        if (referencePatcherHL.PatchedReference.isInstance(val)) {
                            val = val.value();
                        }
                        for (var _i = 0, transformers_1 = transformers; _i < transformers_1.length; _i++) {
                            var tr = transformers_1[_i];
                            val = tr(val);
                        }
                    }
                }
                else {
                    paramName = paramOccurence.trim();
                    val = this.scalarParamValues[paramName];
                    if (val && typeof (val) == "string" && val.indexOf("<<") >= 0 && this.vDelegate) {
                        val = this.vDelegate.transform(val, toString, doBreak, callback).value;
                    }
                }
                if (val === null || val === undefined) {
                    undefParams[paramName] = true;
                    val = originalString;
                }
                buf.append(val);
            }
            // var upArr = Object.keys(undefParams);
            // if(upArr.length>0){
            //     var errStr = upArr.join(', ').trim();
            //     var message = `Undefined ${this.templateKind} parameter${upArr.length>1?'s':''}: ${errStr}`;
            //     var error = {
            //         code: hl.IssueCode.MISSING_REQUIRED_PROPERTY,
            //         isWarning: false,
            //         message: message,
            //         node: null,
            //         start: -1,
            //         end: -1,
            //         path: null
            //     }
            //     errors.push(error);
            // }
            buf.append(str.substring(prev, str.length));
            return { value: buf.value(), errors: errors };
        }
        else {
            return { value: obj, errors: errors };
        }
    };
    ValueTransformer.prototype.paramUpperBound = function (str, pos) {
        var count = 0;
        for (var i = pos; i < str.length; i++) {
            if (util.stringStartsWith(str, "<<", i)) {
                count++;
                i++;
            }
            else if (util.stringStartsWith(str, ">>", i)) {
                if (count == 0) {
                    return i;
                }
                count--;
                i++;
            }
        }
        return str.length;
    };
    ValueTransformer.prototype.children = function (node) {
        var substitution = this.substitutionNode(node);
        if (substitution) {
            return substitution.children();
        }
        return null;
    };
    ValueTransformer.prototype.valueKind = function (node) {
        var substitution = this.substitutionNode(node);
        if (substitution) {
            return substitution.valueKind();
        }
        return null;
    };
    ValueTransformer.prototype.anchorValueKind = function (node) {
        var substitution = this.substitutionNode(node);
        if (substitution && substitution.valueKind() == yaml.Kind.ANCHOR_REF) {
            return substitution.anchorValueKind();
        }
        return null;
    };
    ValueTransformer.prototype.resolvedValueKind = function (node) {
        var substitution = this.substitutionNode(node);
        return substitution && substitution.resolvedValueKind();
    };
    ValueTransformer.prototype.includePath = function (node) {
        var substitution = this.substitutionNode(node);
        if (substitution) {
            return substitution.includePath();
        }
        return null;
    };
    ValueTransformer.prototype.substitutionNode = function (node, chain, inKey) {
        if (chain === void 0) { chain = []; }
        if (inKey === void 0) { inKey = false; }
        var paramName = this.paramName(node, inKey);
        var result = paramName && (this.scalarParams[paramName] || this.structuredParams[paramName]);
        if (!result) {
            return null;
        }
        chain.push(result);
        if (this.vDelegate) {
            return this.vDelegate.substitutionNode(result, chain) || result;
        }
        return result;
    };
    ValueTransformer.prototype.paramNodesChain = function (node, inKey) {
        var chain = [];
        this.substitutionNode(referencePatcher.toOriginal(node), chain, inKey);
        return chain.length > 0 ? chain : null;
    };
    ValueTransformer.prototype.paramName = function (node, inKey) {
        var val;
        if (inKey) {
            if (node.kind() == yaml.Kind.MAPPING) {
                val = ("" + node.key()).trim();
            }
        }
        else {
            if (node.valueKind() == yaml.Kind.SCALAR) {
                val = ("" + node.value()).trim();
            }
        }
        var paramName;
        if (val) {
            if (util.stringStartsWith(val, "(") && util.stringEndsWith(val, ")")) {
                val = val.substring(1, val.length - 1);
            }
            if (util.stringStartsWith(val, "<<") && util.stringEndsWith(val, ">>")) {
                paramName = val.substring(2, val.length - 2);
            }
        }
        return paramName;
    };
    ValueTransformer.prototype.definingUnitSequence = function (str) {
        if (str.length < 2) {
            return null;
        }
        if (str.charAt(0) == "(" && str.charAt(str.length - 1) == ")") {
            str = str.substring(1, str.length - 1);
        }
        if (str.length < 4) {
            return null;
        }
        if (str.substring(0, 2) != "<<") {
            return null;
        }
        if (str.substring(str.length - 2, str.length) != ">>") {
            return null;
        }
        var _str = str.substring(2, str.length - 2);
        if (_str.indexOf("<<") >= 0 || _str.indexOf(">>") >= 0) {
            return null;
        }
        return this._definingUnitSequence(_str);
    };
    ValueTransformer.prototype._definingUnitSequence = function (str) {
        if (this.scalarParamValues && this.scalarParamValues[str]) {
            return this.unitsChain;
        }
        if (this.vDelegate) {
            return this.vDelegate._definingUnitSequence(str);
        }
        return null;
    };
    return ValueTransformer;
}());
exports.ValueTransformer = ValueTransformer;
var DefaultTransformer = /** @class */ (function (_super) {
    __extends(DefaultTransformer, _super);
    function DefaultTransformer(owner, delegate, unitsChain) {
        var _this = _super.call(this, delegate != null ? delegate.templateKind : "", delegate != null ? delegate.templateName : "", unitsChain) || this;
        _this.owner = owner;
        _this.delegate = delegate;
        return _this;
    }
    DefaultTransformer.prototype.transform = function (obj, toString, doContinue, callback) {
        if (obj == null || (doContinue != null && !doContinue())) {
            return {
                value: obj,
                errors: []
            };
        }
        var ownResult = {
            value: obj,
            errors: []
        };
        var gotDefaultParam = false;
        defaultParameters.forEach(function (x) { return gotDefaultParam = gotDefaultParam || obj.toString().indexOf('<<' + x) >= 0; });
        if (gotDefaultParam) {
            this.initParams();
            ownResult = _super.prototype.transform.call(this, obj, toString, doContinue, callback);
        }
        var result = this.delegate != null
            ? this.delegate.transform(ownResult.value, toString, doContinue, callback)
            : ownResult.value;
        if (doContinue != null && doContinue() && callback != null) {
            result.value = callback(result.value, this);
        }
        return result;
    };
    DefaultTransformer.prototype.initParams = function () {
        var methodName;
        var resourcePath = "";
        var resourcePathName;
        var ll = this.owner;
        var node = ll;
        var last = null;
        while (node) {
            var key = node.key();
            if (key != null) {
                if (util.stringStartsWith(key, '/')) {
                    if (!resourcePathName) {
                        var arr = key.split('/');
                        for (var i = arr.length - 1; i >= 0; i--) {
                            var seg = arr[i];
                            if (seg.indexOf('{') == -1) {
                                resourcePathName = arr[i];
                                break;
                            }
                            if (seg.length > 0) {
                                last = seg;
                            }
                        }
                    }
                    resourcePath = key + resourcePath;
                }
                else {
                    methodName = key;
                }
            }
            node = node.parent();
        }
        if (!resourcePathName) {
            if (last) {
                resourcePathName = "";
            }
        }
        this.scalarParamValues = {
            resourcePath: resourcePath,
            resourcePathName: resourcePathName
        };
        if (methodName) {
            this.scalarParamValues['methodName'] = methodName;
        }
    };
    DefaultTransformer.prototype.children = function (node) {
        return this.delegate != null ? this.delegate.children(node) : null;
    };
    DefaultTransformer.prototype.valueKind = function (node) {
        return this.delegate != null ? this.delegate.valueKind(node) : null;
    };
    DefaultTransformer.prototype.includePath = function (node) {
        return this.delegate != null ? this.delegate.includePath(node) : null;
    };
    DefaultTransformer.prototype.anchorValueKind = function (node) {
        return this.delegate != null ? this.delegate.anchorValueKind(node) : null;
    };
    DefaultTransformer.prototype.resolvedValueKind = function (node) {
        return this.delegate != null ? this.delegate.resolvedValueKind(node) : null;
    };
    DefaultTransformer.prototype.substitutionNode = function (node, chain, inKey) {
        if (chain === void 0) { chain = []; }
        if (inKey === void 0) { inKey = false; }
        return this.delegate ? this.delegate.substitutionNode(node, chain, inKey) : null;
    };
    DefaultTransformer.prototype._definingUnitSequence = function (str) {
        if (this.scalarParamValues && this.scalarParamValues[str]) {
            return this.unitsChain;
        }
        if (this.delegate) {
            return this.delegate._definingUnitSequence(str);
        }
        return null;
    };
    return DefaultTransformer;
}(ValueTransformer));
exports.DefaultTransformer = DefaultTransformer;
var defaultParameters = ['resourcePath', 'resourcePathName', 'methodName'];
var possibleMethodNames;
function isPossibleMethodName(n) {
    if (!possibleMethodNames) {
        possibleMethodNames = {};
        var methodType = def.getUniverse("RAML10").type(def.universesInfo.Universe10.Method.name);
        for (var _i = 0, _a = methodType.property(def.universesInfo.Universe10.Method.properties.method.name).enumOptions(); _i < _a.length; _i++) {
            var opt = _a[_i];
            possibleMethodNames[opt] = true;
        }
    }
    return possibleMethodNames[n];
}
exports.isPossibleMethodName = isPossibleMethodName;
function getDeclaration(elementName, propName, resolver, _units) {
    if (!elementName) {
        return null;
    }
    var ns = "";
    var name = elementName;
    var ind = elementName.lastIndexOf(".");
    if (ind >= 0) {
        ns = elementName.substring(0, ind);
        name = elementName.substring(ind + 1);
    }
    var result;
    var gotLibrary = false;
    var units = _units;
    for (var i = units.length; i > 0; i--) {
        var u = units[i - 1];
        var fLine = hlimpl.ramlFirstLine(u.contents());
        var className = fLine && fLine.length == 3 && fLine[2];
        if (className == def.universesInfo.Universe10.Library.name) {
            if (gotLibrary) {
                break;
            }
            gotLibrary = true;
        }
        var actualUnit = u;
        if (ns) {
            actualUnit = null;
            var map = resolver.nsMap(u);
            if (map) {
                var info = map[ns];
                if (info) {
                    actualUnit = info.unit;
                }
            }
        }
        if (!actualUnit) {
            continue;
        }
        var uModel = resolver.unitModel(actualUnit);
        var c = uModel[propName];
        if (!namespaceResolver.ElementsCollection.isInstance(c)) {
            continue;
        }
        result = c.getElement(name);
        if (result) {
            break;
        }
        if (i == 1) {
            if (className == def.universesInfo.Universe10.Extension.name ||
                className == def.universesInfo.Universe10.Overlay.name) {
                var extendedUnit = namespaceResolver.extendedUnit(u);
                if (extendedUnit) {
                    i++;
                    _units[0] = extendedUnit;
                }
            }
        }
    }
    return result;
}
function extractResources(llNode) {
    var resources = llNode.children().filter(function (x) {
        var key = x.key();
        return key && (key.length > 0) && (key.charAt(0) == "/");
    });
    return resources;
}
;
var sufficientTypeAttributes = {};
sufficientTypeAttributes[def.universesInfo.Universe10.TypeDeclaration.properties.type.name] = true;
sufficientTypeAttributes[def.universesInfo.Universe10.TypeDeclaration.properties.example.name] = true;
sufficientTypeAttributes[def.universesInfo.Universe08.BodyLike.properties.schema.name] = true;
sufficientTypeAttributes[def.universesInfo.Universe10.ObjectTypeDeclaration.properties.properties.name] = true;
function parseMediaType(str) {
    if (!str) {
        return null;
    }
    if (str == "*/*") {
        return null;
    }
    if (str.indexOf("/*") == str.length - 2) {
        str = str.substring(0, str.length - 2) + "/xxx";
    }
    return mediaTypeParser.parse(str);
}
exports.parseMediaType = parseMediaType;
//# sourceMappingURL=expanderLL.js.map