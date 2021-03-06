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
var def = require("raml-definition-system");
var marked = require("marked");
var services = def;
function def2Doc(t, refPrefix) {
    //result.push("<input type='checkbox' />Hello</input>")
    if (refPrefix === void 0) { refPrefix = ''; }
    return head() + hide() +
        //generateAdjust("inherited","Show inherited properties") +
        //generateAdjust("issue","Show issues") +
        //generateAdjust("clarify","Show things to clarify") +
        "<h1 id='-a-name-appendix'><a name='Index'>Index of used types</a></h1>" +
        genIndex(t, {}, refPrefix).map(function (x) { return '<li>' + x + '</li>'; }).join("\n") +
        genRelatedTypesHierarchy(t, refPrefix).join("\n") +
        "<h1 id='-a-name-appendix'><a name='TypeTables'>Type tables</a></h1><hr/>" +
        genDoc(t, {}, refPrefix).join("\n");
}
exports.def2Doc = def2Doc;
function head() {
    return "<head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <title>IUniverseDescriptor | RAML JS Parser 2</title>\n    <meta name=\"description\" content=\"\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <link rel=\"stylesheet\" href=\"./assets/css/main.css\">\n    <script src=\"./assets/js/modernizr.js\"></script>\n    <style>\n        table, th, td {\n            border: 1px solid black;\n        }\n        th, td {\n            padding: 10px;\n        }\n    </style>\n</head>\n";
}
function hide() {
    return "<script>\n    function hide(className,visible){\n        var visibleString=visible?\"visible\":\"none\";\n        var els=document.getElementsByClassName(className)\n        for (var i=0;i<els.length;i++){\n            els.item(i).setAttribute('style','display:'+visibleString)\n        }\n\n    }</script>\n    ";
}
exports.hide = hide;
function generateAdjust(className, label) {
    return "\n    <input type='checkbox' checked=\"checked\" onchange=\"hide('" + className + "',arguments[0].srcElement.checked)\">" + label + "</input>\n    ";
}
exports.generateAdjust = generateAdjust;
var shouldSkip = {
    StringType: "string",
    BooleanType: "boolean",
    NumberType: "number",
    ValueType: "Value"
};
function genIndex(t, covered, refPrefix) {
    if (refPrefix === void 0) { refPrefix = ''; }
    var result = [];
    if (t === undefined) {
        return result;
    }
    covered[t.nameId()] = true;
    t.allProperties().forEach(function (x) {
        var r = x.range();
        if (shouldSkip[r.nameId()]) {
            return;
        }
        if (!covered[r.nameId()]) {
            covered[r.nameId()] = true;
            if (!r.hasValueTypeInHierarchy()) {
                result = result.concat(genIndex(r, covered, refPrefix));
            }
            else {
                if (r.hasValueTypeInHierarchy()) {
                    result = result.concat(genIndex(r, covered, refPrefix));
                }
            }
        }
    });
    //result.push("<li>")
    result.push(genRef(t, refPrefix));
    //result.push("</li>")
    t.allSubTypes().forEach(function (r) {
        if (!covered[r.nameId()]) {
            if (!r.hasValueTypeInHierarchy()) {
                covered[r.nameId()] = true;
                result = result.concat(genIndex(r, covered, refPrefix));
            }
        }
    });
    return result.sort();
}
/**
 * Functional wrapper on top of gatherTypes
 */
