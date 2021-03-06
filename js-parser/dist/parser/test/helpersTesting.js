"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var util = require("./test-utils");
var api;
var songsResource;
var songResource;
var getSongMethod;
var response;
api = util.loadApiWrapper1("./helperTestApi.raml");
var method = api.childResource("/songs").methods()[0];
var param = method.queryParameters()[0];
assert.equal(param.name(), 'genre');
var errors = param.validateInstance("pop2");
assert.equal(errors.length, 1);
var errors = param.validateInstance("pop");
assert.equal(errors.length, 0);
//# sourceMappingURL=helpersTesting.js.map