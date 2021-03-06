"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("./test-utils");
var assert = require("assert");
var fs = require("fs");
exports.found08 = {};
exports.found10 = {};
var loaded = false;
function getFound(highLevel) {
    var found = highLevel.definition().universe().version() === "RAML10" ? exports.found10 : exports.found08;
    return found;
}
var wrapperMethods = ['kind', 'RAMLVersion', 'wrapperClassName', 'annotations', 'scalarsAnnotations', 'value'];
function loadWrappersData() {
    if (!loaded) {
        var dataDir = utils.data("./functions/data");
        var dataPath08 = dataDir + '/RAML08data.json';
        var dataPath10 = dataDir + '/RAML10data.json';
        exports.found08 = JSON.parse(fs.readFileSync(dataPath08).toString());
        exports.found10 = JSON.parse(fs.readFileSync(dataPath10).toString());
    }
}
exports.loadWrappersData = loadWrappersData;
function callMethods(wrapper, holder, name) {
    if (holder.called) {
        Object.keys(holder.called).forEach(function (method) {
            var ret = toData(wrapper[method]());
            assert.equal(ret, holder.called[method], "wrong result of calling " + name + "." + method + "().");
        });
        return;
    }
    holder.called = {};
    wrapperMethods.forEach(function (method) {
        try {
            var ret = toData(wrapper[method]());
            holder.called[method] = ret;
        }
        catch (exception) {
        }
    });
}
exports.callMethods = callMethods;
function toData(obj) {
    if (typeof obj === 'string') {
        return obj;
    }
    if (obj.length) {
        return obj.length;
    }
    if (typeof obj === 'object') {
        return (obj.name && obj.name()) || (obj.nameId && obj.nameId()) || (obj.key && obj.key());
    }
    return obj;
}
function storeIfNeededFor(highLevel) {
    var dataDir = utils.data("./functions/data");
    var dataPath = dataDir + '/' + highLevel.definition().universe().version() + 'data.json';
    if (fs.existsSync(dataPath)) {
        return;
    }
    var founds = getFound(highLevel);
    var data = {};
    Object.keys(founds).forEach(function (key) {
        var found = founds[key];
        var record = {};
        data[key] = record;
        record.id = found.highLevel.id();
        record.super = found.super.nameId();
        record.called = found.called;
    });
    var text = JSON.stringify(data, null, '\t');
    fs.writeFileSync(dataPath, text);
}
exports.storeIfNeededFor = storeIfNeededFor;
function find(highLevel, name, generate) {
    if (generate === void 0) { generate = false; }
    if (!generate) {
        return findAs(highLevel, name, 'record');
    }
    var res = findAs(highLevel, name, 'supertype');
    if (!res) {
        res = findAs(highLevel, name, 'subtype');
    }
    if (!res) {
        res = findAs(highLevel, name, 'oneparent');
    }
    if (res) {
        var found = getFound(highLevel);
        found[name] = res;
    }
    return res;
}
exports.find = find;
function findAs(highLevel, name, kind) {
    if (!highLevel) {
        return;
    }
    var type = highLevel.definition && highLevel.definition();
    if (type && kind === 'record') {
        var founds = getFound(highLevel);
        var record = founds[name];
        if (record && highLevel.id() === record.id) {
            return { highLevel: highLevel, super: type.universe().type(record.super), called: record.called };
        }
    }
    else if (type) {
        var type = highLevel.definition();
        if (kind === 'supertype') {
            var superType = findSupers(type, name);
            if (superType) {
                return { highLevel: highLevel, super: superType };
            }
        }
        if (kind === 'subtype') {
            var subType = findSubs(type, name);
            if (subType) {
                return { highLevel: highLevel, super: subType };
            }
        }
        if (kind === 'oneparent') {
            var actual = type.universe().type(name);
            if (actual && firstType(actual) === firstType(type)) {
                return { highLevel: highLevel, super: actual };
            }
        }
    }
    var children1 = (highLevel.children && highLevel.children()) || [];
    var children2 = (highLevel.directChildren && highLevel.directChildren()) || [];
    var children = children1.concat(children2);
    for (var i = 0; i < children.length; i++) {
        var res = findAs(children[i], name, kind);
        if (res) {
            return res;
        }
    }
    return null;
}
exports.findAs = findAs;
function findSupers(type, name) {
    if (type.nameId() === name) {
        return type;
    }
    var supers = type.allSuperTypes();
    for (var i = 0; i < supers.length; i++) {
        var res = findSupers(supers[i], name);
        if (res) {
            return res;
        }
    }
    return null;
}
function findSubs(type, name) {
    if (type.nameId() === name) {
        return type;
    }
    var subs = type.allSubTypes();
    for (var i = 0; i < subs.length; i++) {
        var res = findSubs(subs[i], name);
        if (res) {
            return res;
        }
    }
    return null;
}
function firstType(type, previous) {
    if (previous === void 0) { previous = null; }
    var supers = type.allSuperTypes();
    if (!supers || supers.length === 0) {
        return previous || type;
    }
    for (var i = 0; i < supers.length; i++) {
        var res = firstType(supers[i], type);
        if (res) {
            return res;
        }
    }
    return null;
}
//# sourceMappingURL=funcUtils.js.map