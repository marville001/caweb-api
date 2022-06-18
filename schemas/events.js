const Joi = require("joi");

module.exports = {
    addEventSchema: Joi.object().keys({
        title: Joi.string().min(5).required(),
        key: Joi.string().min(5).required(),
        description: Joi.string().min(10).required(),
        group: Joi.string().required(),
        date: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().required(),
        groupId: Joi.string().allow(""),
    }),

    updateEventSchema: Joi.object().keys({
        title: Joi.string().min(5).required(),
        key: Joi.string().min(5).required(),
        description: Joi.string().min(10).required(),
        group: Joi.string().required(),
        groupId: Joi.string().allow(""),
        date: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().required(),
    }),
};
