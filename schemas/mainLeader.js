const Joi = require("joi");

module.exports = {
    addMainLeaderSchema: Joi.object().keys({
        name: Joi.string().required(),
        title: Joi.string().min(5).required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
    }),

    updateMainLeaderSchema: Joi.object().keys({
        name: Joi.string().required(),
        title: Joi.string().min(5).required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
    }),
};
