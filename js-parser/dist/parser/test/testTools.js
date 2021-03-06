"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLength(obj) {
    if (obj == null) {
        return null;
    }
    if (obj.length != null) {
        if (typeof (obj.length) == 'number') {
            return obj.length;
        }
        if (typeof (obj.length) == 'function') {
            return obj.length();
        }
    }
    if (obj.size != null) {
        if (typeof (obj.size) == 'number') {
            return obj.size;
        }
        if (typeof (obj.size) == 'function') {
            return obj.size();
        }
    }
    return null;
}
exports.getLength = getLength;
function collectionItem(collection, index) {
    if (collection == null) {
        return null;
    }
    if (Array.isArray(collection)) {
        return collection[index];
    }
    var getMethod = collection.get;
    if (getMethod != null && typeof (getMethod) == 'function') {
        return collection.get(index);
    }
    var itemAtMethod = collection.itemAt;
    if (itemAtMethod != null && typeof (itemAtMethod) == 'function') {
        return collection.itemAt(index);
    }
    return null;
}
exports.collectionItem = collectionItem;
function toArray(obj) {
    if (Array.isArray(obj)) {
        return obj;
    }
    if (typeof obj.size == 'function') {
        var arr = [];
        var size = obj.size();
        for (var i = 0; i < size; i++) {
            arr.push(obj.get(i));
        }
        return arr;
    }
    return obj;
}
exports.toArray = toArray;
//# sourceMappingURL=testTools.js.map