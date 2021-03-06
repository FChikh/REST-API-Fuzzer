"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reuseUtil = require("./test-reuse-utils");
var util = require("./test-utils");
describe('Testing AST reuse by typing simulation (complex)', function () {
    this.timeout(200000);
    it("Test 001", function () {
        test("ASTReuseTests/ComplexTyping/test001/api.raml");
    });
});
function test(specPath) {
    var pathRes = util.data(specPath).replace(/\\/g, '/');
    reuseUtil.simulateTypingForFile(pathRes, [
        'Resource',
        'Method',
        'Method.body',
        'Api.types',
        'Method.responses',
        'TypeDeclaration'
    ]);
}
//# sourceMappingURL=astReuseTestsComplexTyping.js.map