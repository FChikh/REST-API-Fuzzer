"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
//
//import t3 = require("../artifacts/raml10parser")
//
var util = require("./test-utils");
var hlimpl = require("../highLevelImpl");
//import egen=require("../ast.core/exampleGen")
function testErrorsByNumber(p, count) {
    if (count === void 0) { count = 0; }
    var api = util.loadApi(p);
    api = util.expandHighIfNeeded(api);
    var errors = [];
    var q = hlimpl.createBasicValidationAcceptor(errors, api);
    api.validate(q);
    if (errors.length != count) {
        errors.forEach(function (error) { return console.log(error.message); });
        //console.log(errors)
    }
    assert.equal(errors.length, count);
}
function testErrorsWithLineNumber(p, lineNumber, column) {
    var api = util.loadApi(p);
    var errors = util.validateNode(api);
    var issue = errors[0];
    var position = issue.node.lowLevel().unit().lineMapper().position(issue.start);
    console.log("DD:" + position.line + ":" + position.column);
    assert.equal(position.column, column);
    assert.equal(position.line, lineNumber);
}
function testIds(p) {
    var api = util.loadApi(p);
    testId(api);
}
function testId(n) {
    //console.log(n.id());
    if (n != n.root()) {
        var nnn = n.root().findById(n.id());
        assert.equal(nnn != null, true);
    }
    n.children().forEach(function (x) { return testId(x); });
}
function testErrors(p, expectedErrors) {
    if (expectedErrors === void 0) { expectedErrors = []; }
    var api = util.loadApi(p);
    api = util.expandHighIfNeeded(api);
    var errors = util.validateNode(api);
    var testErrors;
    var hasUnexpectedErr = false;
    if (expectedErrors.length > 0) {
        testErrors = validateErrors(errors, expectedErrors);
        hasUnexpectedErr = testErrors.unexpected.length > 0 || testErrors.lostExpected.length > 0;
    }
    var condition = false;
    condition = errors.length == expectedErrors.length;
    if (!condition) {
        if (errors.length > 0) {
            errors.forEach(function (error) {
                if (typeof error.message == 'string') {
                    console.error(error.message);
                }
                else {
                    console.error(error);
                }
                console.error("\n");
            });
        }
    }
    var errorMsg = '';
    if (hasUnexpectedErr) {
        if (testErrors.unexpected.length > 0) {
            errorMsg += "\nUnexpected errors: \n\n";
            testErrors.unexpected.forEach(function (unexpectedError) {
                errorMsg += unexpectedError + "\n\n";
            });
        }
        if (testErrors.lostExpected.length > 0) {
            errorMsg += "\nDisappeared expected errors: \n\n";
            testErrors.lostExpected.forEach(function (lostExpected) {
                errorMsg += lostExpected + "\n\n";
            });
        }
    }
    if (hasUnexpectedErr || errors.length != expectedErrors.length) {
        console.log("Expected errors:");
        expectedErrors.forEach(function (expectedError) { return console.log(expectedError); });
        console.log("Actual errors:");
        errors.forEach(function (error) { return console.log(error.message); });
    }
    assert.equal(hasUnexpectedErr, false, "Unexpected errors found\n" + errorMsg);
    assert.equal(errors.length, expectedErrors.length, "Wrong number of errors\n" + errorMsg);
}
exports.testErrors = testErrors;
function escapeRegexp(regexp) {
    return regexp.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function validateErrors(realErrors, expectedErrors) {
    var errors = { 'unexpected': [], 'lostExpected': [] };
    if (realErrors.length > 0) {
        realErrors.forEach(function (error) {
            var realError;
            if (typeof error.message == 'string') {
                realError = error.message;
            }
            else {
                realError = error;
            }
            var isExpectedError = false;
            expectedErrors.forEach(function (expectedError) {
                var index = realError.search(new RegExp(expectedError, "mi"));
                if (index > -1) {
                    isExpectedError = true;
                }
                else {
                    index = realError.search(new RegExp(escapeRegexp(expectedError), "mi"));
                    if (index > -1)
                        isExpectedError = true;
                }
            });
            if (!isExpectedError)
                errors.unexpected.push(realError);
        });
        expectedErrors.forEach(function (expectedError) {
            var isLostError = true;
            realErrors.forEach(function (error) {
                var realError;
                if (typeof error.message == 'string') {
                    realError = error.message;
                }
                else {
                    realError = error;
                }
                var index = realError.search(new RegExp(expectedError, "i"));
                if (index > -1) {
                    isLostError = false;
                }
                else {
                    index = realError.search(new RegExp(escapeRegexp(expectedError), "i"));
                    if (index > -1)
                        isLostError = false;
                }
            });
            if (isLostError)
                errors.lostExpected.push(expectedError);
        });
    }
    return errors;
}
testErrors(util.data("../../../../example-ramls/application-monitoring/api.raml"), ["Unrecognized type 'appmonitor-rule.schema'", "Example does not conform to schema:Content is not valid according to schema:Reference could not be resolved: http://appmonitor-action http://appmonitor-action", "Unrecognized type 'appmonitor-rule.schema'", "Example does not conform to schema:Content is not valid according to schema:Reference could not be resolved: http://appmonitor-action http://appmonitor-action", "Example does not conform to schema:Content is not valid according to schema:Reference could not be resolved: http://appmonitor-rule http://appmonitor-rule", "Unrecognized type 'appmonitor'"]);
//# sourceMappingURL=parserTesting.js.map