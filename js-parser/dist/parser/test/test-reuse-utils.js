"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index = require("../../index");
var assert = require("assert");
var jsyaml = require("../jsyaml/jsyaml2lowLevel");
var yaml = require("yaml-ast-parser");
var util = require("./test-utils");
var fs = require("fs");
var DEFAULT_TYPING_SEQUENCE = [
    'Api.types',
    'Api.resourceTypes',
    'Api.traits',
    'Resource',
    'Method',
    'Method.body',
    'Method.responses',
];
var PropertiesSelection = /** @class */ (function () {
    function PropertiesSelection() {
        this.allowed = {};
        this.prohibited = {};
        this.iterated = {};
    }
    return PropertiesSelection;
}());
var Kind;
(function (Kind) {
    Kind[Kind["ALLOWED"] = 0] = "ALLOWED";
    Kind[Kind["ITERATED"] = 1] = "ITERATED";
    Kind[Kind["PROHIBITED"] = 2] = "PROHIBITED";
})(Kind || (Kind = {}));
var SelectionRestriction = /** @class */ (function () {
    function SelectionRestriction(_type, _property, _kind) {
        this._type = _type;
        this._property = _property;
        this._kind = _kind;
    }
    SelectionRestriction.prototype.type = function () { return this._type; };
    SelectionRestriction.prototype.property = function () { return this._property; };
    SelectionRestriction.prototype.iterated = function () { return this._kind == Kind.ITERATED; };
    SelectionRestriction.prototype.allowed = function () { return this._kind == Kind.ALLOWED; };
    SelectionRestriction.prototype.prohibited = function () { return this._kind == Kind.PROHIBITED; };
    return SelectionRestriction;
}());
var PropertySelector = /** @class */ (function () {
    function PropertySelector(restrictionSequence) {
        this.restrictionSequence = restrictionSequence;
        this.typeRestrictions = {};
        this.typePropertyRestrictions = {};
        this.cache = {};
        this.index = 0;
        this.init();
    }
    PropertySelector.prototype.init = function () {
        this.cache = {};
        for (var i = 0; i < this.restrictionSequence.length; i++) {
            var str = this.restrictionSequence[i];
            var kind = Kind.ALLOWED;
            if (i == this.index) {
                kind = Kind.ITERATED;
            }
            else if (i > this.index) {
                kind = Kind.PROHIBITED;
            }
            var typeName = void 0;
            var propertyName = void 0;
            var ind = str.indexOf(".");
            if (ind >= 0) {
                typeName = str.substring(0, ind);
                propertyName = str.substring(ind + 1);
            }
            else {
                typeName = str;
            }
            var restriction = new SelectionRestriction(typeName, propertyName, kind);
            if (propertyName) {
                var typeMap = this.typePropertyRestrictions[typeName];
                if (!typeMap) {
                    typeMap = {};
                    this.typePropertyRestrictions[typeName] = typeMap;
                }
                typeMap[propertyName] = restriction;
            }
            else {
                this.typeRestrictions[typeName] = restriction;
            }
        }
    };
    PropertySelector.prototype.checkNode = function (node) {
        var definition = node.definition();
        var defName = definition.nameId();
        var result = this.cache[defName];
        if (result) {
            return result;
        }
        result = new PropertiesSelection();
        this.cache[defName] = result;
        var typeMap = this.typePropertyRestrictions[defName];
        for (var _i = 0, _a = definition.allProperties(); _i < _a.length; _i++) {
            var prop = _a[_i];
            var propName = prop.nameId();
            var rangeName = prop.range().nameId();
            var restriction = this.typeRestrictions[rangeName];
            if (!restriction || !restriction.allowed()) {
                if (typeMap) {
                    var restriction2 = typeMap[propName];
                    if (!restriction || (restriction2 && (restriction2.allowed() || restriction2.iterated()))) {
                        restriction = restriction2;
                    }
                }
            }
            if (restriction) {
                if (restriction.iterated()) {
                    result.iterated[propName] = true;
                }
                else if (restriction.prohibited()) {
                    result.prohibited[propName] = true;
                }
                else if (restriction.allowed()) {
                    result.allowed[propName] = true;
                }
            }
        }
        return result;
    };
    PropertySelector.prototype.increment = function () {
        this.index++;
        this.init();
    };
    return PropertySelector;
}());
var TextRange = /** @class */ (function () {
    function TextRange(llNode, _iterated, keyOnly) {
        if (_iterated === void 0) { _iterated = false; }
        if (keyOnly === void 0) { keyOnly = false; }
        this.llNode = llNode;
        this._iterated = _iterated;
        this.index = 0;
        var content = llNode.unit().contents();
        this._start = llNode.start();
        if (keyOnly) {
            var keyEnd = llNode.keyEnd();
            var colonIndex = content.indexOf(":", keyEnd);
            if (colonIndex < 0) {
                throw new Error();
            }
            this._end = colonIndex + 1;
        }
        else {
            this._end = llNode.end();
            var isSequence = llNode.parent() && (llNode.parent().kind() == yaml.Kind.SEQ);
            if (isSequence) {
                var sInd = this._start - 1;
                var seqStart = content.charAt(sInd);
                while (sInd > 0 && seqStart != '[' && seqStart != '-' && seqStart != ',') {
                    ;
                    seqStart = content.charAt(--sInd);
                }
                this._start = sInd;
                if (seqStart == "[" || seqStart == ',') {
                    var eInd = this._end;
                    var seqEnd = content.charAt(eInd);
                    while (eInd < content.length && seqEnd != ',' && seqEnd != ']') {
                        ;
                        seqEnd = content.charAt(++eInd);
                    }
                    if (seqEnd == ']') {
                        this._end = eInd + 1;
                    }
                }
            }
        }
        this._text = content.substring(this._start, this._end);
    }
    TextRange.prototype.start = function () { return this._start; };
    TextRange.prototype.end = function () { return this._end; };
    TextRange.prototype.iterated = function () { return this._iterated; };
    TextRange.prototype.text = function () { return this._text; };
    TextRange.prototype.nextIteration = function () {
        if (!this._iterated) {
            return null;
        }
        if (this.index >= this._text.length) {
            return null;
        }
        return this._text.substring(0, this.index++);
    };
    return TextRange;
}());
var TextCollector = /** @class */ (function () {
    function TextCollector(selector) {
        this.selector = selector;
    }
    TextCollector.prototype.createIterationSequience = function (hlNode, globalIterated) {
        if (globalIterated === void 0) { globalIterated = false; }
        var propData = this.selector.checkNode(hlNode);
        if (Object.keys(propData.prohibited).length == 0
            && Object.keys(propData.iterated).length == 0) {
            return null;
        }
        var processedProperties = {};
        var children = hlNode.children().sort(function (x, y) {
            return x.lowLevel().start() - y.lowLevel().start();
        });
        var llNode = hlNode.lowLevel();
        var result = llNode.key() != null ? [new TextRange(llNode, globalIterated, true)] : [];
        var allChildrenAllowed = true;
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var ch = children_1[_i];
            var iterated = globalIterated;
            var prop = void 0;
            var propName = void 0;
            var chElement = void 0;
            var chAttr = void 0;
            if (ch.isElement()) {
                chElement = ch.asElement();
                prop = chElement.property();
            }
            else if (ch.isAttr()) {
                chAttr = ch.asAttr();
                prop = chAttr.property();
            }
            if (prop) {
                propName = prop.nameId();
                if (propData.allowed[propName]) {
                }
                else if (propData.iterated[propName]) {
                    allChildrenAllowed = false;
                    iterated = true;
                }
                else if (propData.prohibited[propName] || processedProperties[propName]) {
                    allChildrenAllowed = false;
                    continue;
                }
            }
            var llChild = ch.lowLevel();
            if (llChild == llNode) {
                continue;
            }
            var chResult = void 0;
            if (chElement) {
                chResult = this.createIterationSequience(ch.asElement(), iterated);
                if (chResult) {
                    allChildrenAllowed = false;
                }
            }
            if (!chResult) {
                chResult = [new TextRange(llChild, iterated)];
            }
            if (chResult) {
                if (!processedProperties[propName]) {
                    var llParent = llChild.parent();
                    while (llParent && llParent != llNode) {
                        if (llParent.kind() == yaml.Kind.MAPPING) {
                            result.push(new TextRange(llParent, iterated, true));
                        }
                        llParent = llParent.parent();
                    }
                    processedProperties[propName] = true;
                }
                chResult.forEach(function (x) { return result.push(x); });
            }
        }
        if (allChildrenAllowed) {
            return null;
        }
        return result;
    };
    return TextCollector;
}());
var TextTyper = /** @class */ (function () {
    function TextTyper(rootNode, selector) {
        this.startChain = 0;
        this.sequence = new TextCollector(selector).createIterationSequience(rootNode);
        this.content = rootNode.lowLevel().unit().contents();
        this.contentWS = this.content.replace(/[^\s]/g, ' ');
        var i1 = this.content.indexOf("#%RAML");
        var i2 = this.content.indexOf("\n", i1);
        if (i1 < 0) {
            i2 = this.content.length;
        }
        this.startingSegment = this.content.substring(0, i2);
    }
    TextTyper.prototype.hasNext = function () { return this.startChain < this.sequence.length; };
    TextTyper.prototype.next = function () {
        var result = "" + this.startingSegment;
        var prev = this.startingSegment.length;
        var hasIteration = false;
        for (var i = this.startChain; i < this.sequence.length; i++) {
            var seg = this.sequence[i];
            var segText;
            if (seg.iterated()) {
                if (hasIteration) {
                    segText = "";
                }
                else {
                    segText = seg.nextIteration();
                    if (segText == null) {
                        segText = seg.text();
                    }
                    else {
                        hasIteration = true;
                        this.startChain = i;
                    }
                }
            }
            else {
                segText = seg.text();
            }
            var start = seg.start();
            if (start > prev) {
                segText = this.contentWS.substring(prev, start) + segText;
            }
            if (!hasIteration) {
                this.startChain = i;
                this.startingSegment += segText;
            }
            result += segText;
            prev = seg.end();
        }
        if (!hasIteration) {
            this.startChain++;
        }
        return result;
    };
    return TextTyper;
}());
function simulateTypingForFile(filePath, restrictions, enableReuse) {
    if (restrictions === void 0) { restrictions = DEFAULT_TYPING_SEQUENCE; }
    if (enableReuse === void 0) { enableReuse = true; }
    var hlNode = index.loadApiSync(filePath).highLevel();
    var ps = new PropertySelector(restrictions);
    for (var i = 0; i < restrictions.length; i++) {
        var reuseNode = void 0;
        var tt = new TextTyper(hlNode, ps);
        while (tt.hasNext()) {
            var text = tt.next();
            reuseNode = testEditingStep(text, filePath, reuseNode, true);
            //console.log(text);
        }
        ps.increment();
    }
}
exports.simulateTypingForFile = simulateTypingForFile;
function testEditingStep(newContent, specPath, reuseNode, enableReuse, expectReuse, parserInstance) {
    if (!enableReuse) {
        reuseNode = null;
    }
    var resolver = new jsyaml.FSResolverImpl();
    var fsResolver = {
        content: function (path) {
            if (path == specPath) {
                return newContent;
            }
            return resolver.content(path);
        },
        contentAsync: function (path) {
            return Promise.resolve("");
        }
    };
    parserInstance = parserInstance || index;
    var reusingApi = parserInstance.loadRAMLSync(specPath, [], {
        reusedNode: reuseNode,
        fsResolver: fsResolver
    }).expand();
    if (!reuseNode) {
        return reusingApi.highLevel();
    }
    if (expectReuse != null) {
        if (expectReuse) {
            if (reusingApi.highLevel().reusedNode() == null) {
                throw new Error("Reuse is expected");
            }
        }
        else {
            if (reusingApi.highLevel().reusedNode() != null) {
                throw new Error("Reuse is NOT expected");
            }
        }
    }
    var nonReusingApi = parserInstance.loadRAMLSync(specPath, [], {
        fsResolver: fsResolver
    }).expand();
    var apiJSON = nonReusingApi.toJSON({ rootNodeDetails: true });
    var apiReuseJSON = reusingApi.toJSON({ rootNodeDetails: true });
    if (checkErrorPositions(apiJSON["errors"])) {
        var diff = util.compare(apiReuseJSON, apiJSON);
        if (diff.length != 0) {
            var message = "DIFFERENCE DETECTED FOR " + specPath + "\n" + newContent + "\n\n" + diff.map(function (x) { return x.message("actual", "expected"); }).join("\n\n");
            throw new Error(message);
        }
    }
    return reusingApi.highLevel();
}
exports.testEditingStep = testEditingStep;
function checkErrorPositions(errs) {
    for (var _i = 0, errs_1 = errs; _i < errs_1.length; _i++) {
        var e = errs_1[_i];
        if (e["column"] == undefined) {
            return false;
        }
        if (e["line"] == undefined) {
            return false;
        }
        if (e["position"] == undefined) {
            return false;
        }
        if (!e['range']) {
            return false;
        }
        if (e["range"]["end"] == undefined) {
            return false;
        }
        if (e["range"]["start"] == undefined) {
            return false;
        }
    }
    return true;
}
function testReuseByBasicTyping(specPath, byWords, enableReuse, parserInstance) {
    if (byWords === void 0) { byWords = true; }
    if (enableReuse === void 0) { enableReuse = true; }
    var fileContent = fs.readFileSync(specPath, "utf8");
    var i1 = fileContent.indexOf("#%RAML");
    if (i1 < 0) {
        throw new Error("Not a RAML file: " + specPath);
    }
    var i2 = fileContent.indexOf("\n", i1);
    if (i2 < 0) {
        i2 = fileContent.length;
    }
    else {
        i2 += "\n".length;
    }
    var prevNode;
    var contentBuffer = fileContent.substr(0, i2);
    if (byWords) {
        var words = fileContent.substring(i2).split(/(\s+)/);
        for (var i = 0; i < words.length; i++) {
            contentBuffer += words[i];
            try {
                prevNode = testEditingStep(contentBuffer, specPath, prevNode, enableReuse, parserInstance);
            }
            catch (e) {
                console.error(e);
                assert(false);
            }
        }
    }
    else {
        for (var i = contentBuffer.length; i < fileContent.length; i++) {
            contentBuffer += fileContent.charAt(i);
            try {
                prevNode = testEditingStep(contentBuffer, specPath, prevNode, enableReuse);
            }
            catch (e) {
                console.error(e);
                assert(false);
            }
        }
    }
}
exports.testReuseByBasicTyping = testReuseByBasicTyping;
//# sourceMappingURL=test-reuse-utils.js.map