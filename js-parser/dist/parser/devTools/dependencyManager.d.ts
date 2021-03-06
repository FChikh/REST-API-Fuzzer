export declare class DependencyManager {
    private _rootPath;
    private patchExternalOnly;
    private stepsToModulesDir;
    modules: {
        [key: string]: boolean;
    };
    constructor(_rootPath?: string, patchExternalOnly?: boolean, stepsToModulesDir?: number);
    updateDeps(path: string): void;
    transportDependencies(filePath: string, srcProjectRoot: string, dstProjectRoot: string, dstDepsFolder: string): void;
    patchDeps(filePath: string, srcProjectRoot: string, dependencyBase: string, dstProjectRoot: string, dstDepsFolder: string, doPatch: boolean, processed?: {
        [key: string]: boolean;
    }): void;
    private matchRules;
    getDependencies(filePath: string, dependencyBase: string): DependencyOccurence[];
}
export declare class DependencyOccurence {
    constructor(path: string, start: number, end: number, matchRule: MatchRule, absPath?: string);
    matchRule: MatchRule;
    path: string;
    start: number;
    end: number;
    absPath: string;
    srcProjectRoot: string;
    dstProjectRoot: string;
    dstDepsFolder: string;
    isInternal(): boolean;
    patch(content: string): string;
    replacement(): string;
    copySync(): void;
    getAbsoluteDestinationPath(): string;
}
export declare class Match {
    constructor(start: number, end: number);
    start: number;
    end: number;
}
export declare class MatchRule {
    private _matcher;
    private _isRecursive;
    private _extensions;
    constructor(_matcher: Matcher, _isRecursive: boolean, _extensions?: string[]);
    matcher(): Matcher;
    isRecursive(): boolean;
    extensions(): string[];
}
export interface Matcher {
    match(content: string): Match[];
}
