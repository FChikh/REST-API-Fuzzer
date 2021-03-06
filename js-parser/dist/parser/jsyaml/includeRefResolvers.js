"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var DOMParser = require('xmldom').DOMParser;
var base64 = require('urlsafe-base64');
/**
 * Gets pure include path portion from the complete include.
 * Does not include the reference part.
 * @param includeString
 */
function getIncludePath(includeString) {
    if (!includeString) {
        return includeString;
    }
    var index = includeString.indexOf("#");
    if (index == -1)
        return includeString;
    return includeString.substring(0, index);
}
exports.getIncludePath = getIncludePath;
/**
 * Gets reference portion of the include string and returns it as
 * an array of segments. Returns null of no reference is contained in the include.
 * @param includeString
 */
function getIncludeReference(includeString) {
    if (!includeString) {
        return null;
    }
    if (typeof includeString != "string") {
        includeString = "" + includeString;
    }
    var index = includeString.indexOf("#");
    if (index == -1)
        return null;
    var referenceString = index == includeString.length - 1 ? "" : includeString.substring(index + 1, includeString.length);
    var segments = referenceString.split("/");
    if (segments.length == 0)
        return null;
    if (segments[0].trim() == "") {
        segments.splice(0, 1);
    }
    return new IncludeReferenceImpl(referenceString, getIncludePath(includeString), segments);
}
exports.getIncludeReference = getIncludeReference;
/**
 * Factory method returning all include reference resolvers, registered in the system.
 */
function getIncludeReferenceResolvers() {
    return [new JSONResolver(), new XMLResolver()];
}
exports.getIncludeReferenceResolvers = getIncludeReferenceResolvers;
/**
 * Checks all resolvers, finds the suitable one, resolves the reference and returns the result
 * of resolving. Returns null if no suitable resolver is found or resolver itself fails to resolve.
 * @param includeString - complete include string
 * @param content - include contents
 */
function resolveContents(includeString, content) {
    if (!includeString) {
        return content;
    }
    var reference = getIncludeReference(includeString);
    if (!reference) {
        return content;
    }
    var includePath = getIncludePath(includeString);
    return resolve(includePath, reference, content).content;
}
exports.resolveContents = resolveContents;
/**
 * Checks all resolvers, finds the suitable one, resolves the reference and returns the result
 * of resolving. Returns null if no suitable resolver is found or resolver itself fails to resolve.
 * @param includePath
 * @param includeReference
 * @param content
 */
