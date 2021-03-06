console.log('RAML 1.0 JS Parser Test');

var fs = require('fs');
var path = require("path");
var raml1Parser = require('../dist/index');

var api = raml1Parser.loadApiSync(path.resolve(__dirname, "./raml-specs/XKCD/api.raml"));

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

fs.writeFileSync('t1.json', JSON.stringify(api.toJSON(), null, 2));
