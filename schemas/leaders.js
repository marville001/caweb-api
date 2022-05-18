const Joi = require("joi");

module.exports = {
    addLeaderSchema: Joi.object().keys({
        name: Joi.string().required(),
        title: Joi.string().min(5).required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        groupId: Joi.string().allow(""),
        churchCommittee: Joi.boolean().allow(""),
    }),

    updateLeaderSchema: Joi.object().keys({
        name: Joi.string().required(),
        title: Joi.string().min(5).required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        groupId: Joi.string().allow(""),
        churchCommittee: Joi.boolean().allow(""),
    }),
};
