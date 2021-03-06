import high = require("../../parser/highLevelImpl");
export interface DeclarationData {
    name: string;
    offset: number;
    api: high.ASTNodeImpl;
}
export declare function loadApiAndFixReference(name: string): DeclarationData;
