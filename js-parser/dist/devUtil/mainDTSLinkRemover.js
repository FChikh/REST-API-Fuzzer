"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
/**
 * Traverses through the folder and its subfolders recursively,
 * call callBack for each found ".d.ts" file.
 * @param folder
 * @param callBack
 */
function traverseDTS(folder, callBack) {
    fs.readdirSync(folder).forEach(function (childName) {
        var fullChildPath = path.join(folder, childName);
        var stats = fs.statSync(fullChildPath);
        if (stats.isFile() && ".ts" == path.extname(childName)
            && childName.indexOf(".d.ts") != -1) {
            callBack(fullChildPath);
        }
        else if (stats.isDirectory()) {
            traverseDTS(fullChildPath, callBack);
        }
    });
}
function escape(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var MainDTSRegexp = new RegExp('///' + '\\s*' + '<reference'
    + '\\s*' + 'path' + '\\s*' + '=' + '\\s*'
    + '"(\\.|\/)*' + 'typings/main.d.ts"' + '\\s*' + '/>');
/**
 * Cuts a main.d.ts link from a string
 * @param original
 * @returns {string}
 */
function cutOffMainDTSRefFromString(original) {
    return original.replace(MainDTSRegexp, "");
}
/**
 * Goes through all .d.ts file in a folder and its subfolders recursively,
 * if .d.ts file contains main.d.ts link, cuts it off in the file.
 * @param folder
 */
function patchDTSFiles(folder) {
    traverseDTS(folder, function (dtsFilePath) {
        var content = fs.readFileSync(dtsFilePath).toString();
        var modifiedContent = cutOffMainDTSRefFromString(content);
        if (content != modifiedContent) {
            console.log("Removing main.d.ts link from: " + dtsFilePath);
            fs.writeFileSync(dtsFilePath, modifiedContent);
        }
    });
}
var distFolder = path.join(__dirname, "../../dist");
patchDTSFiles(distFolder);
//# sourceMappingURL=mainDTSLinkRemover.js.map