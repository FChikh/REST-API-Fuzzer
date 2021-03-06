"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var def = require("raml-definition-system");
var td = require("ts-model");
var util = require("../util/index");
var tsModel = require("ts-structure-parser");
var helperMethodExtractor = tsModel.helpers;
var _ = require("underscore");
var path = require("path");
var parserCoreModuleVar = 'core';
var helperSources = {
    "RAML10": {
        "helper": {
            "source": path.resolve(__dirname, "../../src/parser/wrapped-ast/wrapperHelper.ts"),
            "import": "../../parser/wrapped-ast/wrapperHelper"
        }
    },
    "RAML08": {
        "helper": {
            "source": path.resolve(__dirname, "../../src/parser/wrapped-ast/wrapperHelper08.ts"),
            "import": "../../parser/wrapped-ast/wrapperHelper08"
        }
    }
};
var ParserGenerator = /** @class */ (function () {
    function ParserGenerator() {
        this.interfaceModule = new td.TSAPIModule();
        this.implementationModule = new td.TSAPIModule();
        this.processed = {};
        this.typeMap = {
            'StringType': 'string',
            'NumberType': 'number',
            'BooleanType': 'boolean',
            'AnyType': 'any'
        };
    }
    ParserGenerator.prototype.processType = function (u, generateConstructor) {
        var _this = this;
        var isCustom = u.isCustom();
        var typeName = u.nameId();
        if (this.processed[typeName]) {
            return;
        }
        this.processed[typeName] = u;
        u.superTypes().forEach(function (x) { return _this.processType(x, generateConstructor); });
        var idcl = new td.TSInterface(this.interfaceModule, typeName);
        idcl._comment = u.description();
        var dcl = new td.TSClassDecl(this.implementationModule, typeName + "Impl");
        dcl._comment = u.description();
        if (u.superTypes().length == 0) {
            if ((generateConstructor || u.hasValueTypeInHierarchy())
                && typeName != 'ValueType'
                && typeName != 'Reference') {
                var _constructor = new td.TSConstructor(dcl);
                _constructor.parameters = [
                    new td.Param(_constructor, 'attr', td.ParamLocation.OTHER, new td.TSSimpleTypeReference(td.Universe, 'hl.IAttribute'))
                ];
                _constructor._body = '';
            }
        }
        else if (def.NodeClass.isInstance(u)) {
            var _constructor = new td.TSConstructor(dcl);
            _constructor.parameters = [
                new td.Param(_constructor, 'nodeOrKey', td.ParamLocation.OTHER, new td.TSSimpleTypeReference(td.Universe, 'hl.IHighLevelNode|string')),
                new td.Param(_constructor, 'setAsTopLevel', td.ParamLocation.OTHER, new td.TSSimpleTypeReference(td.Universe, 'boolean'), true)
            ];
            _constructor._body = "super((typeof  nodeOrKey==\"string\")?create" + u.nameId() + "(<string>nodeOrKey):<hl.IHighLevelNode>nodeOrKey,setAsTopLevel)";
        }
        dcl.implements.push(new td.TSSimpleTypeReference(td.Universe, idcl.name));
        var implementaionQueue = [u].concat(this.extractSecondarySupertypes(u));
        var implementationHasSupertypes = false;
        if (typeName == 'Reference' || typeName == 'ValueType') {
            idcl.extends.push(new td.TSSimpleTypeReference(td.Universe, 'core.AttributeNode'));
            dcl.extends.push(new td.TSSimpleTypeReference(td.Universe, 'core.AttributeNodeImpl'));
            implementationHasSupertypes = true;
        }
        else {
            u.superTypes().forEach(function (x) {
                idcl.extends.push(new td.TSSimpleTypeReference(td.Universe, x.nameId()));
            });
            if (u.superTypes().length > 0) {
                dcl.extends.push(new td.TSSimpleTypeReference(td.Universe, u.superTypes()[0].nameId() + "Impl"));
                implementationHasSupertypes = true;
            }
        }
        u.properties().forEach(function (x) { return _this.createMethodDecl(idcl, x); });
        implementaionQueue.forEach(function (y) { return y.properties().forEach(function (x) {
            var z = _this.createMethodDecl(dcl, x);
            if (z) {
                z._body = _this.generateBody(x);
                if (_this.typeMap[x.range().nameId()] || x.range().nameId() == 'AnyType') {
                    _this.createSetterMethodDecl(dcl, x);
                }
            }
        }); });
        u.customProperties().forEach(function (x) {
            _this.createMethodDecl(idcl, x);
        });
        if (dcl.extends.length == 0) {
            if (!u.isCustom()) {
                if (u.hasValueTypeInHierarchy()) {
                    idcl.extends.push(new td.TSSimpleTypeReference(td.Universe, "core.AbstractWrapperNode"));
                }
                else {
                    idcl.extends.push(new td.TSSimpleTypeReference(td.Universe, "core.BasicNode"));
                    dcl.extends.push(new td.TSSimpleTypeReference(td.Universe, "core.BasicNodeImpl"));
                    implementationHasSupertypes = true;
                }
            }
        }
        this.addImplementationMethod(dcl, 'wrapperClassName', 'string', "return \"" + typeName + "Impl\";", '@hidden\n@return Actual name of instance class');
        this.addImplementationMethod(dcl, 'kind', 'string', "return \"" + typeName + "\";", '@return Actual name of instance interface');
        if (implementationHasSupertypes) {
            this.addImplementationMethod(dcl, 'allKinds', 'string[]', "return super.allKinds().concat(\"" + typeName + "\");", '@return Actual name of instance interface and all of its superinterfaces');
        }
        else {
            this.addImplementationMethod(dcl, 'allKinds', 'string[]', "return [\"" + typeName + "\"];", '@return Actual name of instance interface and all of its superinterfaces');
        }
        var classIdentifider = this.ramlVersion + "." + typeName + "Impl";
        if (implementationHasSupertypes) {
            this.addImplementationMethod(dcl, 'allWrapperClassNames', 'string[]', "return super.allWrapperClassNames().concat(\"" + classIdentifider + "\");", '@return Actual name of instance class and all of its superclasses');
        }
        else {
            this.addImplementationMethod(dcl, 'allWrapperClassNames', 'string[]', "return [\"" + classIdentifider + "\"];", '@return Actual name of instance class and all of its superclasses');
        }
        // this.addImplementationSingleparamMethod(dcl,'isInstance', `instance is ${typeName}Impl`,
        //     'instance', 'any',
        //     this.generateIsInstanceBody(classIdentifider),'@return Whether specified object is an instance of this class', true);
        this.addImplementationSingleparamMethod(dcl, 'isInstance', "boolean", 'instance', 'any', this.generateIsInstanceBody(classIdentifider), '@return Whether specified object is an instance of this class', true);
        this.addImplementationMethod(dcl, 'RAMLVersion', 'string', "return \"" + this.ramlVersion + "\";", '@return RAML version of the node');
        if (typeName == 'ValueType') {
            var valueComment = '@return JS representation of the node value';
            this.addInterfaceMethod(idcl, 'value', 'any', valueComment);
            this.addImplementationMethod(dcl, 'value', 'any', 'return this.attr.value();', valueComment);
        }
        else if (typeName == 'StringType') {
            var valueComment = '@return String representation of the node value';
            this.addInterfaceMethod(idcl, 'value', 'string', valueComment);
            this.addImplementationMethod(dcl, 'value', 'string', 'return this.attr.value();', valueComment);
        }
        else if (typeName == 'NumberType') {
            var valueComment = '@return Number representation of the node value';
            this.addInterfaceMethod(idcl, 'value', 'number', valueComment);
            this.addImplementationMethod(dcl, 'value', 'number', 'return this.attr.value();', valueComment);
        }
        else if (typeName == 'BooleanType') {
            var valueComment = '@return Boolean representation of the node value';
            this.addInterfaceMethod(idcl, 'value', 'boolean', valueComment);
            this.addImplementationMethod(dcl, 'value', 'boolean', 'return this.attr.value();', valueComment);
        }
        else if (typeName == 'Reference') {
            var valueComment = '@return StructuredValue object representing the node value';
            this.addImplementationMethod(dcl, 'value', 'hl.IStructuredValue', 'return core.toStructuredValue(this.attr);', valueComment);
            this.addInterfaceMethod(idcl, 'value', 'hl.IStructuredValue', valueComment);
        }
        this.addHelperMethods(u, idcl);
        this.addHelperMethods(u, dcl, true);
        u.subTypes().forEach(function (x) { return _this.processType(x); });
        if (isCustom) {
            this.implementationModule.removeChild(dcl);
        }
        this.generatePrimitivesAnnotations(u, idcl, dcl);
    };
    ParserGenerator.prototype.generateIsInstanceBody = function (classIdentifier) {
        return "\n        if(instance != null && instance.allWrapperClassNames\n            && typeof(instance.allWrapperClassNames) == \"function\"){\n\n            for (let currentIdentifier of instance.allWrapperClassNames()){\n                if(currentIdentifier == \"" + classIdentifier + "\") return true;\n            }\n        }\n\n        return false;\n";
    };
    ParserGenerator.prototype.generatePrimitivesAnnotations = function (u, interfaceModel, classModel) {
        var isCustom = u.isCustom();
        if (isCustom && u.nameId() != def.universesInfo.Universe10.ExampleSpec.name) {
            return;
        }
        if (u.universe().version() != "RAML10") {
            return;
        }
        if (u.isValueType()) {
            return;
        }
        if (u.isAssignableFrom('TypeInstance')) {
            return;
        }
        if (u.isAssignableFrom('TypeInstanceProperty')) {
            return;
        }
        var scalarProperties = this.annotableScalarProperties(u);
        if (scalarProperties.length == 0) {
            return;
        }
        var typeName = u.nameId();
        var iName = typeName + "ScalarsAnnotations";
        var idcl = new td.TSInterface(this.interfaceModule, iName);
        var typeComment = typeName + " scalar properties annotations accessor";
        idcl._comment = typeComment;
        var cName = typeName + "ScalarsAnnotationsImpl";
        var dcl = new td.TSClassDecl(this.implementationModule, cName);
        dcl._comment = typeComment;
        dcl.implements.push(new td.TSSimpleTypeReference(td.Universe, idcl.name));
        var superTypes = u.superTypes();
        while (superTypes.length > 0) {
            var superType = superTypes[0];
            if (this.annotableScalarProperties(superType).length > 0) {
                var superTypeName = superType.nameId();
                var superInterfaceName = superTypeName + "ScalarsAnnotations";
                idcl.extends.push(new td.TSSimpleTypeReference(td.Universe, superInterfaceName));
                dcl.extends.push(new td.TSSimpleTypeReference(td.Universe, superTypeName + "ScalarsAnnotationsImpl"));
                break;
            }
            superTypes = superType.superTypes();
        }
        if (dcl.extends.length == 0) {
            var _constructor = new td.TSConstructor(dcl);
            _constructor.parameters = [
                new td.Param(_constructor, 'node', td.ParamLocation.OTHER, new td.TSSimpleTypeReference(td.Universe, 'hl.IHighLevelNode'))
            ];
            _constructor._body = '';
        }
        for (var _i = 0, scalarProperties_1 = scalarProperties; _i < scalarProperties_1.length; _i++) {
            var prop = scalarProperties_1[_i];
            var propName = prop.nameId();
            var returnType;
            var body;
            if (prop.isMultiValue() || prop.range().isArray()) {
                returnType = "AnnotationRef[][]";
                body = "\n        var attrs = this.node.attributes(\"" + propName + "\");\n        return <AnnotationRef[][]>attrs.map(x=>{\n            var annotationAttrs = x.annotations();\n            var result = core.attributesToValues(annotationAttrs,(a:hl.IAttribute)=>new AnnotationRefImpl(a));\n            return result;\n        });\n";
            }
            else {
                returnType = "AnnotationRef[]";
                body = "\n        var attr = this.node.attr(\"" + propName + "\");\n        if(attr==null){\n          return [];\n        }\n        var annotationAttrs = attr.annotations();\n        var result = core.attributesToValues(annotationAttrs,(a:hl.IAttribute)=>new AnnotationRefImpl(a));\n        return <AnnotationRef[]>result;\n";
            }
            var methodComment = typeName + "." + propName + " annotations";
            this.addInterfaceMethod(idcl, propName, returnType, methodComment);
            this.addImplementationMethod(dcl, propName, returnType, body, methodComment);
        }
        this.addInterfaceMethod(interfaceModel, "scalarsAnnotations", iName, "Scalar properties annotations accessor");
        this.addImplementationMethod(classModel, "scalarsAnnotations", cName, "return new " + cName + "(this.highLevel());", "Scalar properties annotations accessor");
        if (isCustom) {
            this.implementationModule.removeChild(dcl);
        }
    };
    ParserGenerator.prototype.annotableScalarProperties = function (u) {
        var scalarProperties = u.properties().filter(function (x) {
            return x.range().isValueType()
                && !x.isFromParentKey()
                && x.nameId() != def.universesInfo.Universe10.Annotable.properties.annotations.name
                && (u.nameId() != def.universesInfo.Universe10.ExampleSpec.name
                    || x.nameId() != def.universesInfo.Universe10.ExampleSpec.properties.value.name);
        });
        return scalarProperties;
    };
    ParserGenerator.prototype.addInterfaceMethod = function (idcl, methodName, returnTypeName, comment) {
        var existing = this.getExistingMethods(idcl, methodName);
        existing.forEach(function (x) { return idcl.removeChild(x); });
        var method = new td.TSAPIElementDeclaration(idcl, methodName);
        method.isFunc = true;
        method.rangeType = new td.TSSimpleTypeReference(method, returnTypeName);
        if (comment && comment.trim().length > 0) {
            method._comment = comment;
        }
        else if (existing.length > 0) {
            method._comment = existing[0]._comment;
        }
        return method;
    };
    ParserGenerator.prototype.getExistingMethods = function (idcl, methodName) {
        var arr = [];
        idcl.children().filter(function (x) {
            if (!(x instanceof td.TSAPIElementDeclaration)) {
                return false;
            }
            var m = x;
            return m.name == methodName;
        }).forEach(function (x) { return arr.push(x); });
        return arr;
    };
    ParserGenerator.prototype.addImplementationMethod = function (dcl, methodName, returnTypeName, body, comment) {
        var existing = this.getExistingMethods(dcl, methodName);
        existing.forEach(function (x) { return dcl.removeChild(x); });
        var method = this.addInterfaceMethod(dcl, methodName, returnTypeName);
        method._body = body;
        if (comment && comment.trim().length > 0) {
            method._comment = comment;
        }
        else if (existing.length > 0) {
            method._comment = existing[0]._comment;
        }
        return method;
    };
    ParserGenerator.prototype.addImplementationSingleparamMethod = function (dcl, methodName, returnTypeName, paramName, paramType, body, comment, isStatic) {
        var existing = this.getExistingMethods(dcl, methodName);
        existing.forEach(function (x) { return dcl.removeChild(x); });
        var method = this.addInterfaceMethod(dcl, methodName, returnTypeName);
        method._body = body;
        if (comment && comment.trim().length > 0) {
            method._comment = comment;
        }
        else if (existing.length > 0) {
            method._comment = existing[0]._comment;
        }
        method.parameters.push(new td.Param(method, paramName, td.ParamLocation.OTHER, new td.TSSimpleTypeReference(method, paramType)));
        method.isStatic = isStatic;
        return method;
    };
    ParserGenerator.prototype.generateBody = function (x) {
        var rangeType = x.range().nameId();
        if (x.isValueProperty()) {
            var args = ["'" + x.nameId() + "'"];
            if (this.typeMap[rangeType]) {
                rangeType = this.typeMap[rangeType];
                args.push("this.to" + util.firstToUpper(rangeType));
            }
            else if (rangeType != 'AnyType') {
                args.push("(attr:hl.IAttribute)=>new " + rangeType + "Impl(attr)");
            }
            if (x.isMultiValue()) {
                return "\n             return <" + rangeType + "[]>super.attributes(" + args.join(', ') + ");\n         ";
            }
            else {
                return "\n             return <" + rangeType + ">super.attribute(" + args.join(', ') + ");\n         ";
            }
        }
        else {
            if (x.isMultiValue()) {
                return "\n             return <" + rangeType + "[]>super.elements('" + x.nameId() + "');\n         ";
            }
            else {
                return "\n             return <" + rangeType + ">super.element('" + x.nameId() + "');\n         ";
            }
        }
    };
    ParserGenerator.prototype.addHelperMethods = function (u, decl, isImpl) {
        var _this = this;
        if (isImpl === void 0) { isImpl = false; }
        this.initHelpers(u);
        var methods = this.helperMethods[u.nameId()];
        if (!methods) {
            return;
        }
        methods.forEach(function (m) {
            if (m.meta.primary && !isImpl) {
                return;
            }
            var methodName = m.wrapperMethodName;
            var existing = _this.getExistingMethods(decl, methodName);
            var existingComment = "";
            if (isImpl) {
                existing.forEach(function (x) {
                    x.name += '_original';
                    var comment = x._comment || "";
                    if (comment.trim().length > 0) {
                        existingComment = comment;
                        comment += "\n";
                    }
                    x._comment = comment + "@hidden";
                });
            }
            else {
                existing.forEach(function (x) { return decl.removeChild(x); });
            }
            var method = new td.TSAPIElementDeclaration(decl, methodName);
            var comment = m.meta.comment || "";
            if (m.meta.deprecated) {
                if (comment.trim().length > 0) {
                    comment += '\n';
                }
                comment += '@deprecated';
            }
            if (existingComment.length > 0) {
                method._comment = existingComment;
            }
            else if (comment.trim().length > 0) {
                method._comment = comment;
            }
            var returnType = _this.createTypeForModel(m.returnType, method);
            method.isFunc = true;
            method.rangeType = returnType;
            m.callArgs().filter(function (x) { return x.name != "this"; }).forEach(function (x) {
                if (!method.parameters) {
                    method.parameters = [];
                }
                var paramType = _this.createTypeForModel(x.type, method);
                method.parameters.push(new td.Param(method, x.name, td.ParamLocation.OTHER, paramType, x.defaultValue));
            });
            if (isImpl) {
                var returnKeyWord = _this.isVoid(returnType) ? "" : "return ";
                method._body = "\n            " + returnKeyWord + "helper." + m.originalName + "(" + m.callArgs().map(function (x) { return x.name; }).join(', ') + ");\n        ";
            }
        });
    };
    ParserGenerator.prototype.isVoid = function (tRef) {
        if (!(tRef instanceof td.TSSimpleTypeReference)) {
            return false;
        }
        return tRef.name == "void";
    };
    ParserGenerator.prototype.createTypeForModel = function (typeModel, method) {
        var rt;
        if (typeModel) {
            var returnTypeComponents = helperMethodExtractor.flatten(typeModel);
            if (returnTypeComponents.length == 1) {
                var rtn = returnTypeComponents[0];
                if (rtn) {
                    rt = new td.TSSimpleTypeReference(method, rtn);
                }
            }
            else {
                var _rt = new td.AnyType();
                returnTypeComponents.forEach(function (x) { return _rt = _rt.union(new td.TSSimpleTypeReference(method, x)); });
                rt = _rt;
            }
        }
        if (!rt) {
            rt = new td.TSSimpleTypeReference(method, "void");
        }
        return rt;
    };
    ParserGenerator.prototype.extractSecondarySupertypes = function (type) {
        var superTypes = type.superTypes().concat(type.getAdapter(def.RAMLService).possibleInterfaces());
        if (superTypes.length < 2) {
            return [];
        }
        var map = {};
        var arr = [superTypes[0]];
        for (var i = 0; i < arr.length; i++) {
            map[arr[i].nameId()] = true;
            arr[i].superTypes().filter(function (x) { return !map[x.nameId()]; }).forEach(function (x) { return arr.push(x); });
        }
        var result = superTypes.filter(function (x) { return !map[x.nameId()]; });
        for (var i = 0; i < result.length; i++) {
            result[i].superTypes().filter(function (x) { return !map[x.nameId()]; }).forEach(function (x) { return result.push(x); });
        }
        return result;
    };
    ParserGenerator.prototype.createSetterMethodDecl = function (dcl, x) {
        var method = new td.TSAPIElementDeclaration(dcl, "set" + x.nameId()[0].toUpperCase() + x.nameId().substr(1));
        method.isFunc = true;
        var tname = "string";
        if (this.typeMap[x.range().nameId()] || x.range().nameId() == 'AnyType') {
            tname = this.typeMap[x.range().nameId()];
        }
        else {
            tname = x.range().nameId();
            this.processType(x.range(), x.isValueProperty());
        }
        var ref = new td.TSSimpleTypeReference(td.Universe, tname);
        method.parameters = [
            new td.Param(method, 'param', td.ParamLocation.OTHER, ref)
        ];
        method._body = "\n            this.highLevel().attrOrCreate(\"" + x.nameId() + "\").setValue(\"\"+param);\n            return this;\n        ";
        method._comment = "@hidden\nSet " + x.nameId() + " value";
        return method;
    };
    ParserGenerator.prototype.createMethodDecl = function (dcl, x) {
        if (x.range().isUnion()) {
            return null;
        }
        var method = new td.TSAPIElementDeclaration(dcl, x.nameId());
        method.isFunc = true;
        var tname = "string";
        if (this.typeMap[x.range().nameId()] || x.range().nameId() == 'AnyType') {
            tname = this.typeMap[x.range().nameId()];
        }
        else {
            tname = x.range().nameId();
            this.processType(x.range(), x.isValueProperty());
        }
        var ref = new td.TSSimpleTypeReference(td.Universe, tname);
        if (x.isMultiValue()) {
            var aRef = new td.TSArrayReference();
            aRef.componentType = ref;
            method.rangeType = aRef;
        }
        else {
            method.rangeType = ref;
        }
        method._comment = x.description() ? x.description().trim() : null;
        return method;
    };
    ParserGenerator.prototype.initHelpers = function (u) {
        var _this = this;
        if (this.helperMethods) {
            return;
        }
        var ver = u.universe().version();
        this.ramlVersion = ver;
        this.helperSources = helperSources[ver];
        if (!this.helperSources) {
            return;
        }
        this.helperMethods = {};
        Object.keys(this.helperSources).forEach(function (src) {
            var sourcePath = _this.helperSources[src]['source'];
            if (!sourcePath) {
                return;
            }
            var methods = helperMethodExtractor.getHelperMethods(sourcePath);
            methods.forEach(function (x) {
                x.targetWrappers().forEach(function (n) {
                    var arr = _this.helperMethods[n];
                    if (!arr) {
                        arr = [];
                        _this.helperMethods[n] = arr;
                    }
                    arr.push(x);
                });
            });
        });
    };
    ParserGenerator.prototype.getApiImportFile = function () {
        var isRaml1 = this.ramlVersion == 'RAML10';
        if (isRaml1) {
            return "./raml10parserapi";
        }
        else {
            return "./raml08parserapi";
        }
    };
    ParserGenerator.prototype.serializeInterfaceToString = function () {
        var isRaml1 = this.ramlVersion == 'RAML10';
        return this.serializeInterfaceImportsToString()
            + this.interfaceModule.serializeToString()
            + this.serializeInstanceofMethodsToString()
            + this.createIsFragmentMethod();
    };
    ParserGenerator.prototype.serializeImplementationToString = function () {
        var isRaml1 = this.ramlVersion == 'RAML10';
        return this.serializeImplementationImportsToString()
            + this.implementationModule.serializeToString()
            + this.createFunctions()
            + this.serializeLoadingMethods();
    };
    ParserGenerator.prototype.serializeInterfaceImportsToString = function () {
        return (this.ramlVersion == 'RAML10' ? raml10parserJsDoc : '') + "\nimport hl=require(\"../../parser/highLevelAST\");\nimport core=require(\"../../parser/wrapped-ast/parserCoreApi\");\n\n";
    };
    ParserGenerator.prototype.serializeInstanceofMethodsToString = function () {
        var _this = this;
        var result = "";
        Object.keys(this.processed).forEach(function (processedName) {
            if (processedName == "TypeInstance"
                || processedName == "TypeInstanceProperty" || processedName == "FragmentDeclaration")
                return;
            var instanceofMethod = "\n/**\n * Custom type guard for " + processedName + ". Returns true if node is instance of " + processedName + ". Returns false otherwise.\n * Also returns false for super interfaces of " + processedName + ".\n */\nexport function is" + processedName + "(node: core.AbstractWrapperNode) : node is " + processedName + " {\n    return node.kind() == \"" + processedName + "\" && node.RAMLVersion() == \"" + _this.ramlVersion + "\";\n}\n\n";
            result += instanceofMethod;
        });
        return result;
    };
    ParserGenerator.prototype.serializeImplementationImportsToString = function () {
        var _this = this;
        var apiInterfaceImports = "";
        Object.keys(this.processed).forEach(function (processedName) {
            apiInterfaceImports += ("import " + processedName + " = pApi." + processedName + ";\n");
            var scalarsAnnotationsaccessorname = processedName + "ScalarsAnnotations";
            if (_this.interfaceModule.getInterface(scalarsAnnotationsaccessorname) != null) {
                apiInterfaceImports += ("import " + scalarsAnnotationsaccessorname
                    + " = pApi." + scalarsAnnotationsaccessorname + ";\n");
            }
        });
        return (this.ramlVersion == 'RAML10' ? raml10parserJsDoc : '') + "\nimport hl=require(\"../../parser/highLevelAST\");\nimport stubs=require(\"../../parser/stubs\");\nimport hlImpl=require(\"../../parser/highLevelImpl\");\nimport jsyaml=require(\"../../parser/jsyaml/jsyaml2lowLevel\");\nimport json2lowlevel = require('../../parser/jsyaml/json2lowLevel');\nimport def=require(\"raml-definition-system\");\nimport services=require(\"../../parser/definition-system/ramlServices\");\nimport core=require(\"../../parser/wrapped-ast/parserCore\");\nimport apiLoader=require(\"../../parser/apiLoader\");\nimport coreApi=require(\"../../parser/wrapped-ast/parserCoreApi\");\nimport pApi = require(\"" + this.getApiImportFile() + "\");\n" + Object.keys(this.helperSources).filter(function (x) { return _this.helperSources[x]['import'] != null; })
            .map(function (x) { return "import " + x + "=require(\"" + _this.helperSources[x]['import'] + "\")"; }).join('\n') + "\n\n" + apiInterfaceImports;
    };
    ParserGenerator.prototype.serializeLoadingMethods = function () {
        return "\n/**\n * Load API synchronously. If the 'rejectOnErrors' option is set to true, [[ApiLoadingError]] is thrown for Api which contains errors.\n * @param apiPath Path to API: local file system path or Web URL\n * @param options Load options\n * @return Api instance.\n **/\nexport function loadApiSync(apiPath:string, options?:coreApi.Options):Api\n" + (this.ramlVersion == 'RAML10' ?
            "/**\n * Load API synchronously. If the 'rejectOnErrors' option is set to true, [[ApiLoadingError]] is thrown for Api which contains errors.\n * @param apiPath Path to API: local file system path or Web URL\n * @param options Load options\n * @param extensionsAndOverlays Paths to extensions and overlays to be applied listed in the order of application. Relevant for RAML 1.0 only.\n * @return Api instance.\n **/\nexport function loadApiSync(apiPath:string, extensionsAndOverlays:string[],options?:coreApi.Options):Api\n" : '') + "\nexport function loadApiSync(apiPath:string, arg1?:string[]|coreApi.Options, arg2?:coreApi.Options):Api{\n\n        return <Api>apiLoader.loadApi(apiPath,arg1,arg2).getOrElse(null);\n}\n\n" + (this.ramlVersion == 'RAML10' ?
            "/**\n * Load RAML synchronously. May load both Api and Typed fragments. If the 'rejectOnErrors' option is set to true, [[ApiLoadingError]] is thrown for RAML which contains errors.\n * @param ramlPath Path to RAML: local file system path or Web URL\n * @param options Load options\n * @param extensionsAndOverlays Paths to extensions and overlays to be applied listed in the order of application. Relevant for RAML 1.0 only.\n * @return hl.BasicNode instance.\n **/\nexport function loadRAMLSync(ramlPath:string, extensionsAndOverlays:string[],options?:coreApi.Options):hl.BasicNode\n" : '') + "\nexport function loadRAMLSync(ramlPath:string, arg1?:string[]|coreApi.Options, arg2?:coreApi.Options):hl.BasicNode{\n\n        return <any>apiLoader.loadApi(ramlPath,arg1,arg2).getOrElse(null);\n}\n\n/**\n * Load API asynchronously. The Promise is rejected with [[ApiLoadingError]] if the resulting Api contains errors and the 'rejectOnErrors' option is set to 'true'.\n * @param apiPath Path to API: local file system path or Web URL\n * @param options Load options\n * @return Promise&lt;Api&gt;.\n **/\nexport function loadApi(apiPath:string, options?:coreApi.Options):Promise<Api>;\n" + (this.ramlVersion == 'RAML10' ?
            "/**\n * Load API asynchronously. The Promise is rejected with [[ApiLoadingError]] if the resulting Api contains errors and the 'rejectOnErrors' option is set to 'true'.\n * @param apiPath Path to API: local file system path or Web URL\n * @param options Load options\n * @param extensionsAndOverlays Paths to extensions and overlays to be applied listed in the order of application. Relevant for RAML 1.0 only.\n * @return Promise&lt;Api&gt;.\n **/\nexport function loadApi(apiPath:string,extensionsAndOverlays:string[], options?:coreApi.Options):Promise<Api>;\n" : '') + "\nexport function loadApi(apiPath:string, arg1?:string[]|coreApi.Options, arg2?:coreApi.Options):Promise<Api>{\n\n        return <Promise<Api>>apiLoader.loadApiAsync(apiPath,arg1,arg2);\n}\n\n" + (this.ramlVersion == 'RAML10' ?
            "/**\n * Load RAML asynchronously. May load both Api and Typed fragments. The Promise is rejected with [[ApiLoadingError]] if the resulting hl.BasicNode contains errors and the 'rejectOnErrors' option is set to 'true'.\n * @param ramlPath Path to RAML: local file system path or Web URL\n * @param options Load options\n * @param extensionsAndOverlays Paths to extensions and overlays to be applied listed in the order of application. Relevant for RAML 1.0 only.\n * @return Promise&lt;hl.BasicNode&gt;.\n **/\nexport function loadRAML(ramlPath:string,extensionsAndOverlays:string[], options?:coreApi.Options):Promise<hl.BasicNode>;\n" : '') + "\nexport function loadRAML(ramlPath:string, arg1?:string[]|coreApi.Options, arg2?:coreApi.Options):Promise<hl.BasicNode>{\n\n        return apiLoader.loadRAMLAsync(ramlPath,arg1,arg2);\n}\n\n/**\n * Gets AST node by runtime type, if runtime type matches any.\n * @param runtimeType - runtime type to find the match for\n */\nexport function getLanguageElementByRuntimeType(runtimeType : hl.ITypeDefinition) : core.BasicNode {\n    return apiLoader.getLanguageElementByRuntimeType(runtimeType);\n}\n";
    };
    ParserGenerator.prototype.createFunctions = function () {
        var res = "";
        for (var p in this.processed) {
            var q = this.processed[p];
            if (def.NodeClass.isInstance(q)) {
                res +=
                    "\n/**\n * @hidden\n **/\nfunction create" + p + "(key:string){\n    var universe=def.getUniverse(\"" + this.ramlVersion + "\");\n    var nc=<def.NodeClass>universe.type(\"" + p + "\");\n    var node=stubs.createStubNode(nc,null,key);\n    return node;\n}\n";
            }
            ;
        }
        return res;
    };
    ParserGenerator.prototype.createIsFragmentMethod = function () {
        var _this = this;
        var fragmentClasses = Object.keys(this.processed)
            .map(function (x) { return _this.processed[x]; })
            .filter(function (x) { return _.find(x.getAdapter(def.RAMLService).possibleInterfaces(), function (y) { return y.nameId() == "FragmentDeclaration"; }) != null; });
        if (fragmentClasses.length == 0) {
            return "";
        }
        var typeNamesString = fragmentClasses.map(function (x) { return x.nameId(); }).join("|");
        return "\n/**\n * Check if the AST node represents fragment\n */\nexport function isFragment(node:" + typeNamesString + "):boolean{\n    return node.highLevel().parent()==null;\n}\n\n/**\n * Convert fragment representing node to FragmentDeclaration instance.\n */\nexport function asFragment(node:" + typeNamesString + "):FragmentDeclaration{\n    return isFragment(node)?<FragmentDeclaration><any>node:null;\n}\n";
    };
    ParserGenerator.prototype.nodeFactory = function (highLevelASTLocation, parserLocation) {
        var _this = this;
        var mapEntries = {};
        Object.keys(this.processed).forEach(function (x) {
            var type = _this.processed[x];
            if (type.isCustom()) {
                return;
            }
            var name = type.nameId();
            if (type.isValueType()) {
                mapEntries[name] = "    \"" + name + "\": (x)=>{return new RamlWrapper." + name + "Impl(x)}";
            }
            else {
                mapEntries[name] = "    \"" + name + "\": (x,y)=>{return new RamlWrapper." + name + "Impl(x,y)}";
            }
        });
        var mapContent = Object.keys(mapEntries).sort().map(function (x) { return mapEntries[x]; }).join(',\n\n');
        return "import RamlWrapper = require(\"" + parserLocation + "\");\nimport hl = require(\"" + highLevelASTLocation + "\")\n\nfunction getWrapperConstructor(definition : hl.INodeDefinition) {\n    if (!definition.isBuiltIn()) return null;\n\n    return classMap[definition.nameId()];\n}\n\n/**\n * @hidden\n * Build Wrapper node corresponding to the High Level node\n **/\nexport function buildWrapperNode(node:hl.IHighLevelNode,setAsTopLevel:boolean=true){\n\n    var definition = node.definition();\n    var nodeClassName = definition.nameId();\n\n    var wrapperConstructor = getWrapperConstructor(definition);\n\n    if(!wrapperConstructor){\n        var priorities = determineSuperclassesPriorities(definition);\n        var superTypes = definition.allSuperTypes().sort((x,y)=>priorities[x.nameId()]-priorities[y.nameId()]);\n        var wr=null;\n        for (var i=0;i<superTypes.length;i++){\n            var superTypeName=superTypes[i].nameId();\n            wrapperConstructor = getWrapperConstructor(superTypes[i]);\n            if (superTypeName==\"DataElement\"){\n                wr=superTypeName;\n                //This is only case of nested hierarchy\n                continue;\n            }\n            if (superTypeName==\"hl.BasicNode\"){\n                //depth first\n                continue;\n            }\n            if (wrapperConstructor){\n                break;\n            }\n        }\n        if (!wrapperConstructor){\n            wr=superTypeName;\n        }\n    }\n    if (!wrapperConstructor){\n        wrapperConstructor = classMap[\"hl.BasicNode\"]\n\n    }\n    return wrapperConstructor(node,setAsTopLevel);\n}\n\nfunction determineSuperclassesPriorities(\n    td:hl.ITypeDefinition,\n    priorities:{[key:string]:number}={},\n    path:{[key:string]:boolean}={}):any{\n\n    var typeName = td.nameId();\n    if(path[typeName]){\n        return;\n    }\n    path[typeName] = true;\n    var rank = (priorities[typeName]!=null && priorities[typeName] + 1 )|| 0;\n    var superTypes = td.superTypes();\n    superTypes.forEach(x=>{\n        var name = x.nameId();\n        var r = priorities[name];\n        if(r==null||rank>r){\n            priorities[name] = rank;\n            determineSuperclassesPriorities(x,priorities,path);\n        }\n    });\n    delete path[typeName];\n    return priorities;\n}\n\nvar classMap = {\n\n" + mapContent + "\n\n};\n";
    };
    return ParserGenerator;
}());
exports.ParserGenerator = ParserGenerator;
function def2Parser() {
    var u = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        u[_i] = arguments[_i];
    }
    var mod = new ParserGenerator();
    for (var _a = 0, u_1 = u; _a < u_1.length; _a++) {
        var v = u_1[_a];
        mod.processType(v);
    }
    return mod;
}
exports.def2Parser = def2Parser;
var ImplementationGenerator = /** @class */ (function () {
    function ImplementationGenerator() {
    }
    ImplementationGenerator.prototype.generateASTAccessor = function (p) {
        this.generatedCode.push("var val=this.ast.getValue(" + p.nameId() + "}");
        this.generatedCode.push("return new " + p.range().nameId() + "Impl(val)");
    };
    return ImplementationGenerator;
}());
function checkIfReference(u) {
    if (def.ReferenceType.isInstance(u)) {
        return true;
    }
    //var superTypes = u.superTypes();
    //for(var i = 0 ; i < superTypes.length ; i++){
    //    var st = superTypes[i];
    //    if(checkIfReference(st)){
    //        return true;
    //    }
    //}
    return false;
}
exports.checkIfReference = checkIfReference;
var raml10parserJsDoc = "/**\n * <p>See <a href=\"http://raml.org\">http://raml.org</a> for more information about RAML.</p>\n *\n * <p>This parser is at a beta state of development, as part of the API Workbench development cycle (<a href=\"http://apiworkbench.com\">http://apiworkbench.com</a>).</p>\n *\n * <p><a href=\"https://github.com/raml-org/raml-js-parser-2/blob/master/documentation/GettingStarted.md\">Getting Started Guide</a> describes the first steps with the parser.</p>\n *\n * <h2>Installation</h2>\n *\n * <pre><code>git clone https://github.com/raml-org/raml-js-parser-2\n *\n * cd raml-js-parser-2\n *\n * npm install\n *\n * node test/test.js  //here you should observe JSON representation of XKCD API in your console\n *\n * node test/testAsync.js  //same as above but in asynchronous mode\n * </code></pre>\n *\n * <h2>Usage</h2>\n *\n * <ul>\n * <li>For parser usage example refer to <code>test/test.js</code></li>\n * <li>For asynchrounous usage example refer to <code>test/testAsync.js</code></li>\n * </ul>\n **/\n\n ";
/**
 * Created by kor on 11/05/15.
 */
//# sourceMappingURL=wrappedParserGen.js.map