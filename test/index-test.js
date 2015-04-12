'use strict';

var expect = require('chai').expect;
var pageify = require('../index');

/**
 * Nothing to fancy here, just checking the output includes strings we expect.
 *
 * Really it should be running the js, or at least running it through jslint.
 */

describe('index.js - when required', function () {


    it('should return a function', function () {
        expect(pageify).to.be.a('function');
    });

    describe('when called without a null config', function() {
        it('should throw a no config error', function() {
            expect(function() {
                pageify(null);
            }).to.Throw('"value" must be an object');
        });
    });

    describe('given a valid config', function () {
        var config;
        beforeEach(function() {
            config = {
                setupPage: function() {},
                PUBLIC_FOLDER: '/public/',
                PUBLIC_PAGES_FOLDER: '/pages/',
                STYLE_ID: '#styletag',
                PAGES_FOLDER: './non/existant',
                JS_EXT: '.js',
                CSS_EXT: '.css',
                mappings: {}
            };
        });

        describe('when called with an empty mappings object', function() {

            var out;
            beforeEach(function() {
                out = pageify(config);
            });

            it('should return a string', function() {
                expect(out).to.be.a('string');
            });

            it('should require the page module', function() {
                expect(out).to.include("var page = require('page');");
            });

            it('should require the scriptloader module', function() {
                expect(out).to.include("var scriptLoader = require('scriptjs');");
            });

            it('should check for history.pushState', function() {
                expect(out).to.include("if (history.pushState) {");
            });

            it('should add an event Listener on DOMContentLoaded', function() {
                expect(out).to.include('document.addEventListener("DOMContentLoaded", function(event) {');
            });

            it('should call the page()', function() {
                'page();';
            });

            it('should lint the code', function() {

            });
        });


        describe('when called with a setupPage function', function () {

            var out;
            beforeEach(function() {

                config.setupPage = function() {
                    alert("hi");
                };
                out = pageify(config);
            });
            it('include the alert', function() {
                expect(out).to.include('var setupPage=function () {\n                    alert("hi");\n                }\n');
            });
        });

        describe(' When called with a mapping that has a js and css file associated', function() {
            var out;

            beforeEach(function() {
                config.mappings = {
                    '/toast': {
                        page: 'toast'
                    }
                };

                config.PAGES_FOLDER = './test/simple/';
                out = pageify(config);
            });

            it('should create the toast route.', function() {
                expect(out).to.include("page('/toast', function (context, next) {");
            });

            it('should call setupPage with or without loading the page..', function() {
                expect(out).to.include("if (!context.init) {\n            scriptLoader(\'/public/js/pages/toast.js\', function (a, b) {\n               setupPage(\'toast\', context);\n            });\n        } else {\n            setupPage(\'toast\', context");
            });

            it('should set the link tag (for style sheet) on the page change.', function() {
                expect(out).to.include("  document.querySelector('link#styletag').href = '/public/css/pages/toast.css';");
            });

        });


    describe(' When called with a mapping that does not have a js and css file associated', function() {
        var out;

        beforeEach(function() {
            config.mappings = {
                '/eggs': {
                    page: 'eggs'
                }
            };

            out = pageify(config);
        });

        it('not setup the toast route.', function() {
            expect(out).to.not.include("page('/eggs', function (context, next) {");
        });

        it('not mention the eggs.js file', function() {
            expect(out).to.not.include("eggs.js");
        });
        it('not mention the eggs.css file', function() {
            expect(out).to.not.include("eggs.css");
        });

    });

    });

    describe('when called with a setupPage string', function () {

        it('should not set setupPage', function() {
            expect(function() {
                pageify({
                    setupPage: 'hi'
                });
            }).to.throw('"setupPage" must be a Function');
        });
    });
});
