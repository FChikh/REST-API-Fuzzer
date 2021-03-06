/**
 * Created by kor on 05/05/15.
 */
import yaml = require("yaml-ast-parser");
import lowlevel = require("../lowLevelAST");
import highlevel = require("../highLevelAST");
export declare class CompilationUnit implements lowlevel.ICompilationUnit {
    protected _absolutePath: string;
    protected _path: string;
    protected _content: string;
    protected _project: lowlevel.IProject;
    protected _isTopoLevel: boolean;
    protected serializeOptions: SerializeOptions;
    constructor(_absolutePath: string, _path: string, _content: string, _project: lowlevel.IProject, _isTopoLevel: boolean, serializeOptions?: SerializeOptions);
    highLevel(): highlevel.IParseResult;
    protected _node: AstNode;
    absolutePath(): string;
    clone(): any;
    contents(): string;
    lexerErrors(): Error[];
    path(): string;
    isTopLevel(): boolean;
    ast(): AstNode;
    expandedHighLevel(): highlevel.IParseResult;
    isDirty(): boolean;
    getIncludeNodes(): lowlevel.ILowLevelASTNode[];
    resolveAsync(p: string): Promise<lowlevel.ICompilationUnit>;
    isRAMLUnit(): boolean;
    project(): lowlevel.IProject;
    updateContent(newContent: string): void;
    ramlVersion(): string;
    lineMapper(): lowlevel.LineMapper;
    resolve(p: string): lowlevel.ICompilationUnit;
    /**
     * Returns true if this unit is overlay or extension, false otherwise.
     */
    isOverlayOrExtension(): boolean;
    /**
     * Returns master reference if presents, null otherwise.
     */
    getMasterReferenceNode(): lowlevel.ILowLevelASTNode;
}
export declare class AstNode implements lowlevel.ILowLevelASTNode {
    private _unit;
    protected _object: any;
    protected _parent?: lowlevel.ILowLevelASTNode;
    protected options: SerializeOptions;
    protected _key?: string;
    private static CLASS_IDENTIFIER;
    static isInstance(instance: any): instance is AstNode;
    getClassIdentifier(): string[];
    keyKind(): any;
    isAnnotatedScalar(): boolean;
    hasInnerIncludeError(): boolean;
    constructor(_unit: lowlevel.ICompilationUnit, _object: any, _parent?: lowlevel.ILowLevelASTNode, options?: SerializeOptions, _key?: string);
    private _highLevelNode;
    private _highLevelParseResult;
    private _isOptional;
    start(): number;
    end(): number;
    value(): any;
    actual(): any;
    includeErrors(): any[];
    includePath(): any;
    includeReference(): any;
    key(): string;
    optional(): boolean;
    children(): any;
    parent(): lowlevel.ILowLevelASTNode;
    unit(): lowlevel.ICompilationUnit;
    containingUnit(): lowlevel.ICompilationUnit;
    includeBaseUnit(): lowlevel.ICompilationUnit;
    anchorId(): any;
    errors(): any[];
    anchoredFrom(): this;
    includedFrom(): this;
    visit(v: lowlevel.ASTVisitor): void;
    dumpToObject(): any;
    addChild(n: lowlevel.ILowLevelASTNode): void;
    execute(cmd: lowlevel.CompositeCommand): void;
    dump(): string;
    keyStart(): number;
    keyEnd(): number;
    valueStart(): number;
    valueEnd(): number;
    isValueLocal(): boolean;
    kind(): yaml.Kind;
    valueKind(): yaml.Kind;
    anchorValueKind(): yaml.Kind;
    resolvedValueKind(): yaml.Kind;
    show(msg: string): void;
    setHighLevelParseResult(highLevelParseResult: highlevel.IParseResult): void;
    highLevelParseResult(): highlevel.IParseResult;
    setHighLevelNode(highLevel: highlevel.IHighLevelNode): void;
    highLevelNode(): highlevel.IHighLevelNode;
    text(unitText: string): string;
    copy(): AstNode;
    markup(json?: boolean): string;
    nodeDefinition(): highlevel.INodeDefinition;
    includesContents(): boolean;
}
export interface SerializeOptions {
    escapeNumericKeys?: boolean;
    writeErrors?: boolean;
    rawKey?: boolean;
}
export declare function serialize2(n: lowlevel.ILowLevelASTNode, full?: boolean): any;
export declare function serialize(node: lowlevel.ILowLevelASTNode, options?: SerializeOptions): any;
