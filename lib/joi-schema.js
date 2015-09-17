var Joi = require('joi');

exports.schema = Joi.object().required().keys({
    setupPage: Joi.func(),
    require: Joi.boolean().default(true),
    scriptLoader: Joi.string().default('scriptjs'),
    PAGES_FOLDER: Joi.string().required().default('../woodford.today/pages/'),
    PUBLIC_FOLDER: Joi.string().default('/'),
    PUBLIC_PAGES_FOLDER: Joi.string().default('/pages/'),
    JS_EXT: Joi.string().required().default('.js'),
    CSS_EXT: Joi.string().required().default('.scss'),
    STYLE_ID: Joi.string().default('#perPageStyle'),
    mappings: Joi.object().required()
});

exports.validate = function(config, callback) {
    Joi.validate(config, exports.schema, callback);
};


exports.assert = function(config) {
    Joi.assert(config, exports.schema);
}
