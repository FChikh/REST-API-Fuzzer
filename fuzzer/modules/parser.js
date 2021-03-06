try {
    var path = require("path");
    var raml1Parser = require('../../js-parser/dist/index');
    var fs = require("fs")


    var api = raml1Parser.loadApiSync(path.resolve(process.argv[2]),{

        fsResolver: {

            content: function(path){ return fs.readFileSync(path).toString(); },

            list: function(path){ return fs.readDirSync(path); },

            contentAsync: function(path){
                return new Promise(function (resolve, reject) {
                    fs.readFile(path, function (err, data) {
                        if (err != null) {
                            reject(err);
                            return;
                        }
                        var content = data.toString();
                        resolve(content);
                    });
                });
            },

            listAsync: function (path) {
                return new Promise(function (reject, resolve) {
                    fs.readdir(path, function (err, files) {
                        if (err != null) {
                            reject(err);
                            return;
                        }
                        resolve(files);
                    });
                });
            }
        }
    });

    api.errors().forEach(function(x){
        console.log(JSON.stringify({
            code: x.code,
            message: x.message,
            path: x.path,
            start: x.start,
            end: x.end,
            isWarning: x.isWarning
        },null,2));
    });

    fs.writeFileSync('modules/parsed.json', JSON.stringify(api.toJSON(), null, 2));
    process.stdout.write('1');
}
catch(err) {
    process.stdout.write('0');
}
