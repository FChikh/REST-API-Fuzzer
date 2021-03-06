import index = require("../../index");
import high = require("../highLevelImpl");
import hl = require("../highLevelAST");
import RamlWrapper = require("../artifacts/raml10parserapi");
import RamlWrapper08 = require("../artifacts/raml08parserapi");
import RamlWrapper08Impl = require("../artifacts/raml08parser");
export declare var universe: any;
export declare var apiType: index.ds.NodeClass;
export declare function showTypeProperties(defenition: hl.INodeDefinition): void;
export declare function showProperties(name: string): void;
export declare function show(node: hl.IHighLevelNode, lev?: number): void;
export declare function dumpPath(apiPath: string): string;
export declare function compareDump(actual: any, expectedPath: any, apiPath: any): void;
export declare function loadApi(name: string, neverExpand?: boolean): high.ASTNodeImpl;
export declare function loadAndMergeApis(masterPath: string, extensions: string[]): hl.IHighLevelNode;
export declare function compareToFileObject(obj: any, filename: string, create?: boolean): void;
export declare function compareToFile(text: string, filename: string, create?: boolean): void;
export declare function xpath(node: hl.IHighLevelNode, path: string): hl.IHighLevelNode | hl.IAttribute | hl.IAttribute[];
export declare function projectRoot(): string;
export declare function data(filepath: string): string;
export declare function assertValue(a: hl.IAttribute, value: string): void;
export declare function assertValueText(a: hl.IAttribute, value: string): void;
export declare function assertText(a: hl.IAttribute, text: string): void;
export declare function compare(arg0: any, arg1: any, path?: string): Diff[];
export declare class Diff {
    path: string;
    value0: any;
    value1: any;
    comment: string;
    constructor(path: string, value0: any, value1: any, comment: string);
    message(label0?: string, label1?: string): string;
}
export declare function validateNode(api: hl.IHighLevelNode): hl.ValidationIssue[];
export declare function loadApiWrapper1(apiPath: string): RamlWrapper.Api;
export declare function countErrors(api: hl.IHighLevelNode): number;
export declare function showErrors(api: hl.IHighLevelNode): number;
export declare function loadApiWrapper08(apiPath: string): RamlWrapper08Impl.ApiImpl;
export declare function loadApiOptions1(apiPath: string, options: any): index.api10.Api | index.api08.Api;
export declare function loadApiOptions08(apiPath: string, options: any): index.api10.Api | index.api08.Api;
export declare function loadRAML(ramlPath: string): hl.BasicNode;
/**
 * Builds AST and compares it to a pre-serialized AST in a data folder file
 * @param masterPath - path to RAML master file
 * @param astPath - path to pre-serialized AST
 * @param extensions - extensuions and overlays paths
 * @param expectedErrors - expected error messages
 * @param mode - 1 == hlimpl.OverlayMergeMode.MERGE, 0 == hlimpl.OverlayMergeMode.AGGREGATE
 */
export declare function testAST(masterPath: string, astPath: string, extensions?: string[], expectedErrors?: string[], mode?: boolean): void;
export declare function expandHighIfNeeded(original: high.ASTNodeImpl): high.ASTNodeImpl;
export declare function expandWrapperIfNeeded(original: RamlWrapper.Api | RamlWrapper08.Api): RamlWrapper.Api | RamlWrapper08.Api;
