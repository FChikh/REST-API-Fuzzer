"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by kor on 05/05/15.
 */
var yaml = require("yaml-ast-parser");
var lowlevel = require("../lowLevelAST");
var hlimpl = require("../highLevelImpl");
var _ = require("underscore");
var util = require("../../util/index");
var llImpl = require("./jsyaml2lowLevel");
var messageRegistry = require("../../../resources/errorMessages");
var Error = yaml.YAMLException;
var CompilationUnit = /** @class */ (function () {
    function CompilationUnit(_absolutePath, _path, _content, _project, _isTopoLevel, serializeOptions) {
        if (serializeOptions === void 0) { serializeOptions = {}; }
        this._absolutePath = _absolutePath;
        this._path = _path;
        this._content = _content;
        this._project = _project;
        this._isTopoLevel = _isTopoLevel;
        this.serializeOptions = serializeOptions;
        this._node = new AstNode(this, JSON.parse(this._content), null, serializeOptions);
    }
    CompilationUnit.prototype.highLevel = function () {
        return hlimpl.fromUnit(this);
    };
    CompilationUnit.prototype.absolutePath = function () {
        return this._absolutePath;
    };
    CompilationUnit.prototype.clone = function () {
        return null;
    };
    CompilationUnit.prototype.contents = function () {
        return this._content;
    };
    CompilationUnit.prototype.lexerErrors = function () {
        return [];
    };
    CompilationUnit.prototype.path = function () {
        return this._content;
    };
    CompilationUnit.prototype.isTopLevel = function () {
        return this._isTopoLevel;
    };
    CompilationUnit.prototype.ast = function () {
        return this._node;
    };
    CompilationUnit.prototype.expandedHighLevel = function () {
        return this.highLevel();
    };
    CompilationUnit.prototype.isDirty = function () {
        return true;
    };
    CompilationUnit.prototype.getIncludeNodes = function () {
        return [];
    };
    CompilationUnit.prototype.resolveAsync = function (p) {
        return null;
    };
    CompilationUnit.prototype.isRAMLUnit = function () {
        return true;
    };
    CompilationUnit.prototype.project = function () {
        return this._project;
    };
    CompilationUnit.prototype.updateContent = function (newContent) { };
    CompilationUnit.prototype.ramlVersion = function () {
        throw new Error(messageRegistry.NOT_IMPLEMENTED.message);
    };
    CompilationUnit.prototype.lineMapper = function () { return new lowlevel.LineMapperImpl(this.contents(), this.absolutePath()); };
    CompilationUnit.prototype.resolve = function (p) { return null; }; // TODO FIXME 
    /**
     * Returns true if this unit is overlay or extension, false otherwise.
     */
    CompilationUnit.prototype.isOverlayOrExtension = function () {
        return false;
    };
    /**
     * Returns master reference if presents, null otherwise.
     */
    CompilationUnit.prototype.getMasterReferenceNode = function () {
        return null;
    };
    return CompilationUnit;
}());
exports.CompilationUnit = CompilationUnit;
//export interface IProject{
//    units():ICompilationUnit[];//returns units with apis in this folder
//
//    execute(cmd:CompositeCommand)
//
//    executeTextChange(textCommand:TextChangeCommand);//this may result in broken nodes?
//
//    addListener(listener:IASTListener);
//
//    removeListener(listener:IASTListener)
//
//    addTextChangeListener(listener:ITextChangeCommandListener);
//    removeTextChangeListener(listener:ITextChangeCommandListener);
//}
//export interface IASTListener{
//    (delta:ASTDelta)
//}
//
//export interface ITextChangeCommandListener{
//    (delta:TextChangeCommand)
//}
//export class ASTDelta{
//    commands:ASTChangeCommand[]
//}
//export interface ASTVisitor{
//    (node:ILowLevelASTNode):boolean
//}
var AstNode = /** @class */ (function () {
    function AstNode(_unit, _object, _parent, options, _key) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this._unit = _unit;
        this._object = _object;
        this._parent = _parent;
        this.options = options;
        this._key = _key;
        this._isOptional = false;
        if (this._object instanceof Object) {
            Object.keys(this._object).forEach(function (x) {
                var u = unescapeKey(x, _this.options);
                if (u != x) {
                    var val = _this._object[x];
                    delete _this._object[x];
                    _this._object[u] = val;
                }
            });
        }
        if (this._key) {
            if (util.stringEndsWith(this._key, '?')) {
                this._isOptional = true;
                this._key = this._key.substring(0, this._key.length - 1);
            }
        }
    }
    AstNode.isInstance = function (instance) {
        return instance != null && instance.getClassIdentifier
            && typeof (instance.getClassIdentifier) == "function"
            && _.contains(instance.getClassIdentifier(), AstNode.CLASS_IDENTIFIER);
    };
    AstNode.prototype.getClassIdentifier = function () {
        var superIdentifiers = [];
        return superIdentifiers.concat(AstNode.CLASS_IDENTIFIER);
    };
    AstNode.prototype.keyKind = function () {
        return null;
    };
    AstNode.prototype.isAnnotatedScalar = function () {
        return false;
    };
    AstNode.prototype.hasInnerIncludeError = function () {
        return false;
    };
    AstNode.prototype.start = function () { return -1; };
    AstNode.prototype.end = function () { return -1; };
    AstNode.prototype.value = function () {
        return this._object;
    };
    AstNode.prototype.actual = function () {
        return this._object;
    };
    AstNode.prototype.includeErrors = function () { return []; };
    AstNode.prototype.includePath = function () { return null; };
    AstNode.prototype.includeReference = function () { return null; };
    AstNode.prototype.key = function () { return this._key; };
    AstNode.prototype.optional = function () { return this._isOptional; };
    AstNode.prototype.children = function () {
        var _this = this;
        if (!this._object) {
            return [];
        }
        if (Array.isArray(this._object)) {
            return this._object.map(function (x) { return new AstNode(_this._unit, x, _this, _this.options); });
        }
        else if (this._object instanceof Object) {
            return Object.keys(this._object).map(function (x) { return new AstNode(_this._unit, _this._object[x], _this, _this.options, x); });
        }
        else {
            return [];
        }
    };
    AstNode.prototype.parent = function () { return this._parent; };
    AstNode.prototype.unit = function () { return this._unit; };
    AstNode.prototype.containingUnit = function () {
        return this._unit;
    };
    AstNode.prototype.includeBaseUnit = function () { return this._unit; };
    AstNode.prototype.anchorId = function () { return null; };
    AstNode.prototype.errors = function () { return []; };
    AstNode.prototype.anchoredFrom = function () { return this; };
    AstNode.prototype.includedFrom = function () { return this; };
    AstNode.prototype.visit = function (v) {
        if (v(this)) {
            this.children().forEach(function (x) { return x.visit(v); });
        }
    };
    AstNode.prototype.dumpToObject = function () {
        return this._object;
    };
    AstNode.prototype.addChild = function (n) { };
    AstNode.prototype.execute = function (cmd) { };
    AstNode.prototype.dump = function () { return JSON.stringify(this._object); };
    AstNode.prototype.keyStart = function () { return -1; };
    AstNode.prototype.keyEnd = function () { return -1; };
    AstNode.prototype.valueStart = function () { return -1; };
    AstNode.prototype.valueEnd = function () { return -1; };
    AstNode.prototype.isValueLocal = function () { return true; };
    AstNode.prototype.kind = function () {
        if (Array.isArray(this._object)) {
            return yaml.Kind.SEQ;
        }
        else if (this._object instanceof Object) {
            return yaml.Kind.MAP;
        }
        else {
            return yaml.Kind.SCALAR;
        }
    };
    AstNode.prototype.valueKind = function () {
        if (!this._object) {
            return null;
        }
        var valType = typeof this._object;
        if (Array.isArray(this._object)) {
            return yaml.Kind.SEQ;
        }
        else if (valType == "object") {
            return yaml.Kind.MAP;
        }
        else if (valType == "string" || valType == "number" || valType == "boolean") {
            return yaml.Kind.SCALAR;
        }
        return null;
    };
    AstNode.prototype.anchorValueKind = function () {
        return null;
    };
    AstNode.prototype.resolvedValueKind = function () {
        return this.valueKind();
    };
    AstNode.prototype.show = function (msg) { };
    AstNode.prototype.setHighLevelParseResult = function (highLevelParseResult) {
        this._highLevelParseResult = highLevelParseResult;
    };
    AstNode.prototype.highLevelParseResult = function () {
        return this._highLevelParseResult;
    };
    AstNode.prototype.setHighLevelNode = function (highLevel) {
        this._highLevelNode = highLevel;
    };
    AstNode.prototype.highLevelNode = function () {
        return this._highLevelNode;
    };
    AstNode.prototype.text = function (unitText) {
        throw new Error(messageRegistry.NOT_IMPLEMENTED.message);
    };
    AstNode.prototype.copy = function () {
        throw new Error(messageRegistry.NOT_IMPLEMENTED.message);
    };
    AstNode.prototype.markup = function (json) {
        throw new Error(messageRegistry.NOT_IMPLEMENTED.message);
    };
    AstNode.prototype.nodeDefinition = function () {
        return llImpl.getDefinitionForLowLevelNode(this);
    };
    AstNode.prototype.includesContents = function () {
        return false;
    };
    AstNode.CLASS_IDENTIFIER = "json2LowLeve.AstNode";
    return AstNode;
}());
exports.AstNode = AstNode;
function serialize2(n, full) {
    if (full === void 0) { full = false; }
    if (!n) {
        return null;
    }
    var kind = n.kind();
    if (kind == yaml.Kind.ANCHOR_REF) {
        kind = n.anchorValueKind();
    }
    if (kind == yaml.Kind.INCLUDE_REF) {
        if (n.unit() != null) {
            var includePath = n.includePath();
            var resolved = null;
            try {
                resolved = n.unit().resolve(includePath);
            }
            catch (Error) {
                //this will be reported during invalidation
            }
            if (resolved == null) {
                return null;
            }
            else if (resolved.isRAMLUnit()) {
                if (llImpl.ASTNode.isInstance(n)) {
                    if (!n.canInclude(resolved)) {
                        return null;
                    }
                }
                var ast = resolved.ast();
                if (ast) {
                    return serialize2(ast, full);
                }
            }
            else {
                if (llImpl.ASTNode.isInstance(n)) {
                    if (!n.canInclude(resolved)) {
                        return null;
                    }
                }
                return resolved.contents();
            }
        }
        return null;
    }
    if (kind == yaml.Kind.SEQ) {
        var arr = [];
        for (var _i = 0, _a = n.children(); _i < _a.length; _i++) {
            var ch = _a[_i];
            arr.push(serialize2(ch, full));
        }
        return arr;
    }
    if (kind == yaml.Kind.ANCHOR_REF) {
        return serialize2(n.anchoredFrom(), full);
    }
    if (kind == yaml.Kind.MAPPING) {
        var v = {};
        var key = "" + n.key(true);
        var valueKind = n.valueKind();
        if (valueKind == yaml.Kind.ANCHOR_REF) {
            valueKind = n.anchorValueKind();
        }
        if (valueKind == yaml.Kind.INCLUDE_REF) {
            var children = n.children();
            if (children.length == 0) {
                v[key] = n.value();
            }
            else {
                if (children[0].key() == null) {
                    valueKind = yaml.Kind.SEQ;
                }
                else {
                    valueKind = yaml.Kind.MAP;
                }
            }
        }
        if (valueKind == yaml.Kind.SCALAR) {
            v[key] = n.value();
        }
        else if (valueKind == yaml.Kind.SEQ) {
            var arr = [];
            v[key] = arr;
            for (var _b = 0, _c = n.children(); _b < _c.length; _b++) {
                var ch = _c[_b];
                arr.push(serialize2(ch, full));
            }
        }
        else if (valueKind == yaml.Kind.MAP) {
            var obj = {};
            v[key] = obj;
            for (var _d = 0, _e = n.children(); _d < _e.length; _d++) {
                var ch = _e[_d];
                var chKey = "" + ch.key(true);
                var serialized = serialize2(ch, full);
                if (serialized === undefined) {
                    if (full) {
                        serialized = "!$$$novalue";
                    }
                    else {
                        serialized = null;
                    }
                }
                obj[chKey] = serialized;
            }
        }
        return v[key];
    }
    if (kind == yaml.Kind.SCALAR) {
        var q = n.value(false);
        return q;
    }
    if (kind == yaml.Kind.MAP) {
        var obj = {};
        for (var _f = 0, _g = n.children(); _f < _g.length; _f++) {
            var ch = _g[_f];
            var chKey = "" + ch.key(true);
            var serialized = serialize2(ch, true);
            obj[chKey] = serialized === undefined ? null : serialized;
        }
        return obj;
    }
}
exports.serialize2 = serialize2;
function serialize(node, options) {
    if (options === void 0) { options = {}; }
    options = options || {};
    if (node.children().length == 0) {
        return node.value();
    }
    if (!node.children()[0].key()) {
        var arr = [];
        node.children().forEach(function (x) {
            arr.push(serialize(x, options));
        });
        return arr;
    }
    else {
        var obj = {};
        node.children().forEach(function (x) {
            obj[escapeKey(x.key(options.rawKey), options)] = serialize(x, options);
        });
        if (options && options.writeErrors) {
            var errors = collectErrors(node);
            if (errors != null && errors.length > 0) {
                obj['__$errors__'] = errors;
            }
        }
        return obj;
    }
}
exports.serialize = serialize;
function collectErrors(node) {
    var errors = [].concat(node.errors());
    node.children().forEach(function (ch) {
        var children = ch.children();
        if (children.length == 0) {
            ch.errors().forEach(function (e) { return errors.push(e); });
            return;
        }
        if (!children[0].key()) {
            children.forEach(function (x) {
                if (x.children().length == 0) {
                    x.errors().forEach(function (e) { return errors.push(e); });
                }
            });
        }
    });
    return errors;
}
function escapeKey(key, options) {
    if (!options || !key) {
        return key;
    }
    if (options.escapeNumericKeys && key.replace(/\d/g, '').trim().length == 0) {
        return '__$EscapedKey$__' + key;
    }
    return key;
}
function unescapeKey(key, options) {
    if (!key) {
        return key;
    }
    options = options || {};
    if (options.escapeNumericKeys
        && util.stringStartsWith(key, '__$EscapedKey$__')
        && key.substring('__$EscapedKey$__'.length).replace(/\d/g, '').trim().length == 0) {
        return key.substring('__$EscapedKey$__'.length);
    }
    return key;
}
//# sourceMappingURL=json2lowLevel.js.map