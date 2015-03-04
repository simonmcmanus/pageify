'use strict';

var fs = require('fs');

var path = require('path');

module.exports = function(config) {

    var fileExists = function (file) {
        var location = path.join(config.PUBLIC_FOLDER +  file);
        return fs.existsSync(location) || false;
    };


    var historyArray = config.NS + '.history';
    var out = [
        '\'use strict\';',
        'var page = require(\'page\');',
        ''
    ];

    out.push('if (history.pushState) {');
    out.push('');

    out.push('    var changePage = function(page, context){');
    out.push('        ' + historyArray + '.push(context.canonicalPath);');
    out.push('    };');
    out.push('');


    for (var mapping in config.mappings) {

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
                out.push('            if (!' + config.NS + '.pages[\'' + item.page + '\']) {');


                out.push('                 ' + config.NS + '.libs.scriptLoader(\'' + config.PUBLIC_FOLDER + '/' + item.page + '.js' + '\', function () {');
                out.push('                    changePage(\'' + item.page + '\', context);');
                out.push('                });');

                out.push('            } else {');
                out.push('                changePage(\'' + item.page + '\', context);');
                out.push('            }');
            }
            out.push('        } else {');
            out.push('            changePage(\'' + item.page + '\', context);');
            out.push('        }');

            if (hasCss) {
                out.push([
                    '        ',
                    'document.querySelector(\'link#' + config.STYLE_ID + '\')',
                    '.href = \'' + config.PUBLIC_FOLDER + '/' + item.page + '.css\';'
                ].join(''));
            }
            out.push('    });');
            out.push('');
        }
    }

    out.push('');

    out.push('    page();');
    out.push('');

    out.push('}');

    return out.join('\n')
}






