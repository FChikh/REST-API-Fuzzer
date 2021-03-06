import parser = require("../../artifacts/raml10parserapi");
export declare class ServerGenerator {
    private templateDir;
    static Files: string[];
    static TypeMap: {
        'string': string;
        'number': string;
        'boolean': string;
    };
    constructor(templateDir: string);
    copyfile(source: string, dest: string): void;
    copy(targetDir: string): void;
    render(source: string, context: any): string;
    renderFile(source: string, dest: string, context: any): void;
    generateSchema(type: parser.ObjectTypeDeclaration): any;
    generateImports(name: string): string;
    generateRoutes(name: string): string;
    generateMain(targetDir: string, type: parser.ObjectTypeDeclaration): void;
    generateModel(targetDir: string, type: parser.ObjectTypeDeclaration): void;
    generate(targetDir: string, type: parser.ObjectTypeDeclaration): void;
}
