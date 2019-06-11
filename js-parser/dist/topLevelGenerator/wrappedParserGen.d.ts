import def = require("raml-definition-system");
import td = require("ts-model");
import nominals = def.rt.nominalTypes;
export declare class ParserGenerator {
    interfaceModule: td.TSAPIModule;
    implementationModule: td.TSAPIModule;
    processed: {
        [name: string]: def.IType;
    };
    processType(u: def.IType, generateConstructor?: boolean): void;
    private generateIsInstanceBody;
    private generatePrimitivesAnnotations;
    private annotableScalarProperties;
    private addInterfaceMethod;
    private getExistingMethods;
    private addImplementationMethod;
    private addImplementationSingleparamMethod;
    private generateBody;
    private addHelperMethods;
    private isVoid;
    private createTypeForModel;
    extractSecondarySupertypes(type: def.IType): def.IType[];
    private typeMap;
    private createSetterMethodDecl;
    private createMethodDecl;
    private helperMethods;
    private helperSources;
    private ramlVersion;
    initHelpers(u: def.IType): void;
    getApiImportFile(): string;
    serializeInterfaceToString(): string;
    serializeImplementationToString(): string;
    serializeInterfaceImportsToString(): string;
    serializeInstanceofMethodsToString(): string;
    serializeImplementationImportsToString(): string;
    serializeLoadingMethods(): string;
    createFunctions(): string;
    createIsFragmentMethod(): string;
    nodeFactory(highLevelASTLocation: string, parserLocation: string): string;
}
export declare function def2Parser(...u: def.IType[]): ParserGenerator;
export declare function checkIfReference(u: nominals.ITypeDefinition): boolean;
/**
 * Created by kor on 11/05/15.
 */
