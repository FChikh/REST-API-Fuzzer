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
var json = require("../jsyaml/json2lowLevel");
var stringify = require("json-stable-stringify");
var proxy = require("../ast.core/LowLevelASTProxy");
var hl = require("../highLevelAST");
var ll = require("../lowLevelAST");
var _ = require("underscore");
var yaml = require("yaml-ast-parser");
var def = require("raml-definition-system");
var hlimpl = require("../highLevelImpl");
var path = require("path");
var fs = require("fs");
var universes = require("../tools/universe");
var universeHelpers = require("../tools/universeHelpers");
var universeProvider = require("../definition-system/universeProvider");
var services = def;
var OverloadingValidator = require("./overloadingValidator");
var expander = require("./expanderLL");
var search = require("../../search/search-interface");
var rtypes = def.rt;
var util = require("../../util/textutil");
var contentprovider = require("../../util/contentprovider");
var resourceRegistry = require("../jsyaml/resourceRegistry");
var su = def.getSchemaUtils();
var mediaTypeParser = require("media-typer");
var xmlutil = require("../../util/xmlutil");
var changeCase = require('change-case');
var pluralize = require('pluralize');
var messageRegistry = require("../../../resources/errorMessages");
var LinterSettings = /** @class */ (function () {
    function LinterSettings() {
        this.validateNotStrictExamples = true;
    }
    return LinterSettings;
}());
var settings = new LinterSettings();
var loophole = require("loophole");
function evalInSandbox(code, thisArg, args) {
    return new loophole.Function(code).call(thisArg, args);
}
var MAX_RECURSION_LEVEL = 400;
exports.RESERVED_TEMPLATE_PARAMETERS = {
    "resourcePathName": "Part of the resource path following the rightmost \"/\"",
    "methodName": "Method name",
    "resourcePath": "Path of the resource"
};
var lintWithFile = function (customLinter, acceptor, astNode) {
    if (fs.existsSync(customLinter)) {
        try {
            var content = fs.readFileSync(customLinter).toString();
            var factr = new LinterExtensionsImpl(acceptor);
            evalInSandbox(content, factr, null);
            factr.visit(astNode);
        }
        catch (e) {
            console.log("Error in custom linter");
            console.log(e);
        }
    }
};
function checkPropertyQuard(n, v) {
    var pr = n.property();
    if (pr) {
        pr.getContextRequirements().forEach(function (x) {
            if (!n.checkContextValue(x.name, x.value, x.value)) {
                v.accept(createIssue1(messageRegistry.CONTEXT_REQUIREMENT, { name: x.name, value: x.value, propName: pr.nameId() }, n));
            }
        });
    }
    return pr;
}
;
function lintNode(astNode, acceptor) {
    var fsEnabled;
    try {
        fsEnabled = astNode.lowLevel().unit().project().fsEnabled();
    }
    catch (exception) {
        fsEnabled = true;
    }
    if (!fsEnabled) {
        return;
    }
    if (typeof fs === "undefined") {
        return;
    }
    if (!fs) {
        return;
    }
    var fsMethods = ['exists', 'readFile', 'writeFile', 'readdir', 'existsSync', 'readFileSync', 'writeFileSync', 'readdirSync'];
    var existingFsFields = Object.keys(fs);
    for (var i = 0; i < fsMethods.length; i++) {
        if (!fs[fsMethods[i]]) {
            return;
        }
    }
    var ps = astNode.lowLevel().unit().absolutePath();
    var dr = path.dirname(ps);
    var customLinter = path.resolve(dr, "raml-lint.js");
    lintWithFile(customLinter, acceptor, astNode);
    var dir = path.resolve(dr, ".raml");
    if (fs.existsSync(dir)) {
        var st = fs.statSync(dir);
        if (st.isDirectory()) {
            var files = fs.readdirSync(dir);
            files.forEach(function (x) {
                if (x.indexOf("-lint.js") != -1) {
                    lintWithFile(path.resolve(dir, x), acceptor, astNode);
                }
                //console.log(x);
            });
        }
    }
}
;
var LinterExtensionsImpl = /** @class */ (function () {
    function LinterExtensionsImpl(acceptor) {
        this.acceptor = acceptor;
        this.nodes = {};
    }
    LinterExtensionsImpl.prototype.error = function (w, message) {
        this.acceptor.accept(createIssue1(messageRegistry.INVALID_VALUE_SCHEMA, { iValue: message }, w.highLevel()));
    };
    LinterExtensionsImpl.prototype.errorOnProperty = function (w, property, message) {
        var pr = w.highLevel().attr(property);
        this.acceptor.accept(createIssue1(messageRegistry.INVALID_VALUE_SCHEMA, { iValue: message }, pr));
    };
    LinterExtensionsImpl.prototype.warningOnProperty = function (w, property, message) {
        var pr = w.highLevel().attr(property);
        this.acceptor.accept(createIssue1(messageRegistry.INVALID_VALUE_SCHEMA, { iValue: message }, pr, true));
    };
    LinterExtensionsImpl.prototype.warning = function (w, message) {
        this.acceptor.accept(createIssue1(messageRegistry.INVALID_VALUE_SCHEMA, { iValue: message }, w.highLevel(), true));
    };
    LinterExtensionsImpl.prototype.registerRule = function (nodeType, rule) {
        var q = this.nodes[nodeType];
        if (!q) {
            q = [];
            this.nodes[nodeType] = q;
        }
        q.push(rule);
    };
    LinterExtensionsImpl.prototype.visit = function (h) {
        var _this = this;
        var nd = h.definition();
        this.process(nd, h);
        nd.allSuperTypes().forEach(function (x) { return _this.process(x, h); });
        h.elements().forEach(function (y) { return _this.visit(y); });
    };
    LinterExtensionsImpl.prototype.process = function (d, h) {
        var _this = this;
        if (def.NodeClass.isInstance(d)) {
            if (!d.getAdapter(services.RAMLService).getDeclaringNode()) {
                var rules = this.nodes[d.nameId()];
                if (rules) {
                    rules.forEach(function (x) { return x(h.wrapperNode(), _this); });
                }
            }
        }
    };
    return LinterExtensionsImpl;
}());
var StackNode = /** @class */ (function () {
    function StackNode() {
    }
    StackNode.prototype.toString = function () {
        if (this.prev) {
            return this.value + "." + this.prev.toString();
        }
        return this.value;
    };
    StackNode.prototype.last = function () {
        if (this.prev) {
            return this.prev.last();
        }
        return this;
    };
    return StackNode;
}());
function isTypeOrSchema(d) {
    return d.nameId() == universes.Universe10.TypeDeclaration.properties.type.name || d.nameId() == universes.Universe10.TypeDeclaration.properties.schema.name;
}
function isDefaultValueProp(d) {
    if (!checkIfDomainIsUserDefined(d)) {
        return false;
    }
    return (d.nameId() == universes.Universe10.TypeDeclaration.properties.default.name);
}
function isExampleProp(d) {
    if (!checkIfDomainIsUserDefined(d)) {
        return false;
    }
    return (d.nameId() == universes.Universe10.TypeDeclaration.properties.example.name);
}
function checkIfDomainIsUserDefined(d) {
    if (!d.domain()) {
        return false;
    }
    if (d.domain().getAdapter(services.RAMLService).isUserDefined()) {
        return false;
    }
    return true;
}
function isSecuredBy(d) {
    if (!checkIfDomainIsUserDefined(d)) {
        return false;
    }
    return (d.nameId() == universes.Universe08.MethodBase.properties.securedBy.name);
}
/**
 * For descendants of templates returns template type. Returns null for all other nodes.
 */
function typeOfContainingTemplate(h) {
    if (!h.isElement()) {
        h = h.parent();
    }
    var declRoot = h && h.asElement();
    while (declRoot) {
        if (declRoot.definition().getAdapter(services.RAMLService).isInlinedTemplates()) {
            return declRoot.definition();
        }
        var np = declRoot.parent();
        if (!np) {
            break;
        }
        else {
            declRoot = np;
        }
    }
    return null;
}
exports.typeOfContainingTemplate = typeOfContainingTemplate;
function restrictUnknownNodeError(node) {
    var parentNode = node.parent();
    var issue = null;
    var parentDef = parentNode.definition();
    if (parentNode && def.UserDefinedClass.isInstance(parentDef)) {
        var parentProperty = parentNode.property();
        if (universeHelpers.isIsProperty(parentProperty)
            || universeHelpers.isTypeProperty(parentProperty)) {
            var paramName = node.name();
            if (exports.RESERVED_TEMPLATE_PARAMETERS[paramName] != null) {
                //Handling reserved parameter names;
                issue = createIssue1(messageRegistry.INVALID_PARAMETER_NAME, { paramName: paramName }, node);
            }
            else {
                var colonIndex = paramName.indexOf(":");
                if (hlimpl.BasicASTNode.isInstance(node) && colonIndex >= 0) {
                    var correctMapping = paramName.substring(0, colonIndex + 1) + " " + paramName.substring(colonIndex + 1);
                    issue = createIssue1(messageRegistry.UNUSED_PARAMETER_MISSING_SEPARATING_SPACE, {
                        paramName: paramName,
                        correctMapping: correctMapping
                    }, node, true);
                }
                else {
                    issue = createIssue1(messageRegistry.UNUSED_PARAMETER, { paramName: paramName }, node, true);
                }
            }
        }
    }
    if (!issue) {
        var propName = node.name();
        var universe08 = universeProvider("RAML08");
        var isRAML08 = parentDef.universe().version() == universe08.version();
        if (isRAML08) {
            var parameterTypeName = universes.Universe08.Parameter.name;
            var typeDeclarationTypeName = universes.Universe10.TypeDeclaration.name;
            if (isRAML08 && parentDef.isAssignableFrom(parameterTypeName)) {
                var possibleDefs = universe08.type(parameterTypeName).allSubTypes().filter(function (x) {
                    return universes.Universe08[x.nameId()]['properties'][propName] != null;
                });
                var possibleDefsMap = {};
                for (var i = 0; i < possibleDefs.length; i++) {
                    var x = possibleDefs[i];
                    if (possibleDefsMap[x.nameId()]) {
                        continue;
                    }
                    var valueRequirements = x.valueRequirements();
                    if (!(valueRequirements && valueRequirements.length != 0)) {
                        continue;
                    }
                    var typeRquirements = valueRequirements.filter(function (x) { return x.name == 'type'; }).map(function (x) { return x.value; });
                    if (typeRquirements.length == 0) {
                        continue;
                    }
                    var runtimeName = typeRquirements[0];
                    possibleDefsMap[x.nameId()] = runtimeName;
                    x.allSubTypes().forEach(function (y) { return possibleDefs.push(y); });
                }
                var runtimeNames = Object.keys(possibleDefsMap).map(function (x) { return possibleDefsMap[x]; }).sort();
                ;
                if (runtimeNames.length > 0) {
                    var namesStr = runtimeNames.map(function (x, i) {
                        var x1 = "'" + x + "'";
                        if (i == runtimeNames.length - 1) {
                            return x1;
                        }
                        if (i == runtimeNames.length - 2) {
                            return x1 + ' or ';
                        }
                        return x1 + ', ';
                    }).join('');
                    issue = createIssue1(messageRegistry.INVALID_PROPERTY_OWNER_TYPE, { propName: propName, namesStr: namesStr }, node);
                }
            }
        }
    }
    return issue;
}
;
function validateTopLevelNodeSkippingChildren(node, v) {
    // if (!node.parent()){
    //     try {
    //         validateIncludes(<hlimpl.BasicASTNode>node, v);
    //     } finally {
    //         cleanupIncludesFlag(<hlimpl.BasicASTNode>node, v);
    //     }
    // }
    if (node.isElement()) {
        if (node.invalidSequence) {
            var pName = node.property().nameId();
            pName = changeCase.sentenceCase(pluralize.singular(pName));
            v.acceptUnique(createLLIssue1(messageRegistry.SEQUENCE_NOT_ALLOWED_10, { propName: pName }, node.lowLevel().parent().parent(), node));
        }
        var highLevelNode = node.asElement();
        if (highLevelNode.definition().isAssignableFrom(universes.Universe10.LibraryBase.name)) {
            var hasSchemas = false;
            var hasTypes = false;
            var vv;
            highLevelNode.lowLevel().children().forEach(function (x) {
                if (x.key() == "schemas") {
                    hasSchemas = true;
                    vv = x;
                }
                if (x.key() == "types") {
                    hasTypes = true;
                }
            });
            if (hasSchemas && hasTypes) {
                v.accept(localLowLevelError(vv, highLevelNode, hl.IssueCode.ILLEGAL_PROPERTY_VALUE, false, "types and schemas are mutually exclusive", false));
            }
        }
        var hasRequireds = highLevelNode.definition().requiredProperties() && highLevelNode.definition().requiredProperties().length > 0;
        validateBasicFlat(node, v);
        //new UriParametersValidator().validate(highLevelNode,v);
        new CompositeNodeValidator().validate(highLevelNode, v);
        new TemplateCyclesDetector().validate(highLevelNode, v);
    }
    else {
        validateBasicFlat(node, v);
    }
    new OptionalPropertiesValidator().validate(node, v);
}
/**
 * Performs basic validation of a node on a single level, without proceeding to the node high-level children validation.
 * @param node
 * @param v
 * @param requiredOnly
 * @returns {boolean} - whether to continue validation after this one is finished, or there is no point for further validation.
 */
function validateBasicFlat(node, v, requiredOnly) {
    if (requiredOnly === void 0) { requiredOnly = false; }
    var parentNode = node.parent();
    var llValue = node.lowLevel().value();
    if (node.lowLevel()) {
        if (node.lowLevel().keyKind() == yaml.Kind.MAP) {
            v.accept(createIssue1(messageRegistry.NODE_KEY_IS_A_MAP, {}, node));
        }
        if (node.lowLevel().keyKind() == yaml.Kind.SEQ) {
            if (llValue == null) {
                var isPattern = false;
                if (node.isElement()) {
                    if (node.asElement().definition().isAssignableFrom(universes.Universe10.TypeDeclaration.name)) {
                        isPattern = true;
                    }
                }
                if (!isPattern) {
                    v.accept(createIssue1(messageRegistry.NODE_KEY_IS_A_SEQUENCE, {}, node));
                }
            }
        }
    }
    if (node.isUnknown()) {
        if ((typeof node.name() === "string") && node.name().indexOf("<<") >= 0) {
            if (typeOfContainingTemplate(parentNode) != null) {
                new TraitVariablesValidator().validateName(node, v);
                return false;
            }
        }
        if (node.needSequence) {
            v.accept(createIssue1(messageRegistry.SEQUENCE_REQUIRED, { name: node.name() }, node));
        }
        if (node.needMap) {
            if (node.knownProperty) {
                v.accept(createIssue1(messageRegistry.PROPERTY_MUST_BE_A_MAP_10, { propName: node.knownProperty.nameId() }, node));
            }
            else {
                v.accept(createIssue1(messageRegistry.MAP_REQUIRED, {}, node));
            }
            return false;
        }
        if (node.unresolvedRef) {
            v.accept(createIssue1(messageRegistry.UNRESOLVED_REFERENCE, { ref: llValue }, node));
        }
        if (node.knownProperty) {
            //if (!node.lowLevel().)
            if (node.lowLevel().includeErrors().length == 0) {
                if (typeOfContainingTemplate(parentNode)
                    && util.startsWith(llValue, "<<")
                    && util.endsWith(llValue, ">>")) {
                    return false;
                }
                if (node.name() == "body" && node.computedValue("mediaType")) {
                    return false;
                }
                if (node.lowLevel().value() != '~') {
                    if (!checkIfIncludeTagIsMissing(node, v, messageRegistry.SCALAR_PROHIBITED.code, false)) {
                        v.accept(createIssue1(messageRegistry.SCALAR_PROHIBITED, { propName: node.name() }, node));
                    }
                }
            }
        }
        else {
            var i0 = (typeof node.name() === "string") ? node.name().indexOf("<<") : -1;
            if (i0 > 0 && typeOfContainingTemplate(parentNode)
                && node.name().indexOf(">>", i0)) {
                return false;
            }
            var issue = restrictUnknownNodeError(node);
            if (!issue) {
                issue = createUnknownNodeIssue(node);
            }
            v.accept(issue);
        }
    }
    if (node.markCh() && !node.allowRecursive()) {
        if (!node.property()) {
            return false;
        }
        v.accept(createIssue1(messageRegistry.RECURSIVE_DEFINITION, { name: node.name() }, node));
        return false;
    }
    if (node.definition && node.definition().isAssignableFrom(universes.Universe10.Operation.name)) {
        var searchResult = queryDeclarationsSearch(node.wrapperNode());
        var queryStringNode = searchResult.queryStringComesFrom;
        var queryParamsNode = searchResult.queryParamsComesFrom;
        if (queryStringNode && queryParamsNode) {
            v.accept(createIssueForQueryDeclarations(queryStringNode, node, false));
            v.accept(createIssueForQueryDeclarations(queryParamsNode, node, true));
        }
    }
    var isOverlay = node.definition && node.definition() &&
        (node.definition().key() === universes.Universe10.Overlay ||
            node.definition().key() === universes.Universe10.Extension);
    if (isOverlay) {
        validateMasterFlat(node, v, requiredOnly);
    }
    return true;
}
exports.validateBasicFlat = validateBasicFlat;
function createUnknownNodeIssue(node) {
    var parentNode = node.parent();
    var issue;
    if (parentNode) {
        var d = parentNode.definition();
        if (d) {
            var propName = node.name();
            var typeName = d.nameId();
            if (expander.isPossibleMethodName(propName)) {
                issue = createIssue1(messageRegistry.INVALID_METHOD_USAGE, { typeName: typeName }, node);
            }
            else if (propName.charAt(0) == "/") {
                issue = createIssue1(messageRegistry.INVALID_SUBRESOURCE_USAGE, { typeName: typeName }, node);
            }
            else {
                var u = d && d.universe();
                if (u) {
                    var propExists = PropertyNamesRegistry.getInstance().hasProperty(propName);
                    if (propExists) {
                        var uVersion = void 0;
                        if (u.version() == "RAML10") {
                            uVersion = "RAML 1.0";
                        }
                        else if (u.version() == "RAML08") {
                            uVersion = "RAML 0.8";
                        }
                        if (uVersion) {
                            issue = createIssue1(messageRegistry.INVALID_PROPERTY_USAGE, {
                                propName: propName,
                                typeName: typeName,
                                ramlVersion: uVersion
                            }, node);
                        }
                    }
                }
            }
        }
    }
    if (!issue) {
        issue = createIssue1(messageRegistry.UNKNOWN_NODE, { name: node.name() }, node);
    }
    return issue;
}
;
function createIssueForQueryDeclarations(node, parentNode, isQueryParamsDeclaration) {
    var asLowLevel = node;
    var asHighLevel = node;
    var propertyName = isQueryParamsDeclaration ? universes.Universe10.Operation.properties.queryString.name : universes.Universe10.Operation.properties.queryParameters.name;
    if (asLowLevel.unit) {
        return createLLIssue1(messageRegistry.QUERY_STRING_AND_QUERY_PARAMETERS_ARE_MUTUALLY_EXCLUSIVE, {
            propName: propertyName
        }, asLowLevel, parentNode);
    }
    else {
        return createIssue1(messageRegistry.QUERY_STRING_AND_QUERY_PARAMETERS_ARE_MUTUALLY_EXCLUSIVE, {
            propName: propertyName
        }, asHighLevel);
    }
}
var QueryDeclarationsSearchResult = /** @class */ (function () {
    function QueryDeclarationsSearchResult() {
    }
    return QueryDeclarationsSearchResult;
}());
function queryDeclarationsSearch(operation) {
    return {
        queryParamsComesFrom: queryDeclarationSearch(operation, true),
        queryStringComesFrom: queryDeclarationSearch(operation, false)
    };
}
function queryDeclarationSearch(operation, isParamsSearch, checkParent, passed) {
    if (checkParent === void 0) { checkParent = true; }
    if (passed === void 0) { passed = {}; }
    if (!operation) {
        return null;
    }
    if (operation.name) {
        var name_1 = operation.name();
        if (passed[name_1]) {
            return;
        }
        passed[name_1] = true;
    }
    var declaredHere = queryDeclarationFromMethodBase(operation, isParamsSearch);
    if (declaredHere) {
        return declaredHere;
    }
    var traitRefs = (operation.is && operation.is()) || [];
    var declaredIn = _.find(traitRefs, function (traitRef) { return queryDeclarationSearch(traitRef.trait(), isParamsSearch, checkParent, passed); });
    if (declaredIn) {
        return declaredIn.highLevel();
    }
    if (checkParent) {
        var resourceBase = operation.parentResource && operation.parentResource();
        var found = resourceBase && queryDeclarationSearchInResourceBase(resourceBase, isParamsSearch, passed);
        if (found) {
            return found;
        }
        resourceBase = operation.parent && operation.parent();
        if (resourceBase && resourceBase.highLevel().definition().isAssignableFrom(universes.Universe10.ResourceBase.name)) {
            return queryDeclarationSearchInResourceBase(resourceBase, isParamsSearch, passed);
        }
    }
    return null;
}
function queryDeclarationSearchInResourceBase(resource, isParamsSearch, passedTraits, passed) {
    if (passedTraits === void 0) { passedTraits = {}; }
    if (passed === void 0) { passed = {}; }
    if (resource.name) {
        var name_2 = resource.name();
        if (passed[name_2]) {
            return;
        }
        passed[name_2] = true;
    }
    var traitRefs = resource.is();
    var declaredIn = _.find(traitRefs, function (traitRef) { return queryDeclarationSearch(traitRef.trait(), isParamsSearch, false, passedTraits); });
    if (declaredIn) {
        return declaredIn.highLevel();
    }
    var resourceTypeRef = resource.type();
    var resourceType = resourceTypeRef && resourceTypeRef.resourceType();
    var foundInType = resourceType && queryDeclarationSearchInResourceBase(resourceType, isParamsSearch, passedTraits, passed);
    if (foundInType) {
        return resourceTypeRef.highLevel();
    }
}
function queryDeclarationFromMethodBase(operation, isParamsSearch) {
    if (isParamsSearch) {
        return queryParametersDeclarationFromMehodBase(operation);
    }
    else {
        return queryStringDeclarationFromMehodBase(operation);
    }
}
function queryParametersDeclarationFromMehodBase(operation) {
    var node = operation.highLevel();
    return node.lowLevel && _.find(node.lowLevel().children(), function (child) { return child.key && child.key() === universes.Universe10.Operation.properties.queryParameters.name; });
}
function queryStringDeclarationFromMehodBase(operation) {
    var node = operation.highLevel();
    var highLevelResult = node.element(universes.Universe10.Operation.properties.queryString.name);
    return highLevelResult;
}
/**
 * Validates node master, but only on a single level, without recurring to high-level children.
 * @param node
 * @param acceptor
 */
