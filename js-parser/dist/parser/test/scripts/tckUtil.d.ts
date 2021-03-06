export declare class TestResult {
    apiPath: string;
    json: any;
    success: boolean;
    tckJsonPath: string;
    diff: any[];
    constructor(apiPath: string, json: any, success: boolean, tckJsonPath: string, diff: any[]);
}
export declare function launchTests(folderAbsPath: string, reportPath: string, regenerateJSON: boolean, callTests: boolean): void;
export declare function iterateFolder(folderAbsPath: string, result?: DirectoryContent[]): DirectoryContent[];
export declare function extractContent(folderAbsPath: string): DirectoryContent;
export declare function getTests(dirContent: DirectoryContent): Test[];
export declare class Test {
    _masterPath: string;
    _extensionsAndOverlays?: string[];
    _jsonPath?: string;
    constructor(_masterPath: string, _extensionsAndOverlays?: string[], _jsonPath?: string);
    masterPath(): string;
    extensionsAndOverlays(): string[];
    jsonPath(): string;
}
export declare enum RamlFileKind {
    API = 0,
    LIBRARY = 1,
    EXTENSION = 2,
    OVERLAY = 3,
    FRAGMENT = 4
}
export declare class RamlFile {
    private _absPath;
    private _kind;
    private _ver;
    private _extends?;
    constructor(_absPath: string, _kind: RamlFileKind, _ver: string, _extends?: string);
    absolutePath(): string;
    kind(): RamlFileKind;
    version(): string;
    extends(): string;
}
export declare class DirectoryContent {
    private dirAbsPath;
    private files;
    constructor(dirAbsPath: string, files: RamlFile[]);
    absolutePath(): string;
    allRamlFiles(): RamlFile[];
    extensionsAndOverlays(): RamlFile[];
    masterAPIs(): RamlFile[];
    fragments(): RamlFile[];
    libraries(): RamlFile[];
    hasCleanAPIsOnly(): boolean;
    hasSingleExtensionOrOverlay(): boolean;
    hasExtensionsOrOverlaysAppliedToSingleAPI(): boolean;
    hasFragmentsOnly(): boolean;
    hasLibraries(): boolean;
    topExtensionOrOverlay(): RamlFile;
}
export declare function defaultJSONPath(apiPath: string): string;
export declare function testAPILibExpandNewFormat(apiPath: string, extensions?: string[], tckJsonPath?: string): TestResult;
export declare function testAPILibExpand(apiPath: string, extensions?: string[], tckJsonPath?: string, regenerteJSON?: boolean, callTests?: boolean, doAssert?: boolean): void;
export interface TestOptions {
    apiPath?: string;
    extensions?: string[];
    tckJsonPath?: string;
    regenerteJSON?: boolean;
    expandLib?: boolean;
    expandExpressions?: boolean;
    typeReferences?: boolean;
    newFormat?: boolean;
    serializeMetadata?: boolean;
    expandTypes?: boolean;
    recursionDepth?: number;
    unfoldTypes?: boolean;
}
export declare function testAPIScript(o: TestOptions): TestResult;
export declare function testAPINewFormat(apiPath: string, extensions?: string[], tckJsonPath?: string, regenerteJSON?: boolean, callTests?: boolean, doAssert?: boolean, expandLib?: boolean): TestResult;
export declare function testAPI(apiPath: string, extensions?: string[], tckJsonPath?: string, regenerteJSON?: boolean, callTests?: boolean, doAssert?: boolean, expandLib?: boolean): TestResult;
export declare function generateMochaSuite(folderAbsPath: string, dstPath: string, dataRoot: string, mochaSuiteTitle: string, o?: TestOptions): void;
export declare function projectFolder(): string;
