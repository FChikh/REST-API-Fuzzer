export declare function escapeTypescriptPropertyName(str: string): string;
export declare function isValidTypescriptIdentifier(str: string): boolean;
export declare function escapeToIdentifier(str: string): string;
export declare function format(text: string): string;
export declare function ramlType2TSType(ramlType: string): string;
export declare function escapeToJavaIdentifier(str: string): string;
export declare var tsToJavaTypeMap: {
    [key: string]: string;
};
export declare var javaReservedWords: {
    [key: string]: boolean;
};
