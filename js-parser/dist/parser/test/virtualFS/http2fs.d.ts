import resolverApi = require("../../jsyaml/resolversApi");
export declare var DOMAIN: string;
export declare function getHttpResolver(): resolverApi.HTTPResolver;
export declare class Http2FSResolverAsync implements resolverApi.HTTPResolver {
    private rootDataDir;
    getResource(url: string): resolverApi.Response;
    getResourceAsync(url: string): Promise<resolverApi.Response>;
    getRootDir(): Promise<string>;
}
