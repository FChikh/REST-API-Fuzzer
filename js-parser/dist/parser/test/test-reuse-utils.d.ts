import hl = require("../highLevelAST");
export declare function simulateTypingForFile(filePath: string, restrictions?: string[], enableReuse?: boolean): void;
export declare function testEditingStep(newContent: string, specPath: string, reuseNode: hl.IHighLevelNode, enableReuse: boolean, expectReuse?: boolean, parserInstance?: any): hl.IHighLevelNode;
export declare function testReuseByBasicTyping(specPath: string, byWords?: boolean, enableReuse?: boolean, parserInstance?: any): void;
