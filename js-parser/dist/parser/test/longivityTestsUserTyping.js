"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var jsyaml = require("../jsyaml/jsyaml2lowLevel");
var util = require("./test-utils");
var fs = require("fs");
var textTyper = require("atom-text-typer");
//import logger = require("../../../node_modules/atom-editor-logger");
var index = require("../../index");
var files;
var steps;
var fsResolver;
describe('Typing simulation based longivity tests (user)', function () {
    this.timeout(300000);
    it('Project', function (done) {
        test("Longevity/test001/userTypingLog.json", done);
    });
    it('WEB Library', function (done) {
        test("Longevity/test002/userTypingLog.json", done);
    });
});
function test(logPath, done) {
    var pathRes = util.data(logPath).replace(/\\/g, '/');
    var logContent = fs.readFileSync(pathRes).toString();
    playRecord(logContent, done);
}
function playRecord(content, done) {
    var typer = new textTyper.TextTyper(content);
    files = {};
    steps = [];
    addSingleStep(typer);
    while (typer.hasNext()) {
        typer.increment();
        addSingleStep(typer);
    }
    var error = playStep(0);
    if (error)
        done(error);
    else {
        assert(true);
        done();
    }
}
function playStep(index) {
    if (index === steps.length) {
        return;
    }
    var resolver = new jsyaml.FSResolverImpl();
    fsResolver = {
        content: function (path) {
            if (path == steps[index].filePath) {
                return steps[index].content;
            }
            return resolver.content(path);
        },
        contentAsync: function (path) {
            return Promise.resolve("");
        }
    };
    var result = testContent(steps[index].filePath, fsResolver);
    playStep(index + 1);
    return result;
}
function addSingleStep(typer) {
    var filePath = typer.currentContentPath();
    steps.push({
        filePath: filePath,
        content: typer.currentContent(filePath)
    });
}
function testContent(ramlFile, fsResolver) {
    try {
        var api = (index.loadApiSync(ramlFile, [], {
            fsResolver: fsResolver
        })).expand();
    }
    catch (err) {
        if (err.message.indexOf("Invalid first line. A RAML document is expected") == -1)
            return err;
    }
}
//# sourceMappingURL=longivityTestsUserTyping.js.map