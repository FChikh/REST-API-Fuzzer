"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modulesDetector = require("./linkedModuleDetector");
var cp = require("child_process");
function execProcess(command, wrkDir, logEnabled, errLogEnabled, messageBefore, messageAfter, messageError, maxLogLength, onError) {
    if (logEnabled === void 0) { logEnabled = false; }
    if (errLogEnabled === void 0) { errLogEnabled = true; }
    if (messageBefore === void 0) { messageBefore = ''; }
    if (messageAfter === void 0) { messageAfter = ''; }
    if (messageError === void 0) { messageError = ''; }
    if (maxLogLength === void 0) { maxLogLength = -1; }
    if (onError === void 0) { onError = null; }
    console.log("> " + wrkDir + " " + command);
    try {
        if (logEnabled) {
            console.log(messageBefore);
        }
        var logObj = cp.execSync(command, {
            cwd: wrkDir,
            encoding: 'utf8',
            stdio: [0, 1, 2]
        });
        if (logEnabled) {
            console.log(messageAfter);
            if (logObj) {
                var log = logObj.toString();
                if (log.trim().length > 0) {
                    if (maxLogLength < 0) {
                        console.log(log);
                    }
                    else if (maxLogLength > 0) {
                        console.log(log.substring(0, Math.min(maxLogLength, log.length)));
                    }
                }
            }
        }
    }
    catch (err) {
        if (onError) {
            onError(err);
        }
        if (errLogEnabled) {
            console.log(messageError);
            console.log(err.message);
        }
    }
}
exports.execProcess = execProcess;
function pullAll() {
    var modules = modulesDetector.getModules();
    var reversedModules = modules.reverse();
    reversedModules.forEach(function (module) {
        var folder = module.fsLocation;
        if (folder) {
            execProcess("git pull", folder, true);
        }
    });
}
function buildAll() {
    var modules = modulesDetector.getModules();
    var reversedModules = modules.reverse();
    reversedModules.forEach(function (module) {
        var folder = module.fsLocation;
        if (folder) {
            var buildCommand = module.buildCommand;
            if (buildCommand)
                execProcess(buildCommand, folder, true);
        }
    });
}
function testAll() {
    var modules = modulesDetector.getModules();
    var reversedModules = modules.reverse();
    reversedModules.forEach(function (module) {
        var folder = module.fsLocation;
        if (folder) {
            var testCommand = module.testCommand;
            if (testCommand)
                execProcess(testCommand, folder, true);
        }
    });
}
var args = process.argv;
if (args[2]) {
    switch (args[2]) {
        case ("pullall"):
            pullAll();
            break;
        case ("buildall"):
            buildAll();
            break;
        case ("testall"):
            testAll();
            break;
    }
}
//# sourceMappingURL=devUtils.js.map