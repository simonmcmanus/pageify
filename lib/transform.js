'use strict';

var transformTools = require('browserify-transform-tools');

var dir = process.cwd();
var fs = require('fs');
var pageify = require('./index');

module.exports = transformTools.makeRequireTransform('requireTransform',
    {evaluateArguments: true},
    function(args, opts, cb) {
        if (args[0] === 'pageify') {

            var configPath = dir + '/pageify-config.js';
            fs.exists(configPath, function(exists) {
                var config;
                if (exists) {
                    config = require(configPath);
                } else {
                    config = {};
                }
                pageify(config, cb);
            });
        } else {
            return cb(null);
        }
    }
);