function gatherTypes2(root) {
    var dict = {};
    var types = [];
    gatherTypes(root, dict);
    Object.keys(dict).forEach(function (k) { return types.push(dict[k]); });
    return types;
}
function gatherTypes(t, covered) {
    if (!t) {
        return;
    }
    covered[t.nameId()] = t;
    t.allProperties().forEach(function (x) {
        var r = x.range();
        if (!covered[r.nameId()]) {
            covered[r.nameId()] = r;
            if (!r.hasValueTypeInHierarchy()) {
                gatherTypes(r, covered);
            }
            else {
                if (r.hasValueTypeInHierarchy()) {
                    gatherTypes(r, covered);
                }
            }
        }
    });
    t.allSubTypes().forEach(function (r) {
        if (!covered[r.nameId()]) {
            if (!r.hasValueTypeInHierarchy()) {
                covered[r.nameId()] = r;
                gatherTypes(r, covered);
            }
        }
    });
    t.superTypes().forEach(function (r) {
        if (!covered[r.nameId()]) {
            covered[r.nameId()] = r;
            gatherTypes(r, covered);
        }
    });
}
function genRelatedTypesHierarchy(t, refPrefix) {
    if (refPrefix === void 0) { refPrefix = ''; }
    var allTypes = {};
    var rs = [];
    rs.push("<h1 id='-a-name-appendix'><a name='TypeHierarchy'>Complete Type hierarchy</a></h1>");
    gatherTypes(t, allTypes);
    rs.push('<ul>');
    Object.keys(allTypes).forEach(function (x) {
        var tp = allTypes[x];
        if (tp.superTypes().length == 0) {
            rs.push("<li>" + (genRef(tp, refPrefix) + genListChildren(tp, 0, refPrefix)) + "</li>");
        }
    });
    rs.push('</ul>');
    return rs;
}
function genListChildren(t, level, refPrefix) {
    if (refPrefix === void 0) { refPrefix = ''; }
    var rs = "<ul>";
    t.subTypes().forEach(function (x) {
        rs += "<li>" + genRef(x, refPrefix);
        rs += genListChildren(x, level + 1, refPrefix);
        rs += "</li>";
    });
    rs += "</ul>";
    return rs;
}
function genDoc(t, covered, refPrefix) {
    if (refPrefix === void 0) { refPrefix = ''; }
    var result = [];
    if (!t) {
        return result;
    }
    covered[t.nameId()] = true;
    t.allProperties().filter(function (x) { return !x.getAdapter(services.RAMLPropertyDocumentationService).isHidden(); }).forEach(function (x) {
        var r = x.range();
        if (shouldSkip[r.nameId()]) {
            return;
        }
        if (!covered[r.nameId()]) {
            covered[r.nameId()] = true;
            if (!r.hasValueTypeInHierarchy() && !r.hasUnionInHierarchy()) {
                result = result.concat(genDoc(r, covered, refPrefix));
            }
            else {
                if (r.hasValueTypeInHierarchy()) {
                    result = result.concat(generateValueTypeDocumentation(r, refPrefix));
                }
            }
        }
    });
    result.push(table(new ClassDataProvider2(t), true, refPrefix));
    t.allSubTypes().forEach(function (r) {
        if (!covered[r.nameId()]) {
            if (!r.hasValueTypeInHierarchy()) {
                covered[r.nameId()] = true;
                result = result.concat(genDoc(r, covered, refPrefix));
            }
        }
    });
    return result;
}
exports.genDoc = genDoc;
function genClassTable(t, includeSuperTypes, refPrefix) {
    if (refPrefix === void 0) { refPrefix = ''; }
    return table(new ClassDataProvider2(t, includeSuperTypes), refPrefix.indexOf('ref') >= 0, refPrefix);
}
exports.genClassTable = genClassTable;
var PropertyProvider = /** @class */ (function () {
    function PropertyProvider(_clazz, _property) {
        this._clazz = _clazz;
        this._property = _property;
    }
    PropertyProvider.prototype.value = function () {
        return this._property;
    };
    PropertyProvider.prototype.getColumnValue = function (c, refPrefix) {
        if (refPrefix === void 0) { refPrefix = ''; }
        return c.value(this._property, refPrefix);
    };
    PropertyProvider.prototype.getClassName = function () {
        return this._clazz == this._property.domain() ? "owned" : "inherited";
    };
    PropertyProvider.prototype.extraStyles = function (c) {
        return c.extraStyles(this._property);
    };
    return PropertyProvider;
}());
exports.PropertyProvider = PropertyProvider;
var NameColumn = /** @class */ (function () {
    function NameColumn() {
        this.widthAsPercent = function () { return 25; };
    }
    NameColumn.prototype.extraStyles = function (c) {
        return "";
    };
    NameColumn.prototype.title = function () {
        return "Property";
    };
    NameColumn.prototype.value = function (c) {
        //let docTableName = c.getAdapter(services.RAMLPropertyDocumentationService).docTableName();
        //let name = (docTableName ? docTableName : c.nameId());
        var name = c.nameId();
        return "<strong>" + name + "</strong>" + (c.isRequired() ? "" : "?") + (c.isKey() ? "<em> (key) </em>" : "");
    };
    return NameColumn;
}());
exports.NameColumn = NameColumn;
var DescriptionColumn = /** @class */ (function () {
    function DescriptionColumn() {
        this.widthAsPercent = function () { return 45; };
    }
    DescriptionColumn.prototype.extraStyles = function (c) {
        return "";
    };
    DescriptionColumn.prototype.title = function () {
        return "Description";
    };
    DescriptionColumn.prototype.value = function (c) {
        return c.description();
    };
    return DescriptionColumn;
}());
exports.DescriptionColumn = DescriptionColumn;
var MarkdownDescriptionColumn = /** @class */ (function (_super) {
    __extends(MarkdownDescriptionColumn, _super);
    function MarkdownDescriptionColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarkdownDescriptionColumn.prototype.extraStyles = function (c) {
        return "";
    };
    MarkdownDescriptionColumn.prototype.value = function (c) {
        var mdd = c.getAdapter(services.RAMLPropertyDocumentationService).markdownDescription();
        if (mdd) {
            return mdd;
        }
        return _super.prototype.value.call(this, c);
    };
    return MarkdownDescriptionColumn;
}(DescriptionColumn));
exports.MarkdownDescriptionColumn = MarkdownDescriptionColumn;
var RangeColumn = /** @class */ (function () {
    function RangeColumn() {
        this.widthAsPercent = function () { return 30; };
    }
    RangeColumn.prototype.extraStyles = function (c) {
        return c.isValueProperty() ? "background-color:lightgray;" : "background-color:yellow";
    };
    RangeColumn.prototype.title = function () {
        return "Range and Notes";
    };
    RangeColumn.prototype.value = function (c, refPrefix) {
        if (refPrefix === void 0) { refPrefix = ''; }
        var ver = '1.0';
        if (refPrefix && refPrefix.length > 0 && refPrefix.indexOf('08') >= 0) {
            ver = '0.8';
        }
        if (refPrefix) {
            refPrefix = "/references/" + ver + "/#raml-" + ver.replace('.', '') + "-ref-";
        }
        //var rs=`<a href='${refPrefix}${c.range().name()}' >${c.range().name()}</a>`+(c.isMultiValue()?"[]":"");
        var rs = "";
        var documentationService = c.getAdapter(services.RAMLPropertyDocumentationService);
        if (!documentationService.valueDescription() || documentationService.valueDescription().trim().length == 0) {
            rs = c.range().nameId() + (c.isMultiValue() ? "[]" : "");
        }
        //if (shouldSkip[c.range().name()]){
        //    rs=shouldSkip[c.range().name()]+(c.isMultiValue()?"[]":"");
        //}
        if (c.enumOptions() && c.nameId() != 'allowedTargets') {
            rs += "<br>one of: " + c.enumOptions().join(", ");
            if (c.domain().getAdapter(services.RAMLService).getRuntimeExtenders().length > 0) {
                rs += "<p>(this enum is open and allows extension by dynamically contributed types declared by ";
                c.domain().getAdapter(services.RAMLService).getRuntimeExtenders().forEach(function (x) { rs += genRef(x); });
                rs += ")</p>";
            }
        }
        if (c.domain().getAdapter(services.RAMLService).getRuntimeExtenders().length != 0 && c.isDescriminator()) {
            rs += " also allows runtime value extensions from " + c.domain().getAdapter(services.RAMLService).getRuntimeExtenders()[0].nameId();
        }
        if (c.defaultValue()) {
            rs += '<p><em>Default value:' + c.defaultValue() + "</em></p>";
        }
        if (c.getAdapter(services.RAMLPropertyParserService).isSystem()) {
            rs += "<small>(System value )</small>";
        }
        if (c.inheritedContextValue()) {
            rs += "<p><small>can inherit value from context property:" + c.inheritedContextValue() + "</p></small>";
        }
        if (c.getCanBeDuplicator()) {
            //TODO NEED BETTER DESC
            rs += "<p><small>this property may be repeated multiple times, and it will cause duplication of parent node with extra attributes " +
                "inherited or overriden from this mapping children(only used for multiple parameter types)</small></p>";
        }
        if (c.isDescriminator()) {
            rs += "<b>Descriminating Property</b>";
        }
        if (c.getContextRequirements().length > 0) {
            rs += '<h3>Context requirements:</h3>';
            c.getContextRequirements().forEach(function (x) {
                rs += "<p class='req'><span >" + x.name + "=" + x.value + "</span></p>";
            });
        }
        return rs;
    };
    return RangeColumn;
}());
exports.RangeColumn = RangeColumn;
var ValueTypeColumn = /** @class */ (function (_super) {
    __extends(ValueTypeColumn, _super);
    function ValueTypeColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValueTypeColumn.prototype.extraStyles = function (c) {
        return ""; //c.isValueProperty()?"background-color:lightgray;":"background-color:yellow";
    };
    ValueTypeColumn.prototype.title = function () {
        return "Value type";
    };
    ValueTypeColumn.prototype.value = function (c, refPrefix) {
        if (refPrefix === void 0) { refPrefix = ''; }
        var vd = c.getAdapter(services.RAMLPropertyDocumentationService).valueDescription();
        if (vd != null) {
            var sv = _super.prototype.value.call(this, c, refPrefix);
            if (sv.indexOf('href') >= 0) {
                vd += '<br>' + sv;
            }
            return vd;
        }
        return _super.prototype.value.call(this, c, refPrefix);
    };
    return ValueTypeColumn;
}(RangeColumn));
exports.ValueTypeColumn = ValueTypeColumn;
function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;
    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
    return replacedText;
}
var ClassDataProvider = /** @class */ (function () {
    function ClassDataProvider(_node, _includeSuper) {
        if (_includeSuper === void 0) { _includeSuper = true; }
        this._node = _node;
        this._includeSuper = _includeSuper;
        if (!this._node) {
            console.log("error");
        }
    }
    ClassDataProvider.prototype.title = function () {
        return this._node ? this._node.nameId() : 'unknown type';
    };
    ClassDataProvider.prototype.about = function (refPrefix) {
        if (refPrefix === void 0) { refPrefix = ''; }
        if (!this._node) {
            return "<p>Can not process unknown type.</p>";
        }
        var rs = "";
        if (this._node.superTypes().length > 0) {
            this._node.valueRequirements().forEach(function (y) {
                rs += "requires " + y.name + '=' + y.value;
            });
            this._node.superTypes().forEach(function (x) {
                rs += " extends " + genRef(x, refPrefix);
            });
        }
        if (this._node.getAdapter(services.RAMLService).getAllowAny()) {
            rs += "<h3>This node allows any children</h3>";
        }
        if (this._node.getAdapter(services.RAMLService).isGlobalDeclaration()) {
            rs += "Globally declarates referencable instance of ";
            if (this._node.getAdapter(services.RAMLService).getActuallyExports() && this._node.getAdapter(services.RAMLService).getActuallyExports() != "$self") {
                var tp = this._node.property(this._node.getAdapter(services.RAMLService).getActuallyExports()).range();
                rs += genRef(tp, refPrefix);
            }
            else {
                rs += genRef(this._node, refPrefix);
            }
            rs += "";
        }
        var arr = [];
        appendMethodDocs(this._node, arr);
        rs += arr.join("\n");
        if (this._node.getAdapter(services.RAMLService).getContextRequirements().length > 0) {
            rs += '<h3>Context requirements:</h3>';
            this._node.getAdapter(services.RAMLService).getContextRequirements().forEach(function (x) {
                rs += "<li>" + x.name + "=" + x.value + "</li>";
            });
        }
        rs += "<p>Description:";
        if (!this._node.description()) {
            rs += "Not described yet";
        }
        rs += this._node.description();
        rs += "</p>";
        return rs;
    };
    ClassDataProvider.prototype.getColumns = function () {
        return [new NameColumn(), new RangeColumn(), new DescriptionColumn()];
    };
    ClassDataProvider.prototype.getRows = function () {
        var _this = this;
        if (!this._node) {
            return [];
        }
        if (this._includeSuper) {
            return this._node.allProperties().filter(function (x) { return !x.getAdapter(services.RAMLPropertyDocumentationService).isHidden()
                && !x.isKey(); }).map(function (x) { return new PropertyProvider(_this._node, x); });
        }
        return this._node.properties().filter(function (x) { return !x.getAdapter(services.RAMLPropertyDocumentationService).isHidden()
            && !x.isKey(); }).map(function (x) { return new PropertyProvider(_this._node, x); });
    };
    return ClassDataProvider;
}());
exports.ClassDataProvider = ClassDataProvider;
var ClassDataProvider2 = /** @class */ (function (_super) {
    __extends(ClassDataProvider2, _super);
    function ClassDataProvider2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassDataProvider2.prototype.getColumns = function () {
        return [new NameColumn(), new MarkdownDescriptionColumn(), new ValueTypeColumn()];
    };
    return ClassDataProvider2;
}(ClassDataProvider));
exports.ClassDataProvider2 = ClassDataProvider2;
function genRef(x, refPrefix) {
    if (refPrefix === void 0) { refPrefix = ''; }
    return "<a href='#" + refPrefix + x.nameId() + "'>" + x.nameId() + "</a>";
}
var appendMethodDocs = function (v, result) {
    //if (v.methods().length > 0) {
    //    result.push("<h3>Exports methods:</h3>")
    //    v.methods().forEach(x=> {
    //        result.push("<h4>" + x.name + "</h4>" + "<code>" + x.text + "</code>");
    //    })
    //}
};
function generateValueTypeDocumentation(v, refPrefix) {
    if (refPrefix === void 0) { refPrefix = ''; }
    var result = [
        "<h2 class=\"a\" id=\"" + refPrefix + v.nameId() + "\">" + v.nameId() + "</h2>",
        marked(v.description()),
        "<table>"
    ];
    appendMethodDocs(v, result);
    if (def.EnumType.isInstance(v)) {
        var et = v;
        result.push("Enum values:");
        result.push("<ul>");
        et.values.forEach(function (x) { return result.push("<li>" + x + "</li>"); });
        result.push("</ul>");
    }
    if (def.ReferenceType.isInstance(v)) {
        var refType = v;
        result.push("Instantiation of " + genRef(refType.getReferencedType()));
    }
    return result.join("\n");
}
exports.generateValueTypeDocumentation = generateValueTypeDocumentation;
function table(d, isInRefSection, refPrefix) {
    if (isInRefSection === void 0) { isInRefSection = false; }
    if (refPrefix === void 0) { refPrefix = ''; }
    var result = [];
    if (isInRefSection) {
        result.push("<h2 class=\"a\"><a name='" + refPrefix + d.title() + "'>" + d.title() + "</a></h2>");
        result.push(d.about(refPrefix));
    }
    result.push("<table>");
    result.push("<tr>");
    d.getColumns().forEach(function (x) {
        result.push("<th width=\"" + x.widthAsPercent() + "%\">" + x.title() + "</th>");
    });
    result.push("</tr>");
    d.getRows().forEach(function (x) {
        result.push("<tr class=\"" + x.getClassName() + "\">");
        d.getColumns().forEach(function (y) {
            result.push("<td>");
            result.push(x.getColumnValue(y, refPrefix));
            result.push("</td>");
        });
        result.push("<tr>");
    });
    result.push("</table>");
    return result.join("\n");
}
exports.table = table;
//# sourceMappingURL=docGen.js.map