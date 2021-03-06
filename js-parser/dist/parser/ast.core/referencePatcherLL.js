"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ll = require("../lowLevelAST");
var hlimpl = require("../highLevelImpl");
var yaml = require("yaml-ast-parser");
var jsyaml = require("../jsyaml/jsyaml2lowLevel");
var util = require("../../util/index");
var proxy = require("./LowLevelASTProxy");
var universeDef = require("../tools/universe");
var _ = require("underscore");
var namespaceResolver = require("./namespaceResolver");
var def = require("raml-definition-system");
var typeExpressions = def.rt.typeExpressions;
var referencePatcherHL = require("./referencePatcher");
var changeCase = require('change-case');
var transitionsMap;
function initTransitions() {
    if (transitionsMap) {
        return;
    }
    transitionsMap = {};
    for (var _i = 0, _a = Object.keys(exports.transitions); _i < _a.length; _i++) {
        var key = _a[_i];
        var trSchema = exports.transitions[key];
        var tr = new Transition(key, trSchema, transitionsMap);
        transitionsMap[key] = tr;
    }
    var factory = new ReferencePatcherActionsAndConditionsFactory();
    for (var _b = 0, _c = Object.keys(transitionsMap); _b < _c.length; _b++) {
        var key = _c[_b];
        transitionsMap[key].init(factory);
    }
}
exports.transitions = {
    "Api": {
        "traits": {
            "$action": "$Trait",
            "$toChildren": true
        },
        "resourceTypes": {
            "$action": "$ResourceType",
            "$toChildren": true
        },
        "types": {
            "$action": "$TypeDeclaration",
            "$toChildren": true
        },
        "annotationTypes": {
            "$action": "$TypeDeclaration",
            "$toChildren": true
        },
        "baseUriParameters": {
            "$action": "$TypeDeclaration",
            "$toChildren": true
        },
        "securedBy": "$SecuritySchemeReferences",
        "/\/.+/": "$Resource",
        "/\\(.+\\)/": "$Annotation"
    },
    "Resource": {
        "get": "$Method",
        "put": "$Method",
        "post": "$Method",
        "delete": "$Method",
        "options": "$Method",
        "head": "$Method",
        "patch": "$Method",
        "is": "$TraitReferences",
        "type": {
            "$action": "##patchResourceTypeReference"
        },
        "uriParameters": {
            "$action": "$TypeDeclaration",
            "$toChildren": true
        },
        "securedBy": "$SecuritySchemeReferences",
        "/\\(.+\\)/": "$Annotation",
        "/\/.+/": "$Resource",
        "$action": "##filterTraits"
    },
    "Method": {
        "body": "$Body",
        "responses": {
            "$action": "$Response",
            "$toChildren": true
        },
        "is": "$TraitReferences",
        "queryParameters": {
            "$action": "$TypeDeclaration",
            "$toChildren": true
        },
        "queryString": {
            "$action": "$TypeDeclaration"
        },
        "headers": {
            "$action": "$TypeDeclaration",
            "$toChildren": true
        },
        "securedBy": "$SecuritySchemeReferences",
        "/\\(.+\\)/": "$Annotation",
        "$action": "##filterTraits"
    },
    "ResourceType": {
        "get": "$Method",
        "put": "$Method",
        "post": "$Method",
        "delete": "$Method",
        "options": "$Method",
        "head": "$Method",
        "patch": "$Method",
        "is": "$TraitReferences",
        "type": {
            "$action": "##patchResourceTypeReference"
        },
        "uriParameters": {
            "$action": "$TypeDeclaration",
            "$toChildren": true
        },
        "securedBy": "$SecuritySchemeReferences",
        "/\\(.+\\)/": "$Annotation"
    },
    "Trait": {
        "body": "$Body",
        "responses": {
            "/\\d{3,3}/": "$Response"
        },
        "queryParameters": {
            "$action": "$TypeDeclaration",
            "$toChildren": true
        },
        "queryString": {
            "$action": "$TypeDeclaration"
        },
        "headers": {
            "$action": "$TypeDeclaration",
            "$toChildren": true
        },
        "securedBy": "$SecuritySchemeReferences",
        "/\\(.+\\)/": "$Annotation"
    },
    "Response": {
        "body": "$Body",
        "headers": {
            "$action": "$TypeDeclaration",
            "$toChildren": true
        },
        "/\\(.+\\)/": "$Annotation"
    },
    "Body": {
        "oneOf": [
            {
                "$conditions": [
                    "isBodyWithDefaultMediaType"
                ],
                "$action": "$TypeDeclaration"
            },
            {
                "$action": "$TypeDeclaration",
                "$toChildren": true
            }
        ]
    },
    "TypeDeclaration": {
        "oneOf": [
            {
                "$conditions": [
                    "isScalar"
                ],
                "$action": "##patch"
            },
            {
                "$conditions": [
                    "isArray"
                ],
                "$action": "$TypeDeclaration",
                "$toChildren": true
            },
            {
                "type": "$TypeDeclaration",
                "items": "$TypeDeclaration",
                "properties": {
                    "/.+/": "$TypeDeclaration"
                },
                "facets": {
                    "$action": "$TypeDeclaration",
                    "$toChildren": true
                },
                "/\\(.+\\)/": "$Annotation",
                "$action": "##removeUses"
            }
        ],
    },
    "Annotation": {
        "$action": "##patchAnnotationName"
    },
    "TraitReferences": {
        "$action": "##patchTraitReference",
        "$toChildren": true
    },
    "SecuritySchemeReferences": {
        "$action": "##patchSecuritySchemeReference",
        "$toChildren": true
    }
};
var Scope = /** @class */ (function () {
    function Scope() {
    }
    return Scope;
}());
exports.Scope = Scope;
var TransitionKind;
(function (TransitionKind) {
    TransitionKind[TransitionKind["BASIC"] = 0] = "BASIC";
    TransitionKind[TransitionKind["ONE_OF"] = 1] = "ONE_OF";
    TransitionKind[TransitionKind["ACTION"] = 2] = "ACTION";
    TransitionKind[TransitionKind["MIXED"] = 3] = "MIXED";
})(TransitionKind = exports.TransitionKind || (exports.TransitionKind = {}));
var Transition = /** @class */ (function () {
    function Transition(title, localMap, globalMap) {
        this.title = title;
        this.localMap = localMap;
        this.globalMap = globalMap;
        this.applyToChildren = false;
    }
    Transition.prototype.processNode = function (node, state) {
        if (this.kind == TransitionKind.ONE_OF) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var ch = _a[_i];
                if (ch.checkConditions(node, state)) {
                    this.applyMappedTransition(node, ch, state);
                    break;
                }
            }
            return;
        }
        if (this.kind == TransitionKind.BASIC || this.kind == TransitionKind.MIXED) {
            for (var _b = 0, _c = node.children(); _b < _c.length; _b++) {
                var chNode = _c[_b];
                var key = chNode.key();
                if (!key) {
                    continue;
                }
                var tr = this.staticTransitions[key];
                if (!tr) {
                    for (var _d = 0, _e = this.regexpTransitions; _d < _e.length; _d++) {
                        var regexpEntry = _e[_d];
                        if (key.match(regexpEntry.regexp)) {
                            tr = regexpEntry.transition;
                            break;
                        }
                    }
                }
                if (tr) {
                    this.applyMappedTransition(chNode, tr, state);
                }
            }
        }
        if (this.kind == TransitionKind.ACTION || this.kind == TransitionKind.MIXED) {
            if (this.action != null) {
                this.action(node, state);
            }
            else {
                this.applyMappedTransition(node, this.children[0], state);
            }
        }
    };
    Transition.prototype.applyMappedTransition = function (node, tr, state) {
        var appended1 = state.appendUnitIfNeeded(node);
        if (tr.applyToChildren) {
            for (var _i = 0, _a = node.children(); _i < _a.length; _i++) {
                var chNode = _a[_i];
                var appended2 = state.appendUnitIfNeeded(chNode);
                tr.processNode(chNode, state);
                if (appended2) {
                    state.popUnit();
                }
            }
        }
        else {
            tr.processNode(node, state);
        }
        if (appended1) {
            state.popUnit();
        }
    };
    Transition.prototype.checkConditions = function (node, state) {
        if (!this.conditions) {
            return true;
        }
        var result = true;
        for (var _i = 0, _a = this.conditions; _i < _a.length; _i++) {
            var condition = _a[_i];
            result = result && condition(node, state);
        }
        return result;
    };
    Transition.prototype.init = function (factory) {
        var _this = this;
        this.conditions = this.localMap["$conditions"]
            && this.localMap["$conditions"].map(function (x) { return factory.condition(x); });
        if (this.localMap["$toChildren"]) {
            this.applyToChildren = true;
        }
        var oneOf = this.localMap["oneOf"];
        if (oneOf) {
            this.kind = TransitionKind.ONE_OF;
            this.children = oneOf.map(function (x, i) { return new Transition(_this.title + "[" + i + "]", x, _this.globalMap); });
            this.children.forEach(function (x) { return x.init(factory); });
        }
        else {
            var actionName = this.localMap["$action"];
            if (actionName) {
                if (Object.keys(this.localMap).filter(function (x) { return x.charAt(0) != "$"; }).length == 0) {
                    this.kind = TransitionKind.ACTION;
                }
                else {
                    this.kind = TransitionKind.MIXED;
                }
                if (util.stringStartsWith(actionName, "##")) {
                    this.action = factory.action(actionName);
                }
                else if (actionName.charAt(0) == "$") {
                    this.children = [this.globalMap[actionName.substring(1)]];
                }
            }
            if (this.kind == null) {
                this.kind = TransitionKind.BASIC;
            }
            else if (this.kind == TransitionKind.ACTION) {
                return;
            }
            this.regexpTransitions = [];
            this.staticTransitions = {};
            for (var _i = 0, _a = Object.keys(this.localMap).filter(function (x) { return x.charAt(0) != "$"; }); _i < _a.length; _i++) {
                var key = _a[_i];
                if (!key) {
                    continue;
                }
                key = key.trim();
                if (!key) {
                    continue;
                }
                var trObj = this.localMap[key];
                var tr;
                if (typeof trObj === "string") {
                    if (trObj.charAt(0) == "$") {
                        tr = this.globalMap[trObj.substring(1)];
                    }
                }
                else if (typeof trObj == "object" && !Array.isArray(trObj)) {
                    tr = new Transition(this.title + "." + key, trObj, this.globalMap);
                    tr.init(factory);
                }
                if (!tr) {
                    continue;
                }
                if (key.charAt(0) == "/") {
                    var regexp = new RegExp(key.substring(1, key.length - 1));
                    this.regexpTransitions.push({
                        regexp: regexp,
                        transition: tr
                    });
                }
                else {
                    this.staticTransitions[key] = tr;
                }
            }
        }
    };
    return Transition;
}());
exports.Transition = Transition;
var State = /** @class */ (function () {
    function State(referencePatcher, rootUnit, globalScope, resolver) {
        this.referencePatcher = referencePatcher;
        this.rootUnit = rootUnit;
        this.globalScope = globalScope;
        this.resolver = resolver;
        this.meta = {};
        this.registerOnly = false;
        this.units = [rootUnit];
    }
    State.prototype.lastUnit = function () {
        return this.units[this.units.length - 1];
    };
    State.prototype.appendUnitIfNeeded = function (node) {
        if (jsyaml.CompilationUnit.isInstance(node)) {
            var unit = node;
            if (unit.absolutePath() != this.lastUnit().absolutePath()) {
                this.units.push(unit);
                return true;
            }
            return false;
        }
        var originalNode = toOriginal(node);
        var originalUnit = originalNode.unit();
        if (originalNode.valueKind() == yaml.Kind.INCLUDE_REF) {
            var ref = originalNode.includePath();
            var includedUnit = originalUnit.resolve(ref);
            if (includedUnit) {
                this.units.push(includedUnit);
                return true;
            }
            return false;
        }
        else {
            if (originalUnit.absolutePath() != this.lastUnit().absolutePath()) {
                this.units.push(originalUnit);
                return true;
            }
            return false;
        }
    };
    State.prototype.popUnit = function () {
        this.units.pop();
    };
    return State;
}());
exports.State = State;
var ReferencePatcherActionsAndConditionsFactory = /** @class */ (function () {
    function ReferencePatcherActionsAndConditionsFactory() {
    }
    ReferencePatcherActionsAndConditionsFactory.prototype.action = function (actionName) {
        var action;
        if (actionName == "##patch") {
            action = patchTypeAction;
        }
        else if (actionName == "##patchTraitReference") {
            action = patchTraitReferenceAction;
        }
        else if (actionName == "##patchResourceTypeReference") {
            action = patchResourceTypeReferenceAction;
        }
        else if (actionName == "##patchAnnotationName") {
            action = patchAnnotationNameAction;
        }
        else if (actionName == "##patchSecuritySchemeReference") {
            action = patchSecuritySchemeReferenceAction;
        }
        else if (actionName == "##filterTraits") {
            action = filterTraits;
        }
        else if (actionName == "##removeUses") {
            action = function (node, state) {
                state.referencePatcher.removeUses(node);
                return true;
            };
        }
        return action;
    };
    ReferencePatcherActionsAndConditionsFactory.prototype.condition = function (name) {
        if (name == "isScalar") {
            return isScalarCondition;
        }
        else if (name == "isArray") {
            return isArrayCondition;
        }
        else if (name == "isBodyWithDefaultMediaType") {
            return isBodyWithDefaultMediaTypeCondition;
        }
        return null;
    };
    return ReferencePatcherActionsAndConditionsFactory;
}());
exports.ReferencePatcherActionsAndConditionsFactory = ReferencePatcherActionsAndConditionsFactory;
function isScalarCondition(node, state) {
    var result = node.kind() == yaml.Kind.SCALAR || node.valueKind() == yaml.Kind.SCALAR;
    if (result) {
        var value = node.value(true);
        if (!value) {
            result = false;
        }
        else if (typeof value == "string") {
            value = value.trim();
            if (!value) {
                result = false;
            }
        }
    }
    else {
        result = false;
    }
    return result;
}
function isArrayCondition(node, state) {
    return node.valueKind() == yaml.Kind.SEQ;
}
function isBodyWithDefaultMediaTypeCondition(node, state) {
    if (state.globalScope && state.globalScope.hasRootMediaType) {
        return _.find(node.children(), function (x) { return x.key() && x.key().indexOf("/") >= 0; }) == null;
    }
    return false;
}
function patchTypeAction(node, state) {
    state.referencePatcher.patchType(node, state);
    return false;
}
function patchTraitReferenceAction(node, state) {
    state.meta.templatesCollection = def.universesInfo.Universe10.LibraryBase.properties.traits.name;
    if (node.kind() != yaml.Kind.SCALAR) {
        if (node.key() == null) {
            node = node.children()[0];
        }
    }
    state.referencePatcher.patchReference(node, state, "traits");
    return false;
}
function patchResourceTypeReferenceAction(node, state) {
    state.meta.templatesCollection = def.universesInfo.Universe10.LibraryBase.properties.resourceTypes.name;
    var children = node.children();
    if (children.length > 0) {
        state.referencePatcher.patchReference(children[0], state, "resourceTypes");
    }
    else {
        var pNode = node;
        var pScalar = new proxy.LowLevelCompositeNode(jsyaml.createScalar(node.value()), null, pNode.transformer(), "RAML10", true);
        state.referencePatcher.patchReference(pScalar, state, "resourceTypes");
        if (!state.registerOnly) {
            pNode.setValueOverride(pScalar.value());
        }
    }
    //state.referencePatcher.patchReference(children[0],state,"resourceTypes");
    return false;
}
function patchAnnotationNameAction(node, state) {
    var key = toOriginal(node).key();
    var pNode = node;
    var transformer = pNode.transformer();
    var patchedReference = state.referencePatcher.resolveReferenceValue(key.substring(1, key.length - 1), state, transformer, "annotationTypes");
    if (patchedReference) {
        state.referencePatcher.registerPatchedReference(patchedReference);
        if (!state.registerOnly) {
            pNode.setKeyOverride("(" + patchedReference.value() + ")");
            if (patchedReference.isChained()) {
                pNode.addMeta("chaining", [
                    { value: patchedReference.value(), kind: 'annotationRef' }
                ]);
            }
        }
    }
    return false;
}
function patchSecuritySchemeReferenceAction(node, state) {
    if (node.key() == "securedBy") {
        node = node.children()[0];
    }
    state.referencePatcher.patchReference(node, state, "securitySchemes");
    return false;
}
function filterTraits(node, state) {
    var isNode = _.find(node.children(), function (x) { return x.key() == def.universesInfo.Universe10.MethodBase.properties.is.name; });
    if (isNode) {
        isNode.filterChildren();
    }
    return false;
}
var ReferencePatcher = /** @class */ (function () {
    function ReferencePatcher(mode) {
        if (mode === void 0) { mode = referencePatcherHL.PatchMode.DEFAULT; }
        this.mode = mode;
        this._outerDependencies = {};
        this._libModels = {};
        this.needTypesReset = false;
    }
    ReferencePatcher.prototype.process = function (apiNode, rootNode, typeName, _removeUses, _patchNodeName, collectionName) {
        var _this = this;
        if (rootNode === void 0) { rootNode = apiNode; }
        if (typeName === void 0) { typeName = "Api"; }
        if (_removeUses === void 0) { _removeUses = false; }
        if (_patchNodeName === void 0) { _patchNodeName = false; }
        initTransitions();
        var scope = new Scope();
        scope.hasRootMediaType = (_.find(apiNode.children(), function (x) { return x.key() == "mediaType"; }) != null);
        var rootUnit = rootNode.unit();
        var resolver = rootUnit.project().namespaceResolver();
        var state = new State(this, rootUnit, scope, resolver);
        var entryPoint = transitionsMap[typeName];
        if (entryPoint) {
            entryPoint.processNode(apiNode, state);
        }
        if (_patchNodeName) {
            this.patchNodeName(apiNode, state, collectionName);
        }
        if (_removeUses) {
            this.removeUses(apiNode);
        }
        else {
            this.patchUses(apiNode, resolver);
        }
        apiNode.children().forEach(function (x) { return _this.removeUses(x); });
        apiNode["libProcessed"] = true;
        //this.resetHighLevel(apiNode);
    };
    ReferencePatcher.prototype.patchType = function (node, state) {
        var _this = this;
        state.referencePatcher.removeUses(node);
        var collectionName = "types";
        var llNode = node;
        var value = node.value(true).toString().trim();
        var ch0 = value[0];
        var ch1 = value[value.length - 1];
        if ((ch0 === "{" && ch1 == "}") || (ch0 === "<" && ch1 == ">")) {
            return;
        }
        var gotExpression = referencePatcherHL.checkExpression(value);
        var transformer = llNode.transformer();
        var stringToPatch = value;
        var escapeData = { status: referencePatcherHL.ParametersEscapingStatus.NOT_REQUIRED };
        var additionalUnits = transformer ? transformer.unitsChain : null;
        if (transformer != null || value.indexOf("<<") >= 0) {
            var actualNode = toOriginal(llNode);
            var actualValue = actualNode.value();
            escapeData = referencePatcherHL.escapeTemplateParameters(actualValue);
            if (escapeData.status == referencePatcherHL.ParametersEscapingStatus.OK) {
                if (gotExpression) {
                    stringToPatch = escapeData.resultingString;
                }
                else {
                    stringToPatch = actualValue;
                }
            }
            else if (escapeData.status == referencePatcherHL.ParametersEscapingStatus.ERROR) {
                return;
            }
            else {
                transformer = null;
            }
        }
        var appendedAdditional;
        if (additionalUnits) {
            appendedAdditional = [];
            for (var _i = 0, additionalUnits_1 = additionalUnits; _i < additionalUnits_1.length; _i++) {
                var u = additionalUnits_1[_i];
                appendedAdditional.push(state.appendUnitIfNeeded(u));
            }
        }
        var appendedAttrUnit = state.appendUnitIfNeeded(node);
        var newValue;
        var chainingData = [];
        if (gotExpression) {
            var expressionPatchFailed = false;
            var gotPatch = false;
            try {
                var expr = typeExpressions.parse(stringToPatch);
                typeExpressions.visit(expr, function (x) {
                    if (x.type == "name") {
                        var lit = x;
                        var typeName = lit.value;
                        var unescapeData = { status: referencePatcherHL.ParametersEscapingStatus.NOT_REQUIRED };
                        var unescaped;
                        if (escapeData.status == referencePatcherHL.ParametersEscapingStatus.OK) {
                            unescaped = escapeData.substitutions[typeName];
                            if (unescaped == null) {
                                unescapeData = referencePatcherHL.unescapeTemplateParameters(typeName, escapeData.substitutions);
                                if (unescapeData.status == referencePatcherHL.ParametersEscapingStatus.OK) {
                                    typeName = unescapeData.resultingString;
                                }
                                else if (unescapeData.status == referencePatcherHL.ParametersEscapingStatus.ERROR) {
                                    expressionPatchFailed = true;
                                    return;
                                }
                            }
                            else {
                                typeName = unescaped;
                            }
                        }
                        if (transformer == null && (unescaped != null || unescapeData.status == referencePatcherHL.ParametersEscapingStatus.OK)) {
                            lit.value = typeName;
                            return;
                        }
                        //var patchTransformedValue = true;
                        //if(typeName.indexOf("<<")>=0&&this.isCompoundValue(typeName)){
                        //    patchTransformedValue = false;
                        //}
                        var patched = _this.resolveReferenceValue(typeName, state, transformer, collectionName); //, patchTransformedValue);
                        if (patched != null) {
                            lit.value = patched.value();
                            gotPatch = true;
                            _this.registerPatchedReference(patched);
                            if (patched.isChained()) {
                                chainingData.push({
                                    kind: 'type',
                                    value: lit.value
                                });
                            }
                        }
                    }
                });
            }
            catch (e) { }
            if (gotPatch && !expressionPatchFailed) {
                newValue = typeExpressions.serializeToString(expr);
            }
            else {
                newValue = value;
            }
        }
        else if (!(escapeData.status == referencePatcherHL.ParametersEscapingStatus.OK && transformer == null)) {
            if (stringToPatch.indexOf("<<") >= 0 && referencePatcherHL.isCompoundValue(stringToPatch)) {
                stringToPatch = value;
                transformer = null;
            }
            var patched = this.resolveReferenceValue(stringToPatch, state, transformer, collectionName);
            if (patched != null) {
                this.registerPatchedReference(patched);
                newValue = patched.value();
                if (patched.isChained()) {
                    chainingData.push({
                        kind: 'type',
                        value: newValue
                    });
                }
            }
        }
        if (newValue != null && !state.registerOnly) {
            llNode.setValueOverride(newValue);
            if (chainingData.length > 0) {
                llNode.addMeta("chaining", chainingData);
            }
        }
        if (appendedAttrUnit) {
            state.popUnit();
        }
        if (appendedAdditional) {
            for (var i = 0; i < appendedAdditional.filter(function (x) { return x; }).length; i++) {
                state.popUnit();
            }
        }
        return false;
    };
    ReferencePatcher.prototype.resolveReferenceValue = function (stringToPatch, state, transformer, collectionName) {
        var _this = this;
        var isAnnotation = collectionName == "annotationTypes";
        var newValue;
        if (transformer) {
            if (stringToPatch && stringToPatch.indexOf("<<") >= 0) {
                var doContinue = true;
                var byNSMap = state.resolver.nsMap(state.rootUnit);
                //var types = (<hlimpl.ASTNodeImpl>rootUnit.highLevel()).types();
                var newValue1 = transformer.transform(stringToPatch, true, function () { return doContinue; }, function (val, tr) {
                    var newVal = _this.resolveReferenceValueBasic(val, state, collectionName, tr.unitsChain);
                    if (newVal == null) {
                        newVal = new referencePatcherHL.PatchedReference(null, val, collectionName, state.rootUnit, false, referencePatcherHL.PatchMode.DEFAULT);
                    }
                    var referencedUnit;
                    var newNS = newVal.namespace();
                    if (newNS) {
                        var referencedUsesInfo = byNSMap && byNSMap[newNS];
                        if (referencedUsesInfo) {
                            referencedUnit = referencedUsesInfo.unit;
                        }
                    }
                    if (!referencedUnit) {
                        referencedUnit = state.rootUnit;
                    }
                    var unitModel = state.resolver.unitModel(referencedUnit);
                    if (isAnnotation) {
                        if (unitModel.annotationTypes.hasElement(newVal.name())) {
                            doContinue = false;
                        }
                        else {
                            doContinue = false;
                        }
                    }
                    else if (unitModel.types.hasElement(newVal.name())) {
                        doContinue = false;
                    }
                    else {
                        doContinue = false;
                    }
                    return newVal;
                });
                newValue = newValue1.value;
            }
        }
        if (newValue === undefined || !referencePatcherHL.instanceOfPatchedReference(newValue)) {
            newValue = this.resolveReferenceValueBasic(stringToPatch, state, collectionName);
        }
        return newValue;
    };
    ReferencePatcher.prototype.resolveReferenceValueBasic = function (_value, state, collectionName, unitsOverride) {
        if (_value == null || typeof (_value) != "string") {
            return null;
        }
        var isType = collectionName == "types" || collectionName == "annotationTypes";
        var gotQuestion = isType && util.stringEndsWith(_value, "?");
        var value = gotQuestion ? _value.substring(0, _value.length - 1) : _value;
        if (value.indexOf("<<") >= 0) {
            return;
        }
        var bestPossibleResult = null;
        var result = null;
        var started = true;
        for (var ind = 0; result == null && ind >= 0; ind = value.indexOf(".", ind + 1)) {
            if (started) {
                started = false;
                ind = -1;
            }
            var referencedUnit = void 0;
            var plainName = void 0;
            var oldNS = void 0;
            var units = unitsOverride || state.units;
            if (ind >= 0) {
                oldNS = value.substring(0, ind);
                plainName = value.substring(ind + 1);
                for (var i = units.length; i > 0; i--) {
                    var localUnit = units[i - 1];
                    var nsMap = this.libExpMode
                        ? state.resolver.expandedNSMap(localUnit)
                        : state.resolver.nsMap(localUnit);
                    var info = nsMap && nsMap[oldNS];
                    if (info == null) {
                        continue;
                    }
                    referencedUnit = info.unit;
                    if (referencedUnit != null) {
                        break;
                    }
                }
            }
            else {
                if (isType && def.rt.builtInTypes().get(value) != null) {
                    continue;
                }
                plainName = value;
                referencedUnit = units[units.length - 1];
            }
            if (referencedUnit == null && !this.libExpMode) {
                if (oldNS && oldNS.length > 0) {
                    var chainedUnit = void 0;
                    for (var i = units.length; i > 0; i--) {
                        var localUnit = units[i - 1];
                        var expandedNSMap = state.resolver.expandedNSMap(localUnit);
                        var info = expandedNSMap && expandedNSMap[oldNS];
                        if (info == null) {
                            continue;
                        }
                        chainedUnit = info.unit;
                        if (chainedUnit != null) {
                            break;
                        }
                    }
                    if (chainedUnit != null) {
                        var usesInfo_1 = state.resolver.resolveNamespace(state.rootUnit, chainedUnit);
                        if (usesInfo_1 != null) {
                            var newNS_1 = usesInfo_1.namespace();
                            if (gotQuestion) {
                                plainName += "?";
                            }
                            var unitModel_1 = state.resolver.unitModel(chainedUnit);
                            if (bestPossibleResult == null) {
                                bestPossibleResult = new referencePatcherHL.PatchedReference(newNS_1, plainName, collectionName, chainedUnit, true, this.mode);
                            }
                            if (unitModel_1 != null) {
                                var c = unitModel_1.collection(collectionName);
                                if (c != null && c.getElement(plainName) != null) {
                                    result = new referencePatcherHL.PatchedReference(newNS_1, plainName, collectionName, chainedUnit, true, this.mode);
                                }
                            }
                        }
                    }
                }
                continue;
            }
            if (referencedUnit != null && referencedUnit.absolutePath() == state.rootUnit.absolutePath()) {
                if (oldNS != null && oldNS.length > 0) {
                    var unitModel_2 = state.resolver.unitModel(referencedUnit);
                    if (bestPossibleResult == null) {
                        bestPossibleResult = new referencePatcherHL.PatchedReference(null, plainName, collectionName, referencedUnit, false, this.mode);
                    }
                    if (unitModel_2 != null) {
                        var c = unitModel_2.collection(collectionName);
                        if (c != null && c.getElement(plainName) != null) {
                            result = new referencePatcherHL.PatchedReference(null, plainName, collectionName, referencedUnit, false, this.mode);
                        }
                    }
                }
                continue;
            }
            var usesInfo = state.resolver.resolveNamespace(state.rootUnit, referencedUnit);
            if (usesInfo == null) {
                continue;
            }
            var newNS = usesInfo.namespace();
            if (newNS == null) {
                continue;
            }
            if (this.mode == referencePatcherHL.PatchMode.PATH) {
                var aPath = referencedUnit.absolutePath().replace(/\\/g, "/");
                if (!ll.isWebPath(aPath)) {
                    aPath = "file://" + aPath;
                }
                newNS = aPath + "#/" + collectionName;
            }
            if (gotQuestion) {
                plainName += "?";
            }
            var unitModel = state.resolver.unitModel(referencedUnit);
            if (bestPossibleResult == null) {
                bestPossibleResult = new referencePatcherHL.PatchedReference(newNS, plainName, collectionName, referencedUnit, false, this.mode);
            }
            if (unitModel != null) {
                var c = unitModel.collection(collectionName);
                if (c != null && c.getElement(plainName) != null) {
                    result = new referencePatcherHL.PatchedReference(newNS, plainName, collectionName, referencedUnit, false, this.mode);
                }
            }
        }
        if (result == null) {
            result = bestPossibleResult;
        }
        return result;
    };
    ReferencePatcher.prototype.patchNodeName = function (node, state, collectionName) {
        var llNode = node;
        var key = llNode.key();
        var isAnnotation = (collectionName == "annotationTypes") && util.stringStartsWith(key, "(") && util.stringEndsWith(key, ")");
        if (isAnnotation) {
            key = key.substring(1, key.length - 1);
        }
        var patched = this.resolveReferenceValueBasic(key, state, collectionName, [llNode.unit()]);
        if (patched != null) {
            this.registerPatchedReference(patched);
            var patchedValue = patched.value();
            if (isAnnotation) {
                patchedValue = "(" + patchedValue + ")";
            }
            if (!state.registerOnly) {
                llNode.setKeyOverride(patchedValue);
            }
        }
    };
    ReferencePatcher.prototype.patchReference = function (attr, state, collectionName, force) {
        if (force === void 0) { force = false; }
        var llNode = attr;
        if (!(proxy.LowLevelProxyNode.isInstance(llNode))) {
            return;
        }
        var transformer = llNode.transformer();
        if (attr.kind() == yaml.Kind.SCALAR) {
            var stringToPatch = llNode.value();
            if (transformer != null) {
                var actualNode = toOriginal(llNode);
                stringToPatch = actualNode.value();
            }
            var newValue = this.resolveReferenceValue(stringToPatch, state, transformer, collectionName);
            if (newValue != null) {
                var newValue1 = newValue.value();
                if (!state.registerOnly) {
                    llNode.setValueOverride(newValue1);
                }
                this.registerPatchedReference(newValue);
            }
        }
        else {
            var key = toOriginal(attr).key();
            var stringToPatch = key;
            if (key != null) {
                var newValue = this.resolveReferenceValue(stringToPatch, state, transformer, collectionName);
                if (newValue != null) {
                    var newValue1 = newValue.value();
                    if (!state.registerOnly) {
                        attr.setKeyOverride(newValue1);
                    }
                    this.registerPatchedReference(newValue);
                }
                var templatesCollection = state.meta.templatesCollection;
                if (templatesCollection) {
                    if (newValue == null && stringToPatch.indexOf(".") < 0) {
                        newValue = new referencePatcherHL.PatchedReference("", stringToPatch, templatesCollection, state.rootUnit, false, referencePatcherHL.PatchMode.DEFAULT);
                    }
                    if (newValue) {
                        var tModel = state.resolver.getComponent(state.rootUnit, templatesCollection, newValue.namespace(), newValue.name());
                        if (tModel) {
                            var typesTransition = transitionsMap[def.universesInfo.Universe10.TypeDeclaration.name];
                            for (var _i = 0, _a = attr.children(); _i < _a.length; _i++) {
                                var aCh = _a[_i];
                                if (tModel.typeValuedParameters[aCh.key()]) {
                                    var state1 = new State(state.referencePatcher, state.rootUnit, state.globalScope, state.resolver);
                                    state1.units = state.units;
                                    state1.registerOnly = true;
                                    typesTransition.processNode(aCh, state1);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    ReferencePatcher.prototype.patchUses = function (node, resolver) {
        if (!(proxy.LowLevelCompositeNode.isInstance(node))) {
            return;
        }
        var unit = node.unit();
        var extendedUnitMap = resolver.expandedPathMap(unit);
        if (extendedUnitMap == null) {
            return;
        }
        var unitMap = resolver.pathMap(unit);
        if (!unitMap) {
            unitMap = {};
        }
        var cNode = node;
        var originalChildren = node.children();
        var usesPropName = universeDef.Universe10.FragmentDeclaration.properties.uses.name;
        var usesNodes = originalChildren.filter(function (x) { return x.key() == usesPropName; });
        var oNode = toOriginal(node);
        var yamlNode = oNode;
        while (proxy.LowLevelProxyNode.isInstance(yamlNode)) {
            yamlNode = yamlNode.originalNode();
        }
        var usesInfos = Object.keys(unitMap).map(function (x) { return extendedUnitMap[x]; });
        var extendedUsesInfos = Object.keys(extendedUnitMap).map(function (x) { return extendedUnitMap[x]; })
            .filter(function (x) { return !unitMap[x.absolutePath()]; } /*&&this.usedNamespaces[x.namespace()]*/);
        var unitPath = unit.absolutePath();
        var existingLibs = {};
        var usesNode;
        if (usesNodes.length > 0) {
            usesNode = usesNodes[0];
            usesNode.children().forEach(function (x) { return existingLibs[x.key()] = true; });
        }
        else {
            var newUses = jsyaml.createMapNode("uses");
            newUses["_parent"] = yamlNode;
            newUses.setUnit(yamlNode.unit());
            usesNode = cNode.replaceChild(null, newUses);
        }
        for (var _i = 0, _a = usesInfos.concat(extendedUsesInfos); _i < _a.length; _i++) {
            var ui = _a[_i];
            var up = ui.absolutePath();
            if (existingLibs[ui.namespace()]) {
                continue;
            }
            var ip = ui.includePath;
            var mapping = jsyaml.createMapping(ui.namespace(), ip);
            mapping.setUnit(yamlNode.unit());
            mapping.actual().actualPath = ui.usesNodes[0].unit().path();
            usesNode.replaceChild(null, mapping);
        }
    };
    ReferencePatcher.prototype.removeUses = function (node) {
        if (!(proxy.LowLevelCompositeNode.isInstance(node))) {
            return;
        }
        var cNode = node;
        var originalChildren = node.children();
        var usesNodes = originalChildren.filter(function (x) {
            return x.key() == universeDef.Universe10.FragmentDeclaration.properties.uses.name;
        });
        if (usesNodes.length > 0) {
            cNode.removeChild(usesNodes[0]);
        }
    };
    ReferencePatcher.prototype.registerPatchedReference = function (ref) {
        var collectionName = ref.collectionName();
        if (!collectionName) {
            return;
        }
        var aPath = ref.referencedUnit().absolutePath();
        var libMap = this._outerDependencies[aPath];
        if (libMap == null) {
            libMap = {};
            this._outerDependencies[aPath] = libMap;
        }
        var collectionMap = libMap[collectionName];
        if (collectionMap == null) {
            collectionMap = {};
            libMap[collectionName] = collectionMap;
        }
        collectionMap[ref.name()] = ref;
    };
    ReferencePatcher.prototype.expandLibraries = function (api, excessive) {
        if (excessive === void 0) { excessive = false; }
        var lem = this.libExpMode;
        this.libExpMode = true;
        if (api.actual().libExpanded) {
            return;
        }
        var rootUnit = api.unit();
        var project = rootUnit.project();
        var libModels = [];
        var resolver = project.namespaceResolver();
        var expandedPathMap = resolver.expandedPathMap(rootUnit);
        if (expandedPathMap != null) {
            var libPaths = Object.keys(expandedPathMap).sort();
            for (var _i = 0, libPaths_1 = libPaths; _i < libPaths_1.length; _i++) {
                var libPath = libPaths_1[_i];
                var libModel = this._libModels[libPath];
                if (libModel == null) {
                    libModel = resolver.unitModel(expandedPathMap[libPath].unit);
                    if (libModel) {
                        var libUnit = libModel.unit;
                        var annotations = libUnit.ast().children().filter(function (x) { return x.key() && x.key().charAt(0) == "(" && x.key().charAt(x.key().length - 1) == ")"; });
                        if (annotations.length > 0) {
                            for (var _a = 0, annotations_1 = annotations; _a < annotations_1.length; _a++) {
                                var aNode = annotations_1[_a];
                                var aName = aNode.key();
                                var l = aName.length;
                                if (aName.charAt(0) == "(" && aName.charAt(l - 1) == ")") {
                                    aName = aName.substring(1, l - 1);
                                }
                                //let range = aNode.property().range();
                                var state = new State(this, rootUnit, new Scope(), resolver);
                                state.appendUnitIfNeeded(libUnit);
                                var patchedReference = this.resolveReferenceValueBasic(aName, state, "annotationTypes");
                                if (patchedReference) {
                                    this.registerPatchedReference(patchedReference);
                                }
                            }
                        }
                    }
                }
                if (libModel) {
                    libModels.push(libModel);
                }
            }
            var gotContribution = false;
            for (var _b = 0, libModels_1 = libModels; _b < libModels_1.length; _b++) {
                var libModel = libModels_1[_b];
                for (var _c = 0, _d = Object.keys(libModel); _c < _d.length; _c++) {
                    var cName = _d[_c];
                    var collection = libModel[cName];
                    if (namespaceResolver.ElementsCollection.isInstance(collection)) {
                        gotContribution = this.contributeCollection(api, collection) || gotContribution;
                    }
                }
            }
            if (gotContribution) {
                var gotPatch = false;
                do {
                    gotPatch = this.patchDependencies(api, excessive);
                } while (gotPatch);
                if (!excessive) {
                    this.removeUnusedDependencies(api);
                }
            }
        }
        this.patchUses(api, resolver);
        api.actual().libExpanded = true;
        if (this.needTypesReset) {
            this.resetHighLevel(api);
        }
        this.libExpMode = lem;
    };
    ReferencePatcher.prototype.patchDependencies = function (api, excessive) {
        var result = false;
        var rootUnit = api.unit();
        var apiPath = rootUnit.absolutePath();
        for (var _i = 0, _a = api.children(); _i < _a.length; _i++) {
            var c = _a[_i];
            var collectionName = c.key();
            var typeName = collectionNames[collectionName];
            if (!typeName) {
                continue;
            }
            var _loop_1 = function () {
                if (chNode["libProcessed"]) {
                    return "continue";
                }
                this_1.removeUses(chNode);
                if (!excessive) {
                    chPath = chNode.unit().absolutePath();
                    if (chPath == apiPath && chNode.includePath() == null) {
                        return "continue";
                    }
                    dependencies = this_1._outerDependencies[chPath];
                    if (dependencies == null) {
                        return "continue";
                    }
                    depCollection = dependencies[collectionName];
                    if (depCollection == null) {
                        return "continue";
                    }
                    var ref = depCollection[chNode.key()];
                    if (ref == null) {
                        return "continue";
                    }
                    if (collectionName == def.universesInfo.Universe10.LibraryBase.properties.types.name) {
                        var discriminator = chNode.children().filter(function (x) { return x.key() ==
                            def.universesInfo.Universe10.ObjectTypeDeclaration.properties.discriminator.name; });
                        if (discriminator.length > 0) {
                            this_1.needTypesReset = true;
                            var types = rootUnit.highLevel().types();
                            var localType = types.getTypeRegistry().getByChain(ref.value());
                            if (localType) {
                                var resolver = rootUnit.project().namespaceResolver();
                                for (var _i = 0, _a = localType.allSubTypes(); _i < _a.length; _i++) {
                                    var st = _a[_i];
                                    var typeName_1 = st.name();
                                    if (!typeName_1) {
                                        continue;
                                    }
                                    var unit = referencePatcherHL.typeUnit(st);
                                    if (!unit) {
                                        continue;
                                    }
                                    var usesInfo = resolver.resolveNamespace(rootUnit, unit);
                                    if (!usesInfo) {
                                        continue;
                                    }
                                    var ns = usesInfo.namespace();
                                    var ref_1 = new referencePatcherHL.PatchedReference(ns, typeName_1, def.universesInfo.Universe10.LibraryBase.properties.types.name, unit, false, this_1.mode);
                                    this_1.registerPatchedReference(ref_1);
                                }
                            }
                        }
                        var dValPropName_1 = def.universesInfo.Universe10.ObjectTypeDeclaration.properties.discriminatorValue.name;
                        var discriminatorValue = chNode.children().filter(function (x) { return x.key() == dValPropName_1; });
                        if (!discriminatorValue.length) {
                            var dValNode = jsyaml.createMapNode(dValPropName_1, chNode.unit());
                            var strictProp = jsyaml.createMapping("strict", false);
                            var valueProp = jsyaml.createMapping("value", chNode.key());
                            dValNode.addChild(valueProp);
                            dValNode.addChild(strictProp);
                            chNode.replaceChild(null, dValNode);
                        }
                    }
                }
                this_1.process(chNode, api, typeName, true, true, collectionName);
                result = true;
            };
            var this_1 = this, chPath, dependencies, depCollection;
            for (var _b = 0, _c = c.children(); _b < _c.length; _b++) {
                var chNode = _c[_b];
                _loop_1();
            }
        }
        return result;
    };
    ReferencePatcher.prototype.removeUnusedDependencies = function (api) {
        var llNode = api;
        var apiPath = llNode.unit().absolutePath();
        for (var _i = 0, _a = api.children(); _i < _a.length; _i++) {
            var c = _a[_i];
            if (!collectionNames[c.key()]) {
                continue;
            }
            for (var _b = 0, _c = [].concat(c.children()); _b < _c.length; _b++) {
                var chLl = _c[_b];
                if (chLl["libProcessed"]) {
                    continue;
                }
                var chPath = chLl.unit().absolutePath();
                if (chPath == apiPath) {
                    continue;
                }
                c.removeChild(chLl);
            }
        }
    };
    ReferencePatcher.prototype.contributeCollection = function (api, collection) {
        var llApi = api;
        if (collection.array.length == 0) {
            return false;
        }
        var name = collection.name;
        var llNode = _.find(llApi.children(), function (x) { return x.key() == name; });
        if (llNode == null) {
            var n = jsyaml.createMapNode(name, llApi.unit());
            llNode = llApi.replaceChild(null, n);
        }
        var result = false;
        for (var _i = 0, _a = collection.array; _i < _a.length; _i++) {
            var e = _a[_i];
            if (llNode.children().some(function (x) {
                var oNode = toOriginal(x);
                if (oNode.unit().absolutePath() != e.unit().absolutePath()) {
                    return false;
                }
                return e.key() == oNode.key() && e.unit().absolutePath() == oNode.unit().absolutePath();
            })) {
                continue;
            }
            llNode.replaceChild(null, e);
            result = true;
        }
        return result;
    };
    ReferencePatcher.prototype.resetHighLevel = function (apiNode) {
        var hlNode = apiNode.highLevelNode();
        if (hlNode) {
            resetTypes(hlNode);
            hlNode.resetChildren();
        }
    };
    return ReferencePatcher;
}());
exports.ReferencePatcher = ReferencePatcher;
function toOriginal(node) {
    for (var i = 0; i < 2 && proxy.LowLevelProxyNode.isInstance(node); i++) {
        node = node.originalNode();
    }
    return node;
}
exports.toOriginal = toOriginal;
function resetTypes(hlNode) {
    for (var _i = 0, _a = hlNode.elements(); _i < _a.length; _i++) {
        var ch = _a[_i];
        resetTypes(ch);
    }
    for (var _b = 0, _c = hlNode.attrs(); _b < _c.length; _b++) {
        var attr = _c[_b];
        var aVal = attr.value();
        if (hlimpl.StructuredValue.isInstance(aVal)) {
            aVal.resetHighLevelNode();
        }
    }
    delete hlNode.lowLevel().actual().types;
    delete hlNode["_ptype"];
    delete hlNode["_types"];
    hlNode.setAssociatedType(null);
}
;
var collectionNames = {
    "types": "TypeDeclaration",
    "annotationTypes": "TypeDeclaration",
    "traits": "Trait",
    "resourceTypes": "ResourceType",
    "securitySchemes": "SecuritySchemePart"
};
//# sourceMappingURL=referencePatcherLL.js.map