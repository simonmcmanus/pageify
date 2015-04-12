var Joi = require('joi');

var schema = Joi.object().required().keys({
    setupPage: Joi.func(),
    PAGES_FOLDER: Joi.string().required().default('../woodford.today/pages/'),
    PUBLIC_FOLDER: Joi.string().default('/'),
    PUBLIC_PAGES_FOLDER: Joi.string().default('/pages/'),
    JS_EXT: Joi.string().required().default('.js'),
    CSS_EXT: Joi.string().required().default('.scss'),
    STYLE_ID: Joi.string().default('#perPageStyle'),
    mappings: Joi.object().required()
});

module.exports = assert = function(config) {
    Joi.assert(config, schema);
};