function resolve(includePath, includeReference, content) {
    var resolver = _.find(getIncludeReferenceResolvers(), function (currentResolver) { return currentResolver.isApplicable(includePath, content); });
    if (!resolver)
        return {
            content: content,
            validation: []
        };
    return resolver.resolveReference(content, includeReference);
}
exports.resolve = resolve;
function completeReference(includePath, includeReference, content) {
    if (!content) {
        return [];
    }
    var resolver = _.find(getIncludeReferenceResolvers(), function (currentResolver) { return currentResolver.isApplicable(includePath, content); });
    if (!resolver)
        return [];
    return resolver.completeReference(content, includeReference);
}
exports.completeReference = completeReference;
var IncludeReferenceImpl = /** @class */ (function () {
    function IncludeReferenceImpl(originalString, includePath, segments) {
        this.includePath = includePath;
        this.segments = segments;
        this.originalString = originalString;
    }
    IncludeReferenceImpl.prototype.getIncludePath = function () {
        return this.includePath;
    };
    IncludeReferenceImpl.prototype.getFragments = function () {
        return this.segments;
    };
    IncludeReferenceImpl.prototype.asString = function () {
        return this.originalString;
    };
    IncludeReferenceImpl.prototype.encodedName = function (withExtention) {
        if (withExtention === void 0) { withExtention = true; }
        return base64.encode(new Buffer(this.includePath + '/' + this.asString())) + (withExtention ? this.includePath.substring(this.includePath.lastIndexOf('.')) : '');
    };
    return IncludeReferenceImpl;
}());
var JSONResolver = /** @class */ (function () {
    function JSONResolver() {
    }
    JSONResolver.prototype.isApplicable = function (includePath, content) {
        return includePath && (endsWith(includePath.trim(), '.js') || endsWith(includePath.trim(), '.json'));
    };
    JSONResolver.prototype.resolveReference = function (content, reference) {
        try {
            var resultJson = {};
            resultJson['$ref'] = reference.getIncludePath() + '#' + reference.getFragments().map(function (x) { return "/" + x; }).join("");
            return {
                content: JSON.stringify(resultJson, null, 2),
                validation: []
            };
        }
        catch (Error) {
            console.log(Error);
        }
        return {
            content: content,
            validation: []
        };
    };
    JSONResolver.prototype.completeReference = function (content, reference) {
        try {
            var jsonRoot = JSON.parse(content);
            var fragments = reference.getFragments();
            if (!fragments || fragments.length == 0) {
                return this.getChildren(jsonRoot);
            }
            var currentJSON = jsonRoot;
            var emptyPrefixCompletion = reference.asString().lastIndexOf("/") == reference.asString().length - 1;
            var limit = emptyPrefixCompletion ? fragments.length : fragments.length - 1;
            for (var i = 0; i < fragments.length - 1; i++) {
                var fragment = fragments[i];
                currentJSON = this.findChild(currentJSON, fragment);
                if (!currentJSON) {
                    return [];
                }
            }
            if (emptyPrefixCompletion) {
                return this.getChildren(currentJSON);
            }
            else {
                var lastPrefix = fragments[fragments.length - 1];
                var result = [];
                this.getChildren(currentJSON).forEach(function (child) {
                    if (child.indexOf(lastPrefix) == 0) {
                        result.push(child);
                    }
                });
                return result;
            }
        }
        catch (Error) {
            console.log(Error);
        }
        return [];
    };
    JSONResolver.prototype.findChild = function (jsonObject, fragment) {
        var decoded = fragment.replace('~1', '/');
        decoded = fragment.replace('~0', '~');
        return jsonObject[decoded];
    };
    JSONResolver.prototype.getChildren = function (jsonObject) {
        return Object.keys(jsonObject);
    };
    return JSONResolver;
}());
var parserOptions = {
    errorHandler: {
        warning: function () { return null; },
        error: function () { return null; },
        fatalError: function () { return null; }
    }
};
var XMLResolver = /** @class */ (function () {
    function XMLResolver() {
    }
    XMLResolver.prototype.isApplicable = function (includePath, content) {
        return includePath && (endsWith(includePath.trim(), '.xml') || endsWith(includePath.trim(), '.xsd'));
    };
    XMLResolver.prototype.resolveReference = function (content, reference) {
        try {
            var doc = new DOMParser(parserOptions).parseFromString(content);
            var requestedName = reference.asString();
            var uniqueName = reference.encodedName(false);
            var schema = elementChildrenByName(doc, 'xs:schema')[0];
            var elements = elementChildrenByName(schema, 'xs:element');
            var types = elementChildrenByName(schema, 'xs:complexType');
            var canBeElement = _.find(elements, function (element) { return element.getAttribute('name') === requestedName; });
            var canBeType = canBeElement ? _.find(types, function (type) { return type.getAttribute('name') === canBeElement.getAttribute('type'); }) : _.find(types, function (type) { return type.getAttribute('name') === requestedName; });
            var element = doc.createElement('xs:element');
            element.setAttribute('name', uniqueName);
            if (canBeType) {
                element.setAttribute('type', canBeType.getAttribute('name'));
            }
            if (canBeElement) {
                element.setAttribute('originalname', canBeElement.getAttribute('name'));
            }
            element.setAttribute('requestedname', requestedName);
            element.setAttribute('extraelement', 'true');
            schema.appendChild(element);
            var serialized = doc.toString();
            var resultContents = serialized;
            //Enforcing new line in the end of xml header as different implementations of
            //XMLSerializer behave differently regarding this char, which makes tests to fail.
            var headerEndIndex = serialized.indexOf("?>");
            if (headerEndIndex > 0 && serialized.length > headerEndIndex + 2) {
                var potentialNewLineChar = serialized.charAt(headerEndIndex + 2);
                if (potentialNewLineChar != '\n') {
                    resultContents = serialized.slice(0, headerEndIndex + 2) + '\n' +
                        serialized.slice(headerEndIndex + 2);
                }
            }
            return {
                content: resultContents,
                validation: []
            };
        }
        catch (throwable) {
            console.log(throwable);
        }
        return {
            content: content,
            validation: []
        };
    };
    XMLResolver.prototype.completeReference = function (content, reference) {
        try {
            var doc = new DOMParser(parserOptions).parseFromString(content);
            var result = [];
            var schema = elementChildrenByName(doc, 'xs:schema')[0];
            var elements = elementChildrenByName(schema, 'xs:element');
            var types = elementChildrenByName(schema, 'xs:complexType');
            elements.forEach(function (element) { return result.push(element.getAttribute('name')); });
            types.forEach(function (type) { return result.push(type.getAttribute('name')); });
            var emptyPrefixCompletion = reference.asString().trim().length === 0;
            if (emptyPrefixCompletion) {
                return result;
            }
            else {
                return result.filter(function (value) { return value.indexOf(reference.asString()) === 0; });
            }
        }
        catch (exception) {
            return [];
        }
    };
    return XMLResolver;
}());
function endsWith(input, ends) {
    if (!input) {
        return false;
    }
    if (!ends) {
        return false;
    }
    return input.lastIndexOf(ends) === (input.length - ends.length);
}
function elementChildrenByName(parent, tagName) {
    var elements = parent.getElementsByTagName(tagName);
    var result = [];
    for (var i = 0; i < elements.length; i++) {
        var child = elements[i];
        if (child.parentNode === parent) {
            result.push(child);
        }
    }
    return result;
}
//# sourceMappingURL=includeRefResolvers.js.map