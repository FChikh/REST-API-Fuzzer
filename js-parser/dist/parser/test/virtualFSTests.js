'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var vfs = require("./virtualFS/vfs");
var index = require("../../index");
var path = require("path");
var url = require("url");
var fs = require("fs");
var testUtils = require("./test-utils");
var http2fs = require("./virtualFS/http2fs");
var testUtil = require("./test-utils");
var universeHelpers = require("../tools/universeHelpers");
var isWin = /^win/.test(process.platform);
if (typeof window === 'undefined') {
    var chai = require('chai');
    var expect = chai.expect;
    var should = chai.should();
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
}
else {
    chai.should();
}
describe('Virtual File System Tests', function () {
    this.timeout(30000);
    it('Basic test for virtual file system integration', function (done) {
        testAPI("./vfsTests/test001/api.raml").should.be.fulfilled.and.notify(done);
    });
    it('Include path exceeding file system root must cause warning 1', function (done) {
        testAPI("./vfsTests/test002/api.raml").should.be.rejectedWith(/Resolved include path exceeds file system root/).and.notify(done);
    });
    it('Basic test for includes in subfolders', function (done) {
        testAPI("./vfsTests/test003/api.raml").should.be.fulfilled.and.notify(done);
    });
    it('Include path exceeding file system root must cause warning 2', function (done) {
        // process.once("uncaughtException", function (error) {
        //     console.log("HEREHERE: " + error)
        // })
        testAPI("./vfsTests/test004/api.raml").should.be.rejectedWith(/Resolved include path exceeds file system root/).and.notify(done);
    });
    it("RAML references test", function (done) {
        testAPI("./vfsTests/ramlRefsTest001/api.raml").should.be.fulfilled.and.notify(done);
    });
    it("JSON references test", function (done) {
        testAPI("./vfsTests/jsonRefsTest001/api.raml").should.be.fulfilled.and.notify(done);
    });
    it("Uses test for extensions", function (done) {
        testAPI("./vfsTests/remoteExtend/local/extension.raml").should.be.fulfilled.and.notify(done);
    });
    it("Invalid includes 1", function (done) {
        testAPI("./vfsTests/invalidIncludeTest001/api.raml").should.be.rejectedWith(/Can not resolve library from path: 'lib.raml'/).and.notify(done);
    });
    it("Invalid includes 2", function (done) {
        testAPI("./vfsTests/invalidIncludeTest002/api.raml").should.be.rejectedWith(/Can not resolve example.json/).and.notify(done);
    });
    it("Invalid includes 3", function (done) {
        testAPI("./vfsTests/invalidIncludeTest003/api.raml").should.be.rejectedWith(/Scalar is expected here\nUnknown node: 'some'/).and.notify(done);
    });
    it("Invalid includes 3123123", function (done) {
        testAPI("./vfsTests/test008/api.raml").should.be.fulfilled.and.notify(done);
    });
    it("test 009", function (done) {
        testAPI("./vfsTests/test009/api.raml").should.be.fulfilled.and.notify(done);
    });
    it('Including PNG file', function (done) {
        // process.once("uncaughtException", function (error) {
        //     console.log("HEREHERE: " + error)
        // })
        testAPIHttpAsync("./vfsTests/test007/api.raml").should.be.fulfilled.and.notify(done);
    });
});
describe('HTTP Asynchronous tests', function () {
    this.timeout(15000);
    it("RAML references test 1", function (done) {
        testAPIHttpAsync("./vfsTests/ramlRefsTest001/api.raml").should.be.fulfilled.and.notify(done);
    });
    it("JSON references test 2", function (done) {
        testAPIHttpAsync("./vfsTests/jsonRefsTest001/api-remote.raml").should.be.fulfilled.and.notify(done);
    });
    it("JSON references test 3", function (done) {
        testAPIHttpAsync("./vfsTests/jsonRefsTest002/api.raml").should.be.rejectedWith("Unexpected end of JSON input").and.notify(done);
    });
    it('Accessing uses node defined in fragment 1', function (done) {
        // process.once("uncaughtException", function (error) {
        //     console.log("HEREHERE: " + error)
        // })
        testAPIHttpAsync("./vfsTests/test005/api.raml").should.be.fulfilled.and.notify(done);
    });
    it('Test RAML and XML units recognition', function (done) {
        // process.once("uncaughtException", function (error) {
        //     console.log("HEREHERE: " + error)
        // })
        testAPIHttpAsync("./vfsTests/test006/apiraml").should.be.fulfilled.and.notify(done);
    });
});
describe('Path tests', function () {
    this.timeout(15000);
    it("Query String Test", function (done) {
        testAPIHttpAsync("./vfsTests/pathWithQuery/api.raml").should.be.fulfilled.and.notify(done);
    });
});
function testAPIHttpAsync(apiRelPath) {
    var apiWebPath = url.resolve("https://" + http2fs.DOMAIN, apiRelPath);
    var apiLocalPath = testUtil.data(apiRelPath);
    var apiDir = path.dirname(apiLocalPath);
    var httpResolver = http2fs.getHttpResolver();
    return index.loadApi(apiWebPath, {
        fsResolver: null,
        httpResolver: httpResolver
    }).then(function (x) {
        return inspect(x, apiDir);
    }, function (y) {
        console.warn(y);
        return Promise.reject(y.message);
    });
}
exports.testAPIHttpAsync = testAPIHttpAsync;
function testAPI(_apiPath) {
    var apiPath = testUtils.data(_apiPath);
    var apiDir = path.dirname(apiPath);
    var apiRelPath = "/" + path.basename(apiPath);
    var contents = getContent(apiDir, apiDir);
    var paths = Object.keys(contents).sort();
    if (paths[0] == "/") {
        paths = paths.slice(1);
    }
    var vfsInstance = vfs.getInstance();
    var fsResolver = {
        content: function (path) {
            throw new Error("Synchronous loading is prohibited");
        },
        contentAsync: function (path) {
            if (isWin) {
                var ind = path.indexOf(":");
                if (ind < 0 || ind == path.length - 1) {
                    throw new Error("Invalid Windows path");
                }
                path = path.substring(ind + 1).replace(/\\/g, "/");
            }
            return vfsInstance.load(path);
        }
    };
    var putEntry = function (ind) {
        if (ind < paths.length) {
            var key = paths[ind];
            var content = contents[key];
            if (content === null) {
                return vfsInstance.createFolder(key).then(function (x) {
                    return putEntry(ind + 1);
                });
            }
            else {
                return vfsInstance.save(key, content).then(function (x) {
                    return putEntry(ind + 1);
                });
            }
        }
    };
    var httpResolver = http2fs.getHttpResolver();
    return vfsInstance.directory("/").then(function (x) {
        return putEntry(0);
    }).then(function (x) {
        // index.loadApi(apiRelPath, {
        //     fsResolver: fsResolver,
        //     httpResolver: httpResolver
        // }).catch(function (theError) {
        //     console.log("Achtung!!!!!")
        //     console.log(theError)
        // })
        return index.loadApi(apiRelPath, {
            fsResolver: fsResolver,
            httpResolver: httpResolver
        });
    }).then(function (x) {
        return inspect(x, apiDir);
    });
}
function getContent(p, rootDir, result) {
    if (result === void 0) { result = {}; }
    var keyPath = "/" + path.relative(rootDir, p).replace(/\\/g, "/");
    if (fs.lstatSync(p).isDirectory()) {
        result[keyPath] = null;
        for (var _i = 0, _a = fs.readdirSync(p); _i < _a.length; _i++) {
            var ch = _a[_i];
            var resolved = path.resolve(p, ch);
            getContent(resolved, rootDir, result);
        }
    }
    else {
        result[keyPath] = fs.readFileSync(p).toString();
    }
    return result;
}
function inspect(node, apiDir) {
    // console.log("INSPECTING:" + apiDir)
    // try {
    if (!node) {
        return Promise.reject(new Error("Failed to load RAML"));
    }
    if (universeHelpers.isApiSibling(node.definition())) {
        node = node.expand();
    }
    var errors = node.errors();
    if (errors && errors.length > 0) {
        var rejectMessage = errors.map(function (e) { return e.message; }).join("\n");
        return Promise.reject(new Error(rejectMessage));
    }
    var apiUnit = node.highLevel().lowLevel().unit();
    var apiFileName = path.basename(apiUnit.absolutePath());
    var realAPIPath = path.resolve(apiDir, apiFileName);
    var tckJsonPath;
    if (realAPIPath.lastIndexOf(".raml") == realAPIPath.length - ".raml".length) {
        tckJsonPath = realAPIPath.replace(".raml", "-tck.json");
    }
    else {
        tckJsonPath = realAPIPath + "-tck.json";
    }
    var json = node.toJSON({ rootNodeDetails: true });
    var pathRegExp = new RegExp('/errors\\[\\d+\\]/path');
    if (!fs.existsSync(tckJsonPath)) {
        fs.writeFileSync(tckJsonPath, JSON.stringify(json, null, 2));
    }
    var tckJson = JSON.parse(fs.readFileSync(tckJsonPath).toString());
    var diff = testUtil.compare(json, tckJson).filter(function (x) {
        if (x.path.match(pathRegExp)) {
            return false;
        }
        return true;
    });
    if (diff.length == 0) {
    }
    else {
        var message = "DIFFERENCE DETECTED FOR \" + " + tckJsonPath + "\n" + console.warn(diff.map(function (x) { return x.message("actual", "expected"); }).join("\n\n"));
        return Promise.reject(new Error(message));
    }
    // } catch (Error) {
    //     console.log("INSPECTION EXCEPTION!: " + Error)
    // }
}
//# sourceMappingURL=virtualFSTests.js.map