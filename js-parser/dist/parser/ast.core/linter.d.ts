import hl = require("../highLevelAST");
import ll = require("../lowLevelAST");
import def = require("raml-definition-system");
import hlimpl = require("../highLevelImpl");
export interface PropertyValidator {
    validate(node: hl.IAttribute, cb: hl.ValidationAcceptor): any;
}
export interface IShema {
    validate(pObje: any, cb: hl.ValidationAcceptor, strict: boolean): any;
}
export declare var RESERVED_TEMPLATE_PARAMETERS: {
    "resourcePathName": string;
    "methodName": string;
    "resourcePath": string;
};
/**
 * For descendants of templates returns template type. Returns null for all other nodes.
 */
export declare function typeOfContainingTemplate(h: hl.IParseResult): def.ITypeDefinition;
/**
 * Performs basic validation of a node on a single level, without proceeding to the node high-level children validation.
 * @param node
 * @param v
 * @param requiredOnly
 * @returns {boolean} - whether to continue validation after this one is finished, or there is no point for further validation.
 */
export declare function validateBasicFlat(node: hlimpl.BasicASTNode, v: hl.ValidationAcceptor, requiredOnly?: boolean): boolean;
export declare function validateBasic(node: hlimpl.BasicASTNode, v: hl.ValidationAcceptor, requiredOnly?: boolean): void;
export declare function validate(node: hl.IParseResult, v: hl.ValidationAcceptor): void;
export declare function isValid(t: hl.ITypeDefinition, h: hl.IHighLevelNode, value: any, p: hl.IProperty, attr?: hl.IAttribute): any;
export declare class UrlParameterNameValidator implements PropertyValidator {
    private checkBaseUri;
    parseUrl(value: string): string[];
    validate(node: hl.IAttribute, cb: hl.ValidationAcceptor): void;
}
export declare var typeToName: {};
export declare var parameterPropertyToName: {};
export declare function getHumanReadableNodeName(astNode: hl.IParseResult): any;
/**
 * validates examples
 */
export declare class ExampleAndDefaultValueValidator implements PropertyValidator {
    validate(node: hl.IAttribute, cb: hl.ValidationAcceptor): void;
    private isExampleNode;
    private isSingleExampleNode;
    private isExampleNodeInMultipleDecl;
    private findParentSchemaOrTypeAttribute;
    aquireSchema(node: hl.IAttribute): IShema;
    getSchemaFromModel(node: hl.IAttribute): IShema;
    private typeValidator;
    toObject(h: hl.IAttribute, v: hlimpl.StructuredValue, cb: hl.ValidationAcceptor): any;
    testDublication(h: hl.IAttribute, v: ll.ILowLevelASTNode, cb: hl.ValidationAcceptor): void;
    parseObject(node: hl.IAttribute, cb: hl.ValidationAcceptor, strictValidation: boolean): any;
    private isStrict;
}
export declare function isJson(s: string): boolean;
export declare function isXML(s: string): boolean;
export declare function getMediaType(node: hl.IAttribute): any;
export declare function toIssue(error: any, node: hl.IHighLevelNode): hl.ValidationIssue;
export declare function createIssue1(messageEntry: any, parameters: any, node: hl.IParseResult, isWarning?: boolean, internalRange?: def.rt.tsInterfaces.RangeObject): hl.ValidationIssue;
export declare function createIssue(issueCode: string, message: string, node: hl.IParseResult, isWarning?: boolean, internalRange?: def.rt.tsInterfaces.RangeObject, forceScalar?: boolean, inKey?: boolean): hl.ValidationIssue;
export declare function createLLIssue(issueCode: string, message: string, node: ll.ILowLevelASTNode, rootCalculationAnchor: hl.IParseResult, isWarning?: boolean, p?: boolean, internalRange?: def.rt.tsInterfaces.RangeObject): hl.ValidationIssue;
export declare function validateResponseString(v: string): any;
export interface Message {
    code: number;
    message: string;
    func?: (x: any) => string;
}
export declare function applyTemplate(messageEntry: Message, params: any): string;
