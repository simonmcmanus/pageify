var Joi = require('joi');

var schema = Joi.object().required().keys({
    setupPage: Joi.func(),
    PAGES_FOLDER: Joi.string().required().default('../woodford.today/pages/'),
    PUBLIC_FOLDER: Joi.string().required().default('/public/pages'),
    JS_EXT: Joi.string().required().default('.js'),
    CSS_EXT: Joi.string().required().default('.css'),
    STYLE_ID: Joi.string().required().default('#perPageStyle'),
    mappings: Joi.object().required()
});

module.exports = assert = function(config) {
    Joi.assert(config, schema);
};