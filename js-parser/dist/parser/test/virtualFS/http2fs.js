"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
exports.DOMAIN = "WWW.__TESTDATA__.com";
function getHttpResolver() {
    return new Http2FSResolverAsync();
}
exports.getHttpResolver = getHttpResolver;
var Http2FSResolverAsync = /** @class */ (function () {
    function Http2FSResolverAsync() {
    }
    Http2FSResolverAsync.prototype.getResource = function (url) {
        throw new Error("Sync resolver method not allowed.");
    };
    Http2FSResolverAsync.prototype.getResourceAsync = function (url) {
        var ind = url.toLocaleLowerCase().indexOf(exports.DOMAIN.toLocaleLowerCase());
        if (ind < 0) {
            return Promise.reject(new Error("Url supposed to belong to the \"" + exports.DOMAIN + "\" domain."));
        }
        var subPath = global.escape(url.substring(ind + exports.DOMAIN.length + 1));
        return this.getRootDir().then(function (dataDir) {
            var absPath = path.resolve(dataDir, subPath);
            return new Promise(function (resolve, reject) {
                if (!fs.existsSync(absPath)) {
                    resolve({
                        content: null,
                        errorMessage: "File does not exist: " + absPath
                    });
                }
                var content;
                try {
                    content = fs.readFileSync(absPath).toString();
                    resolve({
                        content: content,
                        errorMessage: null
                    });
                }
                catch (e) {
                    resolve({
                        content: null,
                        errorMessage: typeof e == "string" ? e : e.toString()
                    });
                }
            });
        }, function (err) {
            console.log("HUI3");
            var errMessage = null;
            if (err != null) {
                errMessage = (typeof err == "string") ? err : err.toString();
            }
            return Promise.resolve({
                content: null,
                errorMessage: errMessage
            });
        });
    };
    Http2FSResolverAsync.prototype.getRootDir = function () {
        if (this.rootDataDir != null) {
            return Promise.resolve(this.rootDataDir);
        }
        var dir = __dirname;
        while (!fs.existsSync(path.resolve(dir, "package.json"))) {
            var parent = path.resolve(dir, "../");
            if (parent == dir) {
                return Promise.reject(new Error("Unable to detect project root"));
            }
            dir = parent;
        }
        this.rootDataDir = path.resolve(dir, "./src/parser/test/data");
        return Promise.resolve(this.rootDataDir);
    };
    return Http2FSResolverAsync;
}());
exports.Http2FSResolverAsync = Http2FSResolverAsync;
//# sourceMappingURL=http2fs.js.map