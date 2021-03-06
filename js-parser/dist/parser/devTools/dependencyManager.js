"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var util = require("../../util/index");
var mkdirp = require("mkdirp");
var messageRegistry = require("../../../resources/errorMessages");
var ExistingModule = /** @class */ (function () {
    function ExistingModule(_name, _path, _depRoot, stepsToModulesDir) {
        if (_depRoot === void 0) { _depRoot = null; }
        if (stepsToModulesDir === void 0) { stepsToModulesDir = 3; }
        this._name = _name;
        this._path = _path;
        this._depRoot = _depRoot;
        this.stepsToModulesDir = stepsToModulesDir;
    }
    ExistingModule.prototype.name = function () {
        return this._name;
    };
    ExistingModule.prototype.isExternal = function () { return false; };
    ExistingModule.prototype.dependencies = function () {
        return this.parseDepencencies();
    };
    ExistingModule.prototype.parseDepencencies = function () {
        var _this = this;
        var lines = this.content();
        var modules = [];
        lines.forEach(function (l) {
            var mod = _this.moduleFromLine(l);
            if (mod) {
                modules.push(mod);
            }
        });
        return modules;
    };
    ExistingModule.prototype.moduleFromLine = function (l) {
        var mod = null;
        var pos = l.indexOf("require" + "(");
        if (pos != -1) {
            var req = l.substr(pos + ("require" + "(").length + 1);
            var requireCode = req.substr(0, req.indexOf(")") - 1);
            var modulePath = this.resolve(requireCode);
            if (modulePath) {
                mod = new ExistingModule(this.resolveName(requireCode), modulePath);
            }
            else {
                mod = (new ExternalModule(requireCode));
            }
        }
        return mod;
    };
    ExistingModule.prototype.resolve = function (requireCode) {
        var folder = this.depFolder();
        var ps = path.resolve(folder, requireCode + ".ts");
        if (fs.existsSync(ps)) {
            return ps;
        }
        return null;
    };
    ExistingModule.prototype.depFolder = function () {
        return this._depRoot != null ? this._depRoot : this.actualFolder();
    };
    ExistingModule.prototype.actualFolder = function () {
        return path.dirname(this._path);
    };
    ExistingModule.prototype.resolveName = function (requireCode) {
        var p = requireCode.lastIndexOf("/");
        return p != -1 ? requireCode.substr(p + 1) : requireCode;
    };
    ExistingModule.prototype.rewrittenContent = function () {
        var _this = this;
        var lines = this.content();
        var rewrittenLines = [];
        var modules = [];
        lines.forEach(function (l) {
            var pos = l.indexOf("require" + "(");
            if (pos != -1) {
                var pre = l.substr(0, pos);
                var m = _this.moduleFromLine(l);
                var endPos = l.indexOf(')', pos) + 1;
                if (!m.isExternal()) {
                    var result = pre + "require('" + _this.depPath() + m.name() + "')" + l.substring(endPos).trim();
                    rewrittenLines.push(result);
                }
                else {
                    rewrittenLines.push(l);
                }
            }
            else {
                if (l.indexOf("/// <reference path=\"") != -1) {
                    ExistingModule.requiredTypings.forEach(function (x) { return rewrittenLines.push('/// <reference path=\"' + _this.depPath() + 'typings/' + path.basename(x) + '\" />'); });
                }
                else {
                    rewrittenLines.push(l);
                }
            }
        });
        return rewrittenLines.join("\n");
    };
    ExistingModule.prototype.depPath = function () {
        return "./deps/";
    };
    ExistingModule.prototype.rewrite = function (set) {
        if (set === void 0) { set = {}; }
        var key = this._path;
        if (!set[key]) {
            set[key] = true;
            var deps = this.createDepFolder();
            this.dependencies().forEach(function (x) {
                if (!x.isExternal()) {
                    var newPath = deps + "/" + x.name() + ".ts";
                    fs.writeFileSync(newPath, x.content().join("\n"));
                    var af = x.actualFolder();
                    new DepModule(x.name(), newPath, af).rewrite(set);
                }
            });
        }
        fs.writeFileSync(this._path, this.rewrittenContent());
    };
    ExistingModule.prototype.createDepFolder = function () {
        var deps = this.actualFolder() + "/deps";
        //if (!fs.existsSync(deps)) {
        try {
            mkdirp.sync(deps + "/typings/");
            var typingsPath = path.resolve(__dirname, '../../typings');
            var depsTypingsPath = path.resolve(deps, 'typings');
            this.copyContent(typingsPath, depsTypingsPath);
            var tsd_d_ts_Path = path.resolve(depsTypingsPath, 'main.d.ts');
            var str = fs.readFileSync(tsd_d_ts_Path).toString();
            var levelUpStr = '';
            for (var i = 0; i++ < this.stepsToModulesDir; levelUpStr += '../')
                ;
            str = str.replace(new RegExp('\\.\\./', 'g'), levelUpStr);
            fs.writeFileSync(tsd_d_ts_Path, str);
            //fs.readdirSync(depsTypingsPath).forEach(x=>console.log(x))
            //var np = __dirname + "/../../typings/q/Q.d.ts";
            //mkdirp.sync(deps + "/q/");
            //fs.writeFileSync(deps + "/q/Q.d.ts", fs.readFileSync(np).toString());
        }
        catch (e) {
            console.log(e);
        }
        //}
        return deps;
    };
    //small change
    ExistingModule.prototype.copyContent = function (srcFolder, destFolder) {
        fs.copySync(srcFolder, destFolder, { overwrite: true });
    };
    ExistingModule.prototype.content = function () {
        return fs.readFileSync(this._path).toString().split("\n");
    };
    ExistingModule.requiredTypings = [
        'main.d.ts'
    ];
    return ExistingModule;
}());
var DepModule = /** @class */ (function (_super) {
    __extends(DepModule, _super);
    function DepModule(name, path, depRoot) {
        return _super.call(this, name, path, depRoot) || this;
    }
    DepModule.prototype.depPath = function () {
        return "./";
    };
    DepModule.prototype.createDepFolder = function () {
        return this.actualFolder();
    };
    return DepModule;
}(ExistingModule));
var ExternalModule = /** @class */ (function () {
    function ExternalModule(_name) {
        this._name = _name;
    }
    ExternalModule.prototype.actualFolder = function () {
        throw new Error(messageRegistry.UNSUPPORTED_OPERATION_EXCEPTION.message);
    };
    ExternalModule.prototype.name = function () {
        return this._name;
    };
    ExternalModule.prototype.isExternal = function () {
        return true;
    };
    ExternalModule.prototype.content = function () {
        throw new Error(messageRegistry.UNSUPPORTED_OPERATION_EXCEPTION.message);
    };
    ExternalModule.prototype.dependencies = function () {
        return [];
    };
    return ExternalModule;
}());
var DependencyManager = /** @class */ (function () {
    function DependencyManager(_rootPath, patchExternalOnly, stepsToModulesDir) {
        if (_rootPath === void 0) { _rootPath = __dirname; }
        if (patchExternalOnly === void 0) { patchExternalOnly = false; }
        if (stepsToModulesDir === void 0) { stepsToModulesDir = 3; }
        this._rootPath = _rootPath;
        this.patchExternalOnly = patchExternalOnly;
        this.stepsToModulesDir = stepsToModulesDir;
        this.modules = {};
        this.matchRules = [
            new MatchRule(new RequireMatcher(), true, ['ts', 'json']),
            new MatchRule(new RequireResolveMatcher(), true),
            new MatchRule(new ReferenceMatcher(), false)
        ];
    }
    DependencyManager.prototype.updateDeps = function (path) {
        new ExistingModule("dependencyManager", path, this._rootPath, this.stepsToModulesDir).rewrite();
    };
    DependencyManager.prototype.transportDependencies = function (filePath, srcProjectRoot, dstProjectRoot, dstDepsFolder) {
        this.patchDeps(filePath, srcProjectRoot, this._rootPath, dstProjectRoot, dstDepsFolder, true);
        var srcTypingsPath = path.resolve(srcProjectRoot, 'typings');
        var dstTypingsPath = path.resolve(path.resolve(dstProjectRoot, dstDepsFolder), 'typings');
        mkdirp.sync(dstTypingsPath);
        fs.copySync(srcTypingsPath, dstTypingsPath, { overwrite: true });
        var tsd_d_ts_Path = path.resolve(dstTypingsPath, 'main.d.ts');
        var ts_d_ts_Content = fs.readFileSync(tsd_d_ts_Path).toString();
        var levelUpStr = '';
        for (var i = 0; i++ < this.stepsToModulesDir; levelUpStr += '../')
            ;
        ts_d_ts_Content = ts_d_ts_Content.replace(/(\.\.\/)+/, levelUpStr);
        fs.writeFileSync(tsd_d_ts_Path, ts_d_ts_Content);
    };
    DependencyManager.prototype.patchDeps = function (filePath, srcProjectRoot, dependencyBase, dstProjectRoot, dstDepsFolder, doPatch, processed) {
        var _this = this;
        if (processed === void 0) { processed = {}; }
        var deps = this.getDependencies(filePath, dependencyBase);
        deps.forEach(function (x) {
            x.srcProjectRoot = srcProjectRoot;
            x.dstProjectRoot = dstProjectRoot;
            x.dstDepsFolder = dstDepsFolder;
        });
        if (doPatch) {
            var content = fs.readFileSync(filePath).toString();
            var prev = 0;
            var patched = '';
            deps.filter(function (x) { return !(_this.patchExternalOnly && x.isInternal()); }).forEach(function (x) {
                patched += content.substring(prev, x.start);
                patched += x.replacement();
                prev = x.end;
            });
            patched += content.substring(prev, content.length);
            fs.writeFileSync(filePath, patched);
        }
        deps.filter(function (x) { return x.matchRule.isRecursive() && !processed[x.getAbsoluteDestinationPath()]; }).forEach(function (x) {
            x.copySync();
            processed[x.getAbsoluteDestinationPath()] = true;
            _this.patchDeps(x.absPath, srcProjectRoot, path.dirname(x.absPath), dstProjectRoot, dstDepsFolder, false, processed);
        });
    };
    DependencyManager.prototype.getDependencies = function (filePath, dependencyBase) {
        var _this = this;
        var content = fs.readFileSync(filePath).toString();
        var result = [];
        this.matchRules.forEach(function (x) { return x.matcher().match(content).forEach(function (y) {
            if (y.end <= y.start) {
                return;
            }
            var depStr = content.substring(y.start, y.end).trim();
            if (!util.stringStartsWith(depStr, '.')) {
                _this.modules[depStr] = true;
                return;
            }
            var absPathBase = path.resolve(dependencyBase, depStr);
            var matched = false;
            x.extensions().forEach(function (ext) {
                ext = util.stringStartsWith(ext, '.') || ext.length == 0 ? ext : '.' + ext;
                var absPath = absPathBase + ext;
                if (fs.existsSync(absPath)) {
                    result.push(new DependencyOccurence(depStr, y.start, y.end, x, absPath));
                    matched = true;
                }
            });
            if (!matched) {
                _this.modules[depStr] = true;
            }
        }); });
        return result.sort(function (x, y) { return x.start - y.start; });
    };
    return DependencyManager;
}());
exports.DependencyManager = DependencyManager;
var DependencyOccurence = /** @class */ (function () {
    function DependencyOccurence(path, start, end, matchRule, absPath) {
        this.path = path;
        this.start = start;
        this.end = end;
        this.matchRule = matchRule;
        this.absPath = absPath;
    }
    DependencyOccurence.prototype.isInternal = function () {
        return util.stringStartsWith(this.path, './');
    };
    DependencyOccurence.prototype.patch = function (content) {
        var requireStr = this.replacement();
        var result = content.substring(0, this.start) + requireStr + content.substr(this.end);
        return result;
    };
    DependencyOccurence.prototype.replacement = function () {
        var absDstPath = this.getAbsoluteDestinationPath();
        var dstRelPath = absDstPath.substring(this.dstProjectRoot.length);
        dstRelPath = dstRelPath.replace(/\\/g, '/');
        if (dstRelPath.charAt(0) != '/') {
            dstRelPath = '/' + dstRelPath;
        }
        dstRelPath = '.' + dstRelPath;
        var requireStr = dstRelPath;
        var ind = requireStr.lastIndexOf('.');
        var ext = ind < 0 ? '' : requireStr.substring(ind + 1);
        ind = ind < 0 ? requireStr.length : ind;
        if (this.matchRule.extensions().indexOf(ext) >= 0) {
            requireStr = requireStr.substring(0, ind);
        }
        return requireStr;
    };
    DependencyOccurence.prototype.copySync = function () {
        var absDstPath = this.getAbsoluteDestinationPath();
        var content = fs.readFileSync(this.absPath).toString();
        mkdirp.sync(path.dirname(absDstPath));
        fs.writeFileSync(absDstPath, content);
        if (util.stringEndsWith(absDstPath, '.ts')) {
            var jsPath = absDstPath.substring(0, absDstPath.length - '.ts'.length) + '.js';
            if (fs.existsSync(jsPath)) {
                fs.unlinkSync(jsPath);
            }
        }
    };
    DependencyOccurence.prototype.getAbsoluteDestinationPath = function () {
        var srcRelPath = path.relative(this.srcProjectRoot, this.absPath);
        var absDstDepsPath = path.resolve(this.dstProjectRoot, this.dstDepsFolder);
        var absDstPath = path.resolve(absDstDepsPath, srcRelPath);
        return absDstPath;
    };
    return DependencyOccurence;
}());
exports.DependencyOccurence = DependencyOccurence;
var Match = /** @class */ (function () {
    function Match(start, end) {
        this.start = start;
        this.end = end;
    }
    return Match;
}());
exports.Match = Match;
var MatchRule = /** @class */ (function () {
    function MatchRule(_matcher, _isRecursive, _extensions) {
        if (_extensions === void 0) { _extensions = ['']; }
        this._matcher = _matcher;
        this._isRecursive = _isRecursive;
        this._extensions = _extensions;
    }
    MatchRule.prototype.matcher = function () { return this._matcher; };
    MatchRule.prototype.isRecursive = function () { return this._isRecursive; };
    MatchRule.prototype.extensions = function () { return this._extensions; };
    return MatchRule;
}());
exports.MatchRule = MatchRule;
var BasicMatcher = /** @class */ (function () {
    function BasicMatcher(startSeq, endSeq) {
        this.startSeq = startSeq;
        this.endSeq = endSeq;
    }
    BasicMatcher.prototype.match = function (content) {
        var result = [];
        var ind = 0;
        var match = this.nextMatch(content, ind);
        while (match) {
            result.push(match);
            ind = match.end;
            match = this.nextMatch(content, ind);
        }
        return result;
    };
    BasicMatcher.prototype.nextMatch = function (content, ind) {
        var sMatch = this.matchStringSequence(content, this.startSeq, ind);
        if (!sMatch) {
            return null;
        }
        var eMatch = this.matchStringSequence(content, this.endSeq, sMatch.end);
        if (!eMatch) {
            return null;
        }
        var matchStr = content.substring(sMatch.end, eMatch.start).trim();
        var start = content.indexOf(matchStr, sMatch.end);
        var end = start + matchStr.length;
        return new Match(start + 1, end - 1); //correction by +-1 is due to quotes
    };
    BasicMatcher.prototype.matchStringSequence = function (content, seq, ind) {
        var start = -1;
        var end = -1;
        for (var i = 0; i < seq.length; i++) {
            var str = seq[i];
            var ind1 = content.indexOf(str, ind);
            if (ind1 < 0) {
                ind = -1;
                break;
            }
            if (i > 0 && content.substring(ind, ind1).trim().length > 0) {
                i = -1;
                continue;
            }
            else if (i == 0) {
                start = ind1;
            }
            ind = ind1 + str.length;
        }
        if (ind < 0) {
            return null;
        }
        end = ind;
        return new Match(start, end);
    };
    return BasicMatcher;
}());
var RequireMatcher = /** @class */ (function (_super) {
    __extends(RequireMatcher, _super);
    function RequireMatcher() {
        return _super.call(this, ['require', '('], [')']) || this;
    }
    return RequireMatcher;
}(BasicMatcher));
var RequireResolveMatcher = /** @class */ (function (_super) {
    __extends(RequireResolveMatcher, _super);
    function RequireResolveMatcher() {
        return _super.call(this, ['require.resolve', '('], [')']) || this;
    }
    return RequireResolveMatcher;
}(BasicMatcher));
var ReferenceMatcher = /** @class */ (function (_super) {
    __extends(ReferenceMatcher, _super);
    function ReferenceMatcher() {
        return _super.call(this, ['///', '<', 'reference', 'path', '='], ['/', '>']) || this;
    }
    return ReferenceMatcher;
}(BasicMatcher));
//# sourceMappingURL=dependencyManager.js.map