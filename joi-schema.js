var Joi = require('joi');

var schema = Joi.object().required().keys({
    setupPage: Joi.func(),
    PAGES_FOLDER: Joi.string().required(),
    PUBLIC_FOLDER: Joi.string().required(),
    JS_EXT: Joi.string().required(),
    CSS_EXT: Joi.string().required(),
    STYLE_ID: Joi.string().required(),
    mappings: Joi.object().required()
});

module.exports = assert = function(config) {
    Joi.assert(config, schema);
};