'use strict';
var page = require('pagejs');

if (history.pushState) {

    var changePage = function(page, context){
        NS.history.push(context.canonicalPath);
    };


    page();

}