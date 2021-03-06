export interface DetectedModule {
    name: string;
    buildCommand: string;
    testCommand: string;
    fsLocation: string;
    dependencies: DetectedModule[];
}
export declare function getModules(): DetectedModule[];
