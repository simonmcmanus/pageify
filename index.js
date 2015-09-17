'use strict';

var pageify = require('./lib/pageify');

var schema = require('./joi-schema');

module.exports = function(config, callback) {
    schema.validate(config, function(error, config) {
        callback(null, pageify(config));
    });
};
