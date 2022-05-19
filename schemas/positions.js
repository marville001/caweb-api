const Joi = require("joi");

module.exports = {
    addPositionSchema: Joi.object().keys({
        title: Joi.string().min(5).required(),
        description: Joi.string().required(),
    }),

    updatePositionSchema: Joi.object().keys({
        title: Joi.string().min(5).required(),
        description: Joi.string().required(),
    }),
};
