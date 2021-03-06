"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyValuePair = /** @class */ (function () {
    function KeyValuePair() {
    }
    return KeyValuePair;
}());
exports.KeyValuePair = KeyValuePair;
var Map = /** @class */ (function () {
    function Map(ms) {
        if (ms === void 0) { ms = []; }
        var _this = this;
        this.mappings = [];
        ms.forEach(function (m) { return _this.mappings.push(m); });
    }
    Map.prototype.volume = function () { return this.mappings.length; };
    Map.prototype.pairs = function () { return [].concat(this.mappings); };
    Map.prototype.set = function (key, value) {
        var pairs = this.mappings.filter(function (x) { return x.key == key; });
        if (pairs.length == 0)
            this.mappings.push({ key: key, value: value });
        else
            pairs[0].value = value;
    };
    Map.prototype.get = function (key) {
        var pairs = this.mappings.filter(function (x) { return x.key == key; });
        return (pairs.length == 0) ? null : pairs[0].value;
    };
    Map.prototype.map = function (callbackfn) {
        return this.mappings.map(function (x) { return x.value; }).map(callbackfn);
    };
    Map.prototype.forEach = function (callbackfn) {
        this.mappings.map(function (x) { return x.value; }).forEach(callbackfn);
    };
    Map.prototype.filter = function (callbackfn) {
        return this.mappings.map(function (x) { return x.value; }).filter(callbackfn);
    };
    return Map;
}());
exports.Map = Map;
//# sourceMappingURL=pair.js.map