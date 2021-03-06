import ll = require("../lowLevelAST");
import proxy = require("./LowLevelASTProxy");
import namespaceResolver = require("./namespaceResolver");
import expander = require("./expanderLL");
import referencePatcherHL = require("./referencePatcher");
export declare const transitions: {
    "Api": {
        "traits": {
            "$action": string;
            "$toChildren": boolean;
        };
        "resourceTypes": {
            "$action": string;
            "$toChildren": boolean;
        };
        "types": {
            "$action": string;
            "$toChildren": boolean;
        };
        "annotationTypes": {
            "$action": string;
            "$toChildren": boolean;
        };
        "baseUriParameters": {
            "$action": string;
            "$toChildren": boolean;
        };
        "securedBy": string;
        "/\/.+/": string;
        "/\\(.+\\)/": string;
    };
    "Resource": {
        "get": string;
        "put": string;
        "post": string;
        "delete": string;
        "options": string;
        "head": string;
        "patch": string;
        "is": string;
        "type": {
            "$action": string;
        };
        "uriParameters": {
            "$action": string;
            "$toChildren": boolean;
        };
        "securedBy": string;
        "/\\(.+\\)/": string;
        "/\/.+/": string;
        "$action": string;
    };
    "Method": {
        "body": string;
        "responses": {
            "$action": string;
            "$toChildren": boolean;
        };
        "is": string;
        "queryParameters": {
            "$action": string;
            "$toChildren": boolean;
        };
        "queryString": {
            "$action": string;
        };
        "headers": {
            "$action": string;
            "$toChildren": boolean;
        };
        "securedBy": string;
        "/\\(.+\\)/": string;
        "$action": string;
    };
    "ResourceType": {
        "get": string;
        "put": string;
        "post": string;
        "delete": string;
        "options": string;
        "head": string;
        "patch": string;
        "is": string;
        "type": {
            "$action": string;
        };
        "uriParameters": {
            "$action": string;
            "$toChildren": boolean;
        };
        "securedBy": string;
        "/\\(.+\\)/": string;
    };
    "Trait": {
        "body": string;
        "responses": {
            "/\\d{3,3}/": string;
        };
        "queryParameters": {
            "$action": string;
            "$toChildren": boolean;
        };
        "queryString": {
            "$action": string;
        };
        "headers": {
            "$action": string;
            "$toChildren": boolean;
        };
        "securedBy": string;
        "/\\(.+\\)/": string;
    };
    "Response": {
        "body": string;
        "headers": {
            "$action": string;
            "$toChildren": boolean;
        };
        "/\\(.+\\)/": string;
    };
    "Body": {
        "oneOf": ({
            "$conditions": string[];
            "$action": string;
            "$toChildren"?: undefined;
        } | {
            "$action": string;
            "$toChildren": boolean;
            "$conditions"?: undefined;
        })[];
    };
    "TypeDeclaration": {
        "oneOf": ({
            "$conditions": string[];
            "$action": string;
            "$toChildren"?: undefined;
            "type"?: undefined;
            "items"?: undefined;
            "properties"?: undefined;
            "facets"?: undefined;
            "/\\(.+\\)/"?: undefined;
        } | {
            "$conditions": string[];
            "$action": string;
            "$toChildren": boolean;
            "type"?: undefined;
            "items"?: undefined;
            "properties"?: undefined;
            "facets"?: undefined;
            "/\\(.+\\)/"?: undefined;
        } | {
            "type": string;
            "items": string;
            "properties": {
                "/.+/": string;
            };
            "facets": {
                "$action": string;
                "$toChildren": boolean;
            };
            "/\\(.+\\)/": string;
            "$action": string;
            "$conditions"?: undefined;
            "$toChildren"?: undefined;
        })[];
    };
    "Annotation": {
        "$action": string;
    };
    "TraitReferences": {
        "$action": string;
        "$toChildren": boolean;
    };
    "SecuritySchemeReferences": {
        "$action": string;
        "$toChildren": boolean;
    };
};
export declare class Scope {
    hasRootMediaType: boolean;
}
export declare type TransitionMap = {
    [key: string]: Transition;
};
export declare enum TransitionKind {
    BASIC = 0,
    ONE_OF = 1,
    ACTION = 2,
    MIXED = 3
}
export declare class Transition {
    title: string;
    localMap: any;
    globalMap: TransitionMap;
    constructor(title: string, localMap: any, globalMap: TransitionMap);
    private staticTransitions;
    private regexpTransitions;
    conditions: Condition[];
    children: Transition[];
    kind: TransitionKind;
    action: Action;
    applyToChildren: boolean;
    processNode(node: ll.ILowLevelASTNode, state: State): void;
    applyMappedTransition(node: ll.ILowLevelASTNode, tr: Transition, state: State): void;
    checkConditions(node: ll.ILowLevelASTNode, state: State): boolean;
    init(factory: ActionsAndCondtionsFactory): void;
}
export declare class State {
    referencePatcher: ReferencePatcher;
    rootUnit: ll.ICompilationUnit;
    globalScope: Scope;
    resolver: namespaceResolver.NamespaceResolver;
    constructor(referencePatcher: ReferencePatcher, rootUnit: ll.ICompilationUnit, globalScope: Scope, resolver: namespaceResolver.NamespaceResolver);
    units: ll.ICompilationUnit[];
    meta: any;
    registerOnly: boolean;
    lastUnit(): ll.ICompilationUnit;
    appendUnitIfNeeded(node: ll.ILowLevelASTNode | ll.ICompilationUnit): boolean;
    popUnit(): void;
}
export interface Action {
    (node: ll.ILowLevelASTNode, state: State): boolean;
}
export interface Condition {
    (node: ll.ILowLevelASTNode, state: State): boolean;
}
export interface ActionsAndCondtionsFactory {
    action(name: string): Action;
    condition(name: string): Condition;
}
export declare class ReferencePatcherActionsAndConditionsFactory implements ActionsAndCondtionsFactory {
    action(actionName: string): Action;
    condition(name: string): Condition;
}
export declare class ReferencePatcher {
    protected mode: referencePatcherHL.PatchMode;
    constructor(mode?: referencePatcherHL.PatchMode);
    private _outerDependencies;
    private _libModels;
    process(apiNode: ll.ILowLevelASTNode, rootNode?: ll.ILowLevelASTNode, typeName?: string, _removeUses?: boolean, _patchNodeName?: boolean, collectionName?: string): void;
    patchType(node: ll.ILowLevelASTNode, state: State): boolean;
    resolveReferenceValue(stringToPatch: string, state: State, transformer: expander.DefaultTransformer, collectionName: string): referencePatcherHL.PatchedReference;
    resolveReferenceValueBasic(_value: string, state: State, collectionName: string, unitsOverride?: ll.ICompilationUnit[]): referencePatcherHL.PatchedReference;
    patchNodeName(node: ll.ILowLevelASTNode, state: State, collectionName: string): void;
    patchReference(attr: ll.ILowLevelASTNode, state: State, collectionName: string, force?: boolean): void;
    patchUses(node: ll.ILowLevelASTNode, resolver: namespaceResolver.NamespaceResolver): void;
    removeUses(node: ll.ILowLevelASTNode): void;
    registerPatchedReference(ref: referencePatcherHL.PatchedReference): void;
    private libExpMode;
    private needTypesReset;
    expandLibraries(api: proxy.LowLevelCompositeNode, excessive?: boolean): void;
    private patchDependencies;
    private removeUnusedDependencies;
    private contributeCollection;
    private resetHighLevel;
}
export declare function toOriginal(node: ll.ILowLevelASTNode): ll.ILowLevelASTNode;
