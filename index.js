'use strict';

var fs = require('fs');
var path = require('path');

var schemaAssert = require('./joi-schema');

module.exports = function(config) {

    schemaAssert(config);

    var fileExists = function (file) {
        var location = path.join(file);
        return fs.existsSync(location) || false;
    };

    var out = [
        'var page = require(\'page\');',
        'var scriptLoader = require(\'scriptjs\');',
        ''
    ];

    // not entirely sure this check is necessary - sure pagejs covers this.
    out.push('if (history.pushState) {');
    out.push('');
    if(typeof config.setupPage == 'function') {
        out.push('  var setupPage=' + config.setupPage.toString());
    }

    Object.keys(config.mappings).forEach(function(mapping) {

        var item = config.mappings[mapping];

        var folder = config.PAGES_FOLDER + item.page + '/' + item.page;
        var jsFile = folder + config.JS_EXT;
        var cssFile = folder + config.CSS_EXT;
        var hasJs = fileExists(jsFile);
        var hasCss = fileExists(cssFile);

        if (hasCss || hasJs) {

            out.push('    page(\'' + mapping + '\', function (context, next) {');

            out.push('        if (!context.init) {');

            if (hasJs) {
                out.push('            scriptLoader(\'' + config.PUBLIC_FOLDER + 'js/' + item.page + '.js' + '\', function (a, b) {');
                out.push('               setupPage(\'' + item.page + '\', context);');
                out.push('            });');
            }
            out.push('        } else {');
            out.push('            setupPage(\'' + item.page + '\', context);');
            out.push('        }');
            if (hasCss && config.STYLE_ID) {
                out.push([
                    '        ',
                    'document.querySelector(\'link' + config.STYLE_ID + '\')',
                    '.href = \'' + config.PUBLIC_FOLDER + 'css/' + item.page + '.css\';'
                ].join(''));
            }
            out.push('    });');
            out.push('');
        }
    });
    out.push('');
    out.push('    document.addEventListener("DOMContentLoaded", function(event) { ');
    out.push('        page();');
    out.push('    });');
    out.push('}');
    return out.join('\n');
};
