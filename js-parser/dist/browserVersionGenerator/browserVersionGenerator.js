"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var webpack = require("webpack");
var fsutil = require("../util/fsutil");
var _ = require("underscore");
function createBrowserPackage(minify) {
    if (minify === void 0) { minify = true; }
    console.log("Minify: " + minify);
    var rootPath = path.join(__dirname, "../../");
    var rootFile = path.join(rootPath, "/dist/index.js");
    var targetFolder = path.join(rootPath, "browserVersion");
    var targetFile = path.join(targetFolder, "raml-1-parser.js");
    var xmlValidationTargetFile = path.join(targetFolder, "raml-xml-validation.js");
    var jsonValidationTargetFile = path.join(targetFolder, "raml-json-validation.js");
    var xmlValidationRootFile = path.resolve(rootPath, './node_modules/raml-definition-system/node_modules/raml-typesystem/node_modules/raml-xml-validation/dist/index.js');
    var jsonValidationRootFile = path.resolve(rootPath, './node_modules/raml-definition-system/node_modules/raml-typesystem/node_modules/raml-json-validation/dist/index.js');
    mkdirp.sync(targetFolder);
    copyStaticBrowserPackageContents(targetFolder, path.join(rootPath, "package.json"));
    webPackForBrowser(rootPath, rootFile, targetFile, minify);
    var indexHtml = path.resolve(__dirname, "../../browserVersion/examples/web-example/index.html");
    var indexHtmlContent = fs.readFileSync(indexHtml).toString();
    try {
        if (fs.existsSync(xmlValidationRootFile)) {
            indexHtmlContent = indexHtmlContent.replace("<xmlvalidation>", '<script type="text/javascript" src="../../raml-xml-validation.js"></script>');
            webPackForBrowserLib(rootPath, xmlValidationRootFile, xmlValidationTargetFile, false, "RAML.XmlValidation", "raml-xml-validation");
        }
        else {
            indexHtmlContent = indexHtmlContent.replace("<xmlvalidation>", '');
        }
    }
    catch (exception) {
        indexHtmlContent = indexHtmlContent.replace("<xmlvalidation>", '');
    }
    try {
        if (fs.existsSync(jsonValidationRootFile)) {
            indexHtmlContent = indexHtmlContent.replace("<jsonvalidation>", '<script type="text/javascript" src="../../raml-json-validation.js"></script>');
            webPackForBrowserLib(rootPath, jsonValidationRootFile, jsonValidationTargetFile, minify, "RAML.JsonValidation", "raml-json-validation");
        }
        else {
            indexHtmlContent = indexHtmlContent.replace("<jsonvalidation>", '');
        }
    }
    catch (exception) {
        indexHtmlContent = indexHtmlContent.replace("<jsonvalidation>", '');
    }
    fs.writeFileSync(indexHtml, indexHtmlContent);
}
/**
 *
 * @param parserRootFolder - full path to cloned parser repository root folder
 * @param rootFile - full path to parser index JS file
 * @param targetFileName
 * @param callback
 */
function webPackForBrowser(parserRootFolder, rootFile, targetFile, minify) {
    console.log("Preparing to Webpack browser bundle: raml-1-parser.js");
    var plugins = [];
    if (minify) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: { warnings: false }
        }));
    }
    var relativeFilePath = path.relative(parserRootFolder, rootFile);
    relativeFilePath = "./" + relativeFilePath;
    var targetFolder = path.dirname(targetFile);
    var targetFileName = path.basename(targetFile);
    var config = {
        context: parserRootFolder,
        entry: relativeFilePath,
        output: {
            path: targetFolder,
            library: ['RAML', 'Parser'],
            filename: targetFileName,
            libraryTarget: "umd"
        },
        plugins: plugins,
        resolve: {
            alias: {
                fs: path.resolve(__dirname, "../../web-tools/modules/emptyFS.js")
            }
        },
        module: {
            loaders: [
                { test: /\.json$/, loader: "json" }
            ]
        },
        externals: [
            {
                // "buffer" : true,
                // "concat-stream" : true,
                // "esprima" : true,
                "libxml-xsd": true,
                "ws": true,
                // "http-response-object" : true,
                // "json-schema-compatibility" : true,
                // "json-stable-stringify" : true,
                // "know-your-http-well" : true,
                // "loophole" : true,
                // "lrucache" : true,
                // "media-typer" : true,
                // "path" : true,
                // "pluralize" : true,
                // "then-request" : true,
                "typescript": true,
                "raml-xml-validation": "RAML.XmlValidation",
                "raml-json-validation": "RAML.JsonValidation"
                // "underscore" : true,
                // "url": true,
                // "xmldom" : true,
                // "xmlhttprequest": true,
                // "xhr2": true,
                // "z-schema" : true,
            }
        ],
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
    webpack(config, function (err, stats) {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log("Webpack Building Browser Bundle:");
        console.log(stats.toString({ reasons: true, errorDetails: true }));
    });
}
function webPackForBrowserLib(parserRootFolder, rootFile, targetFile, minify, libName, moduleName) {
    console.log("Preparing to Webpack browser bundle: " + moduleName);
    var plugins = [];
    if (minify) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: { warnings: false }
        }));
    }
    var relativeFilePath = path.relative(parserRootFolder, rootFile);
    relativeFilePath = "./" + relativeFilePath;
    var targetFolder = path.dirname(targetFile);
    var targetFileName = path.basename(targetFile);
    var config = {
        context: parserRootFolder,
        entry: relativeFilePath,
        output: {
            path: targetFolder,
            library: [libName],
            filename: targetFileName,
            libraryTarget: "umd"
        },
        plugins: plugins,
        module: {
            loaders: [
                { test: /\.json$/, loader: "json" }
            ]
        },
        externals: [
            {
                "libxml-xsd": true,
                "ws": true
            }
        ],
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
    webpack(config, function (err, stats) {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log("Webpack Building Browser Bundle:");
        console.log(stats.toString({ reasons: true, errorDetails: true }));
    });
}
function copyStaticBrowserPackageContents(browserDestinationPath, packageJsonPath) {
    var browserStaticPackagePath = path.resolve(__dirname, "../../src/browserVersionGenerator/static");
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
var args = process.argv;
if (_.find(args, function (arg) { return arg == "-dev"; })) {
    createBrowserPackage(false);
}
else {
    createBrowserPackage();
}
//# sourceMappingURL=browserVersionGenerator.js.map