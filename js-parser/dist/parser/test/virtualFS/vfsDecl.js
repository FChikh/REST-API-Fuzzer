"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        this.length = 0;
    }
    LocalStorage.prototype.getItem = function (key) {
        var result = this[key];
        if (result === undefined) {
            return null;
        }
        return result;
    };
    LocalStorage.prototype.setItem = function (key, value) {
        this[key] = value;
        this.length++;
    };
    LocalStorage.prototype.removeItem = function (key) {
        this[key] = undefined;
        this.length--;
    };
    LocalStorage.prototype.clear = function () {
        for (var _i = 0, _a = Object.keys(this); _i < _a.length; _i++) {
            var key = _a[_i];
            delete this[key];
        }
        this.length = 0;
    };
    LocalStorage.prototype.key = function (index) {
        return null;
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
//# sourceMappingURL=vfsDecl.js.map