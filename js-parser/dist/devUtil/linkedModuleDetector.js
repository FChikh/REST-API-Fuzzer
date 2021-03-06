"use strict";
//helper to find a sub-hierarchy of fs-linked modules from a list, including real fs locations
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var _ = require("underscore");
function detectModulesInFolder(rootModulePath, modulesToDetect, parent) {
    var nodeModulesFolder = path.join(rootModulePath, "node_modules");
    if (!fs.existsSync(nodeModulesFolder))
        return;
    subDirectories(nodeModulesFolder).forEach(function (subDirectory) {
        var fullSubdirPath = path.join(nodeModulesFolder, subDirectory);
        var subModule = moduleFromFolder(fullSubdirPath, modulesToDetect);
        if (subModule) {
            subModule.fsLocation = fs.realpathSync(fullSubdirPath);
            if (parent) {
                if (!parent.dependencies) {
                    parent.dependencies = [];
                }
                if (!_.find(parent.dependencies, function (dependency) { return dependency.name == subModule.name; })) {
                    parent.dependencies.push(subModule);
                }
            }
            detectModulesInFolder(fullSubdirPath, modulesToDetect, subModule);
        }
    });
}
function getModules() {
    var rootModuleFolder = path.join(__dirname, "../../");
    var result = [];
    var modulesMap = loadModulesStaticInfo();
    var rootModule = moduleFromFolder(rootModuleFolder, modulesMap);
    if (rootModule) {
        rootModule.fsLocation = fs.realpathSync(rootModuleFolder);
    }
    detectModulesInFolder(rootModuleFolder, modulesMap, rootModule);
    Object.keys(modulesMap).forEach(function (moduleName) {
        result.push(modulesMap[moduleName]);
    });
    return result;
}
exports.getModules = getModules;
function moduleFromFolder(folder, modulesToDetect) {
    var moduleFolderName = path.basename(folder);
    var moduleName = getModuleName(folder);
    var module = null;
    if (moduleFolderName && modulesToDetect[moduleFolderName]) {
        module = modulesToDetect[moduleFolderName];
    }
    else if (moduleName && modulesToDetect[moduleName]) {
        module = modulesToDetect[moduleName];
    }
    return module;
}
function getModuleName(rootModulePath) {
    var packageJsonPath = path.join(rootModulePath, "package.json");
    if (!fs.existsSync(packageJsonPath))
        return null;
    var packageJsonContents = fs.readFileSync(packageJsonPath).toString();
    var config = JSON.parse(packageJsonContents);
    return config.name;
}
function subDirectories(folder) {
    return fs.readdirSync(folder).filter(function (childName) {
        return fs.statSync(path.join(folder, childName)).isDirectory();
    });
}
function loadModulesStaticInfo() {
    var modulesListLocation = path.join(__dirname, "../../src/devUtil/modulesList.json");
    var modulesListContent = fs.readFileSync(modulesListLocation).toString();
    var list = JSON.parse(modulesListContent);
    var result = {};
    Object.keys(list).forEach(function (moduleName) {
        var obj = list[moduleName];
        var module = {
            name: moduleName,
            buildCommand: obj.build,
            testCommand: obj.test
        };
        result[moduleName] = module;
    });
    return result;
}
//# sourceMappingURL=linkedModuleDetector.js.map