function validateMasterFlat(node, acceptor, requiredOnly) {
    if (requiredOnly === void 0) { requiredOnly = false; }
    if (node.parent())
        return;
    var nodeAsElement = node.asElement();
    if (!nodeAsElement)
        return;
    if (!nodeAsElement.isAuxilary())
        return;
    var master = nodeAsElement.getMaster();
    if (!master)
        return;
    validateTopLevelNodeSkippingChildren(master, acceptor);
}
function validateBasic(node, v, requiredOnly) {
    if (requiredOnly === void 0) { requiredOnly = false; }
    if (!validateBasicFlat(node, v, requiredOnly)) {
        return;
    }
    try {
        var isOverlay = node.definition && node.definition() &&
            (node.definition().key() === universes.Universe10.Overlay ||
                node.definition().key() === universes.Universe10.Extension);
        var children = isOverlay ? node.children() : node.directChildren();
        children.filter(function (child) {
            return !requiredOnly || (child.property && child.property() && child.property().isRequired());
        }).forEach(function (x) {
            if (x && x.errorMessage) {
                var em = x.errorMessage;
                v.accept(createIssue1(em.entry, em.parameters, x.name() ? x : node));
                return;
            }
            x.validate(v);
        });
    }
    finally {
        node.unmarkCh();
    }
}
exports.validateBasic = validateBasic;
var createLibraryIssue = function (attr, hlNode) {
    var start = hlNode.lowLevel().start();
    var usesNodes = [];
    if (start < 0) {
        var seq = hlNode.attr("key").value().split(".");
        var nodes = [];
        var parent = hlNode.parent();
        for (var _i = 0, seq_1 = seq; _i < seq_1.length; _i++) {
            var segment = seq_1[_i];
            var n = _.find(parent.elementsOfKind("uses"), function (x) { return x.attr("key") && x.attr("key").value() == segment; });
            nodes.push(n);
            parent = n.lowLevel().unit().resolve(n.attr("value").value()).highLevel().asElement();
        }
        var issues = nodes.map(function (x) { return createIssue1(messageRegistry.ISSUES_IN_THE_LIBRARY, { value: x.attr("value").value() }, x, true); });
        issues = issues.reverse();
        for (var i = 0; i < issues.length - 1; i++) {
            issues[i].extras.push(issues[i + 1]);
        }
        return issues[0];
    }
    else {
        usesNodes.push(hlNode);
    }
    return createIssue1(messageRegistry.ISSUES_IN_THE_LIBRARY, { value: attr.value() }, hlNode, true);
};
function validate(node, v) {
    if (!node.parent()) {
        try {
            validateIncludes(node, v);
        }
        finally {
            cleanupIncludesFlag(node, v);
        }
        var cLength = node.lowLevel().unit().contents().length;
        node.lowLevel().errors().forEach(function (x) {
            var ps = x.mark ? x.mark.position : 0;
            var pe = (ps >= cLength) ? ps : (ps + 1);
            if (x.mark && x.mark.toLineEnd) {
                var content_1 = x.mark.buffer;
                var ind = content_1.indexOf("\n", ps);
                if (ind < 0) {
                    ind = content_1.length;
                }
                if (ind < content_1.length && content_1.charAt(ind) == "\r") {
                    ind--;
                }
                pe = ind;
            }
            var em = {
                code: "YAML_ERROR",
                message: x.message,
                node: null,
                start: ps,
                end: pe,
                isWarning: x.isWarning,
                path: node.lowLevel().unit() == node.root().lowLevel().unit() ? null : node.lowLevel().unit().path(),
                unit: node.lowLevel().unit()
            };
            v.accept(em);
        });
    }
    if (node.isAttr()) {
        new CompositePropertyValidator().validate(node, v);
    }
    else if (node.isElement()) {
        if (node.invalidSequence) {
            var pName = node.property().nameId();
            v.acceptUnique(createLLIssue1(messageRegistry.SEQUENCE_NOT_ALLOWED_10, { propName: pName }, node.lowLevel().parent().parent(), node, false));
        }
        var highLevelNode = node.asElement();
        if (universeHelpers.isExampleSpecType(highLevelNode.definition())) {
            var hlChildren = highLevelNode.children();
            if (hlChildren.length == 0) {
                validateBasic(node, v, true);
                return;
            }
            var content = hlChildren.filter(function (x) {
                var propName = x.lowLevel().key();
                if (!propName) {
                    return true;
                }
                if (propName.charAt(0) == "(" && propName.charAt(propName.length - 1) == ")") {
                    return false;
                }
                return highLevelNode.definition().property(propName) == null;
            });
            if (content.length > 0) {
                validateBasic(node, v, true);
                return;
            }
        }
        if (highLevelNode.definition().isAnnotationType() || highLevelNode.property() && highLevelNode.property().nameId() == "annotations") {
            new FixedFacetsValidator().validate(highLevelNode, v);
            return;
        }
        if (highLevelNode.definition().isAssignableFrom(universes.Universe10.UsesDeclaration.name)) {
            new UsesEntryValidator().validate(highLevelNode, v);
        }
        if (highLevelNode.definition().isAssignableFrom(universes.Universe10.TypeDeclaration.name)) {
            highLevelNode.attrs().forEach(function (a) {
                var range = a.property().range().key();
                if (range == universes.Universe08.RelativeUriString || range == universes.Universe10.RelativeUriString) {
                    new UriValidator().validate(a, v);
                    return;
                }
                if (range == universes.Universe08.FullUriTemplateString || range == universes.Universe10.FullUriTemplateString) {
                    new UriValidator().validate(a, v);
                    return;
                }
                if (a.property().getAdapter(services.RAMLPropertyService).isKey()) {
                    var nameId = node.property() && node.property().nameId();
                    if (nameId == universes.Universe08.Resource.properties.uriParameters.name
                        || nameId == universes.Universe08.Resource.properties.baseUriParameters.name) {
                        //new UrlParameterNameValidator().validate(a, v);
                        return;
                    }
                    if (highLevelNode.property()) {
                        if (highLevelNode.property().nameId() ==
                            universes.Universe10.MethodBase.properties.body.name) { //FIXME
                            new MediaTypeValidator().validate(a, v);
                            return;
                        }
                    }
                }
            });
            // if (highLevelNode.parent()&&!highLevelNode.parent().parent()){
            //     if (rtypes.builtInTypes().get(highLevelNode.name())){
            //         v.accept(createIssue(hl.IssueCode.ILLEGAL_PROPERTY_VALUE,
            //              `redefining a built in type: '${highLevelNode.name()}'`,highLevelNode));
            //     }
            // }
            new RecurrentOverlayValidator().validate(highLevelNode, v);
            new RecurrentValidateChildrenKeys().validate(highLevelNode, v);
            new NodeSpecificValidator().validate(highLevelNode, v);
            new TypeDeclarationValidator().validate(highLevelNode, v);
            if (highLevelNode.parent() == null) {
                highLevelNode.elements().filter(function (x) { return x.definition().isAssignableFrom(universes.Universe10.UsesDeclaration.name); }).forEach(function (x) { return new UsesEntryValidator().validate(x, v); });
            }
            return;
        }
        if (highLevelNode.definition().isAssignableFrom(universes.Universe10.LibraryBase.name)) {
            var hasSchemas = false;
            var hasTypes = false;
            var vv;
            highLevelNode.lowLevel().children().forEach(function (x) {
                if (x.key() == "schemas") {
                    hasSchemas = true;
                    vv = x;
                }
                if (x.key() == "types") {
                    hasTypes = true;
                }
            });
            if (hasSchemas && hasTypes) {
                v.accept(createLLIssue1(messageRegistry.TYPES_AND_SCHEMAS_ARE_EXCLUSIVE, {}, vv, highLevelNode));
            }
        }
        var hasRequireds = highLevelNode.definition().requiredProperties() && highLevelNode.definition().requiredProperties().length > 0;
        var isAllowAny = highLevelNode.definition().getAdapter(services.RAMLService).getAllowAny();
        if (isAllowAny) {
            if (hasRequireds) {
                validateBasic(node, v, true);
            }
        }
        else {
            validateBasic(node, v);
        }
        new UriParametersValidator().validate(highLevelNode, v);
        new ProtocolsValidator().validate(highLevelNode, v);
        new CompositeNodeValidator().validate(highLevelNode, v);
        new TemplateCyclesDetector().validate(highLevelNode, v);
    }
    else {
        validateBasic(node, v);
    }
    new OptionalPropertiesValidator().validate(node, v);
}
exports.validate = validate;
function cleanupIncludesFlag(node, v) {
    if (!node.lowLevel()) {
        return;
    }
    var val = node.lowLevel().actual();
    delete val._inc;
    node.children().forEach(function (x) { return cleanupIncludesFlag(x, v); });
}
function validateIncludes(node, v) {
    var llNode = node.lowLevel();
    if (!llNode) {
        return;
    }
    var val = llNode.actual();
    if (val._inc) {
        return;
    }
    if (node.isElement()) {
        var vl = node.name();
        if (typeOfContainingTemplate(node) != null) {
            vl = vl.replace(/<<[^<>]*>>/g, '');
        }
        if (typeof vl == "string") {
            if (vl != null && vl.indexOf(" ") != -1) {
                v.accept(createIssue1(messageRegistry.SPACES_IN_KEY, { value: vl }, node, true));
            }
        }
    }
    val._inc = true;
    if (llNode) {
        llNode.includeErrors().forEach(function (x) {
            var isWarn = false;
            if (node.lowLevel().hasInnerIncludeError()) {
                isWarn = true;
            }
            var em = createIssue1(messageRegistry.INCLUDE_ERROR, { msg: x }, node, isWarn);
            v.accept(em);
        });
        var includePath_1 = llNode.includePath();
        if (includePath_1 != null && !path.isAbsolute(includePath_1) && !ll.isWebPath(includePath_1)) {
            var unitPath = llNode.unit().absolutePath();
            if (llNode instanceof proxy.LowLevelCompositeNode) {
                var includingNode = llNode.adoptedNodes().find(function (x) { return x.includePath() == includePath_1; });
                if (includingNode) {
                    unitPath = includingNode.unit().absolutePath();
                }
            }
            var exceeding = calculateExceeding(path.dirname(unitPath), includePath_1);
            if (exceeding > 0) {
                var em = createIssue1(messageRegistry.PATH_EXCEEDS_ROOT, {}, node, true);
                v.accept(em);
            }
        }
    }
    node.children().forEach(function (x) { return validateIncludes(x, v); });
    if (node.children().length == 0 && llNode != null) {
        llNode.children().forEach(function (x) { return validateIncludesLL(x, v, node); });
    }
}
function validateIncludesLL(llNode, v, node) {
    llNode.includeErrors().forEach(function (x) {
        var isWarn = false;
        if (llNode.hasInnerIncludeError()) {
            isWarn = true;
        }
        var em = createLLIssue1(messageRegistry.INCLUDE_ERROR, { msg: x }, llNode, node, isWarn);
        v.accept(em);
    });
    var includePath = llNode.includePath();
    if (includePath != null && !path.isAbsolute(includePath) && !ll.isWebPath(includePath)) {
        var unitPath = llNode.unit().absolutePath();
        var exceeding = calculateExceeding(path.dirname(unitPath), includePath);
        if (exceeding > 0) {
            var em = createLLIssue1(messageRegistry.PATH_EXCEEDS_ROOT, {}, llNode, node, true);
            v.accept(em);
        }
    }
    llNode.children().forEach(function (x) { return validateIncludesLL(x, v, node); });
}
var actualSegments = function (rootPath) {
    rootPath = rootPath.replace(/\\/g, "/").trim();
    if (rootPath.length > 1 && rootPath.charAt(1) == ":" && /^win/.test(process.platform)) {
        rootPath = rootPath.substring(2);
    }
    var segments = rootPath.split("/");
    if (segments[0].length == 0) {
        segments = segments.slice(1);
    }
    if (segments.length > 0 && segments[segments.length - 1].length == 0) {
        segments = segments.slice(0, segments.length - 1);
    }
    return segments;
};
function calculateExceeding(rootPath, relativePath) {
    var rootSegments = actualSegments(rootPath);
    var relativeSegments = actualSegments(relativePath);
    var count = rootSegments.length;
    var result = 0;
    for (var _i = 0, relativeSegments_1 = relativeSegments; _i < relativeSegments_1.length; _i++) {
        var segment = relativeSegments_1[_i];
        if (segment == "..") {
            count--;
            if (count < 0) {
                result = Math.min(count, result);
            }
        }
        else {
            count++;
        }
    }
    return -1 * result;
}
var validateRegexp = function (cleanedValue, v, node) {
    try {
        new RegExp(cleanedValue);
    }
    catch (Error) {
        v.accept(createIssue1(messageRegistry.ILLEGAL_PATTERN, { value: cleanedValue }, node));
    }
};
var TraitVariablesValidator = /** @class */ (function () {
    function TraitVariablesValidator() {
    }
    TraitVariablesValidator.prototype.validateName = function (node, acceptor) {
        var name = node.name();
        if (name) {
            var start = node.lowLevel().keyStart();
            this.check(name, start, node, acceptor);
        }
    };
    TraitVariablesValidator.prototype.validateValue = function (node, acceptor) {
        var value = node.value();
        if (typeof (value) === 'string') {
            var start = node.lowLevel().valueStart();
            this.check(value, start, node, acceptor);
        }
    };
    TraitVariablesValidator.prototype.hasTraitOrResourceTypeParent = function (node) {
        var parent = node.parent();
        while (parent != null) {
            if (!parent.definition())
                return false;
            if (universeHelpers.isTraitType(parent.definition())
                || universeHelpers.isResourceTypeType(parent.definition())) {
                return true;
            }
            parent = parent.parent();
        }
        return false;
    };
    TraitVariablesValidator.prototype.check = function (str, start, node, acceptor) {
        if (!this.hasTraitOrResourceTypeParent(node))
            return [];
        var errors = [];
        var prev = 0;
        for (var i = str.indexOf('<<'); i >= 0; i = str.indexOf('<<', prev)) {
            var i0 = i;
            i += '<<'.length;
            prev = str.indexOf('>>', i);
            var paramOccurence = str.substring(i, prev);
            var ind = paramOccurence.indexOf('|');
            var paramName = ind >= 0 ? paramOccurence.substring(0, ind) : paramOccurence;
            if (paramName.trim().length == 0) {
                var msg = "Trait or resource type parameter name must contain non whitespace characters";
                var issue = createIssue1(messageRegistry.TEMPLATE_PARAMETER_NAME_MUST_CONTAIN_NONWHITESPACE_CHARACTERS, {}, node);
                issue.start = start + i;
                issue.end = start + prev;
                acceptor.accept(issue);
            }
            if (ind != -1) {
                ind++;
                var transformerNames = paramOccurence.split("|").slice(1).map(function (x) { return x.trim(); });
                var functionNames = expander.getTransformNames();
                for (var _i = 0, transformerNames_1 = transformerNames; _i < transformerNames_1.length; _i++) {
                    var transformerName = transformerNames_1[_i];
                    if (!_.find(functionNames, function (functionName) {
                        return transformerName === functionName || transformerName === ('!' + functionName);
                    })) {
                        var issue = createIssue1(messageRegistry.UNKNOWN_FUNCTION, { transformerName: transformerName }, node, false);
                        issue.start = start + ind;
                        issue.end = start + prev;
                        acceptor.accept(issue);
                    }
                }
            }
            prev += '>>'.length;
        }
        return errors;
    };
    return TraitVariablesValidator;
}());
var MethodBodyValidator = /** @class */ (function () {
    function MethodBodyValidator() {
    }
    MethodBodyValidator.prototype.validate = function (node, validationAcceptor) {
        var methodNode = node.parent();
        if (!methodNode) {
            return;
        }
        if (!(methodNode.definition().isAssignableFrom(universes.Universe08.Method.name) || methodNode.definition().isAssignableFrom(universes.Universe10.Method.name))) {
            return;
        }
        var hasBody = _.find(methodNode.lowLevel() && methodNode.lowLevel().children() || [], function (child) {
            var keyValue = child.key();
            return keyValue && (universes.Universe08.MethodBase.properties.body.name === keyValue || universes.Universe10.MethodBase.properties.body.name === keyValue);
        });
        if (hasBody && _.find(MethodBodyValidator.methodsWithoutRequestBody, function (methodDisabled) { return methodNode.name() === methodDisabled; })) {
            validationAcceptor.accept(createIssue1(messageRegistry.REQUEST_BODY_DISABLED, { methodName: methodNode.name() }, methodNode));
        }
    };
    MethodBodyValidator.methodsWithoutRequestBody = ['trace'];
    return MethodBodyValidator;
}());
var CompositePropertyValidator = /** @class */ (function () {
    function CompositePropertyValidator() {
    }
    CompositePropertyValidator.prototype.validate = function (node, v) {
        var pr = checkPropertyQuard(node, v);
        var vl = node.value();
        var nodeParent = node.parent();
        var pDef = nodeParent.definition();
        var ramlVersion = pDef.universe().version();
        var isInsideTemplate = typeOfContainingTemplate(nodeParent) != null;
        var nodeProperty = node.property();
        if (!nodeProperty.range().hasStructure()) {
            if (hlimpl.StructuredValue.isInstance(vl) && !nodeProperty.isSelfNode()) {
                //TODO THIS SHOULD BE MOVED TO TYPESYSTEM FOR STS AT SOME MOMENT
                if (isTypeOrSchema(nodeProperty)) {
                    if (nodeProperty.domain().key() == universes.Universe08.BodyLike) {
                        var structValue = vl;
                        var newNode = new hlimpl.ASTNodeImpl(node.lowLevel(), nodeParent, pDef.universe().type(universes.Universe08.BodyLike.name), nodeProperty);
                        newNode.validate(v);
                        return;
                    }
                }
                if (ramlVersion == "RAML10" && isInsideTemplate) {
                    return;
                }
                v.accept(createIssue1(messageRegistry.SCALAR_EXPECTED, {}, node));
            }
            else {
                var vk = node.lowLevel().valueKind();
                if (node.lowLevel().valueKind() != yaml.Kind.INCLUDE_REF && !nodeProperty.getAdapter(services.RAMLPropertyService).isKey()) {
                    if (!nodeProperty.isMultiValue() && !(universeHelpers.isApiType(pDef) && universeHelpers.isTitleProperty(nodeProperty))) {
                        var k = nodeProperty.range().key();
                        if (k == universes.Universe08.StringType || k == universes.Universe08.MarkdownString || k == universes.Universe08.MimeType) {
                            if (vk == yaml.Kind.SEQ || vk == yaml.Kind.MAPPING || vk == yaml.Kind.MAP || ((nodeProperty.isRequired() || universeHelpers.isMediaTypeProperty(nodeProperty)) && (vk == null || vk === undefined))) {
                                if (!nodeProperty.domain().getAdapter(services.RAMLService).isInlinedTemplates()) {
                                    v.accept(createIssue1(messageRegistry.INVALID_PROPERTY_RANGE, { propName: node.name(), range: "string" }, node));
                                }
                            }
                        }
                    }
                }
            }
            if (node.isAnnotatedScalar()) {
                var fvl = new FixedFacetsValidator();
                node.annotations().forEach(function (x) {
                    var vl = x.value();
                    var highLevel = vl.toHighLevel();
                    if (!highLevel) {
                        v.accept(createIssue1(messageRegistry.UNKNOWN_ANNOTATION, { aName: vl.valueName() }, x));
                    }
                    else {
                        fvl.validate(highLevel, v);
                    }
                });
            }
        }
        var refName;
        if (typeof vl == 'string') {
            refName = vl;
        }
        else if (hlimpl.StructuredValue.isInstance(vl)) {
            refName = vl.valueName();
        }
        if (refName && refName.indexOf("<<") != -1) {
            if (refName.indexOf(">>") > refName.indexOf("<<")) {
                new TraitVariablesValidator().validateValue(node, v);
                if (isInsideTemplate) {
                    return;
                }
            }
            //validate functions;
        }
        new MethodBodyValidator().validate(node, v);
        if ((nodeProperty.range().key() == universes.Universe08.MimeType ||
            nodeProperty.range().key() == universes.Universe10.MimeType) ||
            (nodeProperty.nameId() == universes.Universe10.TypeDeclaration.properties.name.name
                && nodeParent.property().nameId() ==
                    universes.Universe10.MethodBase.properties.body.name)) { //FIXME
            new MediaTypeValidator().validate(node, v);
            return;
        }
        if (isExampleProp(nodeProperty) || isDefaultValueProp(nodeProperty)) {
            // if (ramlVersion=="RAML08"){
            //     var llv=node.lowLevel().value();
            //     if (node.lowLevel().children().length>0){
            //         var valName = isExampleProp(node.property()) ? "'example'" : "'defaultValue'";
            //         v.accept(createIssue1(messageRegistry.INVALID_PROPERTY_RANGE,
            //             {propName: valName,range: "string"},node,false));
            //     }
            // }
            new ExampleAndDefaultValueValidator().validate(node, v);
        }
        if (isSecuredBy(nodeProperty)) {
            if (ramlVersion == "RAML08") {
                var np = node.lowLevel().parent();
                var ysc = yaml.Kind.SEQ;
                if (proxy.LowLevelProxyNode.isInstance(node.lowLevel())) {
                    if (np.valueKind() != ysc) {
                        v.accept(createIssue1(messageRegistry.SECUREDBY_LIST_08, {}, node, false));
                    }
                }
                else {
                    if (np.kind() != ysc) {
                        v.accept(createIssue1(messageRegistry.SECUREDBY_LIST_08, {}, node, false));
                    }
                }
            }
            new ExampleAndDefaultValueValidator().validate(node, v);
            if (ramlVersion == "RAML10") {
                if (hlimpl.StructuredValue.isInstance(vl)) {
                    var sv = vl;
                    var scopes = sv.children().filter(function (x) { return x.valueName() == "scopes"; });
                    if (scopes.length > 0) {
                        var schema = node.findReferencedValue();
                        if (schema) {
                            var scopeNodes = [];
                            scopes.forEach(function (scopeNode) {
                                var children = scopeNode.children();
                                if (children.length > 0) {
                                    children.forEach(function (ch) {
                                        var strVal = ch.lowLevel().value();
                                        if (strVal != null && !(isInsideTemplate && strVal.indexOf("<<") >= 0)) {
                                            scopeNodes.push(ch);
                                        }
                                    });
                                }
                                else {
                                    var strVal = scopeNode.lowLevel().value();
                                    if (strVal != null && !(isInsideTemplate && strVal.indexOf("<<") >= 0)) {
                                        scopeNodes.push(scopeNode);
                                    }
                                }
                            });
                            var allowedScopes = {};
                            var settingsNode = schema.element(def.universesInfo.Universe10.AbstractSecurityScheme.properties.settings.name);
                            if (settingsNode) {
                                var allowedScopesNodes = settingsNode.attributes(def.universesInfo.Universe10.OAuth2SecuritySchemeSettings.properties.scopes.name);
                                allowedScopesNodes.forEach(function (x) { return allowedScopes[x.value()] = true; });
                            }
                            for (var _i = 0, scopeNodes_1 = scopeNodes; _i < scopeNodes_1.length; _i++) {
                                var scope = scopeNodes_1[_i];
                                var scopeStr = scope.lowLevel().value();
                                if (!allowedScopes.hasOwnProperty(scopeStr)) {
                                    v.accept(createLLIssue1(messageRegistry.INVALID_SECURITY_SCHEME_SCOPE, {
                                        invalidScope: scopeStr,
                                        securityScheme: schema.name(),
                                        allowedScopes: Object.keys(allowedScopes).map(function (x) { return "'" + x + "'"; }).join(", ")
                                    }, scope.lowLevel(), node, false));
                                }
                            }
                        }
                    }
                }
            }
        }
        if (nodeProperty.nameId() == universes.Universe10.TypeDeclaration.properties.name.name) {
            //TODO MOVE TO DEF SYSTEM
            var nameId = nodeParent.property() && nodeParent.property().nameId();
            if (nameId == universes.Universe08.Resource.properties.uriParameters.name
                || nameId == universes.Universe08.Resource.properties.baseUriParameters.name) {
                //                    new UrlParameterNameValidator().validate(node, v);
                return;
            }
        }
        var range = nodeProperty.range().key();
        if (range == universes.Universe08.RelativeUriString || range == universes.Universe10.RelativeUriString) {
            new UriValidator().validate(node, v);
            return;
        }
        if (range == universes.Universe08.FullUriTemplateString || range == universes.Universe10.FullUriTemplateString) {
            new UriValidator().validate(node, v);
            return;
        }
        if ("pattern" == node.name() && universes.Universe10.StringType == node.definition().key()
            && pDef.isAssignableFrom("StringTypeDeclaration")) {
            validateRegexp(node.value(), v, node);
        }
        if ("name" == node.name() && universes.Universe10.StringType == node.definition().key()
            && (typeof node.value() == "string")
            && node.value().indexOf("[") == 0
            && node.value().lastIndexOf("]") == node.value().length - 1) {
            if (hlimpl.ASTNodeImpl.isInstance(nodeParent) &&
                universes.Universe10.ObjectTypeDeclaration.properties.properties.name == nodeParent.property().nameId()) {
                if (hlimpl.ASTNodeImpl.isInstance(nodeParent.parent()) &&
                    universes.Universe10.ObjectTypeDeclaration == nodeParent.parent().definition().key()) {
                    var cleanedValue = node.value().substr(1, node.value().length - 2);
                    validateRegexp(cleanedValue, v, node);
                }
            }
        }
        if (pr.isReference() || pr.isDescriminator()) {
            new DescriminatorOrReferenceValidator().validate(node, v);
        }
        else {
            new NormalValidator().validate(node, v);
        }
    };
    return CompositePropertyValidator;
}());
function isValid(t, h, value, p, attr) {
    if (t.hasArrayInHierarchy()) {
        return isValidArray(t, h, value, p, attr);
    }
    else if (t.hasValueTypeInHierarchy()) {
        return isValidValueType(t, h, value, p, attr);
    }
    return true;
}
exports.isValid = isValid;
function isValidArray(t, h, v, p, attr) {
    if (t.arrayInHierarchy().componentType()) {
        return isValid(t.arrayInHierarchy().componentType(), h, v, p);
    }
    return true;
}
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(messageEntry, parameters) {
        if (parameters === void 0) { parameters = {}; }
        var _this = _super.call(this) || this;
        _this.messageEntry = messageEntry;
        _this.parameters = parameters;
        _this.isWarning = false;
        _this.getClassIdentifier = ValidationError.prototype.getClassIdentifier;
        return _this;
    }
    ValidationError.isInstance = function (instance) {
        return instance != null && instance.getClassIdentifier
            && typeof (instance.getClassIdentifier) == "function"
            && _.contains(instance.getClassIdentifier(), ValidationError.CLASS_IDENTIFIER_ValidationError);
    };
    ValidationError.prototype.getClassIdentifier = function () {
        var superIdentifiers = [];
        return superIdentifiers.concat(ValidationError.CLASS_IDENTIFIER_ValidationError);
    };
    ValidationError.CLASS_IDENTIFIER_ValidationError = "linter.ValidationError";
    return ValidationError;
}(Error));
function isValidValueType(t, h, v, p, attr) {
    //FIXME
    try {
        if (t.key() == universes.Universe10.AnnotationRef) {
            var targets = search.referenceTargets(p, h);
            var actualAnnotation = _.find(targets, function (x) { return hlimpl.qName(x, h) == v; });
            if (actualAnnotation != null) {
                var attrs = actualAnnotation.attributes("allowedTargets");
                if (attrs) {
                    var aVals = attrs.map(function (x) { return x.value(); });
                    if (aVals.length > 0) {
                        var found = false;
                        //no we should actually check that we are applying annotation properly
                        var tps = h.definition().allSuperTypes();
                        tps = tps.concat([h.definition()]);
                        var tpNames = tps.map(function (x) { return x.nameId(); });
                        aVals.forEach(function (x) {
                            //FIXME this is deeply wrong code
                            if (x == "API") {
                                x = "Api";
                            }
                            if (x == "NamedExample") {
                                x = "ExampleSpec";
                            }
                            if (x == "SecurityScheme") {
                                x = "AbstractSecurityScheme";
                            }
                            if (x == "SecuritySchemeSettings") {
                                x = "SecuritySchemeSettings";
                            }
                            if (_.find(tpNames, function (y) { return y == x; })) {
                                found = true;
                            }
                            else {
                                if (x == "Parameter") {
                                    if (h.computedValue("location")) {
                                        found = true;
                                    }
                                }
                                if (x == "Field") {
                                    if (h.computedValue("field")) {
                                        found = true;
                                    }
                                }
                            }
                        });
                        if (!found) {
                            var list = aVals.map(function (x) { return "'" + x + "'"; }).join(", ");
                            return new ValidationError(messageRegistry.INVALID_ANNOTATION_LOCATION, { aName: v, aValues: list });
                        }
                    }
                }
            }
            return tm;
        }
        if (t.key() == universes.Universe08.SchemaString || t.key() == universes.Universe10.SchemaString) {
            var isTypeProp = false;
            if (def.UserDefinedProp.isInstance(p)) {
                var udp = p;
                var src = udp.node();
                if (src) {
                    var srcProp = src.property();
                    if (srcProp) {
                        isTypeProp = universeHelpers.isTypeProperty(srcProp) || universeHelpers.isSchemaProperty(srcProp);
                    }
                }
            }
            if (isTypeProp) {
                return false;
            }
            var isJSONorXML = v && v.trim().length > 0
                && (v.trim().charAt(0) == "{" || v.trim().charAt(0) == "<");
            var tm = su.createSchema(v, contentProvider(h.lowLevel(), attr && attr.lowLevel()));
            if (!tm) {
                return tm;
            }
            else if (tm instanceof Error) {
                tm.isWarning = true;
                if (!isJSONorXML) {
                    tm.canBeRef = true;
                }
            }
            else {
                var isJSON = false;
                try {
                    JSON.parse(v);
                    isJSON = true;
                }
                catch (e) { }
                ;
                if (isJSON) {
                    try {
                        tm.validateSelf();
                    }
                    catch (e) {
                        e['isWarning'] = true;
                        return e;
                    }
                }
            }
            return tm;
        }
        if (t.key() == universes.Universe08.StatusCodeString || t.key() == universes.Universe10.StatusCodeString) {
            var err = validateResponseString('' + v);
            if (err != null) {
                return err;
            }
        }
        if (t.key() == universes.Universe08.BooleanType || t.isAssignableFrom(universes.Universe10.BooleanType.name)) {
            if (!(v === 'true' || v === 'false' || v === true || v === false)) {
                return new ValidationError(messageRegistry.BOOLEAN_EXPECTED);
            }
            if (attr) {
                var stringValue = attr.lowLevel().value(true);
                if (!(stringValue === 'true' || stringValue === 'false')) {
                    return new ValidationError(messageRegistry.BOOLEAN_EXPECTED);
                }
            }
        }
        if (t.key() == universes.Universe08.NumberType || t.isAssignableFrom(universes.Universe10.NumberType.name)) {
            var q = parseFloat(v);
            if (isNaN(q)) {
                return new ValidationError(messageRegistry.NUMBER_EXPECTED, { propName: p.nameId() });
            }
        }
        if (t.key() == universes.Universe08.StringType || t.isAssignableFrom(universes.Universe10.StringType.name)) {
            if (v === null) {
                //checking if there is at least something in the node.
                //We have many tests and APIs with the text like 'propertyName:' without a value. I do not know if such cases are
                //actually valid, but not reporting this for now.
                if (h && p) {
                    var highLevelProperty = h.attr(p.nameId());
                    if (highLevelProperty && !highLevelProperty.isAnnotatedScalar()) {
                        var lowLevelChildren = highLevelProperty.lowLevel().children();
                        if (lowLevelChildren && lowLevelChildren.length > 0) {
                            return new ValidationError(messageRegistry.INVALID_PROPERTY_RANGE, { propName: p.nameId(), range: "string" });
                        }
                    }
                }
            }
        }
        return true;
    }
    catch (e) {
        e.canBeRef = true; //FIXME
        return e;
    }
}
var NormalValidator = /** @class */ (function () {
    function NormalValidator() {
    }
    NormalValidator.prototype.validate = function (node, cb) {
        var vl = node.value();
        var pr = node.property();
        var range = pr.range();
        var dnode = range.getAdapter(services.RAMLService).getDeclaringNode();
        if (dnode && range.isUserDefined()) {
            var rof = dnode.parsedType();
            var dp = node.parent().lowLevel().dumpToObject();
            var tempVal = dp[node.parent().name()];
            var isVal = pr.canBeValue();
            var val = (isVal || (tempVal === null || tempVal === undefined)) ? tempVal : tempVal[pr.nameId()];
            var validateObject = rof.validate(val, true);
            if (!validateObject.isOk()) {
                validateObject.getErrors().forEach(function (e) { return cb.accept(createIssue(e.getCode(), e.getMessage(), node, false)); });
            }
        }
        var v = cb;
        if (node.lowLevel().keyKind() != yaml.Kind.SEQ) {
            var validation = isValid(pr.range(), node.parent(), vl, pr, node);
        }
        else {
            validation = true;
        }
        if (validation instanceof Error) {
            if (!validation.canBeRef) {
                if (ValidationError.isInstance(validation)) {
                    v.accept(createIssue2(validation, node));
                }
                else {
                    v.accept(createIssue1(messageRegistry.SCHEMA_EXCEPTION, { msg: validation.message }, node, validation.isWarning));
                }
                validation = null;
                return;
            }
        }
        if (!validation || validation instanceof Error) { //FIXME
            if (pr.nameId() != 'value') { //FIXME
                if (!checkReference(pr, node, vl, v)) {
                    if (pr.nameId() == universes.Universe10.TypeDeclaration.properties.schema.name
                        || universes.Universe10.TypeDeclaration.properties.type.name) {
                        if (vl && vl.trim() && (pr.domain().key() == universes.Universe08.BodyLike
                            || pr.domain().key() == universes.Universe10.TypeDeclaration)) {
                            var testSchema = vl.trim().charAt(0); //FIXME
                            if (testSchema != '{' && testSchema != '<') {
                                return;
                            }
                        }
                        //return ;//
                    }
                    var decl = node.findReferencedValue();
                    if (decl instanceof Error) {
                        var c = node.findReferenceDeclaration();
                        if (c) {
                            var resultingIssue = void 0;
                            var trace = void 0;
                            if (ValidationError.isInstance(decl)) {
                                var ve = decl;
                                resultingIssue = createIssue2(ve, c);
                                trace = createIssue1(ve.messageEntry, ve.parameters, node);
                            }
                            else {
                                resultingIssue = createIssue1(messageRegistry.SCHEMA_EXCEPTION, { msg: decl.message }, c);
                                trace = createIssue1(messageRegistry.SCHEMA_EXCEPTION, { msg: decl.message }, node);
                            }
                            resultingIssue.extras.push(trace);
                            v.accept(resultingIssue);
                        }
                    }
                    if (!decl) {
                        if (vl) {
                            if (pr.nameId() == universes.Universe10.TypeDeclaration.properties.schema.name) {
                                var z = vl.trim();
                                if (z.charAt(0) != '{' && z.charAt(0) != '<') {
                                    if (vl.indexOf('|') != -1 || vl.indexOf('[]') != -1 || vl.indexOf("(") != -1) {
                                        return;
                                    }
                                }
                            }
                        }
                        if (validation instanceof Error && vl) {
                            if (ValidationError.isInstance(validation)) {
                                v.accept(createIssue2(validation, node));
                            }
                            else {
                                v.accept(createIssue1(messageRegistry.SCHEMA_EXCEPTION, { msg: validation.message }, node));
                            }
                            validation = null;
                            return;
                        }
                        if (node.property().isRequired() && node.value() == null) {
                            v.accept(createIssue1(messageRegistry.EMPTY_VALUE_NOT_ALLOWED, {}, node));
                        }
                        else {
                            var ck = node.lowLevel().valueKind();
                            if (ck == yaml.Kind.MAP || ck == yaml.Kind.SEQ || ck == yaml.Kind.MAPPING) {
                                v.accept(createIssue1(messageRegistry.EMPTY_VALUE_NOT_ALLOWED, {}, node));
                            }
                        }
                    }
                }
            }
            else {
                var toWarning = pr.range().key() == universes.Universe08.SchemaString;
                if (validation instanceof Error) {
                    var message = validation.message;
                    if (!checkIfIncludeTagIsMissing(node, v, messageRegistry.SCHEMA_ERROR.code, toWarning)) {
                        v.accept(createIssue1(messageRegistry.SCHEMA_ERROR, { msg: message }, node, toWarning));
                    }
                }
                else {
                    var vl = node.value();
                    v.accept(createIssue1(messageRegistry.INVALID_VALUE_SCHEMA, { iValue: vl }, node, toWarning));
                }
            }
        }
        var values = pr.enumOptions();
        if (values) {
            var apiDef = node.parent() && node.parent().definition();
            var isApi10 = apiDef && apiDef.isAssignableFrom(universes.Universe10.Api.name);
            var isApi08 = apiDef && apiDef.isAssignableFrom(universes.Universe08.Api.name);
            var isProtocols08 = pr.nameId() === universes.Universe08.Api.properties.protocols.name;
            var isProtocols10 = pr.nameId() === universes.Universe10.Api.properties.protocols.name;
            if (typeof vl !== 'string') {
                return;
            }
            if (((isApi08 || isApi10) && (isProtocols08 || isProtocols10)) && !isMixedCase(vl)) {
                vl = vl.toUpperCase();
            }
            if (typeof values == 'string') {
                if (values != vl) {
                    if (vl && (vl.indexOf("x-") == 0) && pr.nameId() == universes.Universe08.AbstractSecurityScheme.properties.type.name) { //Some magic I copied a from a couple of lines below @Denis
                        //return true;
                    }
                    else {
                        v.accept(createIssue1(messageRegistry.INVALID_VALUE, { iValue: vl,
                            aValues: "'" + values + "'" }, node));
                    }
                }
            }
            else if (values.length > 0) {
                if (!_.find(values, function (x) { return x == vl; })) {
                    if (vl && (vl.indexOf("x-") == 0) && pr.nameId() == universes.Universe08.AbstractSecurityScheme.properties.type.name) { //FIXME move to def system
                        //return true;
                    }
                    else {
                        v.accept(createIssue1(messageRegistry.INVALID_VALUE, { iValue: vl,
                            aValues: values.map(function (x) { return "'" + x + "'"; }).join(", ") }, node));
                    }
                }
            }
        }
    };
    return NormalValidator;
}());
function isMixedCase(input) {
    if (!input) {
        return false;
    }
    var lowerCase = input.toLowerCase();
    var upperCase = input.toUpperCase();
    if (!(input === lowerCase || input === upperCase)) {
        return true;
    }
    return false;
}
var UriValidator = /** @class */ (function () {
    function UriValidator() {
    }
    UriValidator.prototype.validate = function (node, cb) {
        try {
            var values = new UrlParameterNameValidator().parseUrl(node.value() || '');
            if (values.some(function (x) { return x == "version"; }) && node.property().nameId() == "baseUri") {
                var version = node.root().attr("version");
                if (!version) {
                    cb.accept(createIssue1(messageRegistry.MISSING_VERSION, {}, node, false));
                }
            }
            if (values.some(function (x) { return x.length == 0; })) {
                cb.accept(createIssue1(messageRegistry.URI_PARAMETER_NAME_MISSING, {}, node, false));
            }
        }
        catch (e) {
            cb.accept(createIssue1(messageRegistry.URI_EXCEPTION, { msg: e.message }, node, false));
        }
    };
    return UriValidator;
}());
var MediaTypeValidator = /** @class */ (function () {
    function MediaTypeValidator() {
    }
    MediaTypeValidator.prototype.validate = function (node, cb) {
        try {
            var v = node.value();
            if (v == "body") {
                if (node.parent().parent()) {
                    var ppc = node.parent().parent().definition().key();
                    if (ppc === universes.Universe08.Response || ppc === universes.Universe10.Response ||
                        node.parent().parent().definition().isAssignableFrom(universes.Universe10.MethodBase.name)) {
                        v = node.parent().computedValue("mediaType");
                    }
                }
            }
            if (typeOfContainingTemplate(node) != null) {
                if ((typeof v === "string") && v.indexOf("<<") >= 0) {
                    return;
                }
            }
            var res = expander.parseMediaType(v);
            if (!res) {
                return;
            }
            //check if type name satisfies RFC6338
            if (!res.type.match(/[\w\d][\w\d!#\$&\-\^_+\.]*/)) {
                cb.accept(createIssue1(messageRegistry.INVALID_MEDIATYPE, { mediaType: res.type }, node));
            }
        }
        catch (e) {
            cb.accept(createIssue1(messageRegistry.MEDIATYPE_EXCEPTION, { msg: e.message }, node));
        }
        if (node.value() && node.value() == ("multipart/form-data") || node.value() == ("application/x-www-form-urlencoded")) {
            if (node.parent() && node.parent().parent() && node.parent().parent().property()) {
                if (node.parent().parent().property().nameId() == universes.Universe10.MethodBase.properties.responses.name) {
                    cb.accept(createIssue1(messageRegistry.FORM_IN_RESPONSE, {}, node, true));
                }
            }
        }
        return;
    };
    return MediaTypeValidator;
}());
//class SignatureValidator implements PropertyValidator{
//    validate(node:hl.IAttribute,cb:hl.ValidationAcceptor){
//        var vl=node.value();
//        var q = vl?vl.trim():"";
//        if (q.length > 0 ) {
//            try {
//                //ramlSignature.validate(vl, node, cb);
//            }catch (e){
//                cb.accept(createIssue(hl.IssueCode.INVALID_VALUE_SCHEMA,"Error during signature parse: "+e.message,node))
//            }
//            return;
//        }
//        return;
//    }
//}
var UrlParameterNameValidator = /** @class */ (function () {
    function UrlParameterNameValidator() {
    }
    UrlParameterNameValidator.prototype.checkBaseUri = function (node, c, vl, v) {
        var bu = c.root().attr("baseUri");
        if (bu) {
            var tnv = bu.value();
            try {
                var pNames = this.parseUrl(tnv);
                if (!_.find(pNames, function (x) { return x == vl; })) {
                    v.accept(createIssue1(messageRegistry.UNUSED_URL_PARAMETER, { paramName: "" }, node));
                }
            }
            catch (e) {
            }
        }
        else {
            v.accept(createIssue1(messageRegistry.UNUSED_URL_PARAMETER, { paramName: "" }, node));
        }
    };
    UrlParameterNameValidator.prototype.parseUrl = function (value) {
        var result = [];
        var temp = "";
        var inPar = false;
        var count = 0;
        for (var a = 0; a < value.length; a++) {
            var c = value[a];
            if (c == '{') {
                count++;
                inPar = true;
                continue;
            }
            if (c == '}') {
                count--;
                inPar = false;
                result.push(temp);
                temp = "";
                continue;
            }
            if (inPar) {
                temp += c;
            }
        }
        if (count > 0) {
            throw new Error(applyTemplate(messageRegistry.INVALID_RESOURCE_NAME_UNMATCHED_SYMBOL, { symbol: "{" }));
        }
        if (count < 0) {
            throw new Error(applyTemplate(messageRegistry.INVALID_RESOURCE_NAME_UNMATCHED_SYMBOL, { symbol: "}" }));
        }
        return result;
    };
    UrlParameterNameValidator.prototype.validate = function (node, cb) {
        var vl = node.value();
        if (node.parent().property().nameId() == universes.Universe10.Api.properties.baseUri.name) {
            var c = node.parent().parent();
            this.checkBaseUri(node, c, vl, cb);
            return;
        }
        var c = node.parent().parent();
        var tn = c.name();
        if (c.definition().key() === universes.Universe10.Api ||
            c.definition().key() === universes.Universe08.Api) {
            this.checkBaseUri(node, c, vl, cb);
            return;
        }
        if (c.definition().key() == universes.Universe10.ResourceType ||
            c.definition().key() == universes.Universe08.ResourceType) {
            return;
        }
        try {
            var pNames = this.parseUrl(tn);
            var foundInLocalParameters = _.find(pNames, function (x) { return x == vl; });
            if (!foundInLocalParameters) {
                var baseUri = node.root().attr(universes.Universe10.Api.properties.baseUri.name);
                if (baseUri && node.name() === universes.Universe08.Api.properties.baseUriParameters.name) {
                    var baseUriValue = baseUri.value();
                    if (baseUriValue) {
                        pNames = this.parseUrl(baseUriValue);
                        if (pNames && pNames.length > 0) {
                            if (_.find(pNames, function (x) { return x == vl; }))
                                return;
                        }
                    }
                }
                cb.accept(createIssue1(messageRegistry.UNUSED_URL_PARAMETER, { paramName: "'" + vl + "'" }, node));
            }
        }
        catch (e) {
        }
    };
    return UrlParameterNameValidator;
}());
exports.UrlParameterNameValidator = UrlParameterNameValidator;
//TODO this should be probably moved to a more general file/module
exports.typeToName = {};
exports.typeToName[universes.Universe08.Trait.name] = "trait";
exports.typeToName[universes.Universe08.ResourceType.name] = "resource type";
exports.typeToName[universes.Universe10.Trait.name] = "trait";
exports.typeToName[universes.Universe10.ResourceType.name] = "resource type";
exports.typeToName[universes.Universe10.AbstractSecurityScheme.name] = "security scheme";
exports.typeToName[universes.Universe10.Method.name] = "method";
exports.typeToName[universes.Universe08.Method.name] = "method";
exports.typeToName[universes.Universe10.Resource.name] = "resource";
exports.typeToName[universes.Universe08.Resource.name] = "resource";
exports.typeToName[universes.Universe10.Api.name] = "api";
exports.typeToName[universes.Universe08.Api.name] = "api";
exports.typeToName[universes.Universe10.Response.name] = "response";
exports.typeToName[universes.Universe08.Response.name] = "response";
exports.typeToName[universes.Universe08.BodyLike.name] = "body";
exports.parameterPropertyToName = {};
exports.parameterPropertyToName[universes.Universe08.MethodBase.properties.headers.name] = "header";
exports.parameterPropertyToName[universes.Universe08.MethodBase.properties.queryParameters.name] = "query parameter";
exports.parameterPropertyToName[universes.Universe08.Api.properties.uriParameters.name] = "uri parameter";
exports.parameterPropertyToName[universes.Universe08.Api.properties.baseUriParameters.name] = "base uri parameter";
exports.parameterPropertyToName[universes.Universe08.BodyLike.properties.formParameters.name] = "form parameter";
exports.parameterPropertyToName[universes.Universe10.MethodBase.properties.headers.name] = "header";
exports.parameterPropertyToName[universes.Universe10.MethodBase.properties.queryParameters.name] = "query parameter";
exports.parameterPropertyToName[universes.Universe10.ResourceBase.properties.uriParameters.name] = "uri parameter";
exports.parameterPropertyToName[universes.Universe10.Api.properties.baseUriParameters.name] = "base uri parameter";
exports.parameterPropertyToName[universes.Universe10.MethodBase.properties.body.name] = "body";
function getHumanReadableNodeName(astNode) {
    if (!astNode)
        return null;
    if (astNode.isElement()) {
        var element = astNode;
        var definition = element.definition();
        if (definition && exports.typeToName.hasOwnProperty(definition.nameId())) {
            return exports.typeToName[definition.nameId()];
        }
        if (definition.isAssignableFrom(universes.Universe10.TypeDeclaration.name) ||
            definition.isAssignableFrom(universes.Universe08.Parameter.name)) {
            if (element.property() && exports.parameterPropertyToName.hasOwnProperty(element.property().nameId())) {
                return exports.parameterPropertyToName[element.property().nameId()];
            }
            if (element.property() && element.parent() &&
                element.property().nameId() == universes.Universe10.LibraryBase.properties.types.name &&
                element.parent().definition() && element.parent().definition().isAssignableFrom(universes.Universe10.LibraryBase.name)) {
                return "type";
            }
            if (element.property() && element.parent() &&
                element.property().nameId() == universes.Universe10.LibraryBase.properties.securitySchemes.name &&
                element.parent().definition() && element.parent().definition().isAssignableFrom(universes.Universe10.LibraryBase.name)) {
                return "security scheme";
            }
        }
    }
    return null;
}
exports.getHumanReadableNodeName = getHumanReadableNodeName;
function isValidPropertyValue(pr, vl, c) {
    var node = search.declRoot(c);
    if (proxy.LowLevelProxyNode.isInstance(c.lowLevel())) {
        c = node;
    }
    if (!node._cach) {
        node._cach = {};
    }
    var id = pr.id();
    if (pr.domain()) {
        id += pr.domain().nameId();
    }
    if (id) {
        var cached = node._cach[id];
        if (cached) {
            return cached[vl] != null;
        }
    }
    var vls = search.enumValues(pr, c);
    var mm = {};
    vls.forEach(function (x) { return mm[x] = 1; });
    if (pr.id()) {
        node._cach[id] = mm;
    }
    return mm[vl] != null;
}
function checkReference(pr, astNode, vl, cb) {
    var paramStart = (typeof vl === "string") ? vl.indexOf("<<") : -1;
    if (paramStart >= 0 && vl.indexOf(">>", paramStart) >= 0 && typeOfContainingTemplate(astNode) != null) {
        return;
    }
    checkTraitReference(pr, astNode, cb);
    checkResourceTypeReference(pr, astNode, cb);
    if (!vl) {
        return;
    }
    if (vl == 'null') {
        if (pr.isAllowNull()) {
            return;
        }
    }
    var adapter = pr.getAdapter(services.RAMLPropertyService);
    var parentNode = astNode.parent();
    var valid = false;
    var hasChaining = proxy.LowLevelCompositeNode.isInstance(astNode.lowLevel())
        && astNode.lowLevel().getMeta("chaining");
    if (!hasChaining) {
        valid = isValidPropertyValue(pr, vl, parentNode);
        if (!valid && astNode.lowLevel().unit().absolutePath() !== parentNode.lowLevel().unit().absolutePath()) {
            valid = isValidPropertyValue(pr, vl, hlimpl.fromUnit(astNode.lowLevel().unit()));
        }
    }
    if (!valid) {
        if (typeof vl == 'string') {
            if ((vl.indexOf("x-") == 0) && pr.nameId() == universes.Universe10.TypeDeclaration.properties.type.name) { //FIXME move to def system
                return true;
            }
        }
        var expected = (adapter.isReference && adapter.isReference() && adapter.referencesTo && adapter.referencesTo() && adapter.referencesTo().nameId && adapter.referencesTo().nameId());
        var referencedToName = exports.typeToName[expected] || nameForNonReference(astNode);
        var parameters = {
            referencedToName: referencedToName,
            ref: vl,
            typeName: vl
        };
        var code = referencedToName ? messageRegistry.UNRECOGNIZED_ELEMENT
            : messageRegistry.UNRESOLVED_REFERENCE;
        var spesializedMessage = specializeReferenceError(code, pr, astNode, vl);
        var toWarning = pr.range().key() === universes.Universe08.SchemaString;
        if (!checkIfIncludeTagIsMissing(astNode, cb, spesializedMessage.code, toWarning)) {
            cb.accept(createIssue1(spesializedMessage, parameters, astNode, toWarning));
        }
        return true;
    }
    if (isDuplicateSibling(astNode) && universeHelpers.isTraitRefType(astNode.definition())) {
        cb.accept(createIssue1(messageRegistry.DUPLICATE_TRAIT_REFERENCE, { refValue: vl }, astNode));
        return true;
    }
    return false;
}
function isDuplicateSibling(attr) {
    var ramlVersion = attr.property().domain().universe().version();
    var siblingName;
    if (ramlVersion == "RAML10") {
        siblingName = stringify(json.serialize(attr.lowLevel()));
    }
    else {
        siblingName = attr.value() && attr.value().valueName && attr.value().valueName();
    }
    if (!siblingName) {
        return false;
    }
    var parent = attr.parent && attr.parent();
    if (!parent) {
        return false;
    }
    var propertyName = attr.name && attr.name();
    if (!propertyName) {
        return false;
    }
    var siblings = parent.attributes && parent.attributes(propertyName);
    if (!siblings) {
        return false;
    }
    if (siblings.length === 0) {
        return false;
    }
    var count = 0;
    siblings.forEach(function (sibling) {
        var name;
        if (ramlVersion == "RAML10") {
            siblingName = stringify(json.serialize(sibling.lowLevel()));
        }
        else {
            name = sibling.value && sibling.value() && sibling.value().valueName && sibling.value().valueName();
        }
        if (name === siblingName) {
            count++;
        }
    });
    return count > 1;
}
function checkTraitReference(property, astNode, acceptor) {
    //"is" property value must be an array
    if (!universeHelpers.isIsProperty(property)) {
        return;
    }
    var lowLevel = astNode.lowLevel();
    if (lowLevel == null) {
        return;
    }
    //trying to find "is" mapping, looking 2 nodes up max
    var isMappingNode = null;
    var lowLevelParent = lowLevel.parent();
    var lowLevelParentParent = lowLevelParent != null ? lowLevelParent.parent() : null;
    if (lowLevel.kind() == yaml.Kind.MAPPING && lowLevel.key() && lowLevel.key() == "is") {
        isMappingNode = lowLevel;
    }
    else if (lowLevelParent != null &&
        lowLevelParent.kind() == yaml.Kind.MAPPING && lowLevelParent.key() && lowLevelParent.key() == "is") {
        isMappingNode = lowLevelParent;
    }
    else if (lowLevelParentParent != null &&
        lowLevelParentParent.kind() == yaml.Kind.MAPPING && lowLevelParentParent.key() && lowLevelParentParent.key() == "is") {
        isMappingNode = lowLevelParentParent;
    }
    if (isMappingNode == null) {
        return;
    }
    //having a single value is bad
    if (isMappingNode.value() != null && (!isMappingNode.children() || isMappingNode.children().length == 0)) {
        acceptor.accept(createIssue1(messageRegistry.IS_IS_ARRAY, {}, astNode));
    }
    //only maps and scalars are allowed as direct children
    var illegalChildFound = false;
    isMappingNode.children().forEach(function (child) {
        if (child.kind() != yaml.Kind.SCALAR && child.kind() != yaml.Kind.MAP) {
            illegalChildFound = true;
        }
    });
    if (illegalChildFound) {
        acceptor.accept(createIssue1(messageRegistry.IS_IS_ARRAY, {}, astNode));
    }
}
function checkResourceTypeReference(property, astNode, acceptor) {
    if (!universeHelpers.isTypeProperty(property)) {
        return;
    }
    if (!universeHelpers.isResourceTypeRefType(astNode.definition())) {
        return;
    }
    var lowLevel = astNode.lowLevel();
    if (astNode.value() == null && lowLevel && lowLevel.children() &&
        lowLevel.children().length == 0) {
        if (lowLevel.kind() == yaml.Kind.MAPPING && lowLevel.valueKind() != null) {
            //no value, no children in the mapping, but some value, that means empty map or something like this.
            acceptor.accept(createIssue1(messageRegistry.RESOURCE_TYPE_NAME, {}, astNode));
        }
    }
    else if (astNode.value() == null && lowLevel && lowLevel.children() &&
        lowLevel.children().length > 1) {
        //more than a single resource type in a list / map
        acceptor.accept(createIssue1(messageRegistry.MULTIPLE_RESOURCE_TYPES, {}, astNode));
    }
}
/**
 * Sometimes we need a more specialized message for the bad references, which diviate from a general algorithm.
 * Like listing possible values etc.
 * This method is responsible for such cases.
 * @param originalMessage
 * @param pr
 * @param astNode
 * @returns {string}
 */
function specializeReferenceError(originalMessage, property, astNode, value) {
    if (property.nameId() == "type" && property.domain().universe().version() == "RAML08") {
        if (property.domain().isAssignableFrom(universes.Universe08.Parameter.name)) {
            return messageRegistry.TYPES_VARIETY_RESTRICTION;
        }
    }
    if (astNode.parent() != null && universeHelpers.isSecuritySchemaType(astNode.parent().definition())) {
        return messageRegistry.UNRECOGNIZED_SECURITY_SCHEME;
    }
    if (universeHelpers.isAnnotationsProperty(property)) {
        var hasChaining = proxy.LowLevelCompositeNode.isInstance(astNode.lowLevel())
            && astNode.lowLevel().getMeta("chaining");
        var typeCollction = astNode.parent().types();
        var reg = typeCollction && typeCollction.getAnnotationTypeRegistry();
        if (hasChaining || reg && reg.getByChain(value)) {
            return messageRegistry.LIBRARY_CHAINIG_IN_ANNOTATION_TYPE;
        }
        else {
            return messageRegistry.UNKNOWN_ANNOTATION_TYPE;
        }
    }
    return originalMessage;
}
function nameForNonReference(astNode) {
    var propertyName = astNode && astNode.lowLevel() && astNode.lowLevel().key();
    if (propertyName === universes.Universe10.AbstractSecurityScheme.properties.type.name) {
        var domain = astNode.parent() && astNode.parent().definition() && astNode.parent().definition().nameId();
        if (domain === universes.Universe10.AbstractSecurityScheme.name) {
            return "security scheme type";
        }
    }
    else if (propertyName === universes.Universe08.BodyLike.properties.schema.name) {
        var domain = astNode.parent() && astNode.parent().definition() && astNode.parent().definition().nameId();
        if (domain === universes.Universe08.BodyLike.name) {
            return "schema";
        }
    }
}
var DescriminatorOrReferenceValidator = /** @class */ (function () {
    function DescriminatorOrReferenceValidator() {
    }
    DescriminatorOrReferenceValidator.prototype.validate = function (node, cb) {
        var vl = node.value();
        var valueKey = vl;
        var pr = node.property();
        if (typeof vl == 'string') {
            checkReference(pr, node, vl, cb);
            if (def.ReferenceType.isInstance(pr.range())) {
                var t = pr.range();
                if (true) {
                    var mockNode = jsyaml.createNode("" + vl, node.lowLevel().parent(), node.lowLevel().unit());
                    mockNode._actualNode().startPosition = node.lowLevel().valueStart();
                    mockNode._actualNode().endPosition = node.lowLevel().valueEnd();
                    var stv = new hlimpl.StructuredValue(mockNode, node.parent(), node.property());
                    var hn = stv.toHighLevel();
                    if (hn) {
                        hn.validate(cb);
                    }
                }
            }
        }
        else if (hlimpl.StructuredValue.isInstance(vl)) {
            var st = vl;
            if (st) {
                valueKey = st.valueName();
                var vn = st.valueName();
                if (!checkReference(pr, node, vn, cb)) {
                    var hnode = st.toHighLevel();
                    if (hnode)
                        hnode.validate(cb);
                }
            }
            else {
                valueKey = null;
            }
        }
        else if (typeof (vl) === "number" || typeof (vl) === "boolean") {
            if (node.definition().isAssignableFrom(universes.Universe10.Reference.name)) {
                checkReference(pr, node, vl + '', cb);
            }
        }
        else {
            //there is no value, but still a reference: calling checkReference with null value
            if (node.definition().isAssignableFrom(universes.Universe10.Reference.name)) {
                checkReference(pr, node, null, cb);
            }
        }
        if (valueKey) {
            var validation = isValid(pr.range(), node.parent(), valueKey, pr);
            if (validation instanceof Error) {
                if (ValidationError.isInstance(validation)) {
                    cb.accept(createIssue2(validation, node));
                }
                else {
                    cb.accept(createIssue1(messageRegistry.SCHEMA_EXCEPTION, { msg: validation.message }, node, validation.isWarning));
                }
                validation = null;
            }
        }
    };
    return DescriminatorOrReferenceValidator;
}());
var allowOverride = { resources: 1, queryParameters: 1, headers: 1, body: 1, methods: 1, responses: 1 };
var RAMLVersionAndFragmentValidator = /** @class */ (function () {
    function RAMLVersionAndFragmentValidator() {
    }
    RAMLVersionAndFragmentValidator.prototype.validate = function (node, v) {
        var u = node.universe();
        var tv = u.getTypedVersion();
        if (tv) {
            if (tv !== "0.8" && tv !== "1.0") {
                var i = createIssue1(messageRegistry.UNKNOWN_RAML_VERSION, {}, node);
                v.accept(i);
            }
            var tl = u.getOriginalTopLevelText();
            if (tl) {
                var parameters = { typeName: tl };
                if (tl != node.definition().nameId()) {
                    if (node.definition().nameId() == "Api") {
                        var i = createIssue1(messageRegistry.UNKNOWN_TOPL_LEVEL_TYPE, parameters, node);
                        v.accept(i);
                    }
                }
                else if ("Api" == u.getOriginalTopLevelText()) {
                    var i = createIssue1(messageRegistry.REDUNDANT_FRAGMENT_NAME, parameters, node);
                    v.accept(i);
                }
            }
        }
    };
    return RAMLVersionAndFragmentValidator;
}());
var RequiredPropertiesAndContextRequirementsValidator = /** @class */ (function () {
    function RequiredPropertiesAndContextRequirementsValidator() {
    }
    RequiredPropertiesAndContextRequirementsValidator.prototype.validate = function (node, v) {
        var _this = this;
        (node.definition()).getAdapter(services.RAMLService).getContextRequirements().forEach(function (x) {
            if (!node.checkContextValue(x.name, x.value, x.value)) {
                var parameters = { v1: x.name, v2: x.value, v3: node.definition().nameId() };
                var messageEntry = messageRegistry.CONTEXT_REQUIREMENT_VIOLATION;
                if (x.name == 'location' && x.value == "ParameterLocation.FORM") {
                    messageEntry = messageRegistry.WEB_FORMS;
                }
                v.accept(createIssue1(messageEntry, parameters, node));
            }
        });
        var t;
        var isInlinedTemplate = node.definition().getAdapter(services.RAMLService).isInlinedTemplates();
        if (isInlinedTemplate) {
            var paramsMap = {};
            for (var _i = 0, _a = node.lowLevel().children(); _i < _a.length; _i++) {
                var ch = _a[_i];
                paramsMap[ch.key()] = ch.value(true);
            }
            var templateKind = node.definition().isAssignableFrom(universes.Universe10.Trait.name) ? "trait" : "resource type";
            var unitsChain = expander.toUnits(node.lowLevel());
            var vt = new expander.ValueTransformer(templateKind, node.definition().nameId(), unitsChain, paramsMap);
            var parent = node.parent();
            var def = parent ? parent.definition() : node.definition();
            while (parent != null && !universeHelpers.isResourceType(def) && !universeHelpers.isMethodType(def)) {
                parent = parent.parent();
            }
            t = new expander.DefaultTransformer(parent, vt, unitsChain);
        }
        node.definition().requiredProperties().forEach(function (x) {
            if (isInlinedTemplate) {
                var paths = x.getAdapter(services.RAMLPropertyService).meta("templatePaths");
                if (paths) {
                    var parent = node.parent();
                    var hasSufficientChild = false;
                    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                        var path = paths_1[_i];
                        path = path.map(function (x) { return t.transform(x).value; });
                        if (_this.checkPathSufficiency(parent.lowLevel(), path, parent)) {
                            hasSufficientChild = true;
                            break;
                        }
                    }
                    if (!hasSufficientChild) {
                        return;
                    }
                }
            }
            var r = x.range();
            if (r.hasArrayInHierarchy()) {
                r = r.arrayInHierarchy().componentType();
            }
            if (r.hasValueTypeInHierarchy()) {
                var nm = node.attr(x.nameId());
                var gotValue = false;
                if (nm != null) {
                    if (nm.lowLevel().kind() == yaml.Kind.SCALAR || nm.lowLevel().resolvedValueKind() == yaml.Kind.SCALAR) {
                        if (nm.value() != null) {
                            gotValue = true;
                        }
                    }
                    else if (nm.lowLevel().children().length != 0) {
                        gotValue = true;
                    }
                }
                if (!gotValue) {
                    var parameters = { propName: x.nameId() };
                    var messageEntry = messageRegistry.MISSING_REQUIRED_PROPERTY;
                    var issueNode = node;
                    if (isInlinedTemplate) {
                        messageEntry = messageRegistry.VALUE_NOT_PROVIDED;
                    }
                    else if (nm) {
                        messageEntry = messageRegistry.VALUE_FOR_REQUIRED_PROPERTY_NOT_PROVIDED;
                        issueNode = nm;
                    }
                    var i_1 = createIssue1(messageEntry, parameters, issueNode);
                    v.accept(i_1);
                }
            }
            else {
                var el = node.elementsOfKind(x.nameId());
                if (!el || el.length == 0) {
                    var i = createIssue1(messageRegistry.MISSING_REQUIRED_PROPERTY, { propName: x.nameId() }, node);
                    v.accept(i);
                }
            }
        });
    };
    RequiredPropertiesAndContextRequirementsValidator.prototype.checkPathSufficiency = function (node, path, hlParent) {
        if (hlParent == null || hlParent.definition() == null) {
            return false;
        }
        var definition = hlParent.definition();
        if (universeHelpers.isResourceTypeType(definition) || universeHelpers.isTraitType(definition)) {
            return true;
        }
        if (path.length == 0) {
            return false;
        }
        if (node == null) {
            return false;
        }
        var segment = path[0];
        if (segment == null) {
            return false;
        }
        if (segment == "/") {
            return this.checkPathSufficiency(node, path.slice(1), hlParent);
        }
        if (segment.length == 0) {
            return true;
        }
        var children = node.children().filter(function (x) { return x.key() == segment; });
        if (children.length == 0) {
            path.indexOf("/") < 0;
        }
        var lowLevel = children[0];
        if (proxy.LowLevelCompositeNode.isInstance(lowLevel)) {
            lowLevel = lowLevel.primaryNode();
        }
        if (lowLevel == null) {
            return path.indexOf("/") < 0;
        }
        if (lowLevel.key() == "type") {
            return true;
        }
        if (path.length == 1) {
            // if(hlName==prop.nameId()&&node.definition().nameId()==prop.domain().nameId()){
            //     return true;
            // }
            return lowLevel == null || lowLevel.value() == null;
        }
        else {
            var path1 = path.slice(1);
            return this.checkPathSufficiency(lowLevel, path1, hlParent);
        }
    };
    return RequiredPropertiesAndContextRequirementsValidator;
}());
var ScalarQuoteValidator = /** @class */ (function () {
    function ScalarQuoteValidator() {
    }
    ScalarQuoteValidator.prototype.validate = function (node, v) {
        var r = node.lowLevel().unit();
        node.lowLevel().visit(function (x) {
            if (x.unit() != r) {
                return false;
            }
            if (x.value() && x._node && x._node.value) {
                if (x._node.value.doubleQuoted) {
                    var ind = (x.value() + "").indexOf(":");
                    var nl = (x.value() + "").indexOf("\n");
                    if (ind != -1 && nl != -1 && (!x.includePath() || x.includePath().length == 0)) {
                        var i = createIssue1(messageRegistry.SUSPICIOUS_DOUBLEQUOTE, { value: x.value() }, node, true);
                        i.start = x._node.value.startPosition;
                        i.end = x._node.value.endPosition;
                        if (i.start == i.end) {
                            i.end++;
                        }
                        v.accept(i);
                    }
                }
            }
            return true;
        });
    };
    return ScalarQuoteValidator;
}());
var FixedFacetsValidator = /** @class */ (function () {
    function FixedFacetsValidator() {
    }
    FixedFacetsValidator.prototype.validate = function (node, v) {
        var nc = node.definition();
        var dnode = nc.getAdapter(services.RAMLService).getDeclaringNode();
        if (dnode) {
            var rof = dnode.parsedType();
            var dp = node.lowLevel().dumpToObject(true);
            if (dp) {
                dp = dp[Object.keys(dp)[0]];
            }
            var validateObject = rof.validate(dp, false, false);
            if (!validateObject.isOk()) {
                if (universeHelpers.isAnnotationsProperty(node.property())) {
                    validateObject.getErrors().forEach(function (e) {
                        if (e.getMessage() == "nothing") {
                            var typeCollction = node.parent().types();
                            var reg = typeCollction && typeCollction.getAnnotationTypeRegistry();
                            var sVal = new hlimpl.StructuredValue(node.lowLevel(), node.parent(), node.property());
                            var aName = sVal.valueName();
                            var chained = rof.allFacets().filter(function (x) { return x.kind() == def.tsInterfaces.MetaInformationKind.ImportedByChain; });
                            if (chained.length > 0 && reg && reg.getByChain(aName)) {
                                var chainedType = chained[0].value();
                                v.accept(createIssue1(messageRegistry.LIBRARY_CHAINIG_IN_ANNOTATION_TYPE_SUPERTYPE, { typeName: aName, chainedType: chainedType }, node));
                            }
                            else {
                                v.accept(createIssue1(messageRegistry.UNKNOWN_ANNOTATION_TYPE, { typeName: aName }, node));
                            }
                        }
                        else {
                            v.accept(createIssue(e.getCode(), e.getMessage(), mapPath(node, e).node, false));
                        }
                    });
                }
                else {
                    validateObject.getErrors().forEach(function (e) { return v.accept(createIssue(e.getCode(), e.getMessage(), mapPath(node, e).node, false)); });
                }
            }
        }
    };
    return FixedFacetsValidator;
}());
var TypeDeclarationValidator = /** @class */ (function () {
    function TypeDeclarationValidator() {
        this.annotables = {
            "API": true,
            "DocumentationItem": true,
            "Resource": true,
            "Method": true,
            "Response": true,
            "RequestBody": true,
            "ResponseBody": true,
            "TypeDeclaration": true,
            "Example": true,
            "ResourceType": true,
            "Trait": true,
            "SecurityScheme": true,
            "SecuritySchemeSettings": true,
            "AnnotationType": true,
            "Library": true,
            "Overlay": true,
            "Extension": true
        };
    }
    TypeDeclarationValidator.prototype.validate = function (node, v) {
        var nc = node.definition();
        var rof = node.parsedType();
        var validateObject = rof.validateType(node.types().getAnnotationTypeRegistry());
        if (!validateObject.isOk()) {
            for (var _i = 0, _a = validateObject.getErrors(); _i < _a.length; _i++) {
                var e = _a[_i];
                var n = extractLowLevelNode(e, node.lowLevel().unit().project());
                var issue = void 0;
                var mappingResult = mapPath(node, e);
                if (mappingResult.node == node && !mappingResult.internalPathUsed) {
                    var vp = e.getValidationPath();
                    if (vp && vp.name == def.universesInfo.Universe10.TypeDeclaration.properties.type.name) {
                        if (node.attr(def.universesInfo.Universe10.TypeDeclaration.properties.schema.name)) {
                            var name_3 = vp.name;
                            vp.name = def.universesInfo.Universe10.TypeDeclaration.properties.schema.name;
                            mappingResult = mapPath(node, e);
                            vp.name = name_3;
                        }
                    }
                }
                var internalRange = mappingResult.internalPathUsed ? null : e.getInternalRange();
                if (n) {
                    issue = createLLIssue(e.getCode(), e.getMessage(), n, mappingResult.node, e.isWarning(), true, internalRange);
                    if (n.unit().absolutePath() != node.lowLevel().unit().absolutePath()) {
                        var trace = createIssue(e.getCode(), e.getMessage(), node, e.isWarning());
                        issue.extras.push(trace);
                    }
                }
                else {
                    if (e.getFilePath() && e.getFilePath() != node.lowLevel().unit().absolutePath()) {
                        var u = node.lowLevel().unit().project().unit(e.getFilePath(), true);
                        if (u) {
                            var hlNode = u.highLevel();
                            if (hlNode) {
                                issue = createIssue(e.getCode(), e.getMessage(), hlNode, e.isWarning(), internalRange, true);
                                var trace = createIssue(e.getCode(), e.getMessage(), mappingResult.node, e.isWarning());
                                issue.extras.push(trace);
                            }
                        }
                    }
                    if (!issue) {
                        if (checkIfIncludeTagIsMissing(mappingResult.node, v, e.getCode(), e.isWarning())) {
                            continue;
                        }
                        issue = createIssue(e.getCode(), e.getMessage(), mappingResult.node, e.isWarning(), internalRange);
                    }
                }
                var actualFilePath = e.getFilePath();
                if (actualFilePath != null) {
                    var actualUnit = node.lowLevel().unit().project().unit(actualFilePath);
                    if (actualUnit) {
                        issue.unit = actualUnit;
                        issue.path = actualFilePath;
                    }
                }
                v.accept(issue);
            }
            ;
        }
        if ((node.property() && universeHelpers.isAnnotationTypesProperty(node.property()))
            || hlimpl.isAnnotationTypeFragment(node)) {
            var atAttrs = node.attributes(universes.Universe10.TypeDeclaration.properties.allowedTargets.name);
            for (var _b = 0, atAttrs_1 = atAttrs; _b < atAttrs_1.length; _b++) {
                var attr = atAttrs_1[_b];
                this.checkAnnotationTarget(attr, v);
            }
        }
        if (node.property() && universeHelpers.isBodyProperty(node.property())) {
            if (rof.superTypes().length == 1 && rof.superTypes()[0] == def.rt.builtInTypes().get("any")) {
                var examples = rof.examples();
                var mediaType = getMediaType(node.attr(def.universesInfo.Universe10.TypeDeclaration.properties.name.name));
                var isJSON = isJson(mediaType);
                var isXml = isXML(mediaType);
                if (examples.length && (isJSON || isXml)) {
                    for (var _c = 0, examples_1 = examples; _c < examples_1.length; _c++) {
                        var e_1 = examples_1[_c];
                        var eVal = e_1.value();
                        if (typeof eVal === "object") {
                            continue;
                        }
                        else if (typeof eVal === "string") {
                            var eNode = void 0;
                            if (examples.length == 1) {
                                if (e_1.name() == null) {
                                    eNode = node.element("example");
                                }
                            }
                            if (!eNode) {
                                for (var _d = 0, _e = node.elementsOfKind("examples"); _d < _e.length; _d++) {
                                    var exNode = _e[_d];
                                    if (exNode.name() == null && e_1.name() == null) {
                                        if (exNode.attr("value").value() == eVal) {
                                            eNode = exNode;
                                            break;
                                        }
                                    }
                                    else if (exNode.name() == e_1.name()) {
                                        eNode = exNode;
                                        break;
                                    }
                                }
                            }
                            if (!eNode) {
                                eNode = node;
                            }
                            parseJsonOrXml(mediaType, eVal, v, eNode, false);
                        }
                    }
                }
            }
        }
    };
    TypeDeclarationValidator.prototype.checkAnnotationTarget = function (attr, v) {
        var val = attr.value();
        if (val == null) {
            return;
        }
        if (typeof (val) != "string") {
            v.accept(createIssue1(messageRegistry.ANNOTATION_TARGET_MUST_BE_A_STRING, {}, attr, false));
            return;
        }
        var str = val;
        if (val.replace(/\w|\s/g, '').length > 0) {
            v.accept(createIssue1(messageRegistry.ALLOWED_TARGETS_MUST_BE_ARRAY, {}, attr, false));
        }
        else if (!this.annotables[str]) {
            v.accept(createIssue1(messageRegistry.UNSUPPORTED_ANNOTATION_TARGET, { aTarget: str }, attr, false));
        }
    };
    return TypeDeclarationValidator;
}());
function mapPath(node, e) {
    var src = e.getValidationPath();
    var resultNode = findElementAtPath(node, src);
    var internalPath = e.getInternalPath();
    var internalPathUsed = false;
    if (internalPath) {
        var internalNode = findElementAtPath(resultNode, internalPath);
        if (internalNode && internalNode != resultNode) {
            resultNode = internalNode;
            internalPathUsed = true;
        }
    }
    return {
        node: resultNode,
        internalPathUsed: internalPathUsed
    };
}
function extractLowLevelNode(e, project) {
    var pn = e.getExtra(rtypes.SOURCE_EXTRA);
    if (hlimpl.LowLevelWrapperForTypeSystem.isInstance(pn)) {
        return pn.node();
    }
    // let filePath = e.getFilePath();
    // if(filePath){
    //     let unit = project.unit(filePath);
    //     if(unit){
    //         return unit.ast();
    //     }
    // }
    return null;
}
function findElementAtPath(n, p) {
    if (!p) {
        return n;
    }
    var chld = n.children().filter(function (ch) {
        if (ch.isAttr() && ch.asAttr().isFromKey()) {
            return false;
        }
        return ch.name() === p.name;
    });
    if (n.isElement() && universeHelpers.isTypeDeclarationDescendant(n.asElement().definition())) {
        var lNode = n.lowLevel();
        chld = _.uniq(n.directChildren().concat(n.children()))
            .filter(function (ch) {
            if (ch.isAttr() && ch.asAttr().isFromKey()) {
                return false;
            }
            return ch.name() === p.name;
        }).sort(function (x, y) {
            var ll1 = x.lowLevel().parent();
            while (ll1 && ll1.kind() != yaml.Kind.MAPPING) {
                ll1 = ll1.parent();
            }
            var ll2 = y.lowLevel().parent();
            while (ll2 && ll2.kind() != yaml.Kind.MAPPING) {
                ll2 = ll2.parent();
            }
            if (ll1 == lNode) {
                return -1;
            }
            else if (ll2 == lNode) {
                return 1;
            }
            return 0;
        });
    }
    var ind = (p.child && typeof (p.child.name) == "number") ? p.child.name : -1;
    if (ind >= 0 && chld.length > ind) {
        return findElementAtPath(chld[ind], p.child.child);
    }
    else if (chld.length > 0) {
        return findElementAtPath(chld[0], p.child);
    }
    if (!n.lowLevel()) {
        return n;
    }
    var lchld = n.lowLevel().children();
    for (var i = 0; i < lchld.length; i++) {
        if (lchld[i].key() === p.name) {
            var nn = new hlimpl.BasicASTNode(lchld[i], n);
            return findElementAtPath(nn, p.child);
        }
    }
    if (!isNaN(p.name)) {
        if (lchld[p.name]) {
            var node = lchld[p.name];
            var nn = new hlimpl.BasicASTNode(node, n);
            return findElementAtPath(nn, p.child);
        }
    }
    return n;
}
var CompositeNodeValidator = /** @class */ (function () {
    function CompositeNodeValidator() {
    }
    CompositeNodeValidator.prototype.validate = function (node, acceptor) {
        if (node.definition().isAnnotationType()) {
            return;
        }
        if (node.lowLevel().keyKind() == yaml.Kind.SEQ) {
            var isPattern = node.definition().isAssignableFrom(universes.Universe10.TypeDeclaration.name);
            if (!isPattern) {
                acceptor.accept(createIssue1(messageRegistry.NODE_KEY_IS_A_SEQUENCE, {}, node));
            }
        }
        var nodeName = node.name();
        if (nodeName == null) {
            nodeName = node.lowLevel().key();
            if (nodeName == null) {
                nodeName = "";
            }
        }
        if (node.definition().key() == universes.Universe08.GlobalSchema) {
            if (node.lowLevel().valueKind() != yaml.Kind.SCALAR) {
                var isString = false;
                if (node.lowLevel().valueKind() == yaml.Kind.ANCHOR_REF || node.lowLevel().valueKind() == yaml.Kind.INCLUDE_REF) {
                    var vl = node.lowLevel().value();
                    if (typeof vl === "string") {
                        isString = true;
                    }
                }
                if (!isString) {
                    acceptor.accept(createIssue1(messageRegistry.SCHEMA_NAME_MUST_BE_STRING, { name: nodeName }, node));
                }
            }
        }
        if (!node.parent()) {
            new RAMLVersionAndFragmentValidator().validate(node, acceptor);
            //Note: overloading validator now checks for oveloading and rejects it
            if (node.definition().key() == universes.Universe08.Api || node.definition().key() == universes.Universe10.Api) {
                new OverloadingValidator().validateApi(node.wrapperNode(), acceptor);
                //if (node.definition().universe().version() != "RAML08") {
                //    new OverloadingValidator().validateApi(<any>node.wrapperNode(), acceptor)
                //}
                //else{
                //    new OverloadingValidator08().validateApi(<any>node.wrapperNode(), acceptor)
                //}
            }
            new ScalarQuoteValidator().validate(node, acceptor);
            lintNode(node, acceptor);
            //now we should validate overloading combinations
        }
        new OverlayNodesValidator().validate(node, acceptor);
        var nc = node.definition();
        if (nc.key() == universes.Universe08.BodyLike) {
            if (node.lowLevel().children().map(function (x) { return x.key(); }).some(function (x) { return x === "formParameters"; })) {
                if (node.parent() && node.parent().definition().key() == universes.Universe08.Response) {
                    var i = createIssue1(messageRegistry.FORM_PARAMS_IN_RESPONSE, {}, node);
                    acceptor.accept(i);
                }
                else if (node.lowLevel().children().map(function (x) { return x.key(); }).some(function (x) { return x === "schema" || x === "example"; })) {
                    var i = createIssue1(messageRegistry.FORM_PARAMS_WITH_EXAMPLE, {}, node);
                    acceptor.accept(i);
                }
            }
        }
        if (nc.key() == universes.Universe10.OAuth2SecuritySchemeSettings) {
            var requireUrl = false;
            node.attributes("authorizationGrants").forEach(function (x) {
                var vl = x.value();
                if (vl === "authorization_code" || vl === "implicit") {
                    requireUrl = true;
                }
                else if (vl !== "password" && vl !== 'client_credentials') {
                    if (vl && typeof vl === "string" && vl.indexOf("://") == -1 && vl.indexOf(":") == -1) {
                        var i = createIssue1(messageRegistry.AUTHORIZATION_GRANTS_ENUM, {}, x);
                        acceptor.accept(i);
                    }
                }
            });
            if (requireUrl) {
                if (!node.attr("authorizationUri")) {
                    var i = createIssue1(messageRegistry.AUTHORIZATION_URI_REQUIRED, {}, node);
                    acceptor.accept(i);
                }
            }
        }
        //validation of enum values;
        if (node.definition().isAssignableFrom(universes.Universe08.Parameter.name)
            || node.definition().isAssignableFrom(universes.Universe10.TypeDeclaration.name)) {
            var vls = node.attributes("enum").map(function (x) { return x.value(); });
            if (vls.length != _.uniq(vls).length) {
                var i = createIssue1(messageRegistry.REPEATING_COMPONENTS_IN_ENUM, {}, node);
                acceptor.accept(i);
            }
            if (node.definition().isAssignableFrom(universes.Universe08.NumberTypeDeclaration.name) || node.definition().isAssignableFrom(universes.Universe10.NumberTypeDeclaration.name)) {
                var isInteger = node.definition().isAssignableFrom(universes.Universe08.IntegerTypeDeclaration.name) || node.definition().isAssignableFrom(universes.Universe10.IntegerTypeDeclaration.name);
                node.attributes("enum").forEach(function (attribute) {
                    var value = isInteger ? parseInt(attribute.value()) : parseFloat(attribute.value());
                    var isValid = isInteger ? !isNaN(value) && attribute.value().indexOf('.') === -1 : !isNaN(value);
                    if (!isValid) {
                        var issue = createIssue1(isInteger
                            ? messageRegistry.INTEGER_EXPECTED
                            : messageRegistry.NUMBER_EXPECTED_2, {}, attribute);
                        acceptor.accept(issue);
                    }
                });
            }
        }
        if (universeHelpers.isResourceTypeType(node.definition())) {
            if (node.value() == null && node.lowLevel().children().length == 0
                && node.definition().universe().version() == "RAML08"
                && node.lowLevel().resolvedValueKind() == yaml.Kind.SCALAR) {
                acceptor.accept(createIssue1(messageRegistry.RESOURCE_TYPE_NULL, {}, node));
            }
        }
        checkPropertyQuard(node, acceptor);
        var nodeValue = node.value();
        if ((typeof nodeValue == 'string'
            || typeof nodeValue == 'number'
            || typeof nodeValue == 'boolean')
            && !node.definition().getAdapter(services.RAMLService).allowValue()) {
            if (node.parent()) {
                if (nodeValue != '~') {
                    var isParameter = typeOfContainingTemplate(node) != null
                        && (typeof nodeValue == "string")
                        && util.startsWith(nodeValue, "<<")
                        && util.endsWith(nodeValue, ">>");
                    var report = true;
                    if (nodeValue == "") {
                        var actualValue = node.lowLevel().actual() && node.lowLevel().actual().value;
                        if (!actualValue || !(actualValue.doubleQuoted || actualValue.singleQuoted)) {
                            report = false;
                        }
                    }
                    if (report && !isParameter && !checkIfIncludeTagIsMissing(node, acceptor, messageRegistry.SCALAR_PROHIBITED_2.code)) {
                        var i = createIssue1(messageRegistry.SCALAR_PROHIBITED_2, { name: nodeName }, node);
                        acceptor.accept(i);
                    }
                }
            }
        }
        new RequiredPropertiesAndContextRequirementsValidator().validate(node, acceptor);
        new ValidateChildrenKeys().validate(node, acceptor);
        new NodeSpecificValidator().validate(node, acceptor);
    };
    return CompositeNodeValidator;
}());
var BaseUriParameterValidator = /** @class */ (function () {
    function BaseUriParameterValidator() {
    }
    BaseUriParameterValidator.prototype.validate = function (node, acceptor) {
        //we cant have "version" base uri parameter
        var nameAttributeValue = node.attrValue(universes.Universe10.TypeDeclaration.properties.name.name);
        if ("version" == nameAttributeValue) {
            acceptor.accept(createIssue1(messageRegistry.VERSION_NOT_ALLOWED, {}, node));
        }
    };
    return BaseUriParameterValidator;
}());
var NodeSpecificValidatorRegistryEntry = /** @class */ (function () {
    /**
     *
     * @param definition - array of definitions from universes
     * @param propertyName - name of the property. May be null, then property is not tested.
     * @param assignableFrom - whether instead of direct definition comparison, the tested node will be checked
     * for assignability from the specified definitions
     */
    function NodeSpecificValidatorRegistryEntry(definitions, propertyName, validator, assignableFrom) {
        if (assignableFrom === void 0) { assignableFrom = false; }
        this.definitions = definitions;
        this.propertyName = propertyName;
        this.assignableFrom = assignableFrom;
        this.validator = validator;
    }
    /**
     * Checks whether this entry is applicable to the node. If so, invokes its validator.
     * @param node
     * @param cb
     */
    NodeSpecificValidatorRegistryEntry.prototype.validate = function (node, acceptor) {
        var nodeDefinition = node.definition();
        if (nodeDefinition == null)
            return;
        var definitionMatched = false;
        if (!this.assignableFrom) {
            definitionMatched =
                this.definitions.some(function (currentDefinition) { return currentDefinition === nodeDefinition; });
        }
        else {
            definitionMatched =
                this.definitions.some(function (currentDefinition) { return nodeDefinition.isAssignableFrom(currentDefinition.name); });
        }
        if (!definitionMatched)
            return;
        if (this.propertyName != null) {
            if (node.property() == null)
                return;
            if (node.property().nameId() != this.propertyName)
                return;
        }
        //definition and property matched, invoking validator
        this.validator.validate(node, acceptor);
    };
    return NodeSpecificValidatorRegistryEntry;
}());
/**
 * A central switch for validations specific to a particular node.
 * In future it would be nice to migrate all node-specific validation scattered around the code here.
 */
var NodeSpecificValidator = /** @class */ (function () {
    function NodeSpecificValidator() {
    }
    NodeSpecificValidator.createRegistry = function () {
        var result = [];
        NodeSpecificValidator.registerValidator(result, [universes.Universe10.TypeDeclaration, universes.Universe08.Parameter], universes.Universe10.Api.properties.baseUriParameters.name, new BaseUriParameterValidator(), true);
        return result;
    };
    NodeSpecificValidator.registerValidator = function (listToAddTo, definitions, propertyName, validator, assignableFrom) {
        if (assignableFrom === void 0) { assignableFrom = false; }
        var entry = new NodeSpecificValidatorRegistryEntry(definitions, propertyName, validator, assignableFrom);
        listToAddTo.push(entry);
    };
    NodeSpecificValidator.prototype.validate = function (node, acceptor) {
        NodeSpecificValidator.entries.forEach(function (entry) { return entry.validate(node, acceptor); });
    };
    NodeSpecificValidator.entries = NodeSpecificValidator.createRegistry();
    return NodeSpecificValidator;
}());
var ProtocolsValidator = /** @class */ (function () {
    function ProtocolsValidator() {
    }
    ProtocolsValidator.prototype.validate = function (node, cb) {
        var def = node.definition();
        if (!def) {
            return;
        }
        if (!(universeHelpers.isApiSibling(def) || universeHelpers.isMethodBaseSibling(def))) {
            return;
        }
        var llNode = node.lowLevel();
        var pNode = llNode.children().find(function (x) { return x.key() == universes.Universe10.Api.properties.protocols.name; });
        if (!pNode) {
            return;
        }
        var val = pNode.value();
        if (val == null && pNode.children().length == 0) {
            cb.accept(createLLIssue1(messageRegistry.PROTOCOLS_ARRAY, {}, pNode, node));
        }
        else if (pNode.resolvedValueKind() != yaml.Kind.SEQ) {
            cb.accept(createLLIssue1(messageRegistry.PROTOCOLS_ARRAY, {}, pNode, node));
        }
    };
    return ProtocolsValidator;
}());
var OverlayNodesValidator = /** @class */ (function () {
    function OverlayNodesValidator() {
    }
    /**
     * Checks that this node is in white list and
     * makes itself and all of its children allowed to exist in overlay even
     * if there is no master counterpart
     * @param node
     * @param root
     * @returns {boolean}
     */
    OverlayNodesValidator.prototype.allowsAnyChildren = function (node, root) {
        var property = node.property();
        var definition = node.definition();
        //accepting new annotation types
        if ((universeHelpers.isAnnotationTypeType(definition) || universeHelpers.isTypeDeclarationTypeOrDescendant(definition))
            && universeHelpers.isAnnotationTypesProperty(property))
            return true;
        //accepting new top-level type declarations
        if (node.parent() == root && universeHelpers.isTypesProperty(property)
            && universeHelpers.isTypeDeclarationTypeOrDescendant(definition))
            return true;
        //as we allow types, it is logical to also allow schemas as "schemas are only aliases for types"
        if (universeHelpers.isSchemasProperty(property)
            && universeHelpers.isTypeDeclarationTypeOrDescendant(definition))
            return true;
        //accepting documentation
        if (node.parent() == root && universeHelpers.isDocumentationProperty(property)
            && universeHelpers.isDocumentationType(definition))
            return true;
        //accepting annotations
        if (universeHelpers.isAnnotationsProperty(property)
        /*&& (universeHelpers.isAnnotationRefTypeOrDescendant(definition) ||
         definition.isAnnotationType())*/ )
            return true;
        //uses allowed
        if (universeHelpers.isUsesProperty(property))
            return true;
        //examples allowed
        if (universeHelpers.isExamplesProperty(property))
            return true;
        return false;
    };
    /**
     * Checks that this node is allowed to exist in overlay even if there is no master counterpart
     * due to it or its parent being in the white list.
     * @param node
     * @param root
     */
    OverlayNodesValidator.prototype.nodeAllowedDueToParent = function (node, root) {
        var currentNode = node;
        while (currentNode != root && currentNode != null) {
            if (this.allowsAnyChildren(currentNode, root)) {
                return true;
            }
            currentNode = currentNode.parent();
        }
        return false;
    };
    OverlayNodesValidator.prototype.validate = function (node, v) {
        var root = node.root();
        if (root.isExpanded()) {
            if (root.lowLevel().unit().absolutePath() != node.lowLevel().unit().absolutePath()) {
                return;
            }
        }
        var property = node.property();
        var definition = node.definition();
        //we are only validating overlays
        if (!universeHelpers.isOverlayType(root.definition()))
            return;
        //for root only validate properties
        if (node == root) {
            this.validateProperties(node, v);
            return;
        }
        //we have a whitelist of IHighLevelNodes allowed to be added in an overlay like new types, annotation types,
        //annotation etc. The contents of such nodes is checked here.
        if (this.nodeAllowedDueToParent(node, root))
            return;
        //checking for a node, this node overrides
        var overrides = root.knownIds();
        if (!overrides) {
            //should never happen
            return;
        }
        var override = overrides.hasOwnProperty(node.id());
        if (override) {
            //overrides are allowed, but we need to check properties, this override potentially brings in or changes:
            this.validateProperties(node, v);
            return;
        }
        //otherwise reporting an illegal node:
        v.accept(createIssue1(messageRegistry.INVALID_OVERLAY_NODE, { nodeId: node.id() }, node));
    };
    OverlayNodesValidator.prototype.validateProperties = function (node, acceptor) {
        var root = node.root();
        var rootPath = root.lowLevel().unit().absolutePath();
        var isExpanded = root.isExpanded();
        node.attrs().forEach(function (attribute) {
            if (isExpanded && rootPath != attribute.lowLevel().unit().absolutePath()) {
                return;
            }
            //ignoring key properties as they are not overriding anything
            if (attribute.property().getAdapter(services.RAMLPropertyService).isKey()) {
                return;
            }
            //ignoring nodes, which are not coming from this node, but from is master chain
            if (attribute.parent() != node) {
                return;
            }
            //yes, that also happens!
            if (attribute.isElement()) {
                return;
            }
            //title allowed
            if (universeHelpers.isTitlePropertyName(attribute.name()))
                return;
            //description allowed
            if (universeHelpers.isDescriptionPropertyName(attribute.name()))
                return;
            //displayName allowed
            if (universeHelpers.isDisplayNamePropertyName(attribute.name()))
                return;
            //usage allowed
            if (universeHelpers.isUsagePropertyName(attribute.name()))
                return;
            //example allowed
            if (universeHelpers.isExampleProperty(attribute.property()))
                return;
            //masterRef allowed
            if (universeHelpers.isMasterRefProperty(attribute.property()))
                return;
            //annotations allowed
            if (universeHelpers.isAnnotationsProperty(attribute.property()))
                return;
            //uses allowed
            if (universeHelpers.isUsesProperty(attribute.property()))
                return;
            //reporting the error
            acceptor.accept(createIssue1(messageRegistry.INVALID_OVERRIDE_IN_OVERLAY, { propName: attribute.name() }, attribute));
        });
    };
    return OverlayNodesValidator;
}());
var RecurrentOverlayValidator = /** @class */ (function () {
    function RecurrentOverlayValidator() {
    }
    RecurrentOverlayValidator.prototype.validate = function (node, v) {
        var _this = this;
        var z = new OverlayNodesValidator();
        z.validate(node, v);
        node.directChildren().forEach(function (x) { if (x.isElement()) {
            _this.validate(x.asElement(), v);
        } });
    };
    return RecurrentOverlayValidator;
}());
var RecurrentValidateChildrenKeys = /** @class */ (function () {
    function RecurrentValidateChildrenKeys() {
    }
    RecurrentValidateChildrenKeys.prototype.val = function (node, v, p) {
        var _this = this;
        if (node.kind() == yaml.Kind.MAP || node.kind() == yaml.Kind.MAPPING) {
            var ms = {};
            node.children().forEach(function (x) {
                var c = x.key();
                if (c) {
                    if (ms.hasOwnProperty(c)) {
                        var issue = createIssue1(messageRegistry.KEYS_SHOULD_BE_UNIQUE, {}, p, false);
                        if (x.unit() == p.lowLevel().unit()) {
                            issue.start = x.keyStart();
                            issue.end = x.keyEnd();
                        }
                        v.accept(issue);
                    }
                    ms[c] = 1;
                }
            });
        }
        node.children().forEach(function (x) {
            _this.val(x, v, p);
        });
    };
    RecurrentValidateChildrenKeys.prototype.validate = function (node, v) {
        this.val(node.lowLevel(), v, node);
    };
    return RecurrentValidateChildrenKeys;
}());
var ValidateChildrenKeys = /** @class */ (function () {
    function ValidateChildrenKeys() {
    }
    ValidateChildrenKeys.prototype.validate = function (node, acceptor) {
        //validation is being performed at high level instead of low-level
        //to provide more meaningful and specific error messages
        this.validateChildElements(node, acceptor);
        var lowLevelChildren = node.lowLevel().children();
        var keyToLowLevelChildren = _.groupBy(lowLevelChildren.filter(function (x) { return x.key() != null; }), function (x) { return x.key(); });
        this.validateChildAttributes(node, keyToLowLevelChildren, acceptor);
        this.validateUnrecognizedLowLevelChildren(node, keyToLowLevelChildren, acceptor);
    };
    ValidateChildrenKeys.prototype.validateChildElements = function (node, acceptor) {
        //testing for child elements having equal keys
        var keyToElements = {};
        var childElements = node.directChildren().filter(function (x) { return x.isElement(); });
        childElements.forEach(function (childNode) {
            var childElement = childNode;
            if (childElement["_computed"]) {
                return;
            }
            if (!childElement.name()) {
                return; //handling nodes with no key (documentation)
            }
            var elementKey = childElement.name() + childElement.property().nameId();
            if (keyToElements.hasOwnProperty(elementKey)) {
                if (!childElement.isNamePatch()) {
                    keyToElements[elementKey].push(childElement);
                }
            }
            else {
                keyToElements[elementKey] = [childElement];
            }
        });
        Object.keys(keyToElements).forEach(function (key) {
            var childElements = keyToElements[key];
            if (!childElements || childElements.length < 2)
                return;
            childElements.forEach(function (childElement) {
                var message = "";
                var humanReadableName = getHumanReadableNodeName(childElement);
                var parameters = { name: childElement.name() };
                var messageEntry = messageRegistry.ALREADY_EXISTS_IN_CONTEXT;
                if (humanReadableName) {
                    parameters.capitalized = changeCase.upperCaseFirst(humanReadableName);
                    messageEntry = messageRegistry.ALREADY_EXISTS;
                }
                var issue = createIssue1(messageEntry, parameters, childElement);
                acceptor.accept(issue);
            });
        });
    };
    ValidateChildrenKeys.prototype.validateChildAttributes = function (node, keyToLowLevelChildren, acceptor) {
        var highLevelAttributes = this.getHighLevelAttributes(node);
        var nameToHighLevelAttributes = _.groupBy(highLevelAttributes, function (x) { return x.name(); });
        var allowsAnyAndHasRequireds = this.allowsAnyAndHasRequireds(node);
        Object.keys(nameToHighLevelAttributes).forEach(function (attributeName) {
            if (nameToHighLevelAttributes[attributeName].length < 2) {
                return;
            }
            var isUnknown = nameToHighLevelAttributes[attributeName][0].isUnknown();
            var isMultiValue = !isUnknown && nameToHighLevelAttributes[attributeName][0].property().isMultiValue();
            if (isMultiValue && (node.definition().isAssignableFrom(universes.Universe08.SecuritySchemeSettings.name) ||
                node.definition().isAssignableFrom(universes.Universe10.SecuritySchemeSettings.name))) {
                isMultiValue = keyToLowLevelChildren[attributeName] && keyToLowLevelChildren[attributeName].length === 1;
            }
            if ((isUnknown && allowsAnyAndHasRequireds) || !isMultiValue ||
                (isMultiValue && keyToLowLevelChildren[attributeName] != null && keyToLowLevelChildren[attributeName].length > 1)) {
                //we blame even multivalue properties if they have duplicated low-level keys as YAML forbids this
                nameToHighLevelAttributes[attributeName].forEach(function (attribute) {
                    var parameters = { propName: attribute.property() ? attribute.property().nameId() : attribute.name() };
                    var messageEntry = messageRegistry.PROPERTY_USED;
                    var humanReadableParent = getHumanReadableNodeName(attribute.parent());
                    if (humanReadableParent) {
                        parameters.parent = changeCase.upperCaseFirst(humanReadableParent);
                        messageEntry = messageRegistry.PARENT_PROPERTY_USED;
                    }
                    var issue = createIssue1(messageEntry, parameters, attribute);
                    acceptor.accept(issue);
                });
            }
        });
    };
    ValidateChildrenKeys.prototype.validateUnrecognizedLowLevelChildren = function (node, keyToLowLevelChildren, acceptor) {
        var highLevelChildren = node.directChildren();
        var nameToHighLevelChildren = _.groupBy(highLevelChildren, function (x) { return x.name(); });
        Object.keys(keyToLowLevelChildren).forEach(function (lowLevelChildKey) {
            if (lowLevelChildKey) {
                if (keyToLowLevelChildren[lowLevelChildKey].length > 1 && !nameToHighLevelChildren[lowLevelChildKey]) {
                    if (node.definition().isAssignableFrom(universes.Universe10.ObjectTypeDeclaration.name)) {
                        return;
                    }
                    var parameters = { propName: lowLevelChildKey };
                    var messageEntry = messageRegistry.PROPERTY_USED;
                    var humanReadableNode = getHumanReadableNodeName(node);
                    if (humanReadableNode) {
                        parameters.parent = changeCase.upperCaseFirst(humanReadableNode);
                        messageEntry = messageRegistry.PARENT_PROPERTY_USED;
                    }
                    keyToLowLevelChildren[lowLevelChildKey].forEach(function (lowLevelChild) {
                        var i = createLLIssue1(messageEntry, parameters, lowLevelChild, node);
                        i.start = lowLevelChild.keyStart();
                        i.end = lowLevelChild.keyEnd();
                        acceptor.accept(i);
                    });
                }
            }
        });
    };
    ValidateChildrenKeys.prototype.filterMultiValueAnnotations = function (node, keyToLowLevelChildren, acceptor) {
        var highLevelAttributes = this.getHighLevelAttributes(node);
        var computedAnnotationsMultiplValues = false;
        Object.keys(keyToLowLevelChildren).forEach(function (lowLevelChildKey) {
            if (lowLevelChildKey.charAt(0) !== '(' || keyToLowLevelChildren[lowLevelChildKey].length < 2) {
                return;
            }
        });
    };
    ValidateChildrenKeys.prototype.getHighLevelAttributes = function (node) {
        var allowsAnyAndHasRequireds = this.allowsAnyAndHasRequireds(node);
        return node.directChildren().filter(function (x) { return x.isAttr() || allowsAnyAndHasRequireds; });
    };
    ValidateChildrenKeys.prototype.allowsAnyAndHasRequireds = function (node) {
        var requireds = node.definition().requiredProperties();
        var hasRequireds = requireds && requireds.length > 0;
        var ramlService = node.definition().getAdapter(services.RAMLService);
        var isAllowAny = ramlService && ramlService.getAllowAny();
        var anyExceptRequireds = isAllowAny && hasRequireds;
        return anyExceptRequireds;
    };
    return ValidateChildrenKeys;
}());
var UsesEntryValidator = /** @class */ (function () {
    function UsesEntryValidator() {
    }
    UsesEntryValidator.prototype.validate = function (highLevelNode, v) {
        if (highLevelNode.definition().isAssignableFrom(universes.Universe10.UsesDeclaration.name)) {
            var vn = highLevelNode.attr(universes.Universe10.UsesDeclaration.properties.value.name);
            var libPath = vn && vn.value();
            if (libPath != null && typeof libPath == "string") {
                var rs_1 = highLevelNode.lowLevel().unit().resolve(libPath);
                if (rs_1 != null && highLevelNode.root().lowLevel().actual().libExpanded) {
                    var libUnit = rs_1;
                    var libNode = libUnit.ast();
                    var libAnnotations = libNode.children().filter(function (x) {
                        var key = x.key();
                        return util.startsWith(key, "(") && util.endsWith(key, ")");
                    });
                    if (libAnnotations.length > 0) {
                        var rootUnit = highLevelNode.root().lowLevel().unit();
                        var resolver = rootUnit.project().namespaceResolver();
                        var annotableType = highLevelNode.root().definition().universe().type(universes.Universe10.Annotable.name);
                        var annotationsProp = annotableType.property(universes.Universe10.Annotable.properties.annotations.name);
                        var usesEntryAnnotations = [];
                        for (var _i = 0, libAnnotations_1 = libAnnotations; _i < libAnnotations_1.length; _i++) {
                            var a = libAnnotations_1[_i];
                            var dumped = a.dumpToObject();
                            var aObj = {
                                name: a.key().substring(1, a.key().length - 1),
                                value: dumped[Object.keys(dumped)[0]]
                            };
                            if (!aObj || !aObj.name) {
                                continue;
                            }
                            var aName = aObj.name;
                            var name_4 = aName;
                            var ns = null;
                            var ind = aName.lastIndexOf(".");
                            if (ind >= 0) {
                                ns = aName.substring(0, ind);
                                name_4 = aName.substring(ind + 1);
                            }
                            var u = libUnit;
                            if (ns) {
                                var map = resolver.nsMap(libUnit);
                                if (map.hasOwnProperty(ns)) {
                                    u = map[ns].unit;
                                }
                            }
                            var err = false;
                            if (!u) {
                                err = true;
                            }
                            else {
                                var uModel = resolver.unitModel(u);
                                if (!uModel.annotationTypes.hasElement(name_4)) {
                                    err = true;
                                }
                            }
                            if (err) {
                                var mEntry = rtypes.messageRegistry["UNKNOWN_ANNOTATION_TYPE"];
                                var mainIssue = createLLIssue1(mEntry, { typeName: aName }, a, highLevelNode);
                                var traceIssue = createIssue1(messageRegistry.ISSUES_IN_THE_LIBRARY, { value: libPath }, highLevelNode, true);
                                mainIssue.extras.push(traceIssue);
                                v.accept(mainIssue);
                            }
                        }
                    }
                    return;
                }
                if (!rs_1 || rs_1.contents() === null) {
                    v.accept(createIssue1(messageRegistry.INVALID_LIBRARY_PATH, { path: libPath }, highLevelNode, false));
                }
                else if (!resourceRegistry.isWaitingFor(libPath)) {
                    var issues = [];
                    if (rs_1.contents().trim().length === 0) {
                        v.accept(createIssue1(messageRegistry.EMPTY_FILE, { path: libPath }, highLevelNode, false));
                        return;
                    }
                    var hlNode = rs_1.highLevel().asElement();
                    var toValidate = new hlimpl.ASTNodeImpl(hlNode.lowLevel(), hlNode.parent(), hlNode.definition(), hlNode.property());
                    toValidate.setValueSource(highLevelNode);
                    toValidate.validate(hlimpl.createBasicValidationAcceptor(issues, toValidate));
                    if (issues.length > 0 && highLevelNode.lowLevel().start() >= 0) {
                        var brand = createLibraryIssue(vn, highLevelNode);
                        issues.forEach(function (x) {
                            x.unit = x.unit == null ? rs_1 : x.unit;
                            if (!x.path) {
                                x.path = rs_1.path();
                            }
                        });
                        for (var _a = 0, issues_1 = issues; _a < issues_1.length; _a++) {
                            var issue = issues_1[_a];
                            var _issue = issue;
                            var alreadyAdded = false;
                            while (_issue.extras && _issue.extras.length > 0) {
                                _issue = _issue.extras[0];
                                if (_issue == brand) {
                                    alreadyAdded = true;
                                    break;
                                }
                            }
                            if (!alreadyAdded) {
                                if (!_issue.extras) {
                                    _issue.extras = [];
                                }
                                _issue.extras.push(brand);
                            }
                            v.accept(issue);
                        }
                    }
                }
            }
        }
    };
    return UsesEntryValidator;
}());
function contentProvider(lowLevel, chLL) {
    var root = lowLevel && lowLevel.includeBaseUnit() && ((lowLevel.includePath && lowLevel.includePath()) ? lowLevel.includeBaseUnit().resolve(lowLevel.includePath()) : lowLevel.includeBaseUnit());
    if (chLL) {
        var root1 = chLL && chLL.includeBaseUnit() && ((chLL.includePath && chLL.includePath()) ? chLL.includeBaseUnit().resolve(chLL.includePath()) : chLL.includeBaseUnit());
        if (root1 != root) {
            root = root1;
        }
    }
    return new contentprovider.ContentProvider(root);
}
/**
 * validates examples
 */
var ExampleAndDefaultValueValidator = /** @class */ (function () {
    function ExampleAndDefaultValueValidator() {
    }
    ExampleAndDefaultValueValidator.prototype.validate = function (node, cb) {
        //check if we expect to do strict validation
        var strictValidation = this.isStrict(node);
        if (!strictValidation) {
            if (!settings.validateNotStrictExamples) {
                return;
            }
        }
        var pObj = this.parseObject(node, cb, strictValidation);
        if (pObj == null) {
            return;
        }
        var schema = this.aquireSchema(node);
        if (schema) {
            var arg = pObj;
            if (typeof arg == "object") {
                arg = node.value();
            }
            schema.validate(arg, cb, strictValidation);
        }
    };
    ExampleAndDefaultValueValidator.prototype.isExampleNode = function (node) {
        return this.isSingleExampleNode(node) || this.isExampleNodeInMultipleDecl(node);
    };
    ExampleAndDefaultValueValidator.prototype.isSingleExampleNode = function (node) {
        return node.name() == universes.Universe10.TypeDeclaration.properties.example.name;
    };
    ExampleAndDefaultValueValidator.prototype.isExampleNodeInMultipleDecl = function (node) {
        var parent = node.parent();
        if (parent) {
            return universeHelpers.isExampleSpecType(parent.definition());
        }
        return false;
    };
    ExampleAndDefaultValueValidator.prototype.findParentSchemaOrTypeAttribute = function (node) {
        var attribute = node.parent().attr(universes.Universe10.TypeDeclaration.properties.schema.name);
        if (attribute) {
            return attribute;
        }
        attribute = node.parent().attr(universes.Universe10.TypeDeclaration.properties.type.name);
        if (attribute) {
            return attribute;
        }
        if (!node.parent()) {
            return null;
        }
        attribute = node.parent().parent().attr(universes.Universe10.TypeDeclaration.properties.schema.name);
        if (attribute) {
            return attribute;
        }
        attribute = node.parent().parent().attr(universes.Universe10.TypeDeclaration.properties.type.name);
        if (attribute) {
            return attribute;
        }
        return null;
    };
    ExampleAndDefaultValueValidator.prototype.aquireSchema = function (node) {
        var sp = node.parent().definition().isAssignableFrom(universes.Universe10.TypeDeclaration.name);
        if (this.isExampleNode(node)) {
            var sampleRoot = node;
            if (this.isExampleNodeInMultipleDecl(node)) {
                sampleRoot = node.parent();
            }
            if (sampleRoot.parent()) {
                if (sampleRoot.parent().definition().isAssignableFrom(universes.Universe10.TypeDeclaration.name) && sampleRoot.parent().parent() === null) {
                    sp = false;
                }
                else if (sampleRoot.parent().property().nameId() == universes.Universe10.LibraryBase.properties.types.name) {
                    sp = false;
                }
                if (sampleRoot.parent().parent()) {
                    var ppc = sampleRoot.parent().parent().definition().key();
                    if (ppc == universes.Universe08.Method || ppc == universes.Universe10.Method) {
                        if (sampleRoot.parent().property().nameId() == universes.Universe10.MethodBase.properties.queryParameters.name) {
                        }
                        else {
                            sp = true;
                        }
                    }
                    if (ppc == universes.Universe08.Response || ppc == universes.Universe10.Response) {
                        sp = true;
                    }
                }
            }
        }
        if (node.parent().definition().key() == universes.Universe08.BodyLike || sp) {
            //FIXME MULTIPLE INHERITANCE
            var sa = this.findParentSchemaOrTypeAttribute(node);
            if (sa) {
                var val = sa.value();
                if (hlimpl.StructuredValue.isInstance(val)) {
                    return null;
                }
                var strVal = ("" + val).trim();
                var so = null;
                if (strVal.charAt(0) == "{") {
                    try {
                        so = su.getJSONSchema(strVal, contentProvider(sa.lowLevel()));
                    }
                    catch (e) {
                        return null;
                    }
                }
                if (strVal.charAt(0) == "<") {
                    try {
                        so = su.getXMLSchema(strVal);
                    }
                    catch (e) {
                        return null;
                    }
                }
                if (so) {
                    return {
                        validate: function (pObje, cb, strict) {
                            try {
                                if (pObje.__$validated) {
                                    return;
                                }
                                if (so instanceof Error) {
                                    cb.accept(createIssue1(messageRegistry.INVALID_VALUE_SCHEMA, { iValue: so.message }, node, !strict));
                                    return;
                                }
                                so.validate(pObje);
                            }
                            catch (e) {
                                var illegalRequiredMessageStart = "Cannot assign to read only property '__$validated' of ";
                                if (e.message && e.message.indexOf(illegalRequiredMessageStart) == 0) {
                                    var propertyName = e.message.substr(illegalRequiredMessageStart.length, e.message.length - illegalRequiredMessageStart.length);
                                    cb.accept(createIssue1(messageRegistry.INVALID_JSON_SCHEMA, { propName: propertyName }, sa, !strict));
                                    return;
                                }
                                if (e.message == "Object.keys called on non-object") {
                                    return;
                                }
                                if (ValidationError.isInstance(e)) {
                                    if (!checkIfIncludeTagIsMissing(node, cb, e.messageEntry.code, !strict)) {
                                        cb.accept(createIssue2(e, node, !strict));
                                    }
                                    return;
                                }
                                cb.accept(createIssue1(messageRegistry.EXAMPLE_SCHEMA_FAILURE, { msg: e.message }, node, !strict));
                                return;
                            }
                            //validate using classical schema;
                        }
                    };
                }
                else {
                    if (strVal.length > 0) {
                        var nodeParent = node.parent();
                        var grandParent = nodeParent && nodeParent.parent();
                        var owner = nodeParent && nodeParent.definition() && nodeParent.definition().isAssignableFrom(universes.Universe10.ObjectTypeDeclaration.name) && nodeParent;
                        owner = owner || (grandParent && grandParent.definition() && grandParent.definition().isAssignableFrom(universes.Universe10.ObjectTypeDeclaration.name) && grandParent);
                        if (owner) {
                            return this.typeValidator(owner, node);
                        }
                    }
                }
            }
        }
        return this.getSchemaFromModel(node);
    };
    ExampleAndDefaultValueValidator.prototype.getSchemaFromModel = function (node) {
        var p = node.parent();
        // if (node.property().nameId()==universes.Universe10.ExampleSpec.properties.content.name){
        //     p=p.parent();
        // }
        return this.typeValidator(p, node);
    };
    ExampleAndDefaultValueValidator.prototype.typeValidator = function (p, node) {
        var newVar = {
            validate: function (pObje, cb, strict) {
                var pt = p.parsedType();
                if (pt && !pt.isUnknown()) {
                    if (typeof pObje === "number" && pt.isString()) {
                        pObje = "" + pObje;
                    }
                    if (typeof pObje === "boolean" && pt.isString()) {
                        pObje = "" + pObje;
                    }
                    if (pt.getExtra("repeat")) {
                        pObje = [pObje];
                    }
                    var validateObject = pt.validate(pObje, false);
                    if (!validateObject.isOk()) {
                        validateObject.getErrors().forEach(function (e) { return cb.accept(createIssue(e.getCode(), e.getMessage(), node, !strict, e.getInternalRange())); });
                    }
                }
            }
        };
        return newVar;
    };
    ;
    ExampleAndDefaultValueValidator.prototype.toObject = function (h, v, cb) {
        var res = v.lowLevel().dumpToObject(true);
        this.testDublication(h, v.lowLevel(), cb);
        if (res["example"]) {
            return res["example"];
        }
        if (res["content"]) {
            return res["content"];
        }
    };
    ExampleAndDefaultValueValidator.prototype.testDublication = function (h, v, cb) {
        var _this = this;
        var map = {};
        v.children().forEach(function (x) {
            if (x.key()) {
                if (map[x.key()]) {
                    cb.accept(createIssue1(messageRegistry.KEYS_SHOULD_BE_UNIQUE, {}, new hlimpl.BasicASTNode(x, h.parent())));
                }
                map[x.key()] = x;
            }
            _this.testDublication(h, x, cb);
        });
    };
    ExampleAndDefaultValueValidator.prototype.parseObject = function (node, cb, strictValidation) {
        var pObj = null;
        var vl = node.value();
        var mediaType = getMediaType(node);
        if (hlimpl.StructuredValue.isInstance(vl)) {
            //validate in context of type/schema
            pObj = this.toObject(node, vl, cb);
        }
        else {
            if (mediaType) {
                var parsed = parseJsonOrXml(mediaType, vl, cb, node, !strictValidation);
                if (!parsed.status) {
                    return;
                }
                pObj = parsed.result;
            }
            else {
                try {
                    if (vl && vl.length > 0 && (vl.trim().charAt(0) == '[' || vl.trim().charAt(0) == '{' || vl.trim().charAt(0) == '<')) {
                        pObj = JSON.parse(vl);
                    }
                    else {
                        return vl;
                    }
                }
                catch (e) {
                    if (vl.trim().indexOf("<") == 0) {
                        try {
                            pObj = xmlutil.parseXML(vl);
                        }
                        catch (e) {
                            cb.accept(createIssue1(messageRegistry.CAN_NOT_PARSE_XML, { msg: e.message }, node, !strictValidation));
                            return;
                        }
                    }
                    else {
                        //cb.accept(createIssue1(messageRegistry.CAN_NOT_PARSE_XML,
                        // {msg: e.message}, node, !strictValidation));
                        return vl;
                    }
                }
            }
        }
        if (pObj != null && typeof pObj != "object") {
            return vl;
        }
        return pObj;
    };
    ExampleAndDefaultValueValidator.prototype.isStrict = function (node) {
        if (universeHelpers.isDefaultValue(node.property())) {
            return true;
        }
        if (universeHelpers.isExampleProperty(node.property())
            && node.parent().definition().universe().version() == "RAML08") {
            //for RAML 0.8 we do not validate examples strictly
            return false;
        }
        var strictValidation = false;
        var strict = node.parent().attr("strict");
        if (strict) {
            if (strict.value() == 'true') {
                strictValidation = true;
            }
        }
        return strictValidation;
    };
    return ExampleAndDefaultValueValidator;
}());
exports.ExampleAndDefaultValueValidator = ExampleAndDefaultValueValidator;
var toReadableName = function (template, toLowerCase, pluralize_) {
    var templateName = changeCase.sentence(template).toLowerCase();
    if (!toLowerCase) {
        templateName = changeCase.ucFirst(templateName);
    }
    if (pluralize_) {
        templateName = pluralize.plural(templateName);
    }
    return templateName;
};
var OptionalPropertiesValidator = /** @class */ (function () {
    function OptionalPropertiesValidator() {
    }
    OptionalPropertiesValidator.prototype.validate = function (node, v) {
        if (node.isAttr()) {
            if (!node.optional()) {
                return;
            }
            var attr = node;
            var prop = attr.property();
            if (prop.isMultiValue() || prop.range().isArray()) {
                return;
            }
            if (!prop.isFromParentKey()) {
                var template = typeOfContainingTemplate(attr.parent());
                if (template) {
                    if (prop.isValueProperty()) {
                        var issue = createIssue1(messageRegistry.OPTIONAL_SCLARAR_PROPERTIES_10, {
                            templateName: template.nameId(),
                            propName: attr.name()
                        }, attr, false);
                        v.accept(issue);
                    }
                }
            }
        }
        else if (node.isElement()) {
            var aNode = node;
            var prop = aNode.property();
            var allowsQuestion = aNode.allowsQuestion();
            if (!allowsQuestion) {
                aNode.optionalProperties().forEach(function (x) {
                    aNode.children().forEach(function (y) {
                        var parameters = {
                            propName: prop.nameId(),
                            oPropName: y.lowLevel().key()
                        };
                        var issue = createIssue1(messageRegistry.OPTIONAL_PROPERTIES_10, parameters, node, false);
                        v.accept(issue);
                    });
                });
            }
            var def = node.asElement().definition();
            if (node.optional() && def.universe().version() == "RAML10") {
                var prop = node.property();
                var isParam = universeHelpers.isQueryParametersProperty(prop)
                    || universeHelpers.isUriParametersProperty(prop)
                    || universeHelpers.isHeadersProperty(prop);
                if (!universeHelpers.isMethodType(def) && !(universeHelpers.isTypeDeclarationType(def) && isParam)) {
                    var issue = createIssue1(messageRegistry.ONLY_METHODS_CAN_BE_OPTIONAL, {}, node, false);
                    v.accept(issue);
                }
            }
        }
    };
    return OptionalPropertiesValidator;
}());
var UriParametersValidator = /** @class */ (function () {
    function UriParametersValidator() {
    }
    UriParametersValidator.prototype.validate = function (node, v) {
        var def = node.definition();
        var baseUriPropName = universes.Universe10.Api.properties.baseUri.name;
        var baseUriParamsPropName = universes.Universe10.Api.properties.baseUriParameters.name;
        var uriPropName = universes.Universe10.Resource.properties.relativeUri.name;
        var uriParamsPropName = universes.Universe10.ResourceBase.properties.uriParameters.name;
        if (universeHelpers.isApiSibling(def)) {
            this.inspectParameters(node, v, baseUriPropName, baseUriParamsPropName);
        }
        else if (universeHelpers.isResourceType(def)) {
            var rootNode = node.root();
            this.inspectParameters(node, v, baseUriPropName, baseUriParamsPropName, rootNode);
            this.inspectParameters(node, v, uriPropName, uriParamsPropName);
        }
        else if (universeHelpers.isResourceTypeType(def)) {
            var rootNode = node.root();
            this.inspectParameters(node, v, baseUriPropName, baseUriParamsPropName, rootNode);
        }
    };
    UriParametersValidator.prototype.inspectParameters = function (node, v, uriPropName, paramsPropName, rootNode) {
        rootNode = rootNode || node;
        var uriValue = '';
        var uriAttr = rootNode.attr(uriPropName);
        if (uriAttr) {
            uriValue = uriAttr.value();
            if (!uriValue || typeof (uriValue) != "string") {
                uriValue = '';
            }
        }
        var paramElements = node.elementsOfKind(paramsPropName);
        paramElements.forEach(function (x) {
            var nameAttr = x.attr(universes.Universe10.TypeDeclaration.properties.name.name);
            if (nameAttr) {
                var name = nameAttr.value();
                if (name != null) {
                    if (uriValue.indexOf('{' + name + '}') < 0) {
                        if (universeHelpers.isResourceTypeType(node.definition())) {
                            if (name.indexOf('<<') >= 0) {
                                return;
                            }
                        }
                        var propNameReadable = changeCase.upperCaseFirst(pluralize.singular(changeCase.sentence(paramsPropName)));
                        var issue = createIssue1(messageRegistry.PROPERTY_UNUSED, { propName: propNameReadable }, x, true);
                        v.accept(issue);
                    }
                }
            }
        });
    };
    return UriParametersValidator;
}());
var TemplateCyclesDetector = /** @class */ (function () {
    function TemplateCyclesDetector() {
        this.nameProperty = universes.Universe10.ResourceType.properties.name.name;
    }
    TemplateCyclesDetector.prototype.validate = function (node, v) {
        var definition = node.definition();
        if (!(universeHelpers.isLibraryBaseSibling(definition) || universeHelpers.isApiType(definition))) {
            return;
        }
        var resourceTypesProp = universes.Universe10.LibraryBase.properties.resourceTypes.name;
        var typeProp = universes.Universe10.ResourceBase.properties.type.name;
        var traitsProp = universes.Universe10.LibraryBase.properties.traits.name;
        var isProp = universes.Universe10.MethodBase.properties.is.name;
        var allResourceTypes;
        var alltraits;
        if (node.root().lowLevel().actual().libExpanded) {
            allResourceTypes = node.elementsOfKind(universes.Universe10.LibraryBase.properties.resourceTypes.name);
            alltraits = node.elementsOfKind(universes.Universe10.LibraryBase.properties.traits.name);
        }
        else {
            allResourceTypes = search.globalDeclarations(node)
                .filter(function (x) { return universeHelpers.isResourceTypeType(x.definition()); });
            alltraits = search.globalDeclarations(node)
                .filter(function (x) { return universeHelpers.isTraitType(x.definition()); });
        }
        this.checkCycles(allResourceTypes, typeProp, v);
        this.checkCycles(alltraits, isProp, v);
    };
    TemplateCyclesDetector.prototype.checkCycles = function (templates, propName, v) {
        var _this = this;
        var templatesMap = {};
        templates.forEach(function (x) {
            var name = _this.templateName(x);
            templatesMap[name] = x;
        });
        var templatesWithCycle = {};
        templates.forEach(function (template) {
            var name = _this.templateName(template);
            if (templatesWithCycle[name]) {
                //skip checking templates which are already known to have cycles in definition;
                return;
            }
            _this.findCyclesInDefinition(template, propName, templatesMap).forEach(function (cycle) {
                //mark templates which have cycles in definitions
                cycle.forEach(function (x) { return templatesWithCycle[x] = true; });
                cycle = cycle.reverse();
                var typeName = toReadableName(template.definition().nameId());
                var cycleStr = cycle.join(" -> ");
                var parameters = {
                    typeName: typeName,
                    cycle: cycleStr
                };
                var issue = createIssue1(messageRegistry.CYCLE_IN_DEFINITION, parameters, template, false);
                v.accept(issue);
            });
        });
    };
    TemplateCyclesDetector.prototype.templateName = function (node) {
        var nameAttribute = node.attr(this.nameProperty);
        if (!nameAttribute) {
            return null;
        }
        return nameAttribute.value();
    };
    TemplateCyclesDetector.prototype.findCyclesInDefinition = function (node, propName, templatesMap, occuredTemplates) {
        if (occuredTemplates === void 0) { occuredTemplates = {}; }
        var name = this.templateName(node);
        if (occuredTemplates[name]) {
            return [[name]];
        }
        var nextOccuredTemplates = {};
        Object.keys(occuredTemplates).forEach(function (x) { return nextOccuredTemplates[x] = occuredTemplates[x]; });
        nextOccuredTemplates[name] = true;
        var occuredCycles = [];
        var templatesRefs = node.attributes(propName);
        for (var i = 0; i < templatesRefs.length; i++) {
            var ref = templatesRefs[i];
            var val = ref.value();
            if (val) {
                var refName = typeof (val) == 'string' || typeof (val) == 'number' || typeof (val) == 'boolean' ? (val + '') : val.valueName();
                var template = templatesMap[refName];
                if (template != null) {
                    var newCycles = this.findCyclesInDefinition(template, propName, templatesMap, nextOccuredTemplates);
                    newCycles.forEach(function (x) { return occuredCycles.push(x); });
                }
            }
        }
        occuredCycles.forEach(function (x) { return x.push(name); });
        return occuredCycles;
    };
    return TemplateCyclesDetector;
}());
function isJson(s) {
    return s != null && s.indexOf("json") != -1;
}
exports.isJson = isJson;
function isXML(s) {
    return s != null && s.indexOf("xml") != -1;
}
exports.isXML = isXML;
function getMediaType(node) {
    var vl = getMediaType2(node);
    if (vl == 'body') {
        var rootMedia = node.root().attr("mediaType");
        if (rootMedia) {
            return rootMedia.value();
        }
        return null;
    }
    return vl;
}
exports.getMediaType = getMediaType;
function getMediaType2(node) {
    if (node.parent()) {
        var pc = node.parent().definition();
        if (pc.key() == universes.Universe08.BodyLike) {
            return node.parent().name();
        }
        if (node.parent().parent()) {
            var ppc = node.parent().parent().definition().key();
            if (ppc == universes.Universe08.Response || ppc == universes.Universe10.Response) {
                if (node.parent().property().nameId() == universes.Universe08.Response.properties.headers.name) {
                    return null;
                }
                return node.parent().name();
            }
            if (ppc == universes.Universe08.Method || ppc == universes.Universe10.Method) {
                if (node.parent().property().nameId() == universes.Universe10.MethodBase.properties.queryParameters.name
                    || node.parent().property().nameId() == universes.Universe10.MethodBase.properties.headers.name) {
                    return null;
                }
                return node.parent().name();
            }
        }
    }
    return null;
}
var offsetRegexp = /^[ ]*/;
function subRangError(hlNode, llNode, code, isWarning, message, setPath, prop, internalRange, forceScalar, positionsFromValue) {
    if (forceScalar === void 0) { forceScalar = false; }
    if (positionsFromValue === void 0) { positionsFromValue = false; }
    if (!internalRange) {
        return null;
    }
    var st = llNode.start();
    var et = llNode.end();
    var aNode = llNode.actual();
    var aValNode = aNode && aNode.value;
    var rawVal = aValNode && aValNode.rawValue;
    ;
    var valueKind = llNode.valueKind();
    if (valueKind == yaml.Kind.ANCHOR_REF) {
        valueKind = llNode.anchorValueKind();
    }
    var vk1 = valueKind;
    if (valueKind == yaml.Kind.INCLUDE_REF) {
        valueKind = llNode.resolvedValueKind();
    }
    if (valueKind != yaml.Kind.SCALAR && !forceScalar) {
        return null;
    }
    if (vk1 == yaml.Kind.INCLUDE_REF) {
        var includedUnit = llNode.unit().resolve(llNode.includePath());
        if (includedUnit) {
            var lineMapper_1 = includedUnit.lineMapper();
            var sp = lineMapper_1.toPosition(internalRange.start.line, internalRange.start.column);
            var ep = lineMapper_1.toPosition(internalRange.end.line, internalRange.end.column);
            var result = {
                code: code,
                isWarning: isWarning,
                message: message,
                node: null,
                start: sp.position,
                end: ep.position,
                path: includedUnit.path(),
                extras: [],
                unit: includedUnit
            };
            var trace = void 0;
            if (hlNode) {
                trace = localError(hlNode, code, isWarning, message, setPath, prop, llNode);
            }
            else {
                trace = localLowLevelError(llNode, null, code, isWarning, message, setPath, null, positionsFromValue);
            }
            result.extras.push(trace);
            return result;
        }
    }
    var lineMapper = llNode.unit().lineMapper();
    var vs = llNode.valueStart();
    if (vs < 0) {
        vs = llNode.start();
    }
    var vsPos = lineMapper.position(vs);
    var aSCol;
    var aECol;
    var aSLine = vsPos.line + internalRange.start.line;
    var aELine = vsPos.line + internalRange.end.line;
    if (rawVal && typeof rawVal == "string" && rawVal.charAt(0) == "|") {
        //let keyCol = lineMapper.position(llNode.keyStart()).column;
        var i0 = rawVal.indexOf("\n") + 1;
        var i1 = rawVal.indexOf("\n", i0);
        if (i1 < 0) {
            i1 = rawVal.length;
        }
        var off = offsetRegexp.exec(rawVal.substring(i0, i1))[0].length;
        aSCol = off + internalRange.start.column;
        aECol = off + internalRange.end.column;
        aSLine++;
        aELine++;
    }
    else {
        aSCol = vsPos.column + internalRange.start.column;
        aECol = vsPos.column + internalRange.end.column;
        if (aValNode && (aValNode.singleQuoted || aValNode.doubleQuoted)) {
            aSCol++;
            aECol++;
        }
    }
    var sPoint = lineMapper.toPosition(aSLine, aSCol);
    var ePoint = lineMapper.toPosition(aELine, aECol);
    if (sPoint && ePoint) {
        st = sPoint.position;
        et = ePoint.position;
    }
    return {
        code: code,
        isWarning: isWarning,
        message: message,
        node: hlNode,
        start: st,
        end: et,
        path: setPath ? (llNode.unit() ? llNode.unit().path() : "") : null,
        extras: [],
        unit: llNode ? llNode.unit() : null
    };
}
var localError = function (node, code, isWarning, message, setPath, prop, positionsSource, internalRange, forceScalar) {
    if (forceScalar === void 0) { forceScalar = false; }
    var llNode = positionsSource ? positionsSource : node.lowLevel();
    if (internalRange) {
        var err = subRangError(node, llNode, code, isWarning, message, setPath, prop, internalRange, forceScalar);
        if (err) {
            return err;
        }
    }
    var contents = llNode.unit() && llNode.unit().contents();
    var contentLength = contents && contents.length;
    var st = llNode.start();
    var et = llNode.end();
    if (contentLength && contentLength < et) {
        et = contentLength - 1;
    }
    if (llNode.key() && llNode.keyStart()) {
        var ks = llNode.keyStart();
        if (ks > 0) {
            st = ks;
        }
        var ke = llNode.keyEnd();
        if (ke > 0) {
            et = ke;
        }
    }
    if (et < st) {
        et = st + 1;
        //this happens for empty APIs, when we basically have nothing to parse
        if (node.isElement()) {
            var definition = node.definition();
            if (universeHelpers.isApiType(definition)) {
                st = contentLength == 0 ? 0 : contentLength - 1;
                et = st;
            }
        }
    }
    if (prop && !prop.getAdapter(services.RAMLPropertyService).isMerged() && node.parent() == null) {
        var nm = _.find(llNode.children(), function (x) { return x.key() == prop.nameId(); });
        if (nm) {
            var ks = nm.keyStart();
            var ke = nm.keyEnd();
            if (ks > 0 && ke > ks) {
                st = ks;
                et = ke;
            }
        }
    }
    return {
        code: code,
        isWarning: isWarning,
        message: message,
        node: node,
        start: st,
        end: et,
        path: setPath ? (llNode.unit() ? llNode.unit().path() : "") : null,
        extras: [],
        unit: node ? llNode.unit() : null
    };
};
var localLowLevelError = function (node, highLevelAnchor, code, isWarning, message, setPath, internalRange, positionsFromValue, forceScalar) {
    if (positionsFromValue === void 0) { positionsFromValue = false; }
    if (forceScalar === void 0) { forceScalar = false; }
    if (internalRange) {
        var err = subRangError(null, node, code, isWarning, message, setPath, null, internalRange, forceScalar, positionsFromValue);
        if (err) {
            return err;
        }
    }
    var contents = node.unit() && node.unit().contents();
    var contentLength = contents && contents.length;
    var st = node.start();
    var et = node.end();
    if (contentLength && et >= contentLength) {
        et = contentLength - 1;
    }
    if (node.key() && node.keyStart()) {
        var ks = node.keyStart();
        if (ks > 0) {
            st = ks;
        }
        var ke = node.keyEnd();
        if (ke > 0) {
            et = ke;
        }
    }
    var val = node.value(true);
    if (positionsFromValue && val && val.length > 0) {
        st = node.valueStart();
        et = node.valueEnd();
    }
    return {
        code: code,
        isWarning: isWarning,
        message: message,
        node: highLevelAnchor,
        start: st,
        end: et,
        path: setPath ? (node.unit() ? node.unit().path() : "") : null,
        extras: [],
        unit: node ? node.unit() : null
    };
};
function toIssue(error, node) {
    return createIssue(error.getCode(), error.getMessage(), mapPath(node, error).node, error.isWarning());
}
exports.toIssue = toIssue;
function createIssue2(ve, node, _isWarning) {
    var isWarning = _isWarning != null ? _isWarning : ve.isWarning;
    var internalPath = ve.internalPath;
    var actualNode = node;
    var internalPathUsed = false;
    var valueKind = node.lowLevel().valueKind();
    if (valueKind == yaml.Kind.INCLUDE_REF) {
        valueKind = node.lowLevel().resolvedValueKind();
    }
    if (internalPath && valueKind != yaml.Kind.SCALAR) {
        var ivp = def.rt.toValidationPath(internalPath);
        if (ivp) {
            var n = findElementAtPath(node, ivp);
            if (n && (n != node)) {
                actualNode = n;
                internalPathUsed = true;
            }
        }
    }
    var internalRange = internalPathUsed ? null : ve.internalRange;
    if (ve.filePath && actualNode.lowLevel().unit().absolutePath() != ve.filePath) {
        internalRange = null;
        ve.filePath = null;
    }
    var result = createIssue1(ve.messageEntry, ve.parameters, actualNode, isWarning, internalRange);
    if (ve.filePath) {
        var actualUnit = node.lowLevel().unit().project().unit(ve.filePath, true);
        result.unit = actualUnit;
        result.path = ve.filePath;
    }
    return result;
}
function createIssue1(messageEntry, parameters, node, isWarning, internalRange) {
    if (isWarning === void 0) { isWarning = false; }
    var msg = applyTemplate(messageEntry, parameters);
    var inKey = KeyErrorsRegistry.getInstance().isKeyError(messageEntry.code);
    return createIssue(messageEntry.code, msg, node, isWarning, internalRange, false, inKey);
}
exports.createIssue1 = createIssue1;
function createIssue(issueCode, message, node, isWarning, internalRange, forceScalar, inKey) {
    if (isWarning === void 0) { isWarning = false; }
    if (forceScalar === void 0) { forceScalar = false; }
    if (inKey === void 0) { inKey = false; }
    //console.log(node.name()+node.lowLevel().start()+":"+node.id());
    var original = null;
    var pr = null;
    if (proxy.LowLevelProxyNode.isInstance(node.lowLevel())) {
        var proxyNode = node.lowLevel();
        while (!proxyNode.primaryNode()) {
            if (!original) {
                var paramsChain = proxyNode.transformer() && proxyNode.transformer().paramNodesChain(proxyNode, inKey);
                if (paramsChain && paramsChain.length > 0) {
                    if (node.lowLevel().valueKind() != node.lowLevel().resolvedValueKind()) {
                        original = localError(node, issueCode, isWarning, message, false, pr, null, internalRange, forceScalar);
                        internalRange = null;
                        forceScalar = false;
                    }
                    else {
                        original = localError(node, issueCode, isWarning, message, false, pr, null);
                    }
                    var o = original;
                    while (o.extras.length > 0) {
                        o = o.extras[0];
                    }
                    for (var i_2 = 0; i_2 < paramsChain.length; i_2++) {
                        var pNode = paramsChain[i_2];
                        var ir = (i_2 == paramsChain.length - 1) ? internalRange : null;
                        var fs_1 = (i_2 == paramsChain.length - 1) ? forceScalar : false;
                        var e = localLowLevelError(pNode, null, issueCode, isWarning, message, false, ir, true, fs_1);
                        o.extras.push(e);
                        o = e;
                    }
                    return original;
                }
                else {
                    original = localError(node, issueCode, isWarning, message, true, pr, null, internalRange, forceScalar);
                }
                internalRange = null;
            }
            node = node.parent();
            proxyNode = node.lowLevel();
        }
    }
    var oNode = node;
    if (node) {
        pr = node.property();
        if (node.lowLevel().unit() != node.root().lowLevel().unit()) {
            original = localError(node, issueCode, isWarning, message, true, pr, null, internalRange, forceScalar);
            internalRange = null;
            var v = node.lowLevel().unit();
            if (v) {
                //message = message + " " + v.path();
            }
            while (node.lowLevel().unit() != node.root().lowLevel().unit()) {
                pr = node.property();
                node = node.parent();
            }
        }
    }
    if (original) {
        var resolver = node.lowLevel().unit().project().namespaceResolver();
        if (resolver) {
            var uInfo = resolver.resolveNamespace(node.root().lowLevel().unit(), oNode.lowLevel().unit());
            if (uInfo) {
                var issues = uInfo.usesNodes.map(function (x) { return createLLIssue1(messageRegistry.ISSUES_IN_THE_LIBRARY, { value: x.value() }, x, x.unit().highLevel(), true); });
                issues.push(original);
                issues = issues.reverse();
                for (var i = 0; i < issues.length - 1; i++) {
                    issues[i].extras.push(issues[i + 1]);
                }
                return original;
            }
        }
        if (node.property() && node.property().nameId() == universes.Universe10.FragmentDeclaration.properties.uses.name && node.parent() != null) {
            pr = node.property(); //FIXME there should be other cases
            node = node.parent();
        }
    }
    var error = localError(node, issueCode, isWarning, message, false, pr, null, internalRange, forceScalar);
    if (original) {
        var o = original;
        while (o.extras && o.extras.length > 0) {
            o = o.extras[0];
        }
        o.extras.push(error);
        if (node.lowLevel().valueKind() == yaml.Kind.INCLUDE_REF) {
            var messageEntry = messageRegistry.ERROR_IN_INCLUDED_FILE;
            error.code = messageEntry.code;
            error.message = applyTemplate(messageEntry, { msg: error.message });
        }
        error = original;
    }
    //console.log(error.start+":"+error.end)
    return error;
}
exports.createIssue = createIssue;
function createLLIssue1(messageEntry, parameters, node, rootCalculationAnchor, isWarning, p, internalRange) {
    if (isWarning === void 0) { isWarning = false; }
    if (p === void 0) { p = false; }
    var msg = applyTemplate(messageEntry, parameters);
    return createLLIssue(messageEntry.code, msg, node, rootCalculationAnchor, isWarning, p, internalRange);
}
function createLLIssue(issueCode, message, node, rootCalculationAnchor, isWarning, p, internalRange) {
    if (isWarning === void 0) { isWarning = false; }
    if (p === void 0) { p = false; }
    var original = null;
    if (node) {
        var rootUnit = rootCalculationAnchor.root().lowLevel().unit();
        if (rootCalculationAnchor.lowLevel().unit() != rootUnit) {
            original = localLowLevelError(node, rootCalculationAnchor, issueCode, isWarning, message, true, internalRange);
            var v = rootCalculationAnchor.lowLevel().unit();
            if (v) {
                message = message + " " + v.path();
            }
            while (rootCalculationAnchor.lowLevel().unit() != rootUnit) {
                rootCalculationAnchor = rootCalculationAnchor.parent();
            }
        }
    }
    if (original) {
        internalRange = null;
        if (rootCalculationAnchor.property() && rootCalculationAnchor.property().nameId()
            == universes.Universe10.FragmentDeclaration.properties.uses.name && rootCalculationAnchor.parent() != null) {
            rootCalculationAnchor = rootCalculationAnchor.parent();
        }
        node = rootCalculationAnchor.lowLevel();
    }
    var error = localLowLevelError(node, rootCalculationAnchor, issueCode, isWarning, message, p, internalRange);
    if (original) {
        original.extras.push(error);
        if (node.valueKind() == yaml.Kind.INCLUDE_REF) {
            error.message = applyTemplate(messageRegistry.ERROR_IN_INCLUDED_FILE, { msg: error.message });
        }
        error = original;
    }
    //console.log(error.start+":"+error.end)
    return error;
}
exports.createLLIssue = createLLIssue;
function validateResponseString(v) {
    if (v.length != 3) {
        return new ValidationError(messageRegistry.STATUS_MUST_BE_3NUMBER);
    }
    for (var i = 0; i < v.length; i++) {
        var c = v[i];
        if (!_.find(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], function (x) { return x == c; })) {
            return new ValidationError(messageRegistry.STATUS_MUST_BE_3NUMBER);
        }
    }
    return null;
}
exports.validateResponseString = validateResponseString;
function applyTemplate(messageEntry, params) {
    var result = "";
    var msg = messageEntry.message;
    var prev = 0;
    for (var ind = msg.indexOf("{{"); ind >= 0; ind = msg.indexOf("{{", prev)) {
        result += msg.substring(prev, ind);
        prev = msg.indexOf("}}", ind);
        if (prev < 0) {
            prev = ind;
            break;
        }
        ind += "{{".length;
        var paramString = msg.substring(ind, prev);
        var paramSegments = paramString.split('|');
        var paramName = paramSegments[0].trim();
        var functions = expander.getTransformersForOccurence(paramString);
        prev += "}}".length;
        var paramValue = params[paramName];
        if (paramValue === undefined) {
            throw new Error(applyTemplate(messageRegistry.MESSAGE_PARAMETER_NO_VALUE, { paramName: paramName }));
        }
        for (var _i = 0, functions_1 = functions; _i < functions_1.length; _i++) {
            var f = functions_1[_i];
            paramValue = f(paramValue);
        }
        result += paramValue;
    }
    result += msg.substring(prev, msg.length);
    return result;
}
exports.applyTemplate = applyTemplate;
;
function isURLorPath(str) {
    if (!str) {
        return false;
    }
    str = str.trim().toLowerCase();
    if (str.indexOf('\n') >= 0 || str.indexOf('\r') >= 0) {
        return false;
    }
    if (util.startsWith(str, "http://")) {
        str = str.substring("http://".length);
    }
    else if (util.startsWith(str, "https://")) {
        str = str.substring("https://".length);
    }
    else if (util.startsWith(str, "./")) {
        str = str.substring("./".length);
    }
    else if (util.startsWith(str, "/")) {
        str = str.substring("/".length);
    }
    str = str.replace(/\.\.\//g, '');
    var arr = str.split("/");
    if (arr.length == 0) {
        return false;
    }
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var s = arr_1[_i];
        if (!/^[-a-z\\d%_.~+]+$/.test(s)) {
            return false;
        }
    }
    return true;
}
function checkIfIncludeTagIsMissing(mappedNode, v, code, isWarning) {
    if (isWarning === void 0) { isWarning = false; }
    if (code != messageRegistry.SCALAR_PROHIBITED.code
        && code != messageRegistry.SCALAR_PROHIBITED_2.code
        && code != "CAN_NOT_PARSE_JSON"
        && code != "TYPE_EXPECTED"
        && code != "CONTENT_DOES_NOT_MATCH_THE_SCHEMA"
        && code != "INHERITING_UNKNOWN_TYPE"
        && code != "SCHEMA_ERROR"
        && code != "UNRECOGNIZED_ELEMENT") {
        return false;
    }
    if (mappedNode) {
        var llNode = mappedNode.lowLevel();
        var valueKind = llNode.valueKind();
        if (valueKind == yaml.Kind.ANCHOR_REF) {
            valueKind = llNode.anchorValueKind();
        }
        if (valueKind == yaml.Kind.INCLUDE_REF) {
            return false;
        }
        var prop = mappedNode.property();
        if (!prop) {
            prop = mappedNode.knownProperty;
        }
        var isExample = universeHelpers.isExampleProperty(prop)
            || universeHelpers.isExamplesProperty(prop);
        var isType = universeHelpers.isTypeOrSchemaProperty(prop);
        if (!isType) {
            if (prop && universeHelpers.isGlobalSchemaType(prop.domain())
                && universeHelpers.isValueProperty(prop)) {
                isType = true;
            }
        }
        if (prop && (isType || isExample || !prop.range().isValueType())) {
            var parent_1 = mappedNode.parent();
            if (!parent_1) {
                return false;
            }
            var pDef = parent_1.definition();
            var val = mappedNode.lowLevel().value();
            if (typeof val == "string" && isURLorPath(val)) {
                if (val.indexOf(".") < 0) {
                    return false;
                }
                if (isExample) {
                    if (!(universeHelpers.isBodyLikeType(pDef)
                        || universeHelpers.isObjectTypeDeclarationSibling(pDef)
                        || universeHelpers.isArrayTypeDeclarationSibling(pDef))) {
                        return false;
                    }
                    if (!(util.endsWith(val, ".raml") || util.endsWith(val, ".yml") || util.endsWith(val, ".yaml")
                        || util.endsWith(val, ".xml") || util.endsWith(val, ".json"))) {
                        return false;
                    }
                }
                else if (isType) {
                    if (!(util.endsWith(val, ".raml") || util.endsWith(val, ".yml") || util.endsWith(val, ".yaml")
                        || util.endsWith(val, ".xml") || util.endsWith(val, ".json") || util.endsWith(val, ".xsd"))) {
                        return false;
                    }
                }
                else {
                    if (!(util.endsWith(val, ".raml") || util.endsWith(val, ".yml") || util.endsWith(val, ".yaml"))) {
                        return false;
                    }
                }
                var issue = createIssue1(messageRegistry.INCLUDE_TAG_MISSING, null, mappedNode, isWarning);
                v.accept(issue);
                return true;
            }
        }
        return false;
    }
}
;
var PropertyNamesRegistry = /** @class */ (function () {
    function PropertyNamesRegistry() {
        this.propertiesMap = {};
        this.init();
    }
    PropertyNamesRegistry.getInstance = function () {
        if (!PropertyNamesRegistry.instance) {
            PropertyNamesRegistry.instance = new PropertyNamesRegistry();
        }
        return PropertyNamesRegistry.instance;
    };
    PropertyNamesRegistry.prototype.init = function () {
        var universeNames = def.getUniverse.availableUniverses();
        for (var _i = 0, universeNames_1 = universeNames; _i < universeNames_1.length; _i++) {
            var un = universeNames_1[_i];
            var u = def.getUniverse(un);
            for (var _a = 0, _b = u.types(); _a < _b.length; _a++) {
                var t = _b[_a];
                for (var _c = 0, _d = t.properties(); _c < _d.length; _c++) {
                    var p = _d[_c];
                    this.propertiesMap[p.nameId()] = true;
                }
            }
        }
    };
    PropertyNamesRegistry.prototype.hasProperty = function (pName) {
        return this.propertiesMap[pName] || false;
    };
    return PropertyNamesRegistry;
}());
var KeyErrorsRegistry = /** @class */ (function () {
    function KeyErrorsRegistry() {
        this.codesMap = {};
        this.init();
    }
    KeyErrorsRegistry.getInstance = function () {
        if (!KeyErrorsRegistry.instance) {
            KeyErrorsRegistry.instance = new KeyErrorsRegistry();
        }
        return KeyErrorsRegistry.instance;
    };
    KeyErrorsRegistry.prototype.init = function () {
        var keyErrorsArray = [
            messageRegistry.NODE_KEY_IS_A_MAP,
            messageRegistry.NODE_KEY_IS_A_SEQUENCE,
            messageRegistry.UNKNOWN_NODE,
            messageRegistry.INVALID_PROPERTY_USAGE,
            messageRegistry.INVALID_SUBRESOURCE_USAGE,
            messageRegistry.INVALID_METHOD_USAGE,
            messageRegistry.SPACES_IN_KEY,
            messageRegistry.UNKNOWN_ANNOTATION,
            messageRegistry.INVALID_ANNOTATION_LOCATION,
            messageRegistry.KEYS_SHOULD_BE_UNIQUE,
            messageRegistry.ALREADY_EXISTS,
            messageRegistry.ALREADY_EXISTS_IN_CONTEXT,
            messageRegistry.PROPERTY_USED,
            messageRegistry.PARENT_PROPERTY_USED,
            messageRegistry.UNKNOWN_ANNOTATION_TYPE,
            messageRegistry.LIBRARY_CHAINIG_IN_ANNOTATION_TYPE,
            messageRegistry.LIBRARY_CHAINIG_IN_ANNOTATION_TYPE_SUPERTYPE
        ];
        for (var _i = 0, keyErrorsArray_1 = keyErrorsArray; _i < keyErrorsArray_1.length; _i++) {
            var me = keyErrorsArray_1[_i];
            this.codesMap[me.code] = true;
        }
    };
    KeyErrorsRegistry.prototype.isKeyError = function (code) {
        return this.codesMap[code] || false;
    };
    return KeyErrorsRegistry;
}());
function parseJsonOrXml(mediaType, vl, cb, node, isWarning) {
    var pObj;
    if (isJson(mediaType)) {
        try {
            def.rt.getSchemaUtils().tryParseJSON(vl, true);
            pObj = JSON.parse(vl);
        }
        catch (e) {
            if (e.message.indexOf("Cannot tokenize symbol '<'") < 0 || !typeOfContainingTemplate(node)) {
                if (ValidationError.isInstance(e)) {
                    if (!checkIfIncludeTagIsMissing(node, cb, e.messageEntry.code, isWarning)) {
                        cb.accept(createIssue2(e, node, isWarning));
                    }
                }
                else {
                    cb.accept(createIssue1(messageRegistry.CAN_NOT_PARSE_JSON, { msg: e.message }, node, isWarning));
                }
                return {
                    result: null,
                    status: false
                };
            }
        }
    }
    if (isXML(mediaType)) {
        try {
            var warnings_1 = [];
            var errors_1 = [];
            pObj = xmlutil.parseXML(vl, {
                warning: function (x) { warnings_1.push(x); },
                error: function (x) { errors_1.push(x); },
                fatalError: function (x) { errors_1.push(x); }
            });
            if (warnings_1.length) {
                warnings_1.forEach(function (x) { return cb.accept(createIssue1(messageRegistry.CAN_NOT_PARSE_XML, { msg: x }, node, isWarning)); });
            }
            else if (errors_1.length) {
                errors_1.forEach(function (x) { return cb.accept(createIssue1(messageRegistry.CAN_NOT_PARSE_XML, { msg: x }, node, isWarning)); });
            }
        }
        catch (e) {
            cb.accept(createIssue1(messageRegistry.CAN_NOT_PARSE_XML, { msg: e.message }, node, isWarning));
            return {
                result: null,
                status: false
            };
        }
    }
    return {
        result: pObj,
        status: true
    };
}
//# sourceMappingURL=linter.js.map