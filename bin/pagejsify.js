#!/usr/bin/env node

var dir = process.cwd();
var fs = require('fs');
var pagejsify = require('../index');

var configPath = dir + '/pagejsify-config.js';

fs.exists(configPath, function(exists) {
    var config;
    if (exists) {
        config = require(configPath);
    } else {
        config = require('../default-config');
    }
    var router = pagejsify(config);
    console.log(router);
    fs.writeFile(config.OUT_FILE, router);
});
