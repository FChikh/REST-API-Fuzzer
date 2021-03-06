"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../../util/index");
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var webpack = require("webpack");
var depMan = require("./dependencyManager");
var fsutil = require("../../util/fsutil");
var tsc = require('typescript-compiler');
var devUtil = require("../../devUtil/devUtils");
var initializerFileName = 'raml1Parser';
var initializerTypescriptFileName = initializerFileName + '.ts';
var bundledJSFileName = initializerFileName + '.js';
var browserBundleJSFileName = 'raml-1-parser.js';
//import aUtils = require("./automation/impl/automationUtils");
function deployBundle(dstPath, tmpFolder, uglify) {
    if (uglify === void 0) { uglify = false; }
    var outputFolder = path.resolve(dstPath, 'src');
    mkdirp.sync(outputFolder);
    mkdirp.sync(tmpFolder);
    var setterPath = path.resolve(tmpFolder, initializerTypescriptFileName);
    var targetDir = path.dirname(setterPath);
    mkdirp.sync(targetDir);
    fs.writeFileSync(setterPath, getRamlModuleCode());
    tsc.compile([setterPath], '-m commonjs');
    var plugins = uglify ? [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {}
        })
    ] : [];
    var config = {
        context: tmpFolder,
        entry: path.resolve(tmpFolder, bundledJSFileName),
        output: {
            path: outputFolder,
            filename: "raml1Parser.js",
            libraryTarget: "commonjs2"
        },
        externals: [
            {
                "buffer": true,
                "concat-stream": true,
                "esprima": true,
                "fs": true,
                "http-response-object": true,
                "json-schema-compatibility": true,
                "json-stable-stringify": true,
                "know-your-http-well": true,
                "loophole": true,
                "lrucache": true,
                "media-typer": true,
                "path": true,
                "pluralize": true,
                "then-request": true,
                "typescript": true,
                "underscore": true,
                "url": true,
                "xmldom": true,
                "xmlhttprequest": true,
                "xhr2": true,
                "z-schema": true,
            }
        ],
        plugins: plugins,
        module: {
            loaders: [
                { test: /\.json$/, loader: "json" }
            ]
        },
        node: {
            console: false,
            global: true,
            process: true,
            Buffer: true,
            __filename: true,
            __dirname: true,
            setImmediate: true
        }
    };
    return new Promise(function (resolve, reject) {
        webpack(config, function (err, stats) {
            if (err) {
                Promise.reject(err);
            }
            var bundlePath = path.resolve(outputFolder, 'raml1Parser.js');
            var content = fs.readFileSync(bundlePath).toString();
            var contentPatched = content.replace('module.exports = require("typescript");', "module.exports = {};");
            fs.writeFileSync(bundlePath, contentPatched);
            console.log("Webpack Building Bundle:");
            console.log(stats.toString({ reasons: true, errorDetails: true }));
            Promise.resolve();
        });
    });
}
exports.deployBundle = deployBundle;
function installNodeModules(path) {
    console.log("Installing node modules for :" + path);
    devUtil.execProcess("npm install", path, false, true, "Installing node modules", "Finished installing node modules");
    console.log("Finished installing node modules for :" + path);
}
function webPackForBrowser(commonJSBundlePath, targetFileName, callback) {
    console.log("Preparing to Webpack browser bundle:");
    var plugins = [];
    var folder = path.dirname(commonJSBundlePath);
    var file = path.basename(commonJSBundlePath);
    var config = {
        context: folder,
        entry: commonJSBundlePath,
        output: {
            path: folder,
            library: ['RAML', 'Parser'],
            filename: targetFileName,
            libraryTarget: "umd"
        },
        plugins: plugins,
        module: {
            loaders: [
                { test: /\.json$/, loader: "json" }
            ]
        }
    };
    webpack(config, function (err, stats) {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log("Webpack Building Browser Bundle:");
        console.log(stats.toString({ reasons: true, errorDetails: true }));
        if (callback) {
            callback();
        }
    });
}
function copyStaticBrowserPackageContents(browserDestinationPath, packageJsonPath) {
    var browserStaticPackagePath = path.resolve(__dirname, "../../../js_parser/static/browser_package");
    if (!fs.existsSync(browserStaticPackagePath)) {
        console.log("Can not find static browser package: " + browserStaticPackagePath);
        return;
    }
    var packageJsonContents = fs.readFileSync(packageJsonPath).toString();
    var config = JSON.parse(packageJsonContents);
    var moduleVersion = config.version;
    var bowerJsonContents = fs.readFileSync(path.resolve(browserStaticPackagePath, "bower.json")).toString();
    var updatedBowerJsonContents = bowerJsonContents.replace("$version", moduleVersion);
    fs.writeFileSync(path.resolve(browserDestinationPath, "bower.json"), updatedBowerJsonContents);
    fsutil.copyDirSyncRecursive(path.resolve(browserDestinationPath, "examples"), path.resolve(browserStaticPackagePath, "examples"));
}
function createBrowserPackage(bundlePath, browserDestinationPath, tmpFolder, callback) {
    mkdirp.sync(bundlePath);
    mkdirp.sync(browserDestinationPath);
    var browserBundlingTmpFolder = path.resolve(tmpFolder, "browser_bundling");
    mkdirp.sync(browserBundlingTmpFolder);
    var bundledCommonJSFilePath = path.resolve(bundlePath, "src/" + bundledJSFileName);
    var tempCommonJSFilePath = path.resolve(browserBundlingTmpFolder, bundledJSFileName);
    fsutil.copyFileSync(bundledCommonJSFilePath, tempCommonJSFilePath);
    var bundledPackageJson = path.resolve(bundlePath, "package.json");
    var tmpPackageJson = path.resolve(browserBundlingTmpFolder, "package.json");
    fsutil.copyFileSync(bundledPackageJson, tmpPackageJson);
    fsutil.copyDirSyncRecursive(path.resolve(browserBundlingTmpFolder, "web-tools"), path.resolve(bundlePath, "web-tools"));
    copyStaticBrowserPackageContents(browserDestinationPath, bundledPackageJson);
    installNodeModules(browserBundlingTmpFolder);
    webPackForBrowser(tempCommonJSFilePath, browserBundleJSFileName, function () {
        console.log("Copying webpacked browser bundle to destination");
        var source = path.resolve(browserBundlingTmpFolder, browserBundleJSFileName);
        var target = path.resolve(browserDestinationPath, browserBundleJSFileName);
        fsutil.copyFileSync(source, target);
        if (callback)
            callback();
    });
}
function generateTypings(dstPath, tmpFolder) {
    mkdirp.sync(tmpFolder);
    var ramlModulePath = path.resolve(tmpFolder, initializerTypescriptFileName);
    fs.writeFileSync(ramlModulePath, getRamlModuleCode());
    var dm = new depMan.DependencyManager();
    dm.transportDependencies(ramlModulePath, path.resolve(tmpFolder, '../../'), tmpFolder, './');
    //Object.keys(dm.modules).forEach(x=>console.log(x));
    var compileLog = tsc.compile([ramlModulePath], '-m commonjs -d');
    //console.log(compileLog);
    fsutil.copyDirSyncRecursive(path.resolve(dstPath, 'parser-typings'), tmpFolder, { forceDelete: true }, function (x) { return fs.lstatSync(x).isDirectory() || util.stringEndsWith(x, '.d.ts'); });
}
function generateDocumentation(dstPath, tmpFolder) {
    var projectFolder = __dirname;
    while (!fs.existsSync(path.resolve(projectFolder, "gulpfile.js"))) {
        projectFolder = path.resolve(projectFolder, "../");
    }
    var themeFolder = path.resolve(projectFolder, 'src/devUtil/documentation');
    console.log('Generating documentation...');
    var docGenTmpFolder = path.resolve(tmpFolder, 'documentation');
    mkdirp.sync(docGenTmpFolder);
    var callPath = "typedoc"
        + " --out " + docGenTmpFolder
        + " "
        + path.resolve(projectFolder, './src/index.ts')
        + " --theme " + themeFolder
        + " --includeDeclarations"
        + " --name \"RAML JS Parser 2\""
        + " --module commonjs";
    devUtil.execProcess(callPath, process.cwd());
    var docGenDstFolder = path.resolve(dstPath, 'documentation');
    fs.readdirSync(docGenTmpFolder).map(function (x) { return path.resolve(docGenDstFolder, x); }).forEach(function (x) { return fsutil.removeDirSyncRecursive(x); });
    fsutil.copyDirSyncRecursive(docGenDstFolder, docGenTmpFolder);
    console.log('Documentation has been copied to ' + docGenDstFolder);
}
function getRamlModuleCode() {
    return "\nimport apiLoader = require('../../src/ramlscript/apiLoader');\nimport json2lowlevel = require('../../src/parser/jsyaml/json2lowLevel')\nimport RamlWrapper = require('../../src/parser/artifacts/raml10parser')\nimport parserCore = require('../../src/parser/wrapped-ast/parserCore')\nimport Opt = require('../../src/Opt');\nimport typeSystem=require(\"../../src/parser/definition-system/typeSystem\");\n\n\nexport function loadApiSync(\n    apiPath:string,\n    extensionsAndOverlays?:string[],\n    options?:parserCore.Options):RamlWrapper.Api{\n\n    return RamlWrapper.loadApiSync(apiPath,extensionsAndOverlays,options);\n}\n\nexport function loadApi(\n    apiPath:string,\n    extensionsAndOverlays?:string[],\n    options?:parserCore.Options):Promise<RamlWrapper.Api>{\n\n    return RamlWrapper.loadApi(apiPath,extensionsAndOverlays,options);\n}\n\nexport function loadRAMLSync(\n    apiPath:string,\n    extensionsAndOverlays?:string[],\n    options?:parserCore.Options):RamlWrapper.RAMLLanguageElement{\n\n    return RamlWrapper.loadRAMLSync(apiPath,extensionsAndOverlays,options);\n}\n\nexport function loadRAML(\n    apiPath:string,\n    extensionsAndOverlays?:string[],\n    options?:parserCore.Options):Promise<RamlWrapper.RAMLLanguageElement>{\n\n    return RamlWrapper.loadRAML(apiPath,extensionsAndOverlays,options);\n}\n\n/**\n * Gets AST node by runtime type, if runtime type matches any.\n * @param runtimeType - runtime type to find the match for\n */\nexport function getLanguageElementByRuntimeType(runtimeType : typeSystem.ITypeDefinition) : parserCore.BasicNode {\n    return RamlWrapper.getLanguageElementByRuntimeType(runtimeType);\n}\n";
}
var dstPath;
var browserDstPath;
var skipSources = false;
var args = process.argv;
for (var i = 0; i < args.length; i++) {
    if (args[i] == '-dstPath' && i < args.length - 1) {
        dstPath = args[i + 1];
    }
    if (args[i] == '-browserDstPath' && i < args.length - 1) {
        browserDstPath = args[i + 1];
    }
    if (args[i] == '-skipSources') {
        skipSources = true;
    }
}
if (dstPath == null) {
    dstPath = path.resolve(process.cwd(), "packagedParser");
}
var tmpFolder = path.resolve(process.cwd(), '____parser_package_tmp');
var typingsFolder = path.resolve(tmpFolder, 'typings');
var bundleFolder = path.resolve(tmpFolder, 'bundle');
var cleanup = function () {
    console.log('Removing ' + tmpFolder + ' ...');
    fsutil.removeDirSyncRecursive(tmpFolder);
    console.log('Folder has been removed: ' + tmpFolder);
};
if (skipSources) {
    dstPath = path.resolve(dstPath, "../");
    generateDocumentation(dstPath, tmpFolder);
    cleanup();
}
else {
    generateTypings(dstPath, typingsFolder);
    deployBundle(dstPath, bundleFolder).then(function () {
        generateDocumentation(dstPath, tmpFolder);
        if (browserDstPath) {
            createBrowserPackage(dstPath, browserDstPath, tmpFolder, function () {
                cleanup();
            });
        }
        else {
            cleanup();
        }
    });
}
//# sourceMappingURL=packageTSParser.js.